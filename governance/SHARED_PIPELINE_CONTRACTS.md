# Shared Pipeline Contracts

These are logical canonical concepts. A concept being defined here **does not mean a physical field is implemented in a CRM or other system**. Physical implementation must be verified and mapped separately.

## Identity

- `customerStudentRef`: non-identifying durable reference used in repository evidence; authoritative PII remains outside GitHub.
- `organizationEmployerRef`: canonical organization/employer reference where an authoritative identity exists.
- `partnerRef`: canonical external partner reference where an authoritative identity exists.

Physical systems/fields: `UNKNOWN — BASELINE REQUIRED`.

## Lifecycle

- canonical stage
- stage timestamp
- stage history

One authority governs stage semantics: `PIPELINE_STAGE_CONTRACTS.md`. Physical implementation: `UNKNOWN — BASELINE REQUIRED`.

## Source attribution

- original source: first attributable acquisition source when technically available; must not be silently overwritten by later activity.
- latest source: most recent attributable source/touch where useful.
- campaign
- referring channel
- referral source

Attribution availability and physical fields: `UNKNOWN — BASELINE REQUIRED`.

## Program interest

- program
- pathway
- geography where relevant

Accepted catalogs/fields: `UNKNOWN — BASELINE REQUIRED`.

## Pipeline state

Logical domains: qualification; application; enrollment; start; training; completion; outcome; advocacy. These consume canonical lifecycle definitions rather than recreating them.

## Work ownership

Every actionable record should support, conceptually:

- current owner
- next action
- next-action date
- reason blocked

Physical implementation: `UNKNOWN — BASELINE REQUIRED`.

## Outcome

Logical concepts:

- employment/other post-graduation goal
- outcome state
- employer interaction
- interview
- offer
- accepted outcome
- verified outcome

Lane 03 must establish validated distinctions before outcome-rate reporting is treated as authoritative.

## Advocacy

Logical concepts:

- feedback/NPS status if adopted
- review requested/completed
- testimonial state and consent
- referral ask
- referral outcome

Physical implementation and approved measurement: `UNKNOWN — BASELINE REQUIRED`.

## Contract changes

A lane needing shared behavior not represented here must open/record a Pipeline Contract Request (PCR), update dependencies, and avoid creating a local incompatible schema. Lane 01 coordinates resolution with affected lanes and Control Room when program architecture is implicated.
