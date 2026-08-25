Redesign the attached mobile application screens for **Stokta**, a barcode-based inventory and stock management application for iOS and Android.

The attached screenshots represent the **current working application**. Use them to understand the existing functionality, navigation, data, workflows, buttons, actions, and information hierarchy.

Do **not** simply recreate the screenshots.

Create a significantly improved, production-quality mobile UI while preserving the application's existing functionality and the established **Stokta visual identity**.

# Core Design Goal

Stokta should feel like:

**A high-performance inventory management tool with a subtle retro Macintosh personality.**

The application should be:

* minimal
* powerful
* fast
* highly usable
* information-dense without feeling crowded
* professional
* warm
* slightly nostalgic
* distinctive
* optimized for frequent daily use

Use retro influence primarily through:

* typography
* warm cream / graphite color palette
* subtle borders
* restrained shadows
* icon treatment
* monospace inventory metadata
* understated classic-computer character

Use **modern mobile UX patterns** for navigation, hierarchy, accessibility, interactions, and workflows.

Do not turn the application into a decorative retro interface.

The priority is usability.

---

# Preserve the Existing Stokta Brand

Keep and refine the existing Stokta identity visible in the screenshots:

* Stokta logo
* barcode-based app icon
* warm cream background
* charcoal / dark graphite primary color
* rounded typography
* monospace metadata
* restrained retro Macintosh aesthetic

Do not replace the existing identity with:

* generic Material Design
* generic SaaS dashboards
* glassmorphism
* neon colors
* excessive gradients
* futuristic UI
* overly playful illustrations
* excessive skeuomorphism

The redesign should clearly still be **Stokta**.

---

# General UI Improvements

Reduce unnecessary visual chrome.

The current application uses too many:

* oversized cards
* large empty spaces
* borders
* shadows
* oversized buttons
* large navigation selection backgrounds

Make the UI more compact and efficient.

Prefer:

* whitespace
* subtle separators
* restrained borders
* smaller cards
* grouped settings rows
* compact controls
* strong typography hierarchy

Do not place every piece of information inside a card.

---

# Typography Hierarchy

Create a clear reusable hierarchy approximately like:

* Page title: 28–30 px, bold
* Section title: 20–22 px, bold
* Card / row title: 16–18 px, semibold
* Body: 15–16 px
* Secondary text: 13–14 px
* Inventory metadata: 12–13 px monospace

Preserve the use of monospace text for technical inventory information such as:

* store codes
* SKU
* product codes
* barcode numbers
* report metadata

Example:

`MAIN · PPE-001 · PPE-GLV-M · 8691000000015`

This should become an identifiable part of the Stokta visual language.

---

# Global Header

Reduce the height and prominence of the repeated Stokta header.

Instead of using a large logo/header area on every screen, create a compact application header.

For example:

**[Stokta icon] Stokta                     MAIN ▾**

The currently selected store/workspace can appear as a compact selector or chip.

The full Stokta branding can remain more prominent during onboarding and launch.

---

# Bottom Navigation

Keep the current main navigation structure:

* Home
* Products
* Stores
* Settings

But redesign the bottom navigation to be significantly lighter.

Do not use a huge dark rectangle around the selected tab.

Use a more subtle active indicator such as:

* small pill behind the icon
* underline
* subtle filled icon container
* stronger icon + label state

The bottom navigation should remain visible but should not visually dominate the interface.

---

# HOME SCREEN

The Home screen should become a clean inventory overview.

Remove **Quick Actions** from Home.

Remove **Generate Report** from Home.

The Home screen should focus entirely on useful operational information.

## Inventory Overview

Keep metrics such as:

* Products
* Total units
* Low stock
* Active stores

But redesign the four huge cards into a much more compact 2 × 2 overview.

Each metric should contain:

* small icon
* strong number
* short label

Reduce the height of these cards by approximately 40–50%.

Example conceptual hierarchy:

Products        8
Units           266
Low stock       4
Stores          1

Make low-stock information visually noticeable without being aggressive.

---

# Home – Recent Activity

Use some of the newly available space to introduce a useful **Recent Activity** section.

Show recent inventory changes such as:

