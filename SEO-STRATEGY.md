# Sushi Travels — SEO Strategy (2026-08-16, corrected 2026-08-17)

This document is the written strategy deliverable accompanying the technical/
on-page SEO build described in `NOTES.md` section 9. Everything in this file
is documentation for the owner to review and action — none of it (backlinks,
Google Business Profile, blog content) was or could be executed as part of
the code pass, since it requires accounts, relationships and manual work the
codebase change itself can't perform.

**2026-08-17 correction note:** a follow-up SEO/technical audit
(`NOTES.md` section 11) found that several core pages' actual `<h1>` text
didn't literally contain the "Primary Keyword" listed below — see the
per-page notes added inline under the Core Pages table. Five of those were
fixed (H1 text now contains the keyword); the homepage's H1 was deliberately
left generic, as explained inline, to avoid cannibalizing `/fleet` and
`/vehicles/*` for the same keyword. The keyword *assignments* themselves
(which URL owns which phrase) are unchanged and still the working baseline —
only the "does the H1 literally say this" claim has been corrected to match
reality.

All guidance here follows the brief's rules: no keyword stuffing, no fake
reviews/ratings/locations, no invented pricing, no unproven superlative
claims ("#1", "cheapest", "guaranteed lowest", "government approved"), and
white-hat only (no PBNs, link farms, or paid link schemes).

---

## (a) Keyword Map — Page → Primary Keyword → Supporting Keywords

### Core pages (existing)

| Page | Primary Keyword | Supporting Keywords | H1 matches keyword? |
|---|---|---|---|
| `/` (Home) | Car & Tempo Traveller rental Bangalore | Sushi Travels, chauffeur-driven car rental India, outstation cab Bangalore | **No, intentionally.** H1 is "Your Trusted Travel Partner Across India" — kept generic on purpose so the homepage doesn't compete with `/fleet` and `/vehicles/*` for this exact phrase (see `NOTES.md` section 9's cannibalization check). The keyword does appear in the hero subtitle directly beneath the H1. |
| `/fleet` | Tempo Traveller rental Bangalore (9/12/17 seater) | vehicle hire with driver Bangalore, sedan/SUV/bus rental Bangalore | Yes — H1 is now "Tempo Traveller Rental Fleet in Bangalore" (fixed 2026-08-17; was "Explore Our Rental Fleet"). |
| `/tours-and-packages` | Bangalore holiday packages | Mysore/Coorg/Ooty tour package, round trip packages Bangalore | Yes — H1 is now "Bangalore Holiday Tour Packages" (fixed 2026-08-17; was "Tours & Packages"). |
| `/about` | About Sushi Travels | Bangalore travel agency, chauffeur service company | Yes — H1 is now "About Sushi Travels — Our Story & Values" (fixed 2026-08-17; was "Our Story & Values"). |
| `/contact` | Contact Sushi Travels | Sushi Tours & Travels Bangalore phone number | Yes — H1 is now "Contact Sushi Travels" (fixed 2026-08-17; was "Connect With Us"). |
| `/booking` | Book a cab / vehicle Bangalore | online vehicle booking Bangalore | Yes — H1 is now "Book a Vehicle with Driver in Bangalore" (fixed 2026-08-17; was "Chauffeur Rental Booking Center"). |

### Vehicle pages (`/vehicles/[slug]`)

| Page | Primary Keyword | Supporting Keywords |
|---|---|---|
| `sedan-rental-bangalore` | Sedan rental Bangalore with driver | Etios rental Bangalore, Dzire rental Bangalore, airport sedan Bangalore |
| `innova-rental-bangalore` | Innova rental Bangalore | Toyota Innova with driver Bangalore, 7 seater SUV rental |
| `innova-crysta-rental-bangalore` | Innova Crysta rental Bangalore | premium SUV rental Bangalore, corporate Innova Crysta hire |
| `tempo-traveller-rental-bangalore` | 12 seater Tempo Traveller rental Bangalore | AC Tempo Traveller Bangalore, Non-AC Tempo Traveller hire |
| `9-seater-luxury-tempo-traveller-bangalore` | 9 seater luxury Tempo Traveller Bangalore | executive Tempo Traveller hire, 9+1 seater van rental |
| `force-urbania-12-seater-maharaja-bangalore` | Force Urbania 12 seater rental Bangalore | Urbania Maharaja hire, premium van rental Bangalore |
| `force-urbania-16-seater-luxury-bangalore` | Force Urbania 16 seater rental Bangalore | luxury van rental Bangalore, wedding van hire |
| `25-seater-mini-bus-rental-bangalore` | 25 seater mini bus rental Bangalore | mid-size bus hire Bangalore, group bus rental |
| `50-seater-bus-rental-bangalore` | 50 seater bus rental Bangalore | large group bus hire Bangalore, corporate event bus |
| `bus-rental-bangalore` | Bus rental Bangalore | mini coach hire Bangalore, AC bus rental with driver |

