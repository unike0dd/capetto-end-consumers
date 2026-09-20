# Threat Model

Trust boundaries: the browser is untrusted; public assets contain no secrets; Actions use minimum permissions; cloud accounts and payments are outside this repository.

| Threat | Control |
|---|---|
| Embedded credentials | Secret scanning, push protection, rotation |
| Forged browser identity | No demo authentication; mutations fail closed |
| Catalog poisoning | Origin allowlist, per-item URL validation, encoding |
| Workflow escalation | SHA-pinned Actions, no `pull_request_target` |
| Request abuse | Explicit content type and bounded bodies |
| Sensitive caching | `no-store` for HTML, API, errors and reports |
| Price/payment tampering | Future server authority and verified webhooks |

Production additionally requires authorization, DAST, isolation, restoration, incident and penetration tests.
