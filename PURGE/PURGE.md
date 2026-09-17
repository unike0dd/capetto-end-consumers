# PURGE — ready for deletion

This directory is deliberately disconnected from the Cappeto consumer application. Nothing here is imported, linked, loaded, executed, triggered, or referenced by either page.

Confirmed obsolete material isolated here:

- `consumer-identity.js`, an older identity helper not loaded by `login.html` or `index.html`.
- A category-filter renderer targeting the nonexistent `#filters` element.
- Three event assignments replaced by the active storefront panel controls.
- Five obsolete storefront copy keys.
- Retired CSS selectors left behind by previous header, hero, filter, popover, cart, and session layouts.

The entire `PURGE` directory can be deleted without changing current behavior.

## Removed storefront copy keys

```text
all
fresh
heroTitle
heroCopy
browse
menuEyebrow
menuTitle
```

## Removed CSS selectors

```text
business-title
actions
cart-drawer
cart-lines
category-list
consumer-button
consumer-popover
customer-avatar
customer-session
drawer-heading
filter
filters
header-spacer
hero
hero-copy
hero-photo
intro-action
intro-banner
intro-copy
intro-menu
menu-button
menu-preferences
mobile-search
popover-actions
preference-toggle
remember
section-head
signed-in-banner
top-search
```
