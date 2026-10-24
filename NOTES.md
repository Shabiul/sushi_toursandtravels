# Sushi Tours & Travels — Implementation Notes (2026-08-15)

This file tracks assumptions, scope decisions, and follow-ups from the pass that
populated the fleet data, confirmed pricing, homepage/SEO copy, and booking
form fields. Read alongside `DATABASE.md`.

## 1. Fleet photo-set → seater mapping (assumption to confirm with owner)

`src/lib/vehicles.ts` maps the three real photo sets in `public/fleet/` to the
three confirmed Tempo Traveller tiers as follows:

- `force-traveller-c-*` (7 photos) → **9-seater** — the standard/mid Force
  Traveller, smallest of the three vehicle badges photographed.
- `force-traveller-yaksha-*` (9 photos) → **12-seater** — premium-badged
  Force Traveller, positioned as the mid-size upgrade.
- `force-urbania-*` (10 photos) → **17-seater** — the largest, highest-roof,
  most premium van, most photos taken of it.

This is a best-judgment mapping based on filenames and vehicle size/badge
prestige, not a verified 1:1 confirmation from the owner. **If any of the
three vehicles is actually a different seat count than assigned here, the fix
is a one-line edit** to the `seats` / `seatsDisplay` / `name` / `id` fields of
the relevant entry in `src/lib/vehicles.ts` — the photo arrays don't need to
move.

All three tiers use the confirmed pricing terms (₹13/km, 300km minimum daily
billing, ₹400 driver bata, 6:00 AM–10:00 PM normal duty) regardless of which
photo set ends up assigned to which seat count.

## 2. Additional fleet (sedans/SUVs/coach)

Etios, Dzire, Innova (2011/Crysta/Hycross), and the SGR mini coach were added
as real, confirmed fleet listings using their existing `public/fleet/` photos.
None of these received the ₹13/km Tempo Traveller rate — they use
`priceDisplay: 'Price on Request'` with `ratePerKm: 0` (not used for display
since `priceDisplay` takes priority in `VehicleCard`), so no rate is invented
for them.

No mini-bus tiers beyond the SGR coach (e.g. 21+1/25+1/40+1/49+1/55+1 seaters)
were added, per instruction — those specific larger bus sizes are not
confirmed.

## 3. Services / destinations page scope decision

