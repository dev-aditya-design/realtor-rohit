# Rohit Real Estate — personalized concept demo

A responsive React + Vite real estate concept for **Rohit Jaat**, with a navy, champagne and gold visual identity. This is a proposal for a potential freelance client, not a confirmed paid project or verified business launch.

## Development

Use Node 24 (Vite requires Node 20.19+ or 22.12+).

```sh
npm install
npm run dev
```

For a repeatable installation use `npm ci`. Build with `npm run build`; preview the built site with `npm run preview`. Production files are in `dist/`.

## Pages and sample listings

- `/` — Home
- `/properties` — All six sample profiles with location, type, purpose and sample-budget filters
- `/properties/:id` — Individual detail pages for every sample
- `/residential` — Apartments and independent houses
- `/commercial` — Shops and commercial spaces
- `/plots-land` — Residential plots and investment land
- `/about` — Text-based introduction to Rohit
- `/contact` — Contact details and validated enquiry form

Unknown paths and unknown property IDs show a 404 page. Filters are encoded in the URL, survive reloads and can be cleared. Category pages only show their own listing types. Detail pages link to a property-specific enquiry form.

Reusable business information, sample data, filter options and WhatsApp message helpers live in `src/data.js`. The correct contact is **+91 9468130844**: call links use `tel:+919468130844` and WhatsApp links use `https://wa.me/919468130844` with URL-encoded, personalized messages.

## Enquiry behavior

The form validates name, Indian mobile number, location, budget preference, purpose and message. After validation, it offers a WhatsApp link containing the enquiry details. Editing the form invalidates that prepared link until the user reviews it again. Visitors must open WhatsApp and send the message themselves.

There is **no backend, enquiry storage, email delivery, appointment scheduling or automatic sending**. No business email or office address has been supplied or invented.

## Concept disclosures and provisional information

**Rohit Real Estate** is a temporary business name. **Rewari, Haryana** is a provisional base; Rewari, Dharuhera and Bawal are example locations, subject to confirmation. No actual property inventory or profile photograph has been supplied. Rohit is introduced using an elegant initials-based profile rather than an invented portrait.

Every property is labeled **Concept / Sample Listing**. Names, descriptions, locations, budget bands and visuals are illustrative, not verified prices, addresses, approvals, availability, ownership or representation. No dimensions, returns, testimonials, business history or credentials are claimed.

Retained home and interior photographs in `public/images/` are visual inspiration, not evidence of a local listing. Commercial profiles explicitly identify their architectural interiors as inspiration. The original retained assets' attribution and licensing should be confirmed before a public commercial launch. `plot-concept.svg` and `land-concept.svg` are original concept illustrations, not site plans or surveys. Images are local, with no runtime image CDN requirement. Typography uses Google Fonts with CSS fallbacks.

## Browser regression checks

```sh
# Once, if neither system Chromium nor a Playwright browser is installed:
npx playwright install chromium
npm test
```

The test command builds the production site and starts a local Vite preview server on port 5180. Playwright uses `/usr/bin/chromium` when available; set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` for another installed Chromium binary. Otherwise it uses its managed Chromium browser.

Checks cover navigation and 404s, all six detail pages, images, category scoping, all four filters and combinations, reload persistence, empty results, correct call and encoded WhatsApp links, property-specific enquiry context, invalid/valid forms and mobile menu behavior. Layouts and images are checked at 320, 390, 768, 1024 and 1440 pixels. Browser tests inspect links without sending messages or placing calls. Generated test reports are ignored by Git.

## Review and deployment

This standalone project is prepared for the private GitHub repository `dev-aditya-design/realtor-rohit`, with an initial commit on `main`. It contains the completed concept site without the previous project's Git history or unused images. Confirm the push status on GitHub before sharing the repository. No deployment is performed by this project setup.

When deployment is approved, import `dev-aditya-design/realtor-rohit` into Vercel and use the Vite preset (`npm run build`, output `dist`). The included `vercel.json` supplies the single-page-app fallback so React Router deep links and property pages work when opened directly. Confirm the preview with Rohit and obtain approval before promoting a deployment to production. Do not connect this repository to another client's existing Vercel project without explicit approval.

Before a business launch, confirm the business name, location, contact details, any supplied photograph and photo permissions, and replace samples with authorized, verified inventory. Connect an approved backend only if actual enquiry storage or delivery is required; update the disclosures to describe the real behavior accurately.
