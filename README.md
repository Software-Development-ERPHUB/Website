# Voltech IT Services — company website

React 18 + Vite 5 + Tailwind CSS 3. No CMS required — all content lives in `src/content/`.

## Run
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # also regenerates public/sitemap.xml + robots.txt
npm run preview
```

## Where to edit things
| What | File |
|---|---|
| Company name, domain, facts, address, email, phone, hours, **Google Map**, LinkedIn | `src/content/site.js` |
| Brand colours | `:root` in `src/index.css` |
| Services | `src/content/services.js` |
| Solutions & industries | `src/content/solutions.js` |
| Projects / case studies | `src/content/projects.js` |
| Leadership (CMD, Director, CEO) + slider | `src/content/leadership.js` |
| Development team page (`/team`) — names, roles, email, phone, photos | `src/content/team.js` |
| Images (register by key) | `src/content/images.js` → files in `src/assets/img/` |
| Tech stack, process, FAQs, careers/jobs, nav, budgets | `src/content/company.js` |
| Page titles & meta descriptions | `src/content/seo.js` |
| Logo | `src/components/ui/Logo.jsx`, `public/favicon.svg`, `public/og-default.jpg` |

## Before going live (search for `TODO`)
- `SITE.url` in `site.js` — real domain (canonical URLs + sitemap depend on it)
- Director & CEO: real names, photos, bios → set `sample: false`
- Phone, business hours, company LinkedIn, enquiry email (currently erp.notification@voltechgroup.com)
- `CONTACT.formEndpoint` — POST URL for the enquiry form (falls back to opening the visitor's email app)
- Confirm each project is approved for public showcase and its tech list
- Legal review of Privacy Policy and Terms

## Page banners & project images
- Every inner page uses `<PageHero art="…" />` — animated SVG illustrations in `src/components/art/BannerArt.jsx`
  (services, solutions, industries, projects, technology, about, careers, contact, faq, legal).
- To use a **real photo** as a page banner: add it to `images.js`, then pass `image="yourKey"` to that page's `<PageHero>`.
- Project cards without a screenshot get an illustrated app mockup generated from the project's modules
  (`src/components/art/AppMockup.jsx`). Add a real screenshot by setting `image` on the project in `projects.js`.
- Motion: scroll reveal (`Reveal.jsx`), count-up facts, hero slider, tech marquee, floating art, icon hover pops.
  All disabled automatically for users with "reduce motion" turned on.

## Team photos
All members use the `avatar` placeholder. To add a real photo: save a square WebP (≥400×400) to
`src/assets/img/`, register it in `images.js` (e.g. `santhosh: { src: santhosh, w: 400, h: 400 }`),
then set `photo: 'santhosh'` on that member in `team.js`. Hide phones/emails via `TEAM_SHOW_CONTACT`.

## Leadership photos
Portrait: 480×600 (4:5) WebP. Banner: 1600×780 WebP with the person on the right third
(the white card covers the left). Add to `src/assets/img/`, register in `images.js`, reference by key.

## Deployment
SPA — unknown paths must serve `index.html`. `public/.htaccess` handles Apache. For Nginx:
`location / { try_files $uri /index.html; }`

Old routes `/companies`, `/companies/:id`, `/websites` redirect to `/projects`.

## Search and languages
- **Global search** — header search button, `Ctrl/⌘ + K` or `/`. Index is built from `src/content/*` and `src/data/companies.js` (`src/lib/searchIndex.js`), so new content is searchable automatically.
- **Language menu** — 23 languages via Google Website Translator (`src/lib/translate.js`). Loaded only when a visitor picks a non-English language.
  Text that must stay in English (brand, company, product and people names, technology names, emails, addresses) is marked with `translate="no"` + `className="notranslate"` — add the same to anything new that should not translate.
