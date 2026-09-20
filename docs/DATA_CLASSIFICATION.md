# Data Classification

| Class | Examples | Rule |
|---|---|---|
| Public | Approved UI and catalog projection | May be committed |
| Internal | Sanitized procedures | Private preferred |
| Confidential | Profiles, orders, staff and audit events | Never commit |
| Restricted | Credentials, tokens, keys and payment secrets | Secret manager/provider only |

Production data, real customer records, state files, backups, secrets and incident evidence are prohibited.
