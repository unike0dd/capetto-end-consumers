# Cappeto end-consumer cloud readiness

The existing HTML storefront remains intact. The Flutter migration shell and infrastructure validation are additive.

## Consumer boundary

This application may read only the public catalog projection: product ID, localized display name, public description, category, final customer price, tax display, availability, and public media URL. It must not read purchase cost, supplier data, inventory movements, returns, damage, margins, internal accounting, staff records, or tenant administration.

Development, staging, and production use separate Firebase/Google Cloud projects and separate Terraform state. No credentials or live project identifiers belong in Git.

## Activation

1. Confirm the public API/catalog contract with the owner repository.
2. Create separate cloud projects and billing for each environment.
3. Copy the Terraform example variables to an untracked environment-specific file.
4. Validate and review a Terraform plan before any apply.
5. Generate Flutter platform folders and Firebase options using official CLIs.
6. Configure Cloudflare only after the production domain and deployment target are confirmed.