* +12 Barcode Printer Ribbon
* −2 Packing Tape
* +30 Nitrile Gloves

Include:

* product name
* quantity change
* timestamp if useful
* store when relevant

Keep this section compact.

It should help users quickly understand what has recently changed in their inventory.

Optionally provide:

**View activity →**

Do not turn Home into a complex analytics dashboard.

---

# PRODUCTS SCREEN

This should become the primary operational screen of Stokta.

The Products screen should prioritize:

1. Search
2. Barcode scanning
3. Adding products
4. Product visibility
5. Inventory operations

---

# Product Toolbar

Create a clear compact toolbar below search.

Recommended structure:

**[ + Add ]   [ Scan ]   [ Sort ▾ ]   [ ••• ]**

Barcode scanning should be immediately accessible.

Do **not** hide barcode scanning inside a menu.

It is one of Stokta's primary functions.

Make Scan visually recognizable without making it oversized.

---

# Product Overflow Menu

Move the existing Quick Actions functionality to the Products screen.

Use the `•••` overflow menu for less frequent inventory operations.

Do not label the button itself “Quick Actions”.

The menu can use a title such as:

**Inventory actions**

Suggested structure:

Import data

* Import Excel
* Import CSV

Export

* Export Excel
* Export CSV

Export to cloud

* Google Drive
* Microsoft OneDrive / Microsoft 365
* Yandex Disk

Only show cloud destinations that are available or connected when appropriate.

Use clear icons for each action.

---

# Product List Redesign

The current product list needs major usability improvement.

Design compact structured product rows.

The most important information should be visually prioritized:

1. Product name
2. Quantity
3. Stock status
4. SKU / barcode metadata

Example structure:

**Barcode Printer Ribbon                         9**

`RIB-001 · MAIN · 8691000000084`

**● Low stock**

Use compact separators between rows rather than large cards unless a card provides a meaningful interaction benefit.

Allow many products to remain visible on one screen.

The list should be optimized for fast visual scanning.

---

# Stock Status

Introduce subtle semantic colors for stock state.

Use muted, vintage-compatible colors rather than bright SaaS colors.

Suggested semantic states:

* muted green → In stock
* muted amber → Low stock
* muted red → Out of stock

Keep the rest of the Stokta interface primarily cream / graphite / warm gray.

Stock color should communicate meaning, not decorate the interface.

Possible forms:

* colored dot
* small status badge
* text + dot

---

# Product Sorting and Filtering

Create simple sorting/filtering controls.

Useful sorting options:

* Name
* Quantity
* Recently updated
* Low stock first

Avoid cluttering the screen with many permanent buttons.

Use dropdowns or bottom sheets where appropriate.

---

# STORES SCREEN

Make the Stores screen more compact.

The current store card is too large.

Design a tappable store row/card containing:

* Store icon
* Store name
* Store code
* Product count
* Unit count
* Low-stock count
* Overflow menu

Example:

**Main Store                                  •••**
`MAIN`

8 products · 266 units · 4 low

Make the entire store card tappable.

Remove the large **View products** button.

Opening the store should happen by tapping the card.

---

# Store Actions

Do not show destructive actions such as a large visible trash icon directly on the store card.

Move secondary/destructive operations under `•••`.

Possible actions:

* Edit
* Rename
* Duplicate if appropriate
* Delete store

Delete should clearly appear destructive.

---

# ADD STORE

Redesign Add Store as a clean native mobile bottom sheet or modal.

Fields:

* Store name
* Store code

Primary action:

**Create store**

Use a simple close `×` control rather than a large Close button.

Use comfortable field spacing without leaving excessive empty space.

---

# SETTINGS

Redesign Settings completely.

The current Settings screen is too card-heavy and vertically inefficient.

Use compact grouped settings sections with rows, subtle separators, and occasional icons.

Avoid placing every category inside a huge bordered card.

Recommended architecture:

## Appearance

## Inventory Display

## Language & Region

## Data & Reports

## Integrations

## Accessibility & Interaction

## About

---

# APPEARANCE SETTINGS

Replace the simple Dark Mode toggle with a proper theme setting:

**Theme**

* System
* Light
* Dark

