# Conversational shopping client readiness

Status: interface foundation only. The current storefront remains unchanged and no live agent or payment integration is enabled.

## Experience contract

The consumer application can offer an optional English/Spanish assistant for product discovery, questions, suggestions, and cart building. Standard search, category navigation, cart, and checkout remain available at all times.

For every turn, the UI handles two coordinated results:

1. Conversational guidance and a conversation ID from the server.
2. Published product results from a separate catalog-search request.

The client never calls Vertex AI, Google retail services, or Stripe with privileged credentials. It calls only the Cappeto commerce API.

## User-control requirements

- Clearly label assistant-generated suggestions.
- Announce new messages and product-result changes to assistive technology without moving focus unexpectedly.
- Support keyboard-only use, text resizing, reduced motion, and EN/ES switching.
- Show product name, final price, tax/delivery status, availability, quantity, and cart total outside the conversation.
- Require a visible confirmation before applying a cart change or starting checkout.
- Provide Undo for reversible cart actions and ordinary buttons for every conversational action.
- Preserve neither sensitive payment data nor unrestricted conversation history in local storage.

## Client states

`idle -> asking -> response + results -> cart preview -> user confirmation -> server checkout -> provider authorization -> order status`

Any error, uncertain recommendation, price change, unavailable item, or expired session returns the shopper to a reviewable state. The agent must never silently substitute a product or complete an order.

## Data boundary

Allowed: published product name, description, category, final customer price, tax display, availability, public image, dietary tags, allergen notice, store hours, delivery options, and user-approved cart contents.

Forbidden: purchase cost, supplier data, inventory movements, margins, returns, damage, accounting, staff, tenant administration, unpublished items, provider secrets, and raw payment credentials.

## Rollout gates

- DEV catalog/search and bilingual grounding verified.
- Server contract and error behavior integration-tested.
- Accessibility and human handoff tested.
- Stripe test mode, signed webhooks, idempotency, refunds, and order reconciliation verified.
- Agentic checkout remains feature-gated while provider features are private preview.
