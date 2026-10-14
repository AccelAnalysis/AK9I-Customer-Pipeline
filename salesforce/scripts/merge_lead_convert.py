"""Add the phase-1 Lead conversion mappings to a LeadConvertSettings file
that was just RETRIEVED from the org. Keeps every existing mapping; only adds
missing ones. Deploying LeadConvertSettings replaces the whole mapping, so never
deploy a file that wasn't retrieved first.
Usage: python scripts/merge_lead_convert.py <path-to-retrieved LeadConvertSettings file>
"""
import json, sys, os, shutil
import xml.etree.ElementTree as ET
NS = "http://soap.sforce.com/2006/04/metadata"
ET.register_namespace("", NS)
q = lambda t: f"{{{NS}}}{t}"
path = sys.argv[1]
here = os.path.dirname(os.path.abspath(__file__))
wanted = json.load(open(os.path.join(here, "..", "lead-convert-mappings.json")))
shutil.copy(path, path + ".before-merge")
tree = ET.parse(path); root = tree.getroot()
def mapping_for(out_obj):
    for om in root.findall(q("objectMapping")):
        if om.findtext(q("inputObject")) == "Lead" and om.findtext(q("outputObject")) == out_obj:
            return om
    om = ET.SubElement(root, q("objectMapping"))
    ET.SubElement(om, q("inputObject")).text = "Lead"
    ET.SubElement(om, q("outputObject")).text = out_obj
    return om
added = 0
for out_obj, pairs in wanted.items():
    om = mapping_for(out_obj)
    existing = {mf.findtext(q("inputField")): mf.findtext(q("outputField")) for mf in om.findall(q("mappingFields"))}
    for src, dst in pairs:
        if src in existing:
            if existing[src] != dst:
                print(f"SKIP Lead.{src}: already maps to {out_obj}.{existing[src]} (wanted {dst}); review by hand")
            continue
        mf = ET.Element(q("mappingFields"))
        ET.SubElement(mf, q("inputField")).text = src
        ET.SubElement(mf, q("outputField")).text = dst
        # mappingFields must sit before outputObject
        kids = list(om); idx = next((i for i, k in enumerate(kids) if k.tag == q("outputObject")), len(kids))
        om.insert(idx, mf); added += 1
        print(f"ADD  Lead.{src} -> {out_obj}.{dst}")
tree.write(path, xml_declaration=True, encoding="UTF-8")
print(f"{added} mappings added. Backup at {path}.before-merge")
