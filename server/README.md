# Voltech website API (Express + MySQL)

Stores **Contact Us enquiries** and **internship applications (with CV upload)** in MySQL.

## 1. Setup
```bash
cd server
npm install
cp .env.example .env        # fill in DB_* and ADMIN_API_KEY
npm run db:init             # creates the database + 2 tables (or run sql/schema.sql manually)
npm run dev                 # http://localhost:5000
```
Check it works: `GET http://localhost:5000/api/health` → `{"ok":true,"db":true}`

Then run the website from the project root with `npm run dev`. Vite forwards `/api` to port 5000.

## 2. Tables
| Table | Filled by | Notes |
|---|---|---|
| `contact_enquiries` | Contact page form | `status`: new / in_progress / replied / closed / spam |
| `internship_applications` | Careers → Internship form | CV saved in `uploads/cv/` with a random name; original name, type and size stored in the row. `status`: new / shortlisted / interview / selected / rejected |

## 3. Endpoints
| Method | Path | Body |
|---|---|---|
| POST | `/api/contact` | JSON: name, email, service, message (+ company, phone, budget) |
| POST | `/api/internship` | multipart: fullName, email, phone, college, course, yearOfStudy, area, consent, **cv** (+ duration, startDate, skills, portfolioUrl, linkedinUrl, message) |
| GET | `/api/internship/options` | dropdown values |
| GET | `/api/admin/contacts?status=new&page=1` | header `x-api-key` |
| GET | `/api/admin/internships?status=new&area=...` | header `x-api-key` |
| GET | `/api/admin/internships/:id/cv` | header `x-api-key` — downloads the CV |
| PATCH | `/api/admin/contacts/:id` · `/api/admin/internships/:id` | `{ "status": "..." }` + `x-api-key` |

## 4. Protection built in
- Server-side validation (errors are shown next to each form field)
- Honeypot field for bots, rate limit of 10 submissions / 15 min per IP
- CV: PDF/DOC/DOCX only, max 5 MB, file signature checked, random file name, stored outside the web root
- Parameterised SQL everywhere, Helmet security headers, CORS allow-list

## 5. Production (Nginx on the same domain)
```nginx
location /api/ {
    proxy_pass http://127.0.0.1:5000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    client_max_body_size 6m;   # CV uploads
}
```
Set `TRUST_PROXY=1` and your real domain in `CORS_ORIGIN`. Keep `VITE_API_URL` empty in the front end.
Run with a process manager, e.g. `pm2 start src/index.js --name voltech-api`.

---

# CMS (built in)

A lightweight content manager — no WordPress. Dashboard at **`/admin`**.

## First-time setup
```bash
cd server
npm install                  # new packages: bcryptjs, jsonwebtoken, cookie-parser, sanitize-html
npm run db:init              # adds the CMS tables (safe to re-run, existing data is kept)
npm run cms:create-admin     # asks for name, email and password
npm run dev
```
Add to `server/.env` (see `.env.example`):
```env
JWT_SECRET=<a long random string, 24+ characters>
COOKIE_SECURE=0      # 1 in production (HTTPS)
STORAGE_DRIVER=local
```
Then open `http://localhost:5173/admin` and sign in.

## What editors can manage
| Collection | Shown on | Notes |
|---|---|---|
| News & insights | `/news`, `/news/:slug` | Rich-text article, cover image, category, tags, SEO fields |
| Job openings | Careers → Open positions | Falls back to `CAREERS.jobs` in `src/content/company.js` if the API is down |
| FAQs | `/faq` | Uses the built-in list until at least one FAQ is published |

Add or change fields in **`server/src/cms/collections.js`** — the dashboard builds its forms from that file.

## Draft / Publish
- **Save draft** (Ctrl + S) — private; the website doesn't change.
- **Publish** — copies the draft to the live version.
- Editing a published entry shows **"Unpublished changes"**; the site keeps the old version until **Publish changes**.
- **Preview draft** opens the real page with the draft (only for signed-in users).
- **Discard unpublished changes**, **Unpublish**, **Archive**, **Delete** (admins only).
- Every publish is saved in **Published versions** — restore any of them into the draft.

## Roles
- **Editor** — create, edit, publish, upload media, view enquiries/applications.
- **Admin** — everything, plus delete entries and manage users.

## Media storage
- `STORAGE_DRIVER=local` → files in `server/uploads/media/YYYY/MM/`, served at `/uploads/media/...`
- `STORAGE_DRIVER=s3` → `npm install @aws-sdk/client-s3`, fill the `S3_*` values (AWS S3, Cloudflare R2, DigitalOcean Spaces). Existing local files keep working.
- JPG, PNG, WEBP, GIF, PDF · 8 MB max · file signature checked · SVG blocked (can carry scripts).

## Security
- Passwords hashed with bcrypt; sign-in rate-limited (8 tries / 15 min)
- Session in an httpOnly, SameSite cookie; every write also needs the `X-Requested-With: cms` header (CSRF)
- Rich text is sanitised on the server (scripts, event handlers and `javascript:` links removed)
- The public API only ever returns published data

## Production (Nginx) — add to the /api block from above
```nginx
location /uploads/media/ {
    proxy_pass http://127.0.0.1:5000;
    expires 365d;
}
location /api/cms/media { client_max_body_size 10m; proxy_pass http://127.0.0.1:5000; }
```
