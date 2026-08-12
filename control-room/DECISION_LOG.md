# Decision Log

| Date | Decision | Class | Authority | Affected items | Rationale/evidence | Consequence |
|---|---|---|---|---|---|---|
| 2026-08-12 | Install ten-lane Control Room Parallel Operating Model | Program architecture | Bootstrap authority | Program-wide | User-approved bootstrap specification | Durable multi-lane coordination model |
| 2026-08-12 | Treat actual metrics/process/system state as unknown until evidenced | Program architecture | Program Authority | Wave 1 | No verified baseline yet | Prevents fictional KPI/operational claims |
| 2026-08-12 | Keep customer/student PII outside GitHub | Program architecture/privacy | Program Authority | Program-wide | Privacy boundary | Evidence must be redacted/de-identified |
| 2026-08-12 | Namespace requirement-registry dependency references as `work-packet:<ID>` or `requirement:<ID>` while retaining string-array compatibility | Governance/data integrity | Control Room with Lane 01 shared-interface consultation | `pipeline-requirements.json`, validator, dependency tooling | Issues #3 and #10 exposed collisions between requirement IDs and work-packet IDs | Dependency automation can distinguish execution dependencies from true requirement prerequisites without changing functional semantics |