### Service pages (`/services/[slug]`)

| Page | Primary Keyword | Supporting Keywords |
|---|---|---|
| `bangalore-airport-taxi` | Bangalore airport taxi | Kempegowda airport cab, BLR airport pickup drop |
| `outstation-cab-bangalore` | Outstation cab service Bangalore | round trip cab Bangalore, outstation taxi booking |
| `local-taxi-bangalore` | Local taxi service Bangalore | hourly cab Bangalore, city taxi hire |
| `corporate-transport-bangalore` | Corporate transport Bangalore | employee transport service, executive car rental |
| `wedding-vehicle-rental-bangalore` | Wedding vehicle rental Bangalore | wedding car hire, guest transport for weddings |
| `bangalore-sightseeing-cab` | Bangalore sightseeing cab | city tour taxi Bangalore, day trip cab rental |

### Location pages (`/locations/[slug]`)

| Page | Primary Keyword | Supporting Keywords |
|---|---|---|
| `car-rental-whitefield` | Car rental Whitefield Bangalore | cab service Whitefield, Whitefield airport taxi |
| `car-rental-electronic-city` | Car rental Electronic City Bangalore | Electronic City cab service, corporate travel Electronic City |
| `car-rental-koramangala` | Car rental Koramangala Bangalore | Koramangala taxi service, Koramangala outstation cab |
| `car-rental-indiranagar` | Car rental Indiranagar Bangalore | Indiranagar cab service |
| `car-rental-jayanagar` | Car rental Jayanagar Bangalore | Jayanagar taxi service, Jayanagar pilgrimage cab |
| `car-rental-jp-nagar` | Car rental JP Nagar Bangalore | JP Nagar cab service |
| `car-rental-marathahalli` | Car rental Marathahalli Bangalore | Marathahalli taxi service, ORR cab service |
| `car-rental-hebbal` | Car rental Hebbal Bangalore | Hebbal airport taxi |
| `car-rental-yelahanka` | Car rental Yelahanka Bangalore | Yelahanka airport cab |
| `car-rental-yeshwanthpur` | Car rental Yeshwanthpur Bangalore | Yeshwanthpur railway station taxi |

### Route pages (`/routes/[slug]`)

| Page | Primary Keyword | Supporting Keywords |
|---|---|---|
| `bangalore-to-mysore-cab` | Bangalore to Mysore cab | Bangalore Mysore taxi fare, Mysore day trip cab |
| `bangalore-to-coorg-cab` | Bangalore to Coorg cab | Bangalore Coorg taxi, Coorg round trip cab |
| `bangalore-to-ooty-cab` | Bangalore to Ooty cab | Bangalore Ooty taxi, Ooty Tempo Traveller |
| `bangalore-to-chikmagalur-cab` | Bangalore to Chikmagalur cab | Chikmagalur weekend trip taxi |
| `bangalore-to-hampi-cab` | Bangalore to Hampi cab | Bangalore Hampi taxi, Hampi heritage trip cab |
| `bangalore-to-tirupati-cab` | Bangalore to Tirupati cab | Tirupati pilgrimage taxi, Bangalore Tirupati one day trip |
| `bangalore-to-pondicherry-cab` | Bangalore to Pondicherry cab | Pondicherry weekend trip taxi |
| `bangalore-to-chennai-cab` | Bangalore to Chennai cab | Bangalore Chennai taxi, NH44 cab service |
| `bangalore-to-hyderabad-cab` | Bangalore to Hyderabad cab | Bangalore Hyderabad taxi |
| `bangalore-to-mangalore-cab` | Bangalore to Mangalore cab | Bangalore Mangalore taxi, Western Ghats cab route |

