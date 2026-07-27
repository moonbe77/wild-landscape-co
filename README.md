# Wild Landscape Co. — Website

Scaffold for the Wild Landscape Co. rebuild, per the website rebuild
proposal: **Astro + React (TypeScript)**, **Sanity** CMS, **Vercel**
hosting, **Resend** for the contact form.

## What's here

- `src/pages/` — Home, Projects (gallery), individual project pages,
  About, Contact
- `src/pages/api/contact.ts` — server route that emails you via Resend
  when someone submits the contact form
- `src/components/` — Header, Footer, SEO meta component, project card,
  React contact form
- `src/lib/sanity.ts`, `src/lib/queries.ts` — Sanity client + GROQ
  queries used by the pages
- `src/data/placeholderProjects.ts` — sample projects shown automatically
  until real content exists in Sanity, so the site never looks empty
  during development
- `studio/` — embedded Sanity Studio (schemas: `project`, `siteSettings`)

Styling is Tailwind CSS v4 (see `src/styles/global.css` for the
placeholder brand palette — swap the colors for the real brand once you
have them).

## 1. Install dependencies

```bash
pnpm install
```

## 2. Set up Sanity

1. Create a free account and project at [sanity.io/manage](https://www.sanity.io/manage)
   (or run `pnpm dlx sanity@latest init` from this folder and follow the
   prompts — it can create the project for you).
2. Copy `.env.example` to `.env` and fill in:
   - `SANITY_PROJECT_ID` — from the Sanity project you just created
   - `SANITY_DATASET` — usually `production`
3. Run the Studio locally to add content:

   ```bash
   pnpm studio:dev
   ```

   This opens the Studio at `http://localhost:3333`. Add a **Site
   Settings** entry and a few **Project** entries (each needs at least a
   title and cover image to show up on the site).

4. When ready, deploy the Studio so you can edit content from anywhere:

   ```bash
   pnpm studio:deploy
   ```

The site works with placeholder projects even before Sanity is
configured — once `SANITY_PROJECT_ID` is set and at least one project
exists in the dataset, real content automatically replaces the
placeholders.

## 3. Set up Resend (contact form emails)

1. Create an account at [resend.com](https://resend.com) and generate an
   API key.
2. In `.env`, set:
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL` — the inbox that should receive enquiries
   - `CONTACT_FROM_EMAIL` — use `onboarding@resend.dev` while testing, or
     a verified sending domain once you've added one in Resend

## 4. Run the site locally

```bash
pnpm dev
```

## 5. Deploy to Vercel

1. Push this repo to GitHub (or GitLab/Bitbucket).
2. Import it in [Vercel](https://vercel.com/new) — it auto-detects
   Astro.
3. Add the same environment variables from `.env` in the Vercel project
   settings (Sanity + Resend vars).
4. Update `site` in `astro.config.mjs` to the real production domain
   (needed for the sitemap and social share URLs to be correct).

## Content migration from Framer

Per the proposal, the next steps are:

1. Export/collect existing project text, images and copy from the
   current Framer site.
2. Add each project as a **Project** entry in the Studio (`pnpm studio:dev`).
3. Fill in the **About** page copy in `src/pages/about.astro` (currently
   placeholder text) and the **Site Settings** document in Sanity.
4. Replace `public/og-default.png` with the approved Open Graph share image
   when it is available (1200×630px recommended).
   (1200×630px recommended).

## Not included yet (future add-ons, per the proposal)

These were scoped as possible future work, not part of this initial
build:

- Blog section
- Booking system (Calendly / Stripe deposits)
- Project filtering by style/garden type
- Client testimonials section
- Seasonal/promotional landing pages

Adding a `testimonial` document type or a `post` type for a blog follows
the same pattern as `studio/schemaTypes/project.ts`.

## Tech stack reference

| Layer    | Choice                       |
| -------- | ----------------------------- |
| Frontend | Astro 7 + React 19 (TypeScript) |
| Styling  | Tailwind CSS v4                |
| CMS      | Sanity (embedded Studio)       |
| Hosting  | Vercel (`@astrojs/vercel` adapter) |
| Email    | Resend                         |
