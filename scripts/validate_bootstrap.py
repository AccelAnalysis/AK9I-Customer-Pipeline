#!/usr/bin/env python3
import json, pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
REQUIRED = [
"README.md","AGENTS.md","governance/AK9I_PIPELINE_PROGRAM_AUTHORITY.md","governance/CUSTOMER_JOURNEY_ARCHITECTURE.md","governance/CUSTOMER_PIPELINE_EXPERIENCE_LEDGER.md","governance/PIPELINE_STAGE_CONTRACTS.md","governance/SHARED_PIPELINE_CONTRACTS.md","governance/PARALLEL_DELIVERY_MATRIX.md","governance/INDEPENDENT_ACCEPTANCE_PROTOCOL.md","governance/CHAT_LANE_CHARTERS.md","governance/PRIVACY_AND_DATA_BOUNDARIES.md","governance/WORK_PACKET_PROTOCOL.md","governance/CHANGE_AND_DECISION_PROTOCOL.md","governance/INTEGRATION_PROTOCOL.md","governance/pipeline-requirements.json","control-room/MASTER_PIPELINE_TRACKER.md","control-room/DEPENDENCY_MAP.md","control-room/PIPELINE_HEALTH_SCORECARD.md","control-room/CURRENT_PROGRAM_STATE.md","control-room/DECISION_LOG.md","control-room/RISKS_AND_BLOCKERS.md","control-room/ASSURANCE_BACKLOG.md","baseline/BASELINE_DATA_REQUIREMENTS.md","baseline/SYSTEMS_AND_DATA_INVENTORY.md","baseline/CURRENT_PROCESS_INVENTORY.md","baseline/BASELINE_FINDINGS.md","integration/CUSTOMER_JOURNEY_TEST_MATRIX.md","integration/HANDOFF_MATRIX.md",".github/PULL_REQUEST_TEMPLATE.md",".github/CODEOWNERS"
]
PROMPTS=[f"governance/chat-prompts/{name}" for name in ["00-control-room.md","01-shared-pipeline-platform.md","02-advocacy-reputation.md","03-outcomes-placement-alumni.md","04-learning-student-success.md","05-enrollment-admissions.md","06-demand-generation-marketing.md","07-strategic-partnerships-channels.md","08-independent-acceptance.md","09-pipeline-integration.md"]]
PACKETS=["SHR-001","SHR-002","SHR-003","BASE-001","ADV-001","OUT-001","LRN-001","ENR-001","MKT-001","PART-001"]
errors=[]
for rel in REQUIRED+PROMPTS:
    if not (ROOT/rel).is_file(): errors.append(f"missing required file: {rel}")

req=json.loads((ROOT/"governance/pipeline-requirements.json").read_text())
if req.get("schemaVersion") != "1.1":
    errors.append("pipeline requirements schemaVersion must be 1.1")
requirements=req.get("requirements",[])
ids=[r["id"] for r in requirements]
if len(ids)!=len(set(ids)): errors.append("duplicate requirement IDs")
id_set=set(ids)

tracker=(ROOT/"control-room/MASTER_PIPELINE_TRACKER.md").read_text()
for packet in PACKETS:
    if packet not in tracker: errors.append(f"tracker missing {packet}")
    if not (ROOT/f"work-packets/active/{packet}.md").is_file(): errors.append(f"work packet missing {packet}")

# Discover every durable work-packet ID so dependency validation remains valid as packets move status directories.
packet_ids=set()
for dirname in ["active","blocked","acceptance-pending","completed"]:
    directory=ROOT/"work-packets"/dirname
    if not directory.is_dir():
        continue
    for path in directory.glob("*.md"):
        if path.name.lower()=="readme.md":
            continue
        packet_ids.add(path.stem)

# Requirement-registry dependency references remain strings for compatibility, but every non-empty
# reference must be explicitly namespaced as requirement:<ID> or work-packet:<ID>.
dep_pattern=re.compile(r"^(requirement|work-packet):([A-Za-z0-9][A-Za-z0-9-]*)$")
requirement_graph={rid:[] for rid in ids}
for requirement in requirements:
    rid=requirement["id"]
    deps=requirement.get("dependencies",[])
    if not isinstance(deps,list):
        errors.append(f"{rid} dependencies must be a list")
        continue
    seen=set()
    for dep in deps:
        if not isinstance(dep,str):
            errors.append(f"{rid} dependency must be a namespaced string: {dep!r}")
            continue
        if dep in seen:
            errors.append(f"{rid} has duplicate dependency reference: {dep}")
        seen.add(dep)
        match=dep_pattern.fullmatch(dep)
        if not match:
            errors.append(f"{rid} has ambiguous or invalid dependency reference: {dep}")
            continue
        dep_type,target=match.groups()
        if dep_type=="requirement":
            if target not in id_set:
                errors.append(f"{rid} references unknown requirement dependency: {target}")
            elif target==rid:
                errors.append(f"{rid} has self-referential requirement dependency")
            else:
                requirement_graph[rid].append(target)
        elif target not in packet_ids:
            errors.append(f"{rid} references unknown work-packet dependency: {target}")

# Detect cycles among requirement-to-requirement references. Work-packet execution dependencies are
# intentionally a separate namespace and are not interpreted as requirement graph edges.
visit_state={}
visit_stack=[]
reported_cycles=set()
def visit_requirement(node):
    visit_state[node]=1
    visit_stack.append(node)
    for target in requirement_graph.get(node,[]):
        state=visit_state.get(target,0)
        if state==0:
            visit_requirement(target)
        elif state==1:
            start=visit_stack.index(target)
            cycle=visit_stack[start:]+[target]
            signature=" -> ".join(cycle)
            if signature not in reported_cycles:
                errors.append(f"requirement dependency cycle: {signature}")
                reported_cycles.add(signature)
    visit_stack.pop()
    visit_state[node]=2
for rid in ids:
    if visit_state.get(rid,0)==0:
        visit_requirement(rid)

for p in PROMPTS:
    if (ROOT/p).exists():
        text=(ROOT/p).read_text()
        for token in ["AK9I-Customer-Pipeline","AGENTS.md","CURRENT_PROGRAM_STATE.md","MASTER_PIPELINE_TRACKER.md","DEPENDENCY_MAP.md","PII"]:
            if token not in text: errors.append(f"{p} missing bootstrap token: {token}")
# Heuristic secret/PII guard. Documentation examples such as AK9I-STU-XXXX are intentionally allowed.
patterns={"SSN":r"\b\d{3}-\d{2}-\d{4}\b","Stripe secret":r"\bsk_(?:live|test)_[A-Za-z0-9]+","private key":r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----"}
for path in ROOT.rglob("*"):
    if not path.is_file() or ".git" in path.parts: continue
    try: text=path.read_text()
    except UnicodeDecodeError: continue
    for name,pat in patterns.items():
        if re.search(pat,text): errors.append(f"possible {name} in {path.relative_to(ROOT)}")
if errors:
    print("BOOTSTRAP VALIDATION FAILED")
    for e in errors: print("-",e)
    sys.exit(1)
print(f"BOOTSTRAP VALIDATION PASSED: {len(REQUIRED)} core files, {len(PROMPTS)} prompts, {len(PACKETS)} seeded work packets, {len(ids)} requirements; dependency references validated")