**Cannibalization check:** each primary keyword above is owned by exactly one
URL. The homepage intentionally stays generic ("Car & Tempo Traveller rental
Bangalore" as a category umbrella) rather than competing with any single
vehicle/service/location/route page for a specific long-tail phrase.

---

## (b) Backlink Outreach Plan (white-hat only)

**Guardrails:** no PBNs, no paid link packages, no link farms, no reciprocal
link schemes. Every tactic below is either a legitimate local citation, a
genuine partner relationship, or content-based digital PR.

### 1. Local citations (foundational, do first)
Ensure identical NAP (Name, Address, Phone) across:
- Google Business Profile (see section d)
- Justdial, Sulekha, IndiaMART (Indian local directories)
- Bing Places
- Apple Maps / Apple Business Connect
- TripAdvisor (as a transportation/tour operator listing)
- Facebook Business Page, Instagram bio link
- Karnataka Tourism-affiliated directories, if the business is registered
  with the state tourism board (footer already claims "Registered under
  Karnataka Tourism Board" — confirm and link to the actual registration
  listing if one exists publicly)

### 2. Partner backlinks (relationship-based, highest quality)
- **Hotels & resorts** at the destinations we serve (Coorg, Ooty, Mysore,
  Chikmagalur, Hampi) — offer a reciprocal "recommended transport partner"
  listing on their website in exchange for the same on ours (a "Travel
  Partners" section could be added to the site later). Approach 3-5
  homestays/resorts per destination.
- **Wedding venues & banquet halls** in Bangalore — many maintain a vendor/
  partner page for caterers, decorators, and transport; Sushi Travels'
  `/services/wedding-vehicle-rental-bangalore` page is the natural link
  target for this outreach.
- **Corporate offsite/event management companies** — cross-referral
  relationship where the event company lists Sushi Travels as their
  transport vendor, linking to `/services/corporate-transport-bangalore`.
- **Travel agents / tour operators** who don't own vehicles themselves and
  subcontract transport — a natural, non-competitive partnership.

### 3. Guest article topics (for travel blogs, local Bangalore publications)
Pitch these as genuinely useful articles (not thinly-veiled ads), with one
contextual link back to the most relevant Sushi Travels page:
1. "A First-Timer's Guide to the Bangalore–Ooty Hairpin Bends" → links to
   `/routes/bangalore-to-ooty-cab`
2. "Choosing the Right Vehicle for a Group Trip: Tempo Traveller vs. Force
   Urbania vs. Mini Bus" → links to `/vehicles/bus-rental-bangalore`
3. "Planning a Multi-Family Wedding Transport Schedule in Bangalore" →
   links to `/services/wedding-vehicle-rental-bangalore`
4. "What to Know Before an Early-Morning Tirupati Darshan Trip from
   Bangalore" → links to `/routes/bangalore-to-tirupati-cab`

### 4. Digital PR ideas
- Seasonal press-style pieces timed to wedding season, festival travel
  (Dasara/Mysore), and monsoon hill-station travel advisories — pitched to
  local Bangalore lifestyle publications.
- A simple, factual "South India outstation distance & travel time guide"
  resource page (expanding on the `/routes` hub) that other travel bloggers
  might cite as a reference.

### 5. Anchor text mix (avoid over-optimization)
Recommended distribution when outreach partners ask what anchor text to use:
- ~40% branded ("Sushi Travels", "Sushi Tours & Travels")
- ~30% natural/generic ("this transport provider", "their booking page",
  "check availability here")
- ~20% partial-match keyword ("Tempo Traveller rental in Bangalore",
  "Bangalore to Coorg cab")
- ~10% exact-match keyword (used sparingly, only on the most relevant
  page — e.g. exact-match "Bangalore airport taxi" only pointing to
  `/services/bangalore-airport-taxi`)

---

## (c) Blog Content Plan — 15 Topics (documentation only; Blog not rebuilt)

Per `NOTES.md` section 8, the Blog section was deliberately removed from
this codebase in a prior pass (it was empty with no content or plan). This
list is purely a plan for **if/when** the owner wants to reintroduce a blog
— no blog infrastructure was rebuilt in this pass.

| # | Topic | Links to |
|---|---|---|
| 1 | Bangalore to Coorg: Complete Route Guide & Best Stops | `/routes/bangalore-to-coorg-cab` |
| 2 | How Much Does a Tempo Traveller Cost in Bangalore? (Rate Breakdown Explained) | `/vehicles/tempo-traveller-rental-bangalore` |
| 3 | Sedan vs. SUV vs. Tempo Traveller: Which Rental Fits Your Group? | `/vehicles` (hub) |
| 4 | Kempegowda Airport Taxi: What First-Time Bangalore Visitors Should Know | `/services/bangalore-airport-taxi` |
| 5 | Planning a Same-Day Tirupati Darshan Trip from Bangalore | `/routes/bangalore-to-tirupati-cab` |
| 6 | The Ultimate Weekend Getaway Checklist: Bangalore to Chikmagalur | `/routes/bangalore-to-chikmagalur-cab` |
| 7 | Corporate Offsite Transport Planning: A Practical Checklist | `/services/corporate-transport-bangalore` |
| 8 | Wedding Guest Transportation: How to Plan Multi-Venue Logistics | `/services/wedding-vehicle-rental-bangalore` |
| 9 | Hampi in 2 Days: A Heritage Itinerary from Bangalore | `/routes/bangalore-to-hampi-cab` |
| 10 | Force Urbania vs. Traditional Tempo Traveller: What's the Difference? | `/vehicles/force-urbania-12-seater-maharaja-bangalore` |
| 11 | Driving the Bangalore–Ooty Ghat Road: What to Expect | `/routes/bangalore-to-ooty-cab` |
| 12 | Choosing a Bus Size for School & College Group Trips | `/vehicles/bus-rental-bangalore` |
| 13 | Living in Whitefield/Electronic City: A Commuter's Guide to Local Transport Options | `/locations/car-rental-whitefield` |
| 14 | Bangalore to Goa Road Trip: What Group Size Needs What Vehicle | `/tours-and-packages` (Goa package) |
| 15 | Monsoon Travel Tips for Western Ghats Routes (Coorg, Chikmagalur, Mangalore) | `/routes/bangalore-to-mangalore-cab` |

---

## (d) Google Business Profile Recommendations

**This section is pure documentation for the owner to action manually** —
this pass has no access to the actual Google Business Profile account.

### Categories
- Primary category: **Airport Shuttle Service** or **Chauffeur Service**
  (whichever GBP allows as primary — both are accurate to the business
  model)
- Additional categories: **Car Rental Agency**, **Tour Operator**,
  **Limousine Service** (if GBP's taxonomy includes it and it doesn't
  overstate the offering), **Wedding Service** (if a distinct category
  exists for transport-only wedding vendors)

### NAP consistency (must match the site exactly)
- Name: **Sushi Travels** (GBP business name field) — consider adding
  "Sushi Tours & Travels" as a secondary/alternate name if GBP supports it,
  since both forms are used across the site and in the footer/social links
- Phone: +91 90716 60099
- Address: No 272, corner shop, G/F, 8th cross, Opposite to BBMP office
  Bhuvaneshwari Nagara Dodda Basti Main Road, post, Nagadevana Halli,
  Bengaluru, Karnataka 560056
- Website: https://sushitravels.com

### Service descriptions (one per GBP "Services" entry, matching site copy)
Use the `heroSubtitle` / `geoSummary` text already written for each service
page as the source copy (keeps GBP and the website consistent):
- Airport Taxi — pulled from `/services/bangalore-airport-taxi`
- Outstation Cab Service — pulled from `/services/outstation-cab-bangalore`
- Local Taxi — pulled from `/services/local-taxi-bangalore`
- Corporate Transport — pulled from `/services/corporate-transport-bangalore`
- Wedding Vehicle Rental — pulled from `/services/wedding-vehicle-rental-bangalore`
- Sightseeing Cab — pulled from `/services/bangalore-sightseeing-cab`

### Per-vehicle GBP posts/photos
GBP "Products" or regular Posts can list each confirmed vehicle tier with
its real per-km rate exactly as it appears in `src/lib/vehicles.ts` — do not
post a rate there that isn't also on the live site, to avoid an inconsistent
public price. Use the real fleet photos already in `public/fleet/` (same
ones used across the site) rather than stock photography, for GBP photo
authenticity signals.

### Operational recommendations
- Keep GBP hours consistent with the footer's stated 24/7 operation and the
  standard 6:00 AM–10:00 PM duty window mentioned on every vehicle page —
  consider clarifying in the GBP description that bookings run 24/7 but
  standard chauffeur duty hours are 6 AM–10 PM, to avoid a mismatch between
  "open 24 hours" and the actual duty-hour terms customers will be quoted.
- Do not solicit or post fake reviews. Encourage genuine customers to leave
  reviews post-trip via a simple WhatsApp follow-up message — this is the
  only review-generation tactic recommended, consistent with the project's
  no-fake-reviews rule (see `NOTES.md`).
- Geo-tag GBP posts to the areas covered by `/locations/[slug]` pages where
  relevant (e.g. a post about airport transfers can reference the Hebbal/
  Yelahanka service area) to reinforce local relevance signals.
