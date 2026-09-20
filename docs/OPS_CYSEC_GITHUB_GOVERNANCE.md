# OPS CySec GitHub Governance

This repository owns the consumer catalog, search, cart-presentation, and account interface. It does not own shared cloud infrastructure, production data, secrets, or Terraform state.

Changes enter `main` only through reviewed pull requests. Security-sensitive paths require owner review. Workflows use minimum permissions and SHA-pinned Actions. Public clients are untrusted; prices, taxes, inventory, authorization, orders, and payment status become authoritative only in a future trusted backend.

A release requires passing checks, resolved review threads, a reviewed commit, recorded approval, rollback evidence, and separate authorization for any external service activation.