System should be available as an option.

Keep:

**Text size**

* Small
* Standard
* Large

Add:

**Interface density**

* Compact
* Comfortable

Compact mode should allow experienced users to see more inventory information on screen.

Add:

**Contrast**

* Standard
* High

Keep customization purposeful.

Do not allow arbitrary visual changes that weaken the Stokta brand.

---

# INVENTORY DISPLAY SETTINGS

Create customization options specifically useful for inventory work.

Include options such as:

**Product row density**

* Compact
* Comfortable

**Visible product information**
Allow users to show/hide:

* SKU
* barcode number
* store code

**Stock indicator**

* Dot
* Badge

**Default sorting**

* Name
* Quantity
* Recently updated
* Low stock first

These settings should affect how the Products screen behaves.

---

# ACCESSIBILITY & INTERACTION

Add useful interaction preferences:

**Haptic feedback**
On / Off

**Reduce motion**
On / Off

These should remain compact settings rows.

---

# LANGUAGE & REGION

Keep language selection but simplify the presentation.

Example:

**Display language                         English ›**

Tapping it opens a selection screen or bottom sheet.

Do not use oversized English/Turkish buttons permanently in Settings.

---

# REPORTS

Move reporting completely out of Home.

Create a **Data & Reports** section inside Settings.

The settings entry can be:

**Reports                                   ›**

Opening Reports should present a focused report management screen.

---

# REPORT GENERATION SCREEN

Allow the user to select a report period.

Options could include:

* Today
* Last 7 days
* Last 30 days
* Last 3 months
* Last 6 months

Prefer a dropdown, segmented control, or compact selector rather than five large permanent buttons.

Primary action:

**Generate report**

After generating a report, allow:

* Share
* Save to cloud

---

# RECENT REPORTS

On the Reports screen, display the **latest 3 generated reports**.

Each report should show:

* generation date
* report period
* format
* optional file size
* overflow menu

Use Stokta's monospace styling for metadata.

Example:

**Inventory report**

`24 AUG 2026 · 30 DAYS · XLSX`

`•••`

Possible report menu actions:

* Share
* Save to cloud
* Regenerate
* Delete

Below the latest three reports, optionally include:

**View all reports →**

Do not turn this page into a complicated document manager.

---

# DATA & REPORTS SETTINGS

The broader section may contain:

**Reports                                    ›**

**Import / Export                            ›**

**Cloud storage defaults                     ›**

Keep these as compact navigation rows.

---

# INTEGRATIONS

Integrations are optional services.

The application must work fully offline without them.

Redesign integrations as compact provider rows.

Initially include:

* Google Drive
* Microsoft 365 / OneDrive
* Yandex Disk

Use recognizable official-style provider icons rather than replacing them with generic Stokta icons.

External service logos may retain their recognizable branding/colors.

Example:

**[Google icon] Google Drive**
Not connected                               ›

**[Microsoft icon] Microsoft 365**
Not connected                               ›

**[Yandex icon] Yandex Disk**
Not connected                               ›

When connected, show useful state information such as:

Connected

or optionally the account identifier.

Do not create large cards for every provider.

---

# Cloud Storage Behavior

Treat integrations conceptually as **cloud storage providers**, not separate unrelated application features.

When exporting inventory or reports, use a flow such as:

**Save to cloud**

Then show available destinations:

* Google Drive
* OneDrive
* Yandex Disk

This should make the architecture easy to extend with additional providers later.

---

# ABOUT

Shrink the About section dramatically.

The current About card uses too much space.

Use something closer to:

**[Stokta icon] Stokta**
Version 1.0.0

Developer                         Demir Software ›
Privacy                                      ›
Licenses                                     ›

Do not prominently display technical framework information such as:

“Built with Expo, React Native, and WatermelonDB”

If technical information needs to remain accessible, place it inside a secondary **Technical information** screen.

---

# ONBOARDING

The current onboarding direction is good and should remain visually spacious.

Preserve:

* Stokta branding
* large central visual
* bold headline
* short descriptive text
* page indicator
* large primary action

Refine:

* vertical spacing
* illustration consistency
* typography consistency