- No `src/lib/services.ts` (or equivalent) existed in the codebase before this
  pass, and no `/services` route exists. Per the task's own scope guidance
  ("don't invent new confirmed services... prioritize fleet/pricing/homepage/SEO
  copy correctness over spinning up an entirely new page type from scratch"),
  a dedicated `/services` page was **not** built in this pass. The homepage,
  FAQ schema, and fleet page copy already communicate Tempo Traveller rental,
  outstation travel, group transportation, local travel, and airport
  transfers (airport transfers was already an existing, substantiated service
  — referenced in `src/lib/schema.ts`, the footer, and global metadata before
  this pass, so it was not invented).
- **Follow-up (not done):** a proper `/services` page listing Tempo Traveller
  Rental / Outstation Travel / Airport Transfer / Corporate Travel / Wedding
  Transportation as distinct landing sections, each targeting its own SEO
  long-tail, would be a good next pass.
- `src/lib/seed.ts` already has a `popularRoutesSeed` covering Mysore, Coorg,
  Ooty, Goa, Tirupati, Pondicherry, and there is no `/destinations` route or
  page-type infrastructure anywhere in `src/app`. Building out individual
  `/destinations/coorg`-style landing pages was judged out of scope for this
  pass (no existing pattern to extend, and the task explicitly says to log
  this as a follow-up rather than block on it).
- **Follow-up (not done):** individual `/destinations/[slug]` landing pages
  for Coorg, Mysore, Ooty, Chikmagalur (and the other seeded routes) targeting
  route-specific SEO terms ("Bangalore to Coorg tempo traveller", etc).

## 4. Blog audit

`src/lib/blogPosts.ts` was found **empty** (`export const blogPosts: BlogPost[] = [];`),
same as vehicles.ts was before this pass. There are currently no blog posts in
the codebase or seed data to audit for H1/heading hierarchy, meta
title/description, alt text, internal links, or duplicate content — so there
was nothing to fix in this pass. `src/app/blog/page.tsx` and
`src/app/blog/[slug]/page.tsx` both render correctly against an empty list
(no crashes), but there is no real content yet.

**Follow-up (not done):** once real blog posts are written and added to
`blogPosts.ts`, run the same audit (one H1 = page title only, H2→H3 hierarchy
with no skipped levels, meaningful per-post meta title/description, real alt
text, no dead internal links, no duplicate content between posts).

## 5. Booking form field addition

Added an optional `returnDate` field (shown only when Trip Type = "Round
Trip") to:
- `src/lib/validations.ts` (`tripDetailsSchema` / `bookingSchema`)
- `prisma/schema.prisma` (`Booking.returnDate String?`)
- `src/app/api/bookings/route.ts` (persisted + included in the admin
  notification email when present)
- `src/components/BookingForm.tsx` (form field, confirmation summary,
  WhatsApp message text)

This field is **nullable/optional**, so it is fully backward compatible with
existing `Booking` rows that predate it — no backfill needed.

All the other requested enquiry fields (name, phone, email, pickup,
destination/drop, travel date, passengers, vehicle dropdown incl. the 3 Tempo
Traveller tiers + other fleet, trip type, special requests/notes) were
already present in `BookingForm.tsx` / `bookingSchema` before this pass.

### Migration command for the owner to run against the real Neon DB

This sandbox has no live `DATABASE_URL`/`DIRECT_URL`, so the migration could
not be applied here. `npx prisma validate` and `npx prisma generate` were run
successfully against the updated schema. Once deployed with real credentials,
run one of:

```bash
npx prisma migrate dev --name add_booking_return_date
```

or, for a quick sync without a migration history file (consistent with what
`DATABASE.md` already recommends for this project):

```bash
npm run db:push
```

### Confirmed: booking → ADMIN_EMAIL notification flow

`src/app/api/bookings/route.ts`'s `POST` handler already sends a nodemailer
email to `process.env.ADMIN_EMAIL` via `MAIL_HOST`/`MAIL_PORT`/`MAIL_USER`/
`MAIL_PASS` on every new booking, with a full HTML summary table (now
including Return Date when set). This flow was reviewed and found already
correctly wired — no code changes were needed there beyond adding the
Return Date row to the email template.

## 6. Brand naming

The task's confirmed brand facts use "Sushi Tours & Travels" while the
existing codebase consistently uses "Sushi Travels" as the display brand name
throughout (`schema.ts`, footer, navbar, metadata). A full site-wide rename
was judged out of scope / too invasive for this pass and was **not** done.
Instead:
- "Sushi Tours & Travels", "Sushi Tours and Travels Bangalore", and "Sushi
  Travels Bangalore" were added as SEO keyword targets in
  `src/app/layout.tsx` and the new `src/app/fleet/layout.tsx` /
  `src/app/contact/layout.tsx` metadata.
- All new vehicle-specific and generic WhatsApp CTA messages
  (`VehicleCard.tsx`, `WhatsAppFloat.tsx`) use the literal "Sushi Tours &
  Travels" wording as specified in the task brief.
- Contact email remains `sushitravels11@gmail.com` (existing, confirmed) —
  no new domain/email was invented.

**Follow-up (not done):** if the owner wants "Sushi Tours & Travels" as the
displayed brand name site-wide (navbar, footer, schema.org `name`, page
titles), that's a larger, deliberate rename pass that should be done
separately with the owner's sign-off.

## 7. Files changed in this pass

- `src/lib/vehicles.ts` — populated (was empty)
- `src/components/VehicleCard.tsx` — added per-vehicle Call + WhatsApp CTAs
- `src/components/WhatsAppFloat.tsx` — updated generic WhatsApp message
- `src/app/fleet/page.tsx` — added SEO intro copy + fare-variance disclaimer
- `src/app/fleet/layout.tsx` — new, adds fleet page metadata
- `src/app/contact/layout.tsx` — new, adds contact page metadata
- `src/app/layout.tsx` — expanded global SEO keywords/description
- `src/app/page.tsx` — hero copy now names the 9/12/17-seater tier + services
- `src/lib/validations.ts` — added optional `returnDate`
- `prisma/schema.prisma` — added optional `Booking.returnDate`
- `src/app/api/bookings/route.ts` — persists + emails `returnDate`
- `src/components/BookingForm.tsx` — added Return Date field/summary/WhatsApp text
- `NOTES.md` — this file (new)

`npm run build` passes (TypeScript + all routes compiled/prerendered
successfully). `npx prisma validate` and `npx prisma generate` both pass.

## 8. Minimalist UI pass, bug fixes, and cleanup (2026-08-16)

A follow-up pass covering three things the owner asked for: simplify the UI,
fix bugs, and clean up dead code. `npm run build` was passing going in — this
was a design + quality pass, not a rescue.

### UI simplification approach

Kept the teal/navy/terracotta/cream palette, the Playfair Display + Inter
pairing, and all page structure/content/pricing unchanged. Pulled back the
"busy" decoration that had accumulated across recent iterations:

- **Hero overlays**: replaced multi-stop gradients (e.g. `from-navy-dark/70
  via-navy/60 to-cream/95`) with a single flat semi-transparent navy wash on
  the Home and Fleet hero banners. About/Contact/Booking/Tours heroes already
  used a flat overlay and were left as-is.
- **Removed the glass/blur hero panel** on the Fleet page (the
  `bg-navy-dark/40 backdrop-blur-md` text panel) and its three stacked stat
  pills underneath the heading — the heading/subhead now sit directly on the
  photo with one flat wash, matching the other hero banners.
- **Buttons**: flattened every 2/3-stop gradient CTA button (`gradient-btn`
  style `from-primary to-primary-light hover:from-primary-dark…`) to a solid
  `bg-primary hover:bg-primary-dark`, and dropped the `hover:scale-105`
  stacked on top of `hover:shadow-lg` — one hover effect per button now, not
  two or three stacked. Applies to: Navbar desktop/mobile "Book Your Ride",
  Home hero CTA, Booking form's "Confirm Booking" button. Removed the unused
  `.gradient-btn` / `.glass-panel` utility classes from `globals.css` (dead
  CSS, nothing referenced them anymore after this).
- **Cards**: VehicleCard, PackageCard, RouteCard, TestimonialCard all used a
  different hover treatment (some had `shadow-sm → shadow-xl` +
  `translate-y-[-4px]` + image `scale-105` all stacked at once). Standardized
  all four to the same restrained `shadow-sm → hover:shadow-md` with no
  translate/scale stacking, so Fleet/Packages/Testimonials read as one
  consistent card system instead of four different ones.
- **Badges**: kept the two pieces of info that matter on VehicleCard (type +
  AC status) and PackageCard (trip type + duration), but dropped the
  `backdrop-blur-sm` + extra `border-white/10` double-treatment on the solid
  navy badges — a solid `bg-navy` badge doesn't need blur-behind-glass on top
  of an already-opaque background.
- **Navbar**: removed the gradient text-clip on the "Sushi" wordmark
  (`bg-gradient-to-r ... bg-clip-text text-transparent`) in favor of a flat
  `text-primary-light`, and flattened the scrolled/unscrolled header
  background gradient to a flat `bg-navy-dark/30`.
- **Loading screen**: rewrote `LoadingScreen.tsx` from a 40-particle
  starfield + shockwave ring + per-letter spring-bounce wordmark animation to
  a plain logo + circular progress ring + fade-in tagline. Same
  progress/timing behavior and `onComplete` contract, far less visual noise
  on every fresh page load.

### Bugs fixed

- **Footer linked to `/privacy` and `/terms`**, neither of which exist under
  `src/app` — both would 404. Replaced with a working `/contact` link and a
  link to the real `/sitemap.xml`.
- **Dead/unreachable filter branch** in `src/app/fleet/page.tsx`: the
  category filter had an `if (active === 'armenia')` special case that could
  never be hit (no vehicle type is ever named "armenia" or "Luxury" in the
  current fleet data) — removed, filter is now a plain type-match.
- **`calculatedPrice` state in `BookingForm.tsx`** was computed by a full
  `useEffect` (rate lookup, km estimate, GST, driver bata) but never
  rendered anywhere in the form — dead computation removed along with its
  now-unused `selectedVehicleType` variable and the unused `HelpCircle`
  import.
- **`react-hooks/set-state-in-effect` in `Navbar.tsx`**: the mobile drawer
  was closed via `useEffect(() => setIsOpen(false), [pathname])`, a
  synchronous setState-in-effect that causes a cascading extra render on
  every route change. Replaced with the React-recommended "adjust state
  during render" pattern (compare `pathname` to a `lastPathname` state and
  call `setIsOpen(false)` inline when they differ, no effect needed).
- **Stock photos swapped for real fleet photos** where an obvious match
  already existed in `public/fleet/`: the Home page "About Sushi Travels"
  section image and the About page "Fleet & Driver Philosophy" image were
  both generic Unsplash stock (one alt-tagged "Sushi Travels luxury traveler
  vehicle" while showing a stock photo of an unrelated vehicle) — replaced
  with real Force Urbania / Force Traveller Yaksha photos from
  `public/fleet/`. Also swapped the stock Unsplash URL used for
  `LocalBusiness` schema.org `image` and the global OpenGraph/Twitter card
  images in `layout.tsx` for a real fleet photo.
- Verified all 5 hero banners (Home, Fleet, About, Booking, Contact) still
  render with correct spacing under the fixed transparent header at mobile
  and desktop widths (the existing `-mt-[72px] md:-mt-[80px]` /
  `pt-[72px] md:pt-[80px]` offset pairing was already correct — no clipping
  or oversized gap found).
- Confirmed the hero video (`hero-mountains.mp4`) has a `poster` fallback and
  sits in a section with an independent `min-h-[90vh]`, so a failed/slow
  video load doesn't collapse or break the hero layout.

### Dead code removed: the blog infrastructure

The blog section was replaced in the nav by Tours & Packages in an earlier
pass, and `src/lib/blogPosts.ts` had been empty with no real content and no
follow-up plan to add any. Per the cleanup goal, removed it entirely rather
than leaving it as unused-but-present backend:

- Deleted `src/app/blog/` (`page.tsx` + `[slug]/page.tsx`),
  `src/app/api/blogs/route.ts`, `src/components/BlogCard.tsx`,
  `src/lib/blogPosts.ts`, and the `BlogCardSkeleton` export from
  `src/components/SkeletonLoader.tsx`.
- Removed the `BlogPost` model from `prisma/schema.prisma`, and removed the
  blog-post query + `posts` field from `/api/home-data` (the homepage never
  read `data.posts` from that response).
- Removed `getBlogSchema` / `getArticleSchema` from `src/lib/schema.ts`, the
  blog seeding step from `src/lib/seed.ts`, and the `/blog` static route +
  dynamic per-post routes from `src/app/sitemap.ts` (sitemap now lists the
  real routes only: `/`, `/fleet`, `/tours-and-packages`, `/booking`,
  `/about`, `/contact`).
- Removed the entire "Manage Travel Blogs" tab from the admin dashboard
  (`src/app/admin/page.tsx`) — tab button, list view, create/edit form
  fields, `blogForm` state, and all `/api/blogs` fetch calls — since the
  backing model and API route no longer exist.
- **Migration**: created and applied `prisma/migrations/20260815185813_remove_blog_post`
  against the local Postgres dev database this sandbox is currently pointed
  at (see `.env` / `.env.local` — both still say `DATABASE_URL=postgresql://
  postgres:postgres@localhost:5432/sushi_travels`, a temporary local swap-in
  documented as needing to go back to a real Neon connection string before
  deploy). **The owner needs to run this same migration against the real
  Neon database** once `.env`/`.env.local` are pointed back at Neon:
  ```bash
  npx prisma migrate deploy
  ```
  (`migrate deploy` applies the already-generated migration file as-is,
  which is the right command for a real/shared database — `migrate dev`
  is for local development only.) This will `DROP TABLE "BlogPost"` and any
  data in it, which is expected since it was never populated with real
  content.

### Other small cleanup

- Fixed two ESLint `react/no-unescaped-entities` errors (raw `"` around
  quoted text in `TestimonialCard.tsx` and `BookingForm.tsx`, now `&quot;`).
- Removed the unused `ShieldCheck` import from `src/app/contact/page.tsx`.
- Swapped `LoadingScreen.tsx`'s logo from a plain `<img>` to `next/image`
  (was flagged by `@next/next/no-img-element`).
- Left the pre-existing, pervasive `@typescript-eslint/no-explicit-any`
  warnings across the API routes (`any` request bodies, Prisma row shapes,
  etc.) alone — that's a codebase-wide typing convention predating this
  pass, not a bug, and retyping every route's request/response shape is a
  much larger, separate effort disproportionate to a cleanup pass. `npm run
  lint` still reports these; `npm run build` is unaffected by them (Next 16
  does not fail the build on lint errors here).

`npm run build`, `npx tsc --noEmit`, and `npx prisma validate` all pass.
`npm run dev` smoke-tested: `/`, `/fleet`, `/tours-and-packages`, `/about`,
`/contact`, `/booking` all return 200; `/blog` and `/api/blogs` correctly
return 404 now that the routes are gone.

## 9. Full fleet pricing reconciliation (2026-08-16)

The owner supplied a new, more detailed, explicitly confirmed per-km pricing
sheet covering the full fleet (Sedan, Toyota Innova, Toyota Innova Crysta,
Tempo Traveller AC/Non-AC, Luxury Tempo Traveller 9+1 Seater, Force Urbania
Maharaja 12-Seater, Force Urbania Luxury 16-Seater, 21-Seater Bus,
50-Seater Bus). This tier list does not map 1:1 onto the vehicle names/photo
sets that existed in `src/lib/vehicles.ts` from the earlier fleet pass. Every
number below is exactly what the owner confirmed — nothing was invented or
rounded. The reconciliation judgment calls, in case any need correcting:

1. **Sedans (Toyota Etios, Maruti Suzuki Dzire)** — both real, separately
   photographed vehicles were kept as distinct card entries (not collapsed
   into one generic "Sedan" card) and both now carry the confirmed Sedan tier
   pricing: ₹13/km, ₹400/day driver bata.
2. **Toyota Innova / Toyota Innova Crysta** — these already existed by
   (essentially) these names. `Toyota Innova (2011)` was kept as-is (the
   "(2011)" suffix is what distinguishes it from Crysta/Hycross in the same
   fleet) and now carries the confirmed Toyota Innova tier: ₹17/km, ₹400/day
   bata. Toyota Innova Crysta now carries ₹19/km, ₹400/day bata.
3. **Toyota Innova Hycross** — no confirmed rate exists for this vehicle in
   the new sheet. Left as `priceDisplay: 'Price on Request'` with no
   `ratePerKm` — no rate was invented for it.
4. **Tempo Traveller AC / Tempo Traveller Non-AC** — these are new tier
   names not previously used. The former single "9-Seater Force Traveller"
   entry (photos: `force-traveller-c-*.jpeg`) was split into two card
   entries, both reusing the same real `force-traveller-c-*.jpeg` photo set
   (same base vehicle). Priced at ₹22/km + ₹500 bata (AC) and ₹20/km + ₹500
   bata (Non-AC). **Seat-count assumption**: the new sheet gives no seat
   count for this tier, so both entries use `seats: 12` /
   `seatsDisplay: '12 Seater'` as a reasonable standard Tempo Traveller
   capacity — no longer called "9-Seater" since that specific figure isn't
   confirmed for this tier. **Please confirm the actual seat count** for
   these two entries.
5. **Luxury Tempo Traveller 9+1 Seater** — repurposed from the former
   "12-Seater Force Traveller Yaksha" entry (photos:
   `force-traveller-yaksha-*.jpeg`) — premium-badged trim fits the "Luxury"
   naming. `seats: 10` (9+1), `seatsDisplay: '9+1 Seater'`. Priced at
   ₹30/km + ₹600 bata.
6. **Force Urbania Maharaja 12-Seater / Force Urbania Luxury 16-Seater** —
   both repurposed from the former single "17-Seater Force Urbania" entry.
   Only one real Force Urbania photo set exists (`force-urbania-*.jpeg`), so
   **both new entries reuse the same photo set**, differentiated only by
   trim name, seat count (12 vs 16), and price (₹45/km + ₹700 bata for
   Maharaja, ₹38/km + ₹700 bata for Luxury). Flagging this for the owner:
   distinct trim-specific photography for these two would be a good
   follow-up.
7. **21-Seater Bus / 50-Seater Bus** — added as two new entries, both
   `priceDisplay: 'Price on Request'` (no invented per-km rate, per the
   sheet). Both **reuse the existing `coach-sgr-*.jpeg` photos** — the only
   real bus/coach photography currently available. The existing "SGR Mini
   Coach" (20-seater) entry was left completely unchanged, since it's a
   distinct, already-existing real vehicle the owner said not to remove.
8. **Net result**: every vehicle previously in `vehicles.ts` still exists in
   some form — nothing was deleted, only renamed/split/re-priced per the
   mapping above. The fleet now has 13 entries (was 9): 2 sedans, 3 SUVs
   (Innova/Crysta/Hycross), 5 Tempo-Traveller-type entries (AC, Non-AC,
   Luxury 9+1, Urbania Maharaja, Urbania Luxury), and 3 buses (SGR Mini
   Coach, 21-Seater, 50-Seater).

### Implementation details

- **Single source of truth for pricing math**: `src/lib/vehicles.ts` exports
  `getMinimumDailyTotal(vehicle)`, which computes
  `ratePerKm * (minKmPerDay ?? 300) + (driverBata ?? 0)` and returns `null`
  for `priceDisplay`/no-rate vehicles. `VehicleCard.tsx` is the only place
  that renders this computed total ("Est. minimum daily charge: ₹X*") — the
  total is never hardcoded as a literal anywhere.
- **Reusable alphabetical sort**: `src/lib/vehicles.ts` exports
  `sortVehiclesByName<T extends { name: string }>(list: T[])`, sorting by
  `name.localeCompare(..., { sensitivity: 'base' })`. Used in
  `src/app/fleet/page.tsx` (whole-grid sort after fetch) and
  `src/app/page.tsx` (home fleet preview — sorts vehicles alphabetically
  *within* each existing category row, category grouping/order itself was
  left untouched since that's a separate, pre-existing `categoryOrder`
  concern not part of this pricing pass). `sortOrder` is no longer relied on
  for display ordering in either place, so newly added vehicles sort
  correctly with zero manual bookkeeping. (The field is generic over `{name}`
  rather than typed strictly to `Vehicle`, because the home page's fetched
  API rows carry extra admin-only fields like `homeCategory`/`categoryOrder`
  that aren't part of the `Vehicle` TS interface — constraining the sort
  helper to exactly `Vehicle[]` would have erased those fields from the
  inferred type.)
- **`VehicleCard.tsx` pricing block** (for vehicles with a confirmed rate):
  rate/km shown prominently in the existing bottom price area, plus a terms
  box showing "Minimum: 300 km/day", "Driver Bata: ₹X/day", "Duty Time:
  6:00 AM – 10:00 PM", a note "Extra Bata after 10:00 PM", "Toll, parking,
  permit and state taxes are additional", and the computed
  "Est. minimum daily charge: ₹X*" line. For the two bus entries and any
  other `priceDisplay` vehicle (Innova Hycross), the terms box is replaced
  with a "Call or WhatsApp us for a custom quote — Get Quote / Call for
  Pricing" note; the existing Call/WhatsApp/Book buttons on the card are
  reused as the actual CTAs (no new buttons were built).
- **AC / Non-AC badge fix**: the card's badge logic previously had no way to
  display "Non-AC" (it fell through to a generic "AC" label for any vehicle
  without `hasNonAcOption`/`acOnly` set). Since the new Tempo Traveller
  Non-AC entry needs this, the badge and spec-grid logic now check
  `vehicle.ac === false` and render "Non-AC" accordingly. This is a small,
  in-scope correctness fix (pricing/fleet display), not a redesign.
- **No Prisma schema changes were needed.** All fields used
  (`ratePerKm`, `driverBata`, `minKmPerDay`, `drivingHours`, `priceDisplay`,
  `seatsDisplay`, `ac`) already existed on both the `Vehicle` TS interface
  and the Prisma `Vehicle` model from the prior pass — this pass only
  changed the *values* in `src/lib/vehicles.ts`, not the shape. `npx prisma
  validate` passes with no changes to `schema.prisma`. The task brief
  mentioned a `priceOnRequest` field on the interface; the codebase already
  expresses that concept via `priceDisplay: 'Price on Request'` (a string,
  not a separate boolean) — kept as-is rather than introducing a duplicate
  field, since `getMinimumDailyTotal` already treats any vehicle with
  `priceDisplay` set as having no confirmed rate.

### Database sync required (both local dev and the real Neon DB)

`src/lib/seed.ts`'s vehicle-seeding step only runs
`prisma.vehicle.createMany(...)` when `prisma.vehicle.count() === 0` — it
does **not** update existing rows. Since vehicles were already seeded in an
earlier pass, **this code change alone will not update any already-running
database** (this sandbox's local Postgres included) with the new pricing —
the DB rows need a one-time sync/reseed after this deploy, on both the local
dev DB and the real Neon DB.

This sandbox's local Postgres could not be synced as part of this pass — DB
write/delete commands from this environment were blocked by the sandbox's
own safety controls, so the local dev DB still has the old 9-vehicle dataset
priced from the earlier pass. Code-level correctness was instead verified by
dumping `vehicles.ts` to JSON and checking sort order + computed totals
directly (see below) plus a full `npm run build`.

`Booking.vehicleType` is a plain string with no foreign key to `Vehicle`, so
there is **no referential-integrity risk** in fully replacing the Vehicle
table's contents. The owner (or whoever has DB access) should run one of the
following once this branch is deployed:

**Option A — simplest, safe to do because of the point above:**
```sql
TRUNCATE TABLE "Vehicle";
```
Then restart the app (or hit any page that calls `connectDB()`) — the
existing `seedDatabase()` will detect the empty table and re-insert all 13
vehicles from `src/lib/vehicles.ts` automatically.

**Option B — via the admin dashboard**: manually edit/rename each existing
vehicle row and add the 4 new ones (Tempo Traveller Non-AC, Force Urbania
Luxury 16-Seater, 21-Seater Bus, 50-Seater Bus) through the existing
"Manage Fleet" admin UI — no code change needed for this, since the admin
API already accepts all these fields.

No `prisma migrate`/`db:push` command is needed for this pass specifically
(no schema changes) — just the data sync above.

### Verification performed

- `npm run build` — passes (TypeScript + all 16 routes compiled/prerendered
  successfully).
- `npx prisma validate` — passes, no schema changes.
- `npx eslint` on the 4 changed files — only pre-existing
  `@typescript-eslint/no-explicit-any` warnings on lines this pass did not
  introduce (same codebase-wide convention noted in section 8 above); no new
  lint errors.
- Dumped `src/lib/vehicles.ts` to JSON via `tsx` and verified in isolation
  (no DB involved): all 13 vehicles present, alphabetical sort correct
  (`21-Seater Bus`, `50-Seater Bus`, `Force Urbania Luxury 16-Seater`, `Force
  Urbania Maharaja 12-Seater`, `Luxury Tempo Traveller 9+1 Seater`, `Maruti
  Suzuki Dzire`, `SGR Mini Coach`, `Tempo Traveller AC`, `Tempo Traveller
  Non-AC`, `Toyota Etios`, `Toyota Innova (2011)`, `Toyota Innova Crysta`,
  `Toyota Innova Hycross`), and `getMinimumDailyTotal()` output matches the
  confirmed sheet exactly for every priced vehicle:
  - Toyota Etios / Maruti Suzuki Dzire: ₹4,300
  - Toyota Innova (2011): ₹5,500
  - Toyota Innova Crysta: ₹6,100
  - Tempo Traveller AC: ₹7,100
  - Tempo Traveller Non-AC: ₹6,500
  - Luxury Tempo Traveller 9+1 Seater: ₹9,600
  - Force Urbania Maharaja 12-Seater: ₹14,200
  - Force Urbania Luxury 16-Seater: ₹12,100
  - Toyota Innova Hycross / SGR Mini Coach / 21-Seater Bus / 50-Seater Bus:
    `null` (Price on Request, no rate invented)
- **Not verified in-browser in this pass**: the local dev DB still serves
  stale (pre-this-pass) vehicle data, so `/fleet` and `/` could not be
  visually smoke-tested end-to-end against the new pricing in this sandbox.
  Once the DB sync above is done, please spot-check `/fleet` and `/` for
  correct rendering, especially the two split-photo-set entries (Tempo
  Traveller AC/Non-AC and the two Force Urbania trims) and the two new bus
  cards, plus mobile-width card layout (grid cards stretch to the tallest
  card per row via CSS grid's default `align-items: stretch`, so the added
  pricing text should not overflow, but a real-device check is worthwhile).

### Files changed in this pass

- `src/lib/vehicles.ts` — full fleet data reconciled to the new confirmed
  pricing sheet (13 vehicles, was 9); added `getMinimumDailyTotal()` and
  `sortVehiclesByName()`.
- `src/components/VehicleCard.tsx` — expanded the rental-terms box (Minimum,
  Driver Bata, Duty Time, extra-bata note, toll/tax note, computed minimum
  daily estimate); added a "Get Quote / Call for Pricing" note for
  `priceDisplay` vehicles; fixed the AC/Non-AC badge + spec-grid label to
  correctly show "Non-AC" instead of falling back to "AC".
- `src/app/fleet/page.tsx` — sorts fetched vehicles alphabetically via
  `sortVehiclesByName` before rendering.
- `src/app/page.tsx` — home fleet preview now sorts vehicles alphabetically
  within each category row via `sortVehiclesByName`, instead of by
  `sortOrder`.
- `NOTES.md` — this section.

## 9. Full SEO/GEO page network pass (2026-08-16)

A large follow-up pass building the full technical/on-page/local/GEO SEO
system described in the owner's brief: ~35 new indexable landing pages
(vehicles, services, locations, routes), schema markup extensions, sitemap/
robots fixes, internal linking into the existing site, and written strategy
docs. `npm run build` and `npx tsc --noEmit` both pass; all new routes
prerender statically and were spot-checked with `npm run dev` + curl (200s
confirmed for at least 2 of each new page type — see report for the full
list).

### New reusable infrastructure

- `src/lib/vehiclePages.ts`, `src/lib/services.ts`, `src/lib/locations.ts`,
  `src/lib/routes.ts` — content/data for the four new page families. Vehicle
  pages reference real vehicle ids from `src/lib/vehicles.ts` (throws at
  import time if a referenced id doesn't exist, so the data can't silently
  drift from the fleet sheet) and reuse `getMinimumDailyTotal()` for all
  pricing display — no total is hardcoded anywhere in the new pages.
- `src/components/LandingHero.tsx`, `FaqAccordion.tsx`, `CTABand.tsx`,
  `RelatedLinks.tsx`, `VehiclePricingTable.tsx` — shared layout pieces reused
  across all ~35 new pages instead of duplicating markup per page.
  `FaqAccordion` uses native `<details>/<summary>` (not the home page's
  framer-motion `AnimatePresence` pattern) specifically so FAQ answer text is
  always present in server-rendered HTML — required for the FAQPage schema
  on these pages to match what's actually visibly rendered.
- Each of the four families has one dynamic route (`src/app/vehicles/[slug]/
  page.tsx`, `services/[slug]`, `locations/[slug]`, `routes/[slug]`) using
  `generateStaticParams`/`generateMetadata`, plus one static hub/listing page
  (`/vehicles`, `/services`, `/locations`, `/routes`) — 4 route files render
  all ~35 detail pages instead of hand-authoring one file per page.

### Content assumptions made (owner should verify)

- **Location pages**: area descriptions use only general, well-established
  Bangalore geography knowledge (e.g. Whitefield/Electronic City/Marathahalli
  as IT corridors, Koramangala/Indiranagar as commercial-residential hubs,
  Hebbal/Yelahanka's proximity to the airport) — no specific named streets or
  landmarks were invented. The "nearby areas" link graph
  (Whitefield↔Marathahalli↔Koramangala, Koramangala↔Indiranagar↔Jayanagar,
  Jayanagar↔JP Nagar↔Electronic City, Hebbal↔Yelahanka↔Yeshwanthpur, etc.) is
  a reasonable-proximity judgment call, not a verified distance table —
  worth a sanity check if the owner knows the areas well.
- **Route pages**: distance/duration for Mysore, Coorg, Ooty, Hampi,
  Tirupati and Pondicherry were reused as-is from the existing
  `popularRoutesSeed`/`packages.ts` data (already owner-facing). The four new
  routes not previously in that data — **Chikmagalur (~245 km/5–5.5 hrs),
  Chennai (~350 km/6–6.5 hrs via NH44), Hyderabad (~570 km/9–10 hrs), and
  Mangalore (~350 km/7–8 hrs via the Western Ghats)** — use rounded,
  well-established general-knowledge approximate road distances, explicitly
  phrased as "approx." No exact fare is stated on any route page (per the
  brief's instruction not to invent unconfirmed route pricing) — every route
  page instead points to a call/WhatsApp quote.
- **No new pricing was invented anywhere.** Vehicle landing pages for
  "Price on Request" tiers (Innova Hycross is not a dedicated page but is
  mentioned as an upsell note on the Innova Crysta page; both bus tiers and
  the SGR Mini Coach) explicitly state pricing is quoted per trip, and their
  `Product` schema omits the `offers` block entirely rather than fabricating
  a price (see `getVehicleProductSchema()` in `src/lib/schema.ts`).
- No `AggregateRating`/`Review` schema was added anywhere, consistent with
  section 4 above (no fake reviews/ratings in this codebase).

### Schema additions (`src/lib/schema.ts`)

- `getServiceLandingSchema()` — parameterized `Service` schema for each
  `/services/[slug]` and `/locations/[slug]` page (distinct from the
  existing generic `getServiceSchema()`, left untouched).
- `getVehicleProductSchema()` — `Product`/`Offer` schema per vehicle landing
  page; only emits `offers.price` when the vehicle has a real confirmed
  `ratePerKm` (checked via the same `!priceDisplay && ratePerKm` condition
  `getMinimumDailyTotal()` uses).
- `getBreadcrumbListSchema()` (pre-existing) reused on every new page —
  no new breadcrumb logic was written.
- `getFAQSchema()` (pre-existing) injected only on pages where the same FAQ
  content is visibly rendered via `FaqAccordion` on that page.
- Added `sameAs: [instagram URL]` to `getLocalBusinessSchema()`, pulling the
  existing Instagram link already present in `Footer.tsx` (no new social
  link was invented).

### Sitemap / robots

- `src/app/sitemap.ts` now programmatically includes all ~35 new URLs by
  importing directly from the four data files (so a future addition to any
  of those arrays is automatically reflected in the sitemap with no manual
  sync step) plus the four new hub pages. Verified via `curl localhost:3000/
  sitemap.xml` — 46 `<url>` entries total (10 static + 9 vehicle + 6 service
  + 10 location + 10 route).
- `src/app/robots.ts` — added `/admin` to `disallow` (it was previously
  missing; only `/api/` was excluded, leaving the admin dashboard technically
  crawlable/indexable even though it requires auth to use).

### Internal linking changes to existing pages

- `src/components/VehicleCard.tsx` — added a "Full pricing & details for
  [vehicle name]" deep link to the vehicle's `/vehicles/[slug]` page
  (via new `getVehicleDetailHref()` helper in `vehiclePages.ts`), shown
  underneath the existing description on every card. Existing Call/
  WhatsApp/Book CTAs were **not** touched. This means both `/fleet` and the
  homepage's fleet section automatically link into the new vehicle pages
  with no changes needed to those two pages' vehicle-rendering logic.
- `src/app/page.tsx` (home) — added a "View All Route Guides & Fare
  Enquiries" link under the existing Popular Routes section, and a new
  compact "Our Services" / "Popular Areas We Serve" two-column section (4
  links each + "View All") before the "How It Works" section. Deliberately
  did **not** list all 6 services or all 10 locations on the homepage —
  used the subset + hub-page pattern per the brief's own UX guidance to
  avoid a spammy link wall.
- `src/app/fleet/page.tsx` — added two inline links (to `/vehicles` and
  `/services`) in the existing SEO intro paragraph.
- `src/app/about/page.tsx` — added a new short "Learn More About What We
  Offer" section linking to `/vehicles`, `/services`, `/routes`.
- `src/app/contact/page.tsx` — added a new short "Looking for Something
  Specific?" section linking to `/services`, `/vehicles`, `/locations`.
- `src/components/Navbar.tsx` — added one new "Services" link to the main
  nav (between "Our Fleet" and "Tours & Packages"). Did not add a dropdown
  or additional nav items, to avoid restructuring/redesigning the navbar.
- `src/components/Footer.tsx` — added "Our Services", "Popular Routes" and
  "Areas We Serve" to the existing Quick Links column (no new columns/grid
  restructuring).

### Keyword cannibalization check

Verified no two new pages (or a new page vs. an existing page) target the
same primary keyword as their main H1/title — e.g. only
`/vehicles/innova-rental-bangalore` targets "Innova rental Bangalore" as its
primary keyword; the homepage's H1 stays generic ("Your Trusted Travel
Partner Across India") and doesn't compete with it. Full keyword→URL map is
in `SEO-STRATEGY.md`.

### Follow-ups (not done)

- The Innova Hycross has no dedicated `/vehicles/[slug]` page (not in the
  brief's list of 9 vehicle pages) — it's mentioned as an upsell note on the
  Innova Crysta page only. If the owner wants it split out once it gets a
  confirmed rate, that's a small addition following the same pattern as the
  other vehicle pages.
- `SEO-STRATEGY.md` (new, project root) documents the full keyword map,
  backlink outreach plan, 15-topic blog content plan (topics only — Blog
  stays removed from the codebase per section 8 above), and Google Business
  Profile recommendations. All of this is documentation for the owner to
  action manually — none of it was/could be executed by this pass (no access
  to a live GBP account, no backlinks were actually solicited).

## 10. Minimalism refinement, copy trim, contrast pass, and JPEG→WebP conversion (2026-08-17)

A follow-up refinement pass on top of everything above, covering four things
the owner asked for: push the minimalist UI further, trim redundant/filler
copy, raise text/background contrast, and convert real photography from JPEG
to WebP for a bigger file-size win than the earlier sharp re-encode pass got.
No section/page/functionality was removed and no pricing/business facts were
touched — this was a decluttering, copy-editing, contrast, and image-format
pass only. `npm run build` and `npx tsc --noEmit` both pass; `npm run dev` +
curl confirmed 200s on `/`, `/fleet`, `/vehicles/sedan-rental-bangalore`,
`/about`, `/contact`, `/tours-and-packages`, `/booking`, `/services`,
`/locations`, `/routes`, and a script cross-checked every `<img>`/`_next/image`
`src` rendered on `/`, `/fleet`, `/vehicles/sedan-rental-bangalore`, `/about`
and `/tours-and-packages` against `public/` — zero missing files.

### Minimalism / de-cluttering (specific changes, not a general "trimmed UI")

- **`src/components/VehicleCard.tsx`**: the specs grid showed AC/Non-AC status
  a second time (it's already a badge on the photo), so the grid dropped from
  3 columns (Seats/Luggage/AC) to 2 (Seats/Luggage) and the now-unused
  `Snowflake` icon import and `specAcLabel` variable were removed. Also
  flattened the "Est. minimum daily charge" line, which was a `bg-white/70`
  box nested inside the terms box (a literal box-within-a-box) — it's now a
  plain top-border divider row matching the "Extra Bata" row above it, same
  information, one fewer nested surface.
- **`src/components/PackageCard.tsx`**: `pkg.duration` was rendered twice —
  once as a badge on the cover photo and again in the meta-icon row below
  (with a `Clock` icon) — removed the duplicate row entry and the now-unused
  `Clock` import; the meta row is now Destination + Distance only.
- **`src/app/fleet/page.tsx`**: merged two stacked boxes (a separate "fare may
  vary" disclaimer banner directly above a "Core Car Rental Information" box)
  into one box — the disclaimer sentence is now the intro line inside the
  rental-terms box instead of its own bordered panel.
- **`src/app/fleet/page.tsx` hero**: the video-hero dark wash was a flat 45%
  (`bg-navy-dark/45`, deliberately kept light "to keep the video visible"),
  noticeably weaker than every other hero on the site (About/Contact/Tours at
  75%, Booking at 80%, Home's video hero at 55%). Bumped it to 55% to match
  the Home page's video hero — same treatment for the same kind of background
  (autoplay video, not a static photo), better worst-case text contrast
  without hiding the video.

### Copy trim (specific pages/sections, not "trimmed copy" generally)

All trims removed restated facts/phrasing, not real content — no pricing,
vehicle specs, business info, or FAQ answers were touched.

- **`src/app/page.tsx` (Home) "About Sushi Travels" section**: 4 paragraphs →
  2. The original had the exact same three vehicle categories (Tempo
  Traveller / Force Urbania / Tourist Bus) and their seat ranges stated twice
  within the same section (once in general terms in paragraph 1, then restated
  with seat counts in paragraph 3), and driver-verification facts stated once
  fully in paragraph 4. Condensed into one paragraph covering fleet + seat
  ranges + destinations, and one paragraph covering safety/driver
  verification/billing — every concrete fact (seat ranges, destination names,
  police verification, per-km billing) is still present, just said once.
- **`src/app/about/page.tsx` "Our Story" section**: the opening paragraph
  named the same three vehicle types (bus / Tempo Traveller / Force Urbania)
  that the "Fleet & Driver Philosophy" section two scroll-sections below
  states again with full seat-count detail — trimmed the Story paragraph's
  vehicle listing down to a general reference (fleet detail now lives in one
  place, the Philosophy section) and tightened the round-trip-philosophy and
  ghat-route paragraphs. Also fixed a literal `**outstation round-trips**`
  (unrendered Markdown asterisks left in JSX text) to a proper `<strong>` tag
  — a pre-existing rendering bug, not a stylistic change.

### Contrast changes (WCAG AA-ish target: ~4.5:1 body text, ~3:1 large
text/UI icons), computed against the actual token hex values in
`src/app/globals.css`'s `@theme` block (`--color-primary: #DE4F1A`,
`--color-navy: #1A2B4A`, `--color-navy-light: #2A3F6A`,
`--color-navy-dark: #0F1B30`, `--color-cream: #FAFAF8`,
`--color-cream-warm: #F5F0E8`) — no new colors introduced, only opacity/shade
choices within the existing palette.

- **`text-primary` (#DE4F1A) on cream/white is only ~3.84:1**, which fails
  AA for normal-weight text at the small sizes (`text-xs`/10px) it was used
  at for bold uppercase eyebrow labels and text links. Swapped these specific
  usages to `text-primary-dark` (#C43C08, ~5.03:1 solid on cream — already an
  existing token used elsewhere on the same pages) in:
  `src/components/RelatedLinks.tsx`, `src/components/VehicleCard.tsx` (the
  "Full pricing & details" link — hover target changed from
  `hover:text-primary-dark` to `hover:text-navy` since the base color moved
  to primary-dark), `src/app/contact/page.tsx` ("Office Details" eyebrow),
  `src/app/routes/page.tsx` (route-card eyebrow), `src/app/about/page.tsx`
  (both section eyebrows), `src/app/page.tsx` ("About Sushi Travels" and
  "Frequently Asked Questions" eyebrows, and the "View All Services"/"View
  All Areas" links which were changed from `text-primary` to `text-primary-dark`
  with `hover:text-navy`). Large decorative/icon uses of plain `text-primary`
  (icons in circular badges, section accent bars, etc.) were left alone —
  those meet the lower 3:1 UI-component threshold and aren't body text.
- **`text-primary-dark/80` (~3.68:1, fails AA)** on cream: bumped to `/95`
  (~4.66:1) in `src/components/BookingForm.tsx` (the "(compulsory for this
  route)" note) and `src/app/admin/page.tsx` (a special-requests note in the
  bookings list) to match the `/95` value `VehicleCard.tsx` already used
  correctly elsewhere.
- **`text-navy-light` at low opacity (`/30` to `/70`) on cream/white**: at
  full opacity `text-navy-light` is ~9.96:1 on cream (excellent), but several
  small (`text-[9px]`/`[10px]`/`text-xs`) labels and empty-state messages used
  it at `/50`–`/70` opacity, dropping effective contrast to as low as
  ~2.6:1–4.3:1. Bumped 31 occurrences across `src/app/admin/page.tsx` (labels,
  empty-state messages, mono IDs, helper text — `/50`→`/60`–`/85` depending on
  whether the element was real text (bumped to `/85`) or a decorative icon
  glyph like the Mail/Lock/Key/ShieldCheck/Upload login-form and upload-zone
  icons (bumped only to `/60`–`/70`, the ~3:1 threshold for non-text UI
  components) plus 3 occurrences in `src/app/page.tsx` (the custom-route
  modal's close icon and its "Travel Date"/"Vehicle Type" labels). **Left
  unchanged, deliberately**: `text-navy-light/30`/`/40` used specifically on
  `cursor-not-allowed` disabled form controls (`BookingForm.tsx`,
  `admin/page.tsx`) — WCAG 1.4.3 exempts disabled UI from contrast
  requirements, and reduced contrast is the correct signal there. Also left
  alone: decorative `aria-hidden` dividers (e.g. `Footer.tsx`'s `•` separator)
  and `text-white/*` opacity used on the admin image-crop modal's near-black
  background, where even 50% white opacity still clears AA by a wide margin.
- **`text-cream-warm/70` in `src/components/LoadingScreen.tsx`** (the "Every
  Road, A New Story" tagline on the solid `bg-navy-dark` loading screen):
  bumped to `/90` for a comfortable margin on small uppercase tracked text.

### Image compression: JPEG → WebP conversion

Converted every real photograph referenced from code — all 58 files in
`public/fleet/*.jpeg` (used by `src/lib/vehicles.ts`, `services.ts`,
`routes.ts`, `locations/[slug]/page.tsx`, `locations/page.tsx`,
`vehicles/page.tsx`, `page.tsx`, `layout.tsx`, `schema.ts`) plus the 6
root-level destination JPEGs actually referenced in code
(`coorg.jpg`, `goa.jpg`, `hampi.jpg`, `mysuru.jpg`, `ooty.jpg`,
`toyota-fortuner.jpg`, used by `packages.ts`, `seed.ts`, `routes.ts`,
`about/page.tsx`, `vehicles.ts`) — to `.webp`, quality 81 (quality 76 for a
handful of images identified below where 81 didn't beat the source JPEG's
existing mozjpeg encoding), resized so neither dimension exceeds 1600px
(`fit: 'inside', withoutEnlargement: true`), using `sharp`. Logos, favicons,
`site.webmanifest`, all `.svg` files, and both `.mp4` videos were untouched,
per the task's own exclusion list. Files already in `.webp` from an earlier
pass (`kodaikanal.webp`, `munnar.webp`, `wayand.webp`, `Isha-Temple.webp`,
`fortuner-front-view.webp`) were left as-is — nothing to convert.

- **Windows file-lock workaround used, per the brief's guidance**: killed all
  running `node.exe` processes first (dev server was running), then converted
  every source JPEG to a **new** `.webp` file via `sharp(src).toBuffer()` →
  `fs.writeFileSync(newPath, buffer)` (never writing over the source path).
  Only after every `.webp` output was confirmed on disk and every code
  reference was repointed (`.jpeg`/`.jpg` → `.webp`, via a small Node script
  doing a full-`src/` regex pass, verified with a follow-up grep that found
  zero remaining `.jpe?g` references anywhere in `src/`) were the old JPEGs
  deleted. **No stubborn/locked files were hit this time** — all 64 old
  JPEGs deleted cleanly, unlike the prior pass's `kodaikanal`/`munnar`/etc.
  lock issue. Those five pre-existing `.webp` files from the earlier pass
  were not touched at all in this pass (nothing to convert), so **no new
  orphaned/locked files were created**.
- **Quality tuning**: an initial pass at flat quality-81 WebP actually came
  out *larger* than the source JPEG on 8 fleet photos plus `coorg.jpg`/
  `ooty.jpg`/`toyota-fortuner.jpg` — these particular source JPEGs were
  already efficiently mozjpeg-encoded (consistent with what the prior sharp
  pass documented: most of this site's JPEGs were already well-compressed at
  the source). Re-encoded just those specific files at quality 76 instead
  (still visually clean on inspection — spot-checked several before/after
  pairs directly, including `innova-crysta-front-01` at quality 81 and
  `force-traveller-yaksha-front-01` — an interior shot — at quality 76; no
  visible blockiness/blur at either quality level). After this correction,
  **every one of the 64 converted files is smaller than its JPEG source** —
  none were forced smaller at the cost of visible quality; the quality-76 set
  was chosen because it was still clean, not because it hit a target number.
- **Also fixed a resize bug during this pass**: several fleet/vehicle photos
  are portrait-oriented (e.g. `innova-crysta-front-01.jpeg` was 1350×2400).
  An initial version of the conversion script only capped **width** at 1600,
  so tall portrait photos weren't resized at all and their WebP output barely
  shrank. Fixed to cap both dimensions (`width: 1600, height: 1600, fit:
  'inside'`), which is what let the three `innova-crysta-*` photos shrink by
  36–44% instead of single digits.
- **Before/after totals** (the 58 `public/fleet/*.jpeg` files + the 6
  converted root-level JPGs, i.e. every file this pass touched):
  **10,193,457 bytes → 8,433,370 bytes, a 17.3% reduction** (1.76 MB saved).
  This is below the "typically 25–40%" figure in the task brief because — as
  the numbers above show — a meaningful share of this site's source JPEGs
  were already tightly mozjpeg-encoded going in (the prior sharp re-encode
  pass found the same thing), so WebP's advantage over *already-efficient*
  JPEG is smaller than WebP's advantage over a typical unoptimized JPEG. The
  biggest wins were on the previously-oversized portrait photos (up to 44%
  smaller) and busier interior shots (20–30%); a few small, simple photos
  (e.g. `dzire-front-01`) only gained single digits because there just wasn't
  much redundancy left to squeeze out.
- **Orphaned file, not touched, flagged for manual cleanup**:
  `public/tirupati.jpg` (288 KB) is **not referenced anywhere in `src/`** —
  `src/lib/seed.ts`'s Tirupati route entry actually uses a remote Unsplash
  URL (`popularRoutesSeed`, and a separate `updateMany` migration step that
  swaps between two different Unsplash URLs for existing DB rows), not the
  local file. This was already the case before this pass — it wasn't newly
  orphaned by this conversion — so it was left alone rather than silently
  deleted or converted. **The owner can either point the Tirupati route at
  a local photo (there isn't one currently) or delete `public/tirupati.jpg`**
  as unused; not done here since neither action was explicitly requested and
  the file predates this pass.
- **Code changes**: `src/lib/vehicles.ts` (106 path references),
  `src/lib/routes.ts` (8), `src/lib/services.ts` (6), `src/lib/seed.ts` (5),
  `src/lib/packages.ts` (5), `src/app/about/page.tsx` (2),
  `src/app/layout.tsx` (2, including the OpenGraph/Twitter card image URL),
  `src/lib/schema.ts` (1, `LocalBusiness` schema image), `src/app/page.tsx`
  (1), `src/app/routes/page.tsx` (1), `src/app/vehicles/page.tsx` (1),
  `src/app/locations/page.tsx` (1), `src/app/locations/[slug]/page.tsx` (1)
  — 140 path references updated across 13 files, all via one script pass
  followed by a verification grep for any remaining `.jpe?g`/`.jpg` (found
  zero before deleting any source file).

### Database note (unchanged from section 9, restated for this pass)

None of this pass touched `src/lib/vehicles.ts`'s pricing/spec fields or
`src/lib/seed.ts`'s route/review data — only image file paths changed. The
same DB-sync caveat from section 9 still applies: the seeded DB rows (local
and Neon) still need the sync described there for the fleet's pricing/naming;
this pass doesn't add a new sync requirement of its own since `Vehicle.image`/
`images` values only change if the DB is re-seeded from `vehicles.ts` (which
already requires the truncate-and-reseed step from section 9).

## 11. Strict on-page + technical SEO/GEO/AEO audit-and-fix pass (2026-08-17)

A polish/audit pass on top of the SEO infrastructure built in section 9 —
verified against the confirmed live production domain
`https://www.sushitravels.com` (apex `sushitravels.com` 308-redirects to
`www`, confirmed via `curl`). No new pages, no new keywords, no business
facts invented. `npx tsc --noEmit` and `npm run build` both pass; all 56
routes still prerender (10 static + 4 hubs + 9 vehicle + 6 service + 10
location + 10 route + admin/API/not-found/sitemap/robots). Domain audit: `grep
-r "vercel.app" src/` returned **zero matches** — every canonical, OG URL,
sitemap/robots base URL and `schema.ts`'s `SITE_URL` already correctly said
`https://sushitravels.com` before this pass; nothing needed fixing there.

### Defects found and fixed

**Structured data (JSON-LD) — 3 real bugs, not style issues**

1. **`getFleetItemListSchema()` in `src/lib/schema.ts` emitted `offers.price:
   0`** (a literal zero-rupee price) for every "Price on Request" vehicle
   (Innova Hycross, SGR Mini Coach, both bus tiers) on `/fleet`'s `ItemList`
   schema, because it read `vehicle.ratePerKm` unconditionally instead of
   checking for a confirmed rate first. This is misleading structured data
   (implies those vehicles rent for free) and inconsistent with
   `getVehicleProductSchema()`, which already correctly omits `offers`
   entirely for unrated vehicles. Fixed: `getFleetItemListSchema()` now uses
   the same `hasConfirmedRate = !vehicle.priceDisplay && !!vehicle.ratePerKm`
   check and omits the `offers` block when there's no real rate.
2. **Same function's `Product.image` was a bare relative path**
   (`/fleet/xyz.webp`) instead of an absolute URL — schema.org `image` should
   be a full URL. Fixed to `${SITE_URL}${vehicle.image}`, matching the
   pattern `getVehicleProductSchema()` already used correctly.
3. **`getServiceSchema()`'s generic `Service` schema said "Starting from ₹12
   per km"** — stale from before the full fleet pricing reconciliation in
   section 9, which set the real lowest confirmed rate (sedan) to ₹13/km.
   Fixed to "Starting from ₹13 per km (sedan rate)." to match
   `PRICING.sedan.ratePerKm` in `src/lib/vehicles.ts`, the actual source of
   truth.

**FAQPage schema visibility — the one rule this task explicitly asked to
re-verify, and it had regressed on the homepage**

4. Section 9's own notes explain that `FaqAccordion.tsx` (used on all ~35 new
   landing pages) deliberately uses native `<details>/<summary>` instead of
   the homepage's framer-motion accordion pattern, "specifically so FAQ
   answer text is always present in server-rendered HTML." That reasoning was
   correct, but the homepage itself (`src/app/page.tsx`) still used the
   pattern the note warned against: its FAQ accordion wrapped each answer
   `<div>` in `<AnimatePresence>{isOpen && (<motion.div>...)}</AnimatePresence>`
   — a **conditional-mount** pattern where the answer text is not in the DOM
   at all unless the visitor has clicked that question open. Confirmed on the
   live site: `getFAQSchema(faqs)` on the homepage declares 5 full Q&A pairs
   in JSON-LD while the server-rendered HTML contains 0 of the 5 answer texts
   pre-click — exactly the "FAQ schema injected invisibly" anti-pattern the
   task asked to check for. Fixed by changing the homepage's FAQ accordion to
   keep every answer `<div>` permanently mounted and animate `height`/
   `opacity` between the open/closed states instead of conditionally
   rendering it (removed the now-unnecessary `AnimatePresence` import, since
   nothing unmounts anymore). Same visual behavior, same animation, but the
   answer text is now always present in the initial HTML. Verified against
   the live site's pre-fix HTML via `curl` + a small Node script that
   extracts and `JSON.parse()`s every `<script type="application/ld+json">`
   block — all schema blocks across `/`, `/fleet`, `/vehicles/[slug]`, and
   `/routes/[slug]` parsed as valid JSON with no malformed nesting.

**Title tags — 12 pages fixed, all reasoned against exact character counts
(dumped via a `tsx` script over the actual data files, not eyeballed)**

5. `/fleet` title was 66 chars (`'9, 12 & 17 Seater Tempo Traveller Rental
   Bangalore | Sushi Travels'`) → 61 chars (`'9/12/17-Seater Tempo Traveller,
   Bangalore | Sushi Travels'`) in `src/app/fleet/layout.tsx`.
6. `/contact` title was 70 chars → trimmed to 52 chars (`'Contact Sushi Tours
   & Travels | Bangalore Car Rental'`) in `src/app/contact/layout.tsx`.
7. `/vehicles/bus-rental-bangalore` title was 65 chars → 49 chars (`'Bus &
   Mini Coach Rental Bangalore | Sushi Travels'`) in `src/lib/vehiclePages.ts`.
8. All 6 `/services/[slug]` titles were 66–75 chars (e.g. `'Corporate
   Transport Bangalore | Employee & Executive Travel | Sushi Travels'` at 75
   chars — well past Google's ~60-char SERP truncation point). Trimmed the
   redundant middle qualifier from all 6 in `src/lib/services.ts`, e.g. →
   `'Corporate Transport Bangalore | Sushi Travels'` (45 chars). New range:
   44–48 chars for 5 of them, 60 chars for the one already-compliant
   (`bangalore-sightseeing-cab`, left untouched).
9. All 10 `/routes/[slug]` titles shared a `'... | Distance, Fare Enquiry |
   Sushi Travels'` suffix that pushed 8 of the 10 past 60 chars (up to 69 for
   Chikmagalur/Pondicherry). Shortened the shared suffix to `'... | Fare &
   Distance | Sushi Travels'` across all 10 (one find/replace in
   `src/lib/routes.ts`, kept the pattern consistent rather than fixing only
   the 8 that were broken) — new range: 55–62 chars.
10. Home page's default title (`layout.tsx`) was already a compliant 54
    chars — not touched.
11. **Location pages** (`src/lib/locations.ts`): titles are 43–52 chars, on
    the short side of the 50–60 target but not truncating in a SERP and not
    "way outside" the range — left as-is per the task's own proportionality
    instruction, flagged here rather than force-padded with filler.

**Meta descriptions — 2 pages were dramatically over 160 chars**

12. **Home page's default description (`src/app/layout.tsx`) was 230
    characters** — nearly 70 over target, guaranteed to be truncated in a
    SERP snippet. Trimmed to 164 chars, kept every real fact (Sushi Tours &
    Travels naming, 9/12/17-seater, outstation cabs, airport transfers, local
    drops).
13. **`/fleet`'s description (`src/app/fleet/layout.tsx`) was 203
    characters** — trimmed to 172 chars alongside the title fix above.
14. **`/tours-and-packages`'s description was 170 characters** — trimmed to
    155 chars by dropping the redundant "9/12/17-seater" qualifier (the
    vehicle types are already named on the page and on `/vehicles`).
15. All other page/family meta descriptions were checked and found within a
    reasonable band (130–171 chars pre-fix, mostly 140–165) — not touched,
    since none were duplicated and none were dramatically outside 150–160.
16. **Uniqueness check**: dumped every `title`/`metaDescription`/`h1` across
    all 36 vehicle/service/location/route pages via a `tsx` script — **zero
    duplicates found**, within each family and cross-family. The
    cannibalization check documented in section 9/`SEO-STRATEGY.md` still
    holds.

**Canonical tags — 3 pages were missing `alternates.canonical` entirely**

17. `src/app/about/page.tsx`, `src/app/booking/page.tsx`, and
    `src/app/tours-and-packages/page.tsx` had a bare `metadata` object with
    only `title`/`description` — no `alternates.canonical`, unlike every
    other page on the site (`/fleet`, `/contact`, `/vehicles`, `/services`,
    `/locations`, `/routes` and all 36 dynamic pages all had it). Added
    `alternates: { canonical: '/about' | '/booking' | '/tours-and-packages' }`
    to each, matching the established pattern.

**Open Graph / Twitter Card — 7 pages had none at all (silently fell back to
the generic homepage OG image/title)**

18. The 4 hub pages (`/vehicles`, `/services`, `/locations`, `/routes`) and
    the 3 core pages just fixed above (`/about`, `/booking`,
    `/tours-and-packages`) had `title`/`description`/`alternates.canonical`
    but **no `openGraph` or `twitter` block** — every one of them would have
    shared Facebook/WhatsApp/Twitter link previews with the generic sitewide
    OG card from `layout.tsx` (same title, same description, same image as
    the homepage), instead of a card representing that specific page. Added
    page-specific `openGraph`/`twitter` metadata to all 7, each reusing that
    page's own title/description and an existing local image already used in
    that page's own hero (e.g. `/vehicles` → `/fleet/force-urbania-front-01.webp`,
    `/about` → `/videos/about-scene-13-poster.webp`, `/tours-and-packages` →
    `/Isha-Temple.webp`) — verified every referenced image file actually
    exists in `public/` before wiring it in. `/fleet` and `/contact` already
    had OG/Twitter from a prior pass (`layout.tsx` files) — only their
    title/description text changed per items 5–6 above, not their structure.
19. Spot-checked OG image resolution against the **live production site**
    (not a local build) via `curl -sI`: `https://www.sushitravels.com/fleet/
    force-urbania-front-01.webp` → `200 image/webp`. The global OG/Twitter
    image referenced by `layout.tsx` and `schema.ts`'s `LocalBusiness.image`
    both resolve correctly.

**Heading hierarchy — 5 H1s that didn't contain their page's primary keyword**

20. Per requirement #3, checked every page's H1 against the primary keyword
    documented in `SEO-STRATEGY.md`'s keyword map. Five core-page H1s were
    generic taglines that didn't contain the target keyword at all (the
    keyword only appeared in the hero subtitle beneath them, or nowhere on
    the page): `/contact` ("Connect With Us" → **"Contact Sushi Travels"**),
    `/fleet` ("Explore Our Rental Fleet" → **"Tempo Traveller Rental Fleet in
    Bangalore"**), `/booking` ("Chauffeur Rental Booking Center" → **"Book a
    Vehicle with Driver in Bangalore"**), `/about` ("Our Story & Values" →
    **"About Sushi Travels — Our Story & Values"**, kept the existing
    subheading rather than replacing it), and `/tours-and-packages` ("Tours &
    Packages" → **"Bangalore Holiday Tour Packages"**). All five edits are
    one-line text changes to the existing `<h1>` element — no styling,
    layout, or design classes touched.
21. **Home page's H1 ("Your Trusted Travel Partner Across India") was
    deliberately left unchanged.** Section 9 of this file explicitly
    documents that the homepage H1 stays generic on purpose, to avoid
    keyword-cannibalizing the dedicated `/fleet` and `/vehicles/*` pages that
    now own the specific "Tempo Traveller rental Bangalore" keyword. That's a
    real, reasoned tradeoff from a prior pass, not an oversight — overriding
    it wasn't in scope for an audit pass. `SEO-STRATEGY.md` has been updated
    (see below) to state plainly that the homepage's actual H1 doesn't
    literally contain its listed primary keyword, so this doesn't get
    mistaken for a future "fix."
22. Verified exactly one `<h1>` per page across every route in `src/app`
    (`grep -rn "<h1" src/app` — one match per file, no page has zero or
    multiple). No heading-level skips found on the pages read during this
    pass (H1 → H2 → H3 nesting is consistent on the vehicle/service/route
    detail pages via `FaqAccordion`/`VehiclePricingTable`/etc.).

**Alt text — audited, no defects found**

23. Checked every `<Image alt=` and `<img alt=` in `src/` for empty
    (`alt=""`) on content-bearing images, duplicate alt text within the same
    page, and generic/keyword-stuffed text. Found exactly 2 uses of
    `alt=""`, both legitimately decorative: `src/components/VehicleCard.tsx`
    (a blurred duplicate of the adjacent image used purely as a background
    fill behind a `object-contain` product shot — the second, real `<Image>`
    right next to it carries the descriptive alt) and one in the admin
    dashboard's image-crop UI (not a public/indexed page). No duplicate alt
    text found within any single page's image set — vehicle photo galleries
    use `"Sushi Travels {name} — photo {n} of {total}"` (unique per index),
    location/route/service hero images use CSS `background-image` (not
    `<img>`, so no alt attribute applies — noted below as a minor,
    pre-existing image-search tradeoff, not a defect worth a hero-component
    redesign). Nothing needed fixing here — the section 9 pass already did
    this correctly.

**Internal links — audited, no broken links or orphan pages found**

24. Grepped every `href="/..."` and `href={\`/...\`}` literal and
    template-literal internal link across `src/` and confirmed every target
    resolves to a real route under `src/app` (static hub links, and all 4
    `${page.slug}` template patterns for `/vehicles`, `/services`,
    `/locations`, `/routes` detail pages). No dead links found.
25. Confirmed no orphan pages: all 4 hub pages (`/vehicles`, `/services`,
    `/locations`, `/routes`) `.map()` over their **entire** respective data
    array with no slicing, so every one of the 36 dynamic pages is linked
    from its hub; the 4 hubs themselves are linked from the Navbar, Footer,
    and/or homepage per section 9's internal-linking work. Nothing to fix.

**Technical SEO**

26. `src/app/sitemap.ts` and `src/app/robots.ts`: both already correct —
    sitemap lists only the 10 static/hub routes + 36 dynamic routes (no
    `/admin`, no `/api/*`, no removed `/blog` routes), robots disallows
    `/api/` and `/admin` and points at `https://sushitravels.com/sitemap.xml`.
    No changes needed.
27. `grep -r "http://" src/` (excluding `localhost`, `127.0.0.1`, and the
    harmless `http://www.w3.org/2000/svg` XML namespace URI on inline SVGs)
    returned zero results — no hardcoded insecure internal/external links.
28. `next.config.ts`'s headers/caching config (CSP, HSTS, image/video
    long-cache headers) reviewed — doesn't set `X-Robots-Tag` or anything
    else that would block indexing, and doesn't affect crawlability (CSP is
    browser-enforced only; it has no effect on what Googlebot/other crawlers
    can fetch and index). `npm run build` passes with this config unchanged.
29. `npx tsc --noEmit` and `npm run build` both pass after all fixes above;
    all 56 routes prerender (verified via the build's route table). Live
    production spot-check via `curl`: `/`, `/fleet`, `/about`, `/contact`,
    `/booking`, `/tours-and-packages`, `/vehicles/sedan-rental-bangalore`,
    `/services/bangalore-airport-taxi`, `/locations/car-rental-whitefield`,
    `/routes/bangalore-to-mysore-cab` all return `200`.
30. Fixed 2 pre-existing `react/no-unescaped-entities` ESLint errors in
    `src/app/about/page.tsx` (raw apostrophes in "region's" and "you're",
    now `&apos;`) while already in that file for the H1 edit — same category
    of fix the section 8 pass already did elsewhere, just two instances that
    pass had missed.

### GEO (AI-engine) formatting — reviewed, mostly already solid

31. Every one of the 36 vehicle/service/location/route landing pages already
    has a dedicated `geoSummary` field rendered in its own bordered section
    immediately after the hero and before the first `<h2>` (confirmed by
    reading `src/app/vehicles/[slug]/page.tsx`'s render order) — this was
    built correctly in section 9 and needed no changes.
32. The 6 core pages (home, fleet, about, contact, booking, tours-and-packages)
    don't have a separately-boxed `geoSummary`-style paragraph — they rely on
    the hero subtitle directly under the H1 (1–2 factual sentences, no
    fabricated numbers) as the de facto GEO summary. This reads as adequate
    (short, factual, present before the first H2) rather than a defect, so it
    was left alone rather than bolted on as a new duplicate section — adding
    one would risk restating facts already said once, which section 10's
    copy-trim pass explicitly worked to avoid.
33. FAQ answers spot-checked on the homepage and 3 landing-page families are
    already answer-first (the first sentence is a complete, standalone
    answer before any elaboration) — consistent with the requirement, no
    changes needed beyond the DOM-visibility fix in item 4.

### Found but NOT fixed — needs the owner's input, not something this pass
could safely infer

34. **`src/app/about/page.tsx`'s "Milestone Stats Banner" states "50+ GPS
    Monitored Cars," "10k+ Delighted Travelers," and "15+ Years Travel
    Experience,"** and the About page's `<meta name="description">` repeats
    "15+ years experience, 50+ vehicles." These numbers predate this pass
    (not introduced by it) and are internally consistent with each other
    (the "since 2011" founding date in the hero subtitle does equal ~15
    years as of 2026), but **they are not verifiable against any data file
    in this codebase** — `src/lib/vehicles.ts` lists 13 distinct
    vehicle/tier entries, not "50+." That's not necessarily a contradiction
    (a rental operator can run more physical vehicles than the number of
    distinct catalogued tiers/types), but this pass has no way to confirm
    it either way, and the task's own rule is not to invent or alter
    business-fact numbers without confirmation. **Left unchanged, flagged
    for the owner**: please confirm the real current fleet size, years in
    operation, and total travelers served (or confirm these are
    approximate/rounded marketing figures that are fine as-is) so a future
    pass can either substantiate them explicitly or soften the phrasing.
35. **`/fleet` and `/` (home) are both `'use client'` components that fetch
    their real content client-side** (`useEffect(() => fetch('/api/fleet'
    …))` in `src/app/fleet/page.tsx`, and `fetch('/api/home-data')` in
    `src/app/page.tsx`) **rather than fetching server-side.** This means the
    static/prerendered HTML shipped for these two pages — what a crawler
    that doesn't execute JavaScript sees — contains an *empty* vehicle grid
    on `/fleet` (confirmed by extracting and parsing the live site's
    `ItemList` JSON-LD: `numberOfItems` effectively 0 until client JS runs)
    and empty fleet-preview/routes/packages sections on `/`. Googlebot's
    renderer generally executes JS and picks this up on a second wave, but
    many AI-answer-engine crawlers (this task's own "GEO/AEO" concern) are
    known not to execute JavaScript at all, meaning the actual fleet listing
    — the single most commercially important content block on the site — may
    be effectively invisible to those bots. **This is the single largest
    technical/GEO finding of this pass** and was deliberately **not**
    attempted as a fix here: converting these two pages to fetch server-side
    (e.g. querying Prisma directly in a Server Component and passing data
    down to small `'use client'` islands for the existing filter/animation
    interactivity) is a real, legitimate fix, but it's a data-fetching
    architecture change bigger than a proportional SEO/metadata pass, and
    this sandbox has no live database connection to verify the refactor
    renders correctly end-to-end (same limitation section 9 hit — see its
    "Database sync required" note). Recommend a dedicated follow-up pass,
    with DB access, specifically for this.
36. Confirmed **`public/tirupati.jpg` remains orphaned** (flagged already in
    section 10, still true — not referenced anywhere in `src/`, the Tirupati
    route entry uses a remote Unsplash URL instead). No action taken again
    this pass, restated here only because it was in scope to check for
    orphaned assets.

### Files changed in this pass

`src/lib/schema.ts`, `src/app/page.tsx`, `src/app/layout.tsx`,
`src/app/fleet/layout.tsx`, `src/app/fleet/page.tsx`,
`src/app/contact/layout.tsx`, `src/app/contact/page.tsx`,
`src/app/about/page.tsx`, `src/app/booking/page.tsx`,
`src/app/tours-and-packages/page.tsx`, `src/app/vehicles/page.tsx`,
`src/app/services/page.tsx`, `src/app/locations/page.tsx`,
`src/app/routes/page.tsx`, `src/lib/vehiclePages.ts`, `src/lib/services.ts`,
`src/lib/routes.ts`, `NOTES.md`, `SEO-STRATEGY.md`.

`npx tsc --noEmit` and `npm run build` both pass; all 56 routes prerender.

## 12. Fleet sort order, 17-seater keyword page, Maps embed, GBP link, new Blog section (2026-08-20)

A follow-up pass covering six requested items: apply the new `sortVehiclesForDisplay()`
fleet ordering everywhere it belongs, add a dedicated 17-seater Tempo
Traveller landing page for keyword targeting, swap in the owner's new
Google Maps embed (now with real reviews attached), connect the real
Google Business Profile link, build a real `/blog` section with one
genuine Gujarat travel-diary post, and a small cleanup pass. `npx tsc
--noEmit` and `npm run build` both pass; all 61 routes prerender
(the prior 56 + `/blog`, `/blog/[slug]` and the new
`/vehicles/17-seater-tempo-traveller-bangalore` page). `npm run dev` +
curl confirmed 200s on `/blog`, `/blog/statue-of-unity-kevadia-gujarat-travel-diary`,
`/vehicles/17-seater-tempo-traveller-bangalore`, `/routes`, and `/contact`.

### 1. Fleet sort order

`src/app/fleet/page.tsx` and `src/app/page.tsx` (home featured-fleet
section) now both import and call `sortVehiclesForDisplay()` instead of
`sortVehiclesByName()` from `src/lib/vehicles.ts`. On the home page this is
called per-category-row (the row grouping/order itself is untouched,
per-category `categoryOrder` logic), so within each row cars sort A–Z and
Tempo Traveller/Bus rows sort by ascending seat count — exactly what the
function is documented to do. `sortVehiclesByName()` itself was left
exported and untouched, in case anything else still wants pure alphabetical
sorting.

### 2. Keyword targeting for the three Tempo Traveller sizes

- `src/lib/vehiclePages.ts`'s `9-seater-luxury-tempo-traveller-bangalore`
  and `tempo-traveller-rental-bangalore` (12-seater) pages had their
  `geoSummary` copy adjusted (one sentence each) so the exact phrases "9
  seater tempo traveller in Bangalore" and "12 seater tempo traveller in
  Bangalore" appear naturally, once, without keyword-stuffing. Nothing else
  on either page (title, H1, pricing, FAQs) was changed — both already read
  fine.
- **New page added**: `src/lib/vehiclePages.ts` now has a third entry,
  slug **`17-seater-tempo-traveller-bangalore`**, `vehicleIds:
  ['force-tempo-traveller-17-seater']`, following the exact same
  `VehiclePage` shape as the 9/12-seater entries (title, metaDescription,
  heroSubtitle, geoSummary containing "17 seater tempo traveller in
  Bangalore" once, 3 bodyParagraphs, 4 FAQs, relatedVehicleSlugs/
  relatedServiceSlugs/relatedRouteSlugs). Since `force-tempo-traveller-17-seater`
  in `src/lib/vehicles.ts` is genuinely `priceDisplay: 'Price on Request'`
  (real vehicle, pricing/photos pending — see that file's own comment
  block), this new page's copy never states a specific ₹/km rate; every FAQ
  answer and body paragraph instead says pricing is on request /
  call-or-WhatsApp for a quote, consistent with how the vehicle data itself
  is marked and how the existing 21-seater/50-seater bus pages already
  handle unpriced tiers. `VehiclePricingTable.tsx` (shared component,
  unchanged) already renders a "Price on request" note automatically for
  any vehicle without a confirmed rate, so no new pricing-display code was
  needed. The new page was cross-linked into the 9-seater and 12-seater
  pages' `relatedVehicleSlugs` arrays so all three tiers reference each
  other.

### 3. Google Maps embed

`src/app/contact/page.tsx` was the only place in `src/` with a
`google.com/maps/embed` iframe (grepped `src/` to confirm — no second
occurrence anywhere else). Replaced its `src` with the owner-supplied embed
URL (now has real reviews attached) exactly as given; every other iframe
attribute (`width`, `height`, `style`, `allowFullScreen`, `loading`,
`referrerPolicy`, `aria-label`) and the surrounding wrapper/overlay buttons
were left untouched.

### 4. Google Business Profile link

Added `https://share.google/St55UlsbDobuLv9jP` as a real, visible,
clickable link in three places (not just buried in schema):
- `src/app/contact/page.tsx` — a "Read our reviews on Google ↗" link
  centered directly under the Maps embed.
- `src/components/Footer.tsx` — a "Read our reviews on Google ↗" line
  under the office address in the Contact Details column.
- `src/lib/schema.ts`'s `getLocalBusinessSchema()` — added to the existing
  `sameAs` array alongside the Instagram link (same pattern already used
  for that social link, nothing new invented).

### 5. New `/blog` section — the Gujarat story

Built fresh, simple, static blog infrastructure (deliberately not reviving
the old Prisma `BlogPost` model removed in section 8 — this mirrors
`src/lib/packages.ts`'s pattern instead):

- **`src/lib/blog.ts`** (new) — `BlogPost` interface + one real entry,
  slug **`statue-of-unity-kevadia-gujarat-travel-diary`**: a genuine,
  first-person-plural travel-diary piece about Kevadia, Gujarat — the
  Statue of Unity, the Sardar Sarovar Dam/reservoir it stands on, the
  eagle-shaped Jungle Safari Park building, the preserved footprint
  memorial under glass, and the riverside Valley of Flowers gardens. No
  invented client name, booking date, or claim that a specific customer
  booked this trip through Sushi Travels — it's framed as destination
  content from the business, with one honest paragraph tying it to the
  outstation/round-trip chauffeur service Sushi Travels actually offers
  ("that's exactly the kind of trip Sushi Travels' outstation and
  round-trip car rental service is built around"), not an overclaim that
  this specific trip was booked with them. Also states plainly that
  Kevadia is ~1,300 km from Bengaluru and realistically reached by flight +
  road transfer, not a direct drive — an honest travel-planning fact, not
  marketing spin.
  - All 19 images (`Gujarat-blog-1.webp` through `Gujarat-blog-19.jpg`,
    verified extension-by-extension against the actual `public/blog/`
    directory listing before wiring in — 1–11/15/17 are `.webp`, 12–14/16/
    18/19 are `.jpg`, exactly as they exist on disk) plus
    `Gujarat-blog-video-1.mp4` are referenced.
- **`src/app/blog/page.tsx`** (new) — index page. Per the owner's explicit
  request ("one single card of gujarat holding all the pics inside it"),
  renders exactly one fully-clickable card (cover image + "Travel Diary"
  badge + title + date + excerpt + "Read the full story" link) — all the
  other 18 photos live on the detail page's gallery, not the index. Card
  styling (rounded-2xl, `border-navy-light/10`, `shadow-sm hover:shadow-md`,
  serif heading) matches `PackageCard.tsx`/`VehicleCard.tsx` rather than
  inventing a new visual language. Uses the shared `LandingHero` component
  for the page hero, same as the `/vehicles`, `/services`, `/locations`,
  `/routes` hub pages.
- **`src/app/blog/[slug]/page.tsx`** (new) — detail page: full story text,
  a `<video controls>` element (explicitly not autoplay/background-style
  like the site's hero videos — a real content video the visitor has to
  press play on), and a full photo gallery grid reusing the exact visual
  pattern already established on `/vehicles/[slug]` (`grid grid-cols-2
  sm:grid-cols-3 gap-4`, rounded-2xl bordered tiles, numbered alt text,
  `loading="lazy"` after the first few images). A GEO-style 2–3 sentence
  factual summary sits in its own bordered section right after the hero,
  matching the same pattern the vehicle/service/route pages use. A visible
  `FaqAccordion` (native `<details>/<summary>`, answer text always in the
  server-rendered HTML) with 4 real, answer-first FAQs about visiting from
  Bangalore (distance/travel approach, best time to visit, what else is
  there to see, whether Sushi Travels arranges trips this far) backs the
  `FAQPage` JSON-LD — schema only added because the FAQ is genuinely
  visible on the page, per the project's existing rule.
- **`src/lib/schema.ts`** — added `getBlogPostingSchema()` (new), following
  the same parameterized-function style as `getServiceLandingSchema()`/
  `getVehicleProductSchema()`. Author is `"Sushi Travels"` (an
  `Organization`, not an invented person), `datePublished` is `2026-08-20`
  (today, the actual publish date of this pass), image resolves to an
  absolute URL via the existing `SITE_URL` constant.
- **Nav/Footer**: added a "Blog" link to `src/components/Navbar.tsx`'s
  `navLinks` array (after "Tours & Packages", before "About Us" — every
  existing link stays) and a "Travel Blog" link to
  `src/components/Footer.tsx`'s Quick Links column.
- **`src/app/sitemap.ts`**: imports `blogPosts` from the new `lib/blog.ts`
  and adds `/blog` (static, priority 0.6) plus one dynamic `/blog/[slug]`
  entry per post (currently 1), using the post's real `publishDate` as
  `lastModified` — same programmatic-from-data-file pattern the other four
  page families already use, so a future post added to `blogPosts` is
  automatically picked up with no manual sync step.
- **Internal linking**: `src/app/routes/page.tsx` (the Routes hub) got one
  new sentence at the bottom — "Planning a longer trip further afield? Read:
  A Trip to the Statue of Unity, Gujarat" — linking to the post, since a
  long-distance destination story is a natural fit next to the outstation
  route guides. The blog post detail page itself links back out via a
  `RelatedLinks` block to `/services/outstation-cab-bangalore`, `/routes`,
  and `/vehicles`, plus a `CTABand` inviting outstation enquiries — both
  reusing existing shared components rather than new one-off markup.

### 6. Cleanup

- Grepped all of `src/` for leftover `tempo-traveller-ac`/
  `tempo-traveller-non-ac` id references beyond `vehiclePages.ts` — **zero
  matches found**. That merge was already fully cleaned up in an earlier
  pass; nothing left to remove here.
- No new files in this pass introduce a TypeScript `any` — `src/lib/blog.ts`,
  `src/app/blog/page.tsx`, and `src/app/blog/[slug]/page.tsx` are all fully
  typed against the new `BlogPost` interface. `npx eslint` on every file
  touched in this pass reports zero new errors; the only lint errors it
  surfaces (`src/app/fleet/page.tsx` line 12, `src/app/page.tsx` lines 52/
  406/409/424/438) are pre-existing `@typescript-eslint/no-explicit-any`
  warnings on `useState`/`filter`/`map` callback types that predate this
  pass (the same codebase-wide convention documented in section 8) — this
  pass only changed which sort function those lines call, not their typing,
  and retyping the home/fleet page's client-fetched API row shape is a
  larger, separate effort out of proportion to this task.

### Content decisions / assumptions the owner should confirm

- The Gujarat post's "~1,300 km from Bengaluru" and "flight into Ahmedabad
  or Vadodara + road transfer" framing is general-knowledge geography, not
  a distance sourced from any file in this codebase — reasonable and
  clearly hedged ("roughly"), but not independently verified against a live
  routing API.
- No specific per-km rate or itinerary price for a Kevadia/Gujarat trip is
  stated anywhere in the post — deliberately, since this codebase has no
  confirmed pricing for a route that far outside Karnataka/South India.

### Database note

None of this pass touches Prisma, `seed.ts`, or any DB-backed table — the
new blog section is fully static data (`src/lib/blog.ts`), same pattern as
`packages.ts`/`vehiclePages.ts`/`services.ts`/etc. No migration, `db:push`,
or reseed is required for anything in this section.

## 13. Code cleanup, bug fixes, and interaction-polish pass (2026-08-24)

An incremental quality pass covering the three things the owner asked for:
clean the code, fix bugs, and make the site feel smoother/more premium — no
redesign, no content/pricing changes, local-only (nothing committed, pushed,
or deployed). Baseline going in: `npx tsc --noEmit` was already clean;
`npx eslint . --quiet` reported 81 errors (all pre-existing, per sections 8/
9/12's own documented decision not to do a large `any`-typing refactor).
After this pass: **67 → 61 eslint errors remaining, all in the same
pre-existing category** (see below), `npx tsc --noEmit` still clean, and
`npm run build` still prerenders all **60 routes** (10 static/core pages +
`/admin` + 7 API routes + 4 hub pages + 11 vehicle + 6 service + 10 location
+ 10 route + 1 blog post + sitemap/robots/not-found) — same count as before
this pass, confirming nothing broke.

### Real bugs found and fixed

1. **`src/app/admin/page.tsx`: `checkAuth`/`fetchDashboardData` were called
   from a `useEffect` before either was declared** (`checkAuth` referenced
   `fetchDashboardData` which was defined ~20 lines below it, and the mount
   effect called `checkAuth` before *it* was declared) — harmless at runtime
   (both are `const` closures assigned before the effect actually fires
   post-render) but flagged as a real ESLint error
   (`react-hooks/immutability`, "accessed before it is declared") since it
   relies on hoisting-adjacent timing rather than normal top-to-bottom
   declaration order. Reordered so `fetchDashboardData` → `checkAuth` → the
   mount `useEffect` now appear in that dependency order.
2. **Two silently-broken "empty state" fallbacks on the homepage
   (`src/app/page.tsx`)**: the Popular Routes and Testimonials sections both
   fetch from `/api/home-data` client-side; on a failed fetch, `loadingFleet`/
   `loadingRoutes` still flip to `false` but the list arrays stay empty, so
   the sections rendered **completely blank with no message** — silent
   failure was the pattern the task explicitly warned about, and the Fleet
   preview section (a few lines above, in the same file) already had a
   fallback message that these two sections were missing. Added a
   `homeDataError` state (set in the fetch's `.catch`) and matching
   `popularRoutesList.length > 0` / `testimonialsList.length > 0` fallback
   messages ("Route guides are temporarily unavailable...", "Reviews are
   temporarily unavailable...") so a real fetch failure now shows a sensible
   message instead of an empty gap in the page. Also distinguished the fleet
   preview's own existing empty-state message so it says something different
   on a genuine fetch error vs. a legitimately empty vehicle list.
3. **`src/app/fleet/page.tsx` had the same silent-failure gap**: fetch
   failures fell through to the same "No Vehicles Available... Check back
   soon!" message used for a genuinely-empty filtered category, which is
   misleading on a real network/API error. Added a `fetchError` state (set
   when the response isn't `.ok` or the fetch throws) with its own distinct
   "Couldn't Load the Fleet" message and a call/WhatsApp fallback prompt.
4. **`/booking`'s H1 was missing the `md:` breakpoint step** that every
   other secondary-tier page hero (`/about`, `/contact`,
   `/tours-and-packages`, `/blog/[slug]`) uses (`text-3xl sm:text-4xl
   md:text-5xl`) — it capped at `text-4xl` on desktop
   (`text-3xl sm:text-4xl`), so the Booking page's H1 rendered visibly
   smaller than its sibling pages' H1s at desktop widths for no reasoned
   difference. Added the missing `md:text-5xl` step.
5. **`/booking`'s main content wrapper used `py-12`** while the three other
   structurally-identical "main content wrapper right below the hero"
   containers (`/about`, `/contact`, `/tours-and-packages`) all use `py-16`
   — normalized to `py-16` to match the established rhythm (the four hub
   pages `/vehicles`, `/services`, `/locations`, `/routes` already agreed
   with each other at `py-14`, a different but internally-consistent family,
   so those were left alone).
6. Two real, pre-existing ESLint errors fixed as drive-by quick wins while
   already in `src/app/admin/page.tsx` for the ordering fix above: `let
   method = ...` never reassigned (`prefer-const`), and one more raw `"`
   around quoted text that should be `&quot;` (`react/no-unescaped-entities`,
   the same category sections 8/11 had already fixed elsewhere in this file
   but missed this one instance).

### Verified, no defect found

- **Internal links**: grepped every `href="/..."` and `href={\`/...\`}`
  literal/template-literal link across `src/` — all resolve to real routes
  under `src/app` (including the 4 dynamic `${slug}` template patterns).
  Nothing broken.
- **Hydration risk**: grepped every `Date.now()`/`Math.random()` and
  `window.`/`document.`/`localStorage` usage in `src/` — all are inside
  event handlers, `useEffect` bodies, or server-side API routes, never
  directly in a component's render body. No hydration-mismatch risk found.
- **Image references**: a script cross-checked every literal image path
  string (`.webp`/`.jpe?g`/`.png`/`.svg`/`.mp4`/`.ico`/`.gif`) referenced
  anywhere in `src/` against `public/` — 102 unique references, zero
  missing files.
- **Layout shift risk**: checked every `<Image>` usage in `src/` — every one
  either passes explicit `width`/`height` (logo, icons) or uses `fill` inside
  a parent with an explicit `aspect-*`/fixed-size class (card thumbnails,
  hero backgrounds). None were missing dimensioning.
- **Skeleton loader accuracy**: `SkeletonLoader.tsx`'s `VehicleCardSkeleton`/
  `RouteCardSkeleton`/`TestimonialCardSkeleton`/`FleetCategoryRowSkeleton`
  already closely mirror their real card's section structure and spacing
  (built carefully in an earlier pass) — no size-jump risk found, nothing
  changed here.
- **Font loading**: `layout.tsx` uses `next/font/google` for both Inter and
  Playfair Display with `display: 'swap'` already set — no FOIT risk, no
  changes needed.
- **`scroll-behavior: smooth`**: confirmed present on `html` in
  `globals.css`, and every hero-banner page's `-mt-[72px] md:-mt-[80px]`
  offset (paired with `LayoutWrapper.tsx`'s `pt-[72px] md:pt-[80px]` on
  `<main>`) is applied consistently across all 9 hero-banner page types
  (5 core pages directly, plus all 4 landing-page families and the blog
  detail page via the shared `LandingHero.tsx` component) — nothing to fix.
- **Transition/animation consistency**: audited hover/transition classes
  across `VehicleCard.tsx`, `PackageCard.tsx`, `RouteCard.tsx`,
  `TestimonialCard.tsx`, and `Navbar.tsx` — already unified from an earlier
  minimalism pass (section 8): cards consistently use `shadow-sm
  hover:shadow-md transition-shadow duration-300`, image zooms use
  `duration-500` (deliberately slower for a smoother zoom feel), and nav/text
  links use `duration-150`–`200` (deliberately snappier for text). No
  mismatched/sluggish outliers found — this requirement was already
  satisfied going in.

### Interaction polish: button press feedback

The one real gap found in the "smoothness" requirement: primary CTA buttons
site-wide had hover feedback (`hover:scale-105`, color changes) but **no
press/active feedback at all** outside the admin dashboard. Added a
consistent `active:scale-95` (round icon CTAs on cards) or `active:scale-
[0.98]` (pill-shaped text buttons, a more subtle press for larger buttons)
to every primary public-facing CTA: the Call/WhatsApp/Book icon buttons on
`VehicleCard.tsx`/`PackageCard.tsx`, the route card CTA in `RouteCard.tsx`,
all three buttons in the shared `CTABand.tsx` (used across every vehicle/
service/location/route landing page), the Navbar's desktop and mobile-drawer
"Book Your Ride" buttons and mobile Call button, the Booking form's "Confirm
Booking" submit button, the Contact page's "Send Message" submit button, and
the home page's hero "Book Your Ride" CTA, search-bar "Search Ride" submit,
"Plan Your Group Trip" CTA, and the custom-route modal's two action buttons.
This is additive only (a press-state, not a second stacked hover effect), so
it doesn't conflict with section 8's earlier deliberate "one hover effect per
button, not two or three stacked" simplification — it was left alone inside
`src/app/admin/page.tsx` since that's an internal tool, not the public
premium-feel surface this task targeted.

### Code cleanup

- **New `src/lib/contact.ts`**: the WhatsApp business number (`919071660099`
  bare / `+919071660099` E.164) and the `https://wa.me/...?text=...` deep-
  link construction pattern were independently copy-pasted as literal
  strings in **10 different files** (`VehicleCard.tsx`, `PackageCard.tsx`,
  `CTABand.tsx`, `WhatsAppFloat.tsx`, `CallFloat.tsx`, `Navbar.tsx`,
  `Footer.tsx`, `BookingForm.tsx`, `contact/page.tsx`, `page.tsx`, plus
  `schema.ts`'s structured-data `telephone` field) — exactly the kind of
  "copy-pasted near-identically across multiple components" duplication the
  task asked to look for. Added `WHATSAPP_NUMBER`, `PHONE_NUMBER`, and
  `getWhatsAppUrl(message)` to one new small file and repointed all 11
  call sites at it. A future number change is now a one-line edit instead of
  a grep-and-replace across the whole codebase; every existing WhatsApp
  message string and `tel:` link text was left completely unchanged (this is
  a pure refactor of *where the number lives*, not what any button says).
- **Dead code removed from `src/app/admin/page.tsx`**: `moveVehicleOrder`
  and its helper `saveVehicleOrderOnBackend` (~65 lines total) were entirely
  unreferenced — superseded by the newer local-only `moveVehicleInRow` +
  "Save Arrangement" flow already in the same file, but never deleted when
  that replacement was built. Removed both functions.
- **Unused imports/variables removed**: `Users2` (`about/page.tsx`,
  unused lucide icon), `ExternalLink`/`ChevronRight` (`admin/page.tsx`,
  unused lucide icons), `useRouter`/`router` (`admin/page.tsx` — confirmed
  zero `router.` usages anywhere in the file), `Link` (`vehicles/[slug]/
  page.tsx`, unused `next/link` import), and two unused function
  parameters/loop variables (`targetField` in `handleImageFileChange`,
  `idx` in one `.map()`) in `admin/page.tsx`.
- **`any` → proper types, in files already being touched for other reasons**
  (per the task's own "quick, safe fix... don't do a large type-system
  refactor" scope): `src/lib/jwt.ts`'s `signToken`/`verifyToken` now use
  `Record<string, unknown>` instead of `any`; `src/app/api/admin/login/
  route.ts` gained a local `AdminTokenPayload` interface for its OTP-flow
  token payloads (email/step/otpHash/otpExpires/authenticated) and proper
  `catch` typing (`err instanceof Error ? err.message : ...` instead of
  `err: any`); `src/components/BookingForm.tsx`'s `vehiclesList` state went
  from `any[]` to a real `BookingFormVehicle` interface, and three `as any`
  casts on `tripType` were narrowed to the real `BookingData['tripType']`
  union / a validated string-literal check; `src/app/page.tsx`'s
  `vehiclesList` state went from `any[]` to a `Vehicle & {homeCategory?,
  categoryOrder?, showOnHome?}` type (matching the documented reason from
  section 9 for why the home page's fetched rows need fields beyond the
  base `Vehicle` interface), which let 4 explicit `(v: any)` callback
  annotations be removed entirely since the type now flows through
  inference; `src/app/fleet/page.tsx`'s `vehiclesList` similarly went from
  `any[]` to `Vehicle[]`. **Left alone** (consistent with sections 8/9/12's
  own documented decision): the remaining `any` usage across the API routes
  (`api/bookings`, `api/fleet`, `api/home-data`, `api/reviews`, `api/
  routes`) and most of `admin/page.tsx` — that's pre-existing, codebase-wide
  convention predating this pass, and retyping every route's Prisma-row/
  request-body shape is a larger, separate effort disproportionate to a
  cleanup pass (`npx eslint . --quiet` still shows 61 errors, all in this
  one documented category, down from 81 before this pass).
- **Stray debug logging**: audited every `console.log` in `src/` — all
  remaining instances are intentional (the booking form and contact page's
  pre-WhatsApp-redirect inquiry logs the task explicitly called out as fine,
  plus server-side seed-status/mail-confirmation/WhatsApp-simulation logging
  in `seed.ts`/`api/bookings/route.ts`/`api/admin/login/route.ts`, which
  substitutes for a real SMS/WhatsApp API integration that doesn't exist
  yet). No stray/leftover debug logs found or removed.

### Files changed in this pass

`src/lib/contact.ts` (new), `src/app/admin/page.tsx`, `src/app/api/admin/
login/route.ts`, `src/app/booking/page.tsx`, `src/app/contact/page.tsx`,
`src/app/fleet/page.tsx`, `src/app/page.tsx`, `src/app/about/page.tsx`,
`src/app/vehicles/[slug]/page.tsx`, `src/components/BookingForm.tsx`,
`src/components/CTABand.tsx`, `src/components/CallFloat.tsx`,
`src/components/Footer.tsx`, `src/components/Navbar.tsx`,
`src/components/PackageCard.tsx`, `src/components/RouteCard.tsx`,
`src/components/VehicleCard.tsx`, `src/components/WhatsAppFloat.tsx`,
`src/lib/jwt.ts`, `src/lib/schema.ts`, `NOTES.md`.

**Not touched by this pass, found pre-existing on disk**: `src/app/
globals.css` had an unstaged whitespace-only diff (trailing spaces trimmed
on 2 blank lines) and `public/fleet/WhatsApp Image 2026-08-22 at 1.20.14
PM.jpeg` was present as an untracked file — both existed before this pass
started and weren't created or modified by it; flagged here only so they
aren't mistaken for this pass's work.

`npx tsc --noEmit` — clean. `npm run build` — passes, all 60 routes
prerender (same count as before this pass). `npm run dev` + curl confirmed
200s on `/`, `/fleet`, `/about`, `/contact`, `/tours-and-packages`, `/blog`,
`/blog/statue-of-unity-kevadia-gujarat-travel-diary`, `/booking`,
`/vehicles`, `/services`, `/locations`, `/routes`,
`/vehicles/sedan-rental-bangalore`, `/services/bangalore-airport-taxi`,
`/locations/car-rental-whitefield`, `/routes/bangalore-to-mysore-cab`, and
the 4 fetch-backed API routes (`/api/fleet`, `/api/home-data`, `/api/
routes`, `/api/reviews`), plus a genuine `404` on an unknown path and `200`
on `/sitemap.xml` and `/robots.txt`. No deploy, push, or DB action taken —
all changes are local and uncommitted per the owner's instruction.

## 14. Full technical/on-page SEO re-audit (2026-08-25)

A fresh audit pass re-verifying everything sections 9/11/12/13 already built
and fixed, specifically checking for regressions or gaps introduced by the
two new bus entries added to `src/lib/vehicles.ts` on 2026-08-25 (`bus-50-seater`'s
real-photo swap and the new `volvo-bus-45-seater-luxury` entry). This was an
audit-and-fix pass, not a rebuild — the vast majority of what the task's
36-section brief asks for was already done and verified correct in prior
passes; this pass's job was to find what, if anything, had drifted or was
missed.

### Real bug found and fixed: 2 broken image references (404s)

`src/lib/routes.ts` (`bangalore-to-hyderabad-cab`'s `heroImage`) and
`src/lib/services.ts` (`bangalore-sightseeing-cab`'s `heroImage`) both
referenced `/fleet/innova-2011-front-01.webp` — a file that does not exist
on disk (`public/fleet/` only has `innova-2011-front-02.webp` plus interior/
dashboard shots; `-front-01` was apparently renamed or removed in an earlier
pass without these two references being updated). This was a real, silent
404 on two live page heroes — found via a full-repo script that extracted
every literal image-path string referenced anywhere in `src/` (112 unique
paths across `.ts`/`.tsx`) and checked each against `public/`. Fixed both to
point at the existing `innova-2011-front-02.webp`. Re-ran the same check
after the fix: 111 unique refs, 0 missing.

### Minor title/meta-description length trims (2 pages)

Two `metaDescription` values were meaningfully over the ~160-char SERP
budget (not just marginally, which per section 11's own proportionality
rule wouldn't warrant a change):
- `src/lib/vehiclePages.ts` `sedan-rental-bangalore`: 171 → 141 chars
  (dropped the redundant "Call or WhatsApp for a quote" tail — that CTA is
  already implicit on every page's CTABand).
- `src/lib/vehiclePages.ts` `bus-rental-bangalore`: 173 → 156 chars
  (tightened the vehicle-list phrasing, kept every real fact: 20/21/45/50
  seat tiers and the Volvo mention).

All other title/meta lengths checked (11 vehicle pages, 6 service pages, 10
location pages, 10 route pages) were within the same acceptable band section
11 already established (including the two route titles at 62 chars —
`bangalore-to-chikmagalur-cab` and `-pondicherry-cab` — which section 11
explicitly documents as the deliberate, accepted outcome of its own suffix
shortening, not left unchecked here, just correctly not re-touched).

### Verified, no defect found (re-confirms prior passes are still accurate)

- **Broken internal links**: cross-checked every `relatedVehicleSlugs` /
  `relatedServiceSlugs` / `relatedLocationSlugs` / `relatedRouteSlugs` array
  across `vehiclePages.ts`/`services.ts`/`locations.ts`/`routes.ts`/`blog.ts`
  against the real slug lists in each file, and every `vehicleIds` entry in
  `vehiclePages.ts` against the real `id` list in `vehicles.ts` — zero
  broken references. The 2 vehicles with no dedicated landing page
  (`toyota-innova-hycross`, `toyota-fortuner`) are both genuinely
  `priceDisplay: 'Price on Request'` vehicles outside the brief's original
  page list, consistent with the documented pattern (Hycross already noted
  as an intentional gap in section 9); not a bug.
- **Sitemap completeness/correctness**: `sitemap.xml` returns exactly 49
  `<url>` entries (11 static/hub + 11 vehicle + 6 service + 10 location +
  10 route + 1 blog), matching `staticRoutes.length + vehiclePages.length +
  servicePages.length + locationPages.length + routePages.length +
  blogPosts.length` exactly — no drift between the data files and the
  sitemap generator. No noindex/404/redirect/param URLs in it.
- **robots.txt**: still correctly allows `/`, disallows `/api/` and
  `/admin`, and references the sitemap — doesn't block any CSS/JS/image
  path (Next.js serves `_next/static/*` and `public/*` outside those
  disallow prefixes).
- **JSON-LD validity**: wrote a script that fetched `/`, `/fleet`,
  `/vehicles/bus-rental-bangalore`, `/services/bangalore-sightseeing-cab`,
  and `/routes/bangalore-to-hyderabad-cab` from a local production-build
  server and `JSON.parse()`'d every `<script type="application/ld+json">`
  block — all parsed cleanly, 0 failures.
- **Heading hierarchy**: confirmed exactly one `<h1>` per public page again
  (all core pages directly, all 4 dynamic families + `/blog/[slug]` via the
  shared `LandingHero.tsx`, which renders exactly one `<h1>`). `/admin` has
  2 `<h1>`s but is disallowed in robots.txt and not a public/indexed page.
- **FAQPage schema visibility regression check**: re-verified the homepage's
  FAQ answer text is still present in server-rendered HTML (the fix from
  section 11, item 4) — confirmed via a fresh `curl`+parse against a live
  local server; no regression.
- **Build/lint**: `npm run build` passes, all 59 routes prerender correctly
  (same route set as section 13's 60-minus-the-count-quirk from `/admin`
  page-data grouping — verified via the build's own route table, nothing
  missing). `npx eslint` on every file touched in this pass reports 0 new
  errors.
- **Live 200 checks**: `npm run build` + a local production-mode server,
  `curl`-verified 200 on `/`, `/fleet`, `/sitemap.xml`, `/robots.txt`,
  `/vehicles/sedan-rental-bangalore`, `/vehicles/bus-rental-bangalore`,
  `/services/bangalore-sightseeing-cab`,
  `/routes/bangalore-to-hyderabad-cab`, and the corrected image path
  `/fleet/innova-2011-front-02.webp`.

### Re-confirmed still open (not fixed this pass — same reasons as before)

- **Section 11 item 35, still accurate**: `/` and `/fleet` are still
  `'use client'` pages that fetch vehicle/route/review data from
  `/api/home-data` / `/api/fleet` (both DB-backed via Prisma) inside a
  `useEffect`, so the server-rendered HTML shipped to non-JS-executing
  crawlers still ships an empty fleet grid — reconfirmed live in this pass
  (`ItemList.numberOfItems: 0` in `/fleet`'s own JSON-LD when fetched from a
  fresh server-rendered response, and 0 vehicle-card markers in the raw
  HTML). This sandbox still has no live/seeded database connection to safely
  verify a server-component refactor end-to-end, and the vehicle/route/
  review data is admin-editable via the dashboard (i.e. it can genuinely
  diverge from `src/lib/vehicles.ts`), so silently falling back to the
  static data file as SSR content risks showing crawlers different content
  than what a logged-in admin update would show real visitors — a
  data-integrity tradeoff, not just an engineering one. Left as a flagged,
  scoped-out follow-up requiring real DB access, same as section 11
  concluded.
- `public/tirupati.jpg` remains orphaned (unreferenced in `src/`, unchanged
  since sections 10/11) — not touched again.
- Section 11 item 34's "50+ GPS Monitored Cars / 10k+ Delighted Travelers /
  15+ Years" stats banner on `/about` still cannot be independently verified
  against any data file in this codebase — left unchanged, still flagged for
  the owner to confirm or soften.

### Files changed in this pass

`src/lib/routes.ts`, `src/lib/services.ts`, `src/lib/vehiclePages.ts`,
`NOTES.md`.

`npm run build` passes (59 routes prerender). `npx eslint` on all changed
files reports 0 new errors. No deploy, push, DB write, or `git` operation
performed — all changes are local, uncommitted, code/content-file only.

## 15. Fixed empty-fleet-in-raw-HTML crawlability gap (2026-08-25)

Section 14 flagged this as the largest open SEO issue: `/` and `/fleet`
were `'use client'` pages that fetched vehicle/route/review data
client-side via `useEffect` + `fetch('/api/home-data')` / `fetch('/api/fleet')`.
A crawler reading the raw server-rendered HTML saw an empty fleet grid —
confirmed live at the time: the ItemList JSON-LD reported
`numberOfItems: 0`.

### Fix

Converted both pages to async Server Components that fetch directly from
Postgres via the existing Prisma client (`src/lib/db.ts`), then render a
new client child component seeded with that data as props:

- `src/app/page.tsx` (Server Component) → `src/app/HomeClient.tsx` (client,
  all existing interactivity: search form, category rows, FAQ accordion,
  custom-route modal, testimonials)
- `src/app/fleet/page.tsx` (Server Component) → `src/app/fleet/FleetClient.tsx`
  (client, all existing interactivity: per-vehicle filter chips, "You May
  Also Like" suggestions)

Both pages carry `export const dynamic = 'force-dynamic'` — vehicle data
is admin-editable, so this stays fetched fresh per-request rather than
cached at build time, matching the pattern the API routes already used.

The Prisma-row → client-shape mapping logic (`toClientVehicle`, `toClient`)
was previously duplicated near-identically in `src/app/api/fleet/route.ts`
and `src/app/api/home-data/route.ts`. Extracted once to
`src/lib/dbMappers.ts`; both API routes and both new server pages now
import from there.

`src/components/SkeletonLoader.tsx` deleted — its loading-skeleton
components (`VehicleCardSkeleton`, `FleetCategoryRowSkeleton`) had no
remaining callers once the client-side loading state they were built for
was replaced by server-rendered initial data.

### Verification (independent — re-checked myself, not just the pass's own report)

- `npx tsc --noEmit`: 0 errors.
- `npm run build`: passes; `/` and `/fleet` both show as `ƒ` (dynamic,
  server-rendered on demand) in the route table, not static.
- `npm run start` + `curl` against the actual built server: real vehicle
  names ("12 Seater Tempo Traveller", "9 Seater Tempo Traveller", "Volvo
  Bus 45...") present in the raw HTML of both `/` and `/fleet`, with no
  JavaScript executed.
- `/fleet`'s ItemList JSON-LD: `numberOfItems: 15`, matching the real
  fleet count (was 0).
- Grepped for stale references to the deleted `SkeletonLoader.tsx` — none
  found.
- Spot-checked `FleetClient.tsx` to confirm the per-vehicle filter chips +
  "You May Also Like" logic (added 2026-08-25, same day) survived the
  extraction intact, not regressed.

### Files changed

`src/app/page.tsx`, `src/app/fleet/page.tsx`, `src/app/api/fleet/route.ts`,
`src/app/api/home-data/route.ts` (new: `src/app/HomeClient.tsx`,
`src/app/fleet/FleetClient.tsx`, `src/lib/dbMappers.ts`; deleted:
`src/components/SkeletonLoader.tsx`).

## 15. Guide-vs-work gap pass: titles, links, sitemap dates, blog (2026-10-24)

Compared the project against Ahrefs' "How to Rank Higher on Google" (10 steps).

- **Correction to sections 11 item 35 / 14**: `/` and `/fleet` are already
  Server Components (commit `380c00b`); the "empty fleet grid for non-JS
  crawlers" gap is resolved. Those notes are stale.
- **Titles**: the root `title.template` appends " | Sushi Travels", so About,
  Booking, Contact and Tours (which already contained the brand) rendered it
  twice. Page titles no longer include the brand; OG/Twitter titles still do.
  About/Booking/Contact/Tours titles now carry the Bangalore keywords from
  `SEO-STRATEGY.md`. Root OG/Twitter copy said "India"; now Bangalore.
- **Broken internal link**: `services.ts` linked to the removed
  `21-seater-bus-rental-bangalore` (page is now `25-seater-mini-bus-...`).
  Fixed that slug plus "21-seater" copy in `routes.ts`/`services.ts`/
  `vehiclePages.ts` and the `SEO-STRATEGY.md` keyword table.
- **Sitemap `lastmod`**: `scripts/generate-gsc-suite.ts` now uses the last git
  commit date of each URL's source files (not today's date for everything);
  the index uses the newest page date. Granularity is per data file, not per
  entry.
- **Blog**: added three Bangalore guides (Mysore, Coorg, Ooty) using only the
  distances/times already in `routes.ts`; no prices, no named-person author,
  no invented citations (`citations: []`). Template no longer hardcodes the
  Gujarat strings (`imageAltPrefix`, `videoHeading`, `relatedLinks` fields;
  gallery only renders with 2+ photos). Route pages link to their guide and
  `/tours-and-packages` now has a RelatedLinks block.
- **Checked, no merge needed**: `/fleet` (Tempo Traveller keyword) and
  `/vehicles` (category hub) serve different intents.
- **Still needs owner/data**: Search Console/Ahrefs ranking data (guide steps
  1, 9, 10), live-SERP intent check, backlinks/GBP reviews, and confirming the
  About page's "50+ cars / 10k+ travellers" claims.

### 15b. Search Console-driven pass (2026-10-24, 3-month GSC export)
- Bare `sushitravels.com` was collecting clicks as a separate URL from `www` (51 vs 17 on the homepage) -> permanent host redirect in `next.config.ts`. If the host already redirects www->bare at platform level this would loop; canonical everywhere is www.
- `/services/bangalore-airport-taxi`: 715 impressions at avg position 68 across 40+ airport queries. Added title/description, two body paragraphs and three FAQs (duration, fare process, terminals) and a link from every route page. No fares invented — a flat airport drop fare from the owner is the next lever.
- "rent / on rent / for rent" wording added to the 12-seater Tempo Traveller and 25-seater bus titles (queries sat at positions 20-60).
- `/vehicles/9-seater-luxury-tempo-traveller-bangalore` (16 clicks, pos 8.6) left unchanged.
