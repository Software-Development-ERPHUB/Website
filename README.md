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

## Enterprise platform pages
- `/` home: cinematic hero, Chairman & MD feature, services, module cards, platform diagram, HRMS/Finance/Manufacturing previews, client demo, industries, Why Voltech.
- `/platform`: integrated platform overview. `/solutions/hrms`, `/solutions/finance`, `/solutions/manufacturing`: standalone module pages (one reusable `pages/SolutionPage.jsx`).
- All module names, colours, routes and features live in `src/content/platform.js`; components are in `src/components/platform/`.
- Brand colours are CSS variables at the top of `src/index.css` (the previous green values are noted there).
- "Request a Demo" buttons open `/contact?demo=<hrms|finance|manufacturing|platform>`, which preselects the demo in the existing contact form.
- Dashboard previews are illustrative sample data. Industry photos are the group's existing site images (`content/images.js`, keys `ind*`); replace with larger licensed photos using the same keys.

## Client Demo
`/client-demo` lists the demos by suite (HRMS, Finance, Manufacturing). Edit them in `src/content/products.js`.
Each demo opens at `/client-demo/<slug>`, a full-screen viewer that loads `public/demo/<slug>/index.html`,
so clients never see an HTML file name. To add or replace a demo, put the HTML file at
`public/demo/<slug>/index.html` and set the product's `status` to `'demo'`. Products marked `'soon'` show a
placeholder page; `'live'` products (the CRM) open their `liveUrl` in a new tab. Old `/products` links redirect.
`/demo/` and the viewer pages are excluded from search engines in `robots.txt`.

## Development tracker (internal)

Sign in to the CMS at `/admin` and open **Development → Development tracker**. It replaces the Excel sheet: every application has 10 stages (client discussion, SRS, MOM sign-off, client suggestions, HTML demo, client review, frontend, backend, testing, deployment), and each stage records who did it, its status, dates and a note.

- **First run:** an admin presses **Load catalogue**. This adds Voltech Enterprise, suites A–E and modules 1–33 from the ERP catalogue (`server/src/cms/catalogue.js`), plus five placeholder developers. Pressing it again only adds what is missing.
- **Team members:** rename the placeholders under Development → Team members. Untick "Currently on the team" when someone leaves; their credits stay.
- **Pipeline** shows every application by suite, with the initials of the person on each stage. Filter by suite or developer, or download a CSV for Excel.
- **Team credits** counts every stage marked Done for each person, so the manager can see who built what.
- Applications and team members are internal collections: the public API refuses them (`/api/public/apps` → 404) and they have no Publish step.
- Add new applications (future modules) with **New application**: pick Type (Enterprise application, Suite or Module) and the suite letter.

### Developer logins

- After updating the code, run `npm run db:init` in `server/` once. It adds the Developer role and two tables (`tracker_activity`, `tracker_files`) without touching existing data.
- For each developer: **Settings → Users → Add user** with role **Developer**, then **Development → Team members → their name → Login email** set to the same email. That links their login to their stages.
- Developers see only **My work** (their stages: status, dates, note, file uploads, and "Pick up a stage" for unassigned work), the **Team dashboard** (read-only) and **My account**. They cannot change other people's stages or any website content, enquiries, media or users.
- **Overview** tab (Development tracker): who is working on what, projects in progress, stages "In progress" with no update for 7 days, and recent activity. Each application's editor page shows its stage files and full history.
- Files (PDF, Word, Excel, PowerPoint, JPG/PNG/WEBP, ZIP; 20 MB max) are saved in `server/uploads/tracker/`, which is never served publicly. They download through the API for signed-in users only. Back this folder up with the database.

## Search and languages
- **Global search** — header search button, `Ctrl/⌘ + K` or `/`. Index is built from `src/content/*` and `src/data/companies.js` (`src/lib/searchIndex.js`), so new content is searchable automatically.
- **Language menu** — 23 languages via Google Website Translator (`src/lib/translate.js`). Loaded only when a visitor picks a non-English language.
  Text that must stay in English (brand, company, product and people names, technology names, emails, addresses) is marked with `translate="no"` + `className="notranslate"` — add the same to anything new that should not translate.