Optionally add a subtle **Skip** action to the first two onboarding screens.

Keep onboarding simple.

Do not add additional pages unless there is a strong UX reason.

---

# COMPONENT SYSTEM

Design the application using reusable UI components.

Establish consistent components for:

* App header
* Bottom navigation
* Primary button
* Secondary button
* Icon button
* Product row
* Store row/card
* Status badge
* Settings row
* Section header
* Search field
* Dropdown
* Bottom sheet
* Modal
* Overflow menu
* Segmented control
* Report row
* Integration row
* Empty state

Maintain consistent:

* spacing
* radius
* typography
* borders
* shadows
* icon sizing
* touch targets

---

# Button Hierarchy

Reduce the number of button styles.

Use a clear system:

## Primary

Dark filled button

Use for the most important action.

Examples:

* Create store
* Generate report
* Get started

## Secondary

Outlined / light button

Use for secondary actions.

## Tertiary

Text or subtle row action

## Icon button

Compact square or circular icon action

Avoid creating new button styles for every screen.

---

# Interaction Patterns

Use modern native-mobile interaction patterns:

* bottom sheets
* contextual overflow menus
* tappable rows
* pull-to-refresh where appropriate
* clear loading states
* empty states
* confirmation for destructive actions
* accessible touch targets
* keyboard-aware forms
* safe area support

The target is both:

* iOS
* Android

Do not design this as a responsive website.

---

# Information Density

Stokta is a productivity application.

Users may have hundreds or thousands of inventory records.

Optimize screen space appropriately.

Avoid unnecessary empty space inside operational screens such as:

* Products
* Stores
* Settings
* Reports

Onboarding may remain spacious.

Operational screens should be efficient.

---

# Important UX Philosophy

Whenever deciding between adding another visual element or simplifying the interface:

**Reduce UI before adding UI.**

Prioritize:

* speed
* clarity
* discoverability
* information hierarchy
* repeat-use efficiency

Avoid:

* decorative cards
* redundant buttons
* duplicated information
* excessive navigation depth
* oversized controls
* menus for extremely common actions

---

# Final Product Architecture

The final application should follow this conceptual structure:

## Home

Inventory status and recent activity.

## Products

Search, scan, add products, manage inventory, import/export.

## Stores

Manage stores and store-specific inventory.

## Settings

Appearance, inventory display preferences, reporting, integrations, language, accessibility, and about.

This separation should be obvious from the redesigned UI.

---

# Important Functional Rules

Do not remove existing functionality shown in the screenshots.

Reorganize functionality where requested, but preserve the capabilities.

Specifically:

* Move Quick Actions away from Home.
* Put import/export actions under the Products overflow menu.
* Keep barcode scanning directly accessible on Products.
* Remove Generate Report from Home.
* Move reporting into Settings → Data & Reports.
* Show the latest 3 generated reports.
* Add Google Drive, Microsoft 365 / OneDrive, and Yandex Disk integrations.
* Treat integrations as optional.
* Use provider icons.
* Significantly shrink About.
* Expand useful UI customization.
* Simplify Settings.
* Reduce oversized cards.
* Make Products much more compact and scannable.
* Make Store cards smaller and tappable.
* Simplify the application header.
* Make bottom navigation lighter.
* Preserve Stokta's established visual identity.

---

# Deliverables

Redesign the supplied screens as a **cohesive mobile application**, not isolated mockups.

Create high-fidelity designs for:

1. Onboarding
2. Home
3. Products
4. Products overflow / inventory actions menu
5. Stores
6. Add Store
7. Settings
8. Appearance / customization settings
9. Reports
10. Recent reports states
11. Integrations
12. Cloud destination selection
13. Relevant bottom sheets / menus / dialogs

Also create reusable components and consistent design patterns that can be applied to future Stokta screens.

Where multiple screenshots represent the same screen at different scroll positions or menu states, treat them as one coherent screen and interaction flow.

The final result should look like a mature, thoughtfully designed native inventory product that developers can use as the authoritative UI reference when refactoring the existing React Native / Expo implementation.

**Do not simply beautify the current UI. Improve its information architecture, interaction design, density, and usability while preserving the Stokta brand.**
