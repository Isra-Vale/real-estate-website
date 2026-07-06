# Guardian Properties — Luxury Real Estate Frontend

A fully built, animated front end for a luxury real estate brand, built with
**React 19 + Vite**, **Tailwind CSS v4**, and **Framer Motion**.

This implements the actual Guardian brand shown in the reference video and
screenshots (navy + gold, editorial serif type, cinematic hero) rather than
the literal "talking buildings / telepathic chat" copy from the original
concept doc — those ideas are translated into real, professional motion
patterns instead (see **Design Notes** below for the mapping).

## Quick start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build to /dist
npm run preview   # preview the production build
```

Requires Node 18+.

## Data: API-first with automatic mock fallback

Every page tries a real API first. If that request fails for **any** reason
— no API configured, network error, non-2xx response, or a timeout after 5
seconds — it transparently falls back to local mock data, with zero errors
shown to the user.

**Out of the box, with no setup, the app runs entirely on mock data.**

To point it at a real API:

1. Copy `.env.example` to `.env`.
2. Set `VITE_API_BASE_URL` to your API's base URL.
3. Restart `npm run dev`.

The app will then call:

```
GET {VITE_API_BASE_URL}/properties
GET {VITE_API_BASE_URL}/properties/:id
GET {VITE_API_BASE_URL}/agents
GET {VITE_API_BASE_URL}/testimonials
GET {VITE_API_BASE_URL}/stats
GET {VITE_API_BASE_URL}/posts
GET {VITE_API_BASE_URL}/posts/:id
GET {VITE_API_BASE_URL}/rentals
```

Each endpoint is expected to return JSON shaped like the corresponding
array in `src/data/mockData.js`. If your API is down, slow, or doesn't
exist yet, every one of these calls falls back to that same mock data
automatically — see `src/services/api.js` for the exact logic.

## Images: real photos with automatic placeholder fallback

Every property, agent, blog post, and rental has an `image` field, e.g.:

```js
{ id: "oceanfront-villa", image: "/images/oceanfront-villa.jpg", ... }
```

**Drop your image files into `public/images/`** using the filenames listed
in `public/images/README.md`. That's the only step required:

- If the file **exists**, it renders normally.
- If the file is **missing or fails to load**, the `<PropertyImage>` /
  `<AgentAvatar>` components automatically fall back to a generated
  placeholder graphic (a gradient skyline for properties, a gold monogram
  circle for agents) — never a broken-image icon.

This means you can ship the site today with zero real photography, and
swap in real images later one file at a time without touching any code.

## Stack

| Layer       | Choice                                   |
|-------------|-------------------------------------------|
| Framework   | React 19 + Vite 8                         |
| Styling     | Tailwind CSS v4 (CSS-first `@theme`)      |
| Motion      | Framer Motion 12                          |
| Routing     | React Router v7                           |
| Icons       | lucide-react                              |
| Fonts       | Fraunces (display), Inter (body) — Google Fonts |

## Project structure

```
src/
  components/        Reusable UI: Navbar, Footer, PropertyCard, Hero,
                      Stats, Testimonials, PropertyImage, AgentAvatar,
                      PropertyArt (placeholder generator), PageTransition,
                      CardGridSkeleton
  pages/              One file per route (see table below)
  data/mockData.js    Mock data used automatically as an API fallback —
                      properties, agents, testimonials, stats, posts, rentals
  services/api.js     Fetch-with-fallback layer (the API ↔ mock switch)
  hooks/
    useApiData.js           useProperties(), useAgents(), usePosts(), etc.
    useCountUp.js           scroll-triggered animated number counter
    useSavedContext.jsx     React context powering the "Saved" shortlist
                            (in-memory only — see note below)
  index.css           Design tokens (Tailwind v4 @theme) + global styles

public/
  images/             Drop real photography here (see images/README.md)
```

## Routes

| Path                  | Page                                          |
|------------------------|-----------------------------------------------|
| `/`                    | Home — hero carousel, stats, featured grid    |
| `/properties`          | Full listing grid with filter + sort          |
| `/properties/:id`      | Property detail page                          |
| `/rentals`             | Seasonal/long-term rental listings            |
| `/luxury`              | Curated high-end subset of the catalog        |
| `/agents`              | Agent profile cards                           |
| `/compare`             | Side-by-side property comparison tool         |
| `/saved`               | User's saved/shortlisted properties           |
| `/blog`                | Journal / article index                       |
| `/blog/:id`            | Article detail page                           |
| `/about`               | Company story, values, stats                  |
| `/contact`             | Contact form with success state               |

## Design notes

The token system lives in `src/index.css` under `@theme`:

- **Color** — void navy background (`--color-void`), warm gold accent
  (`--color-gold`), parchment text, slate for secondary copy.
- **Type** — Fraunces (display serif, used for all headlines) + Inter
  (body/UI). Small-caps tracked "eyebrow" utility class for labels.
- **Signature element** — the home page hero: a crossfading cinematic
  carousel synced to a sliding featured-property card.

### Translating the original "DIMENSIONS" concept

| Original idea                    | What's actually built                                          |
|-----------------------------------|------------------------------------------------------------------|
| Buildings with portal doors       | Hero crossfade carousel between properties                      |
| Living, breathing buildings       | Subtle hover scale/lift on property art + cards                 |
| Building Duel (Compare page)      | Real side-by-side spec comparison with a gold "leads in N of M categories" highlight |
| Memory Echoes (Saved page)        | A persistent shortlist with heart-toggle save state              |
| Telepathic Contact                | A real contact form with an animated success state               |
| Identity Mirror (Profile)         | Not built — no login/auth system exists yet; would need a real backend |

## Notes on the "Saved" feature

Saved properties are kept in a React context (`useSavedContext.jsx`) and
**reset on page reload** — there is intentionally no `localStorage` use
here, since this is meant to be wired up to a real backend/account system.

## Accessibility

- All interactive elements have visible focus rings (`.focus-ring`).
- Heart/save buttons use `aria-pressed` + `aria-label`.
- Respects `prefers-reduced-motion` (animations collapse to ~0 duration).
- Semantic headings throughout (`h1` per page, etc).

## Known placeholders to swap before shipping

- Phone numbers, emails, and the office address on `/contact` and `/agents`.
- Social links in the footer point to `#`.
- Newsletter form in the footer doesn't submit anywhere yet.
- `VITE_API_BASE_URL` is unset by default — set it in `.env` once your real
  API exists.
