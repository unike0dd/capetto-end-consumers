# ADR-001: Application Repositories Do Not Own Shared Infrastructure

**Status:** Accepted.

This repository owns application source, public contracts, tests and GitHub evidence. Shared Firebase, Google Cloud, Cloud Run, IAM, secrets, production logging, backups and Terraform state require one separate infrastructure control plane. Terraform and Firebase provisioning files are intentionally absent here; cloud activation is blocked until that control plane is authorized.
