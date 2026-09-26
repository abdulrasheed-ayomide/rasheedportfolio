# Rasheed Ayomide — Developer Portfolio

A dark, responsive developer portfolio with a working contact system.

| Folder    | What it is |
|-----------|------------|
| `client/` | React + Vite + React Router website (Home, About, Portfolio, CV) |
| `server/` | Node.js + Express API that saves contact messages to MongoDB and emails you |

---

## 1. Quick start

You need **Node.js 20 or newer** (`node -v` to check).

```bash
# from this folder
npm run install:all          # installs root, client and server packages

# create your env files (Windows)
copy client\.env.example client\.env
copy server\.env.example server\.env
# (Mac/Linux: cp client/.env.example client/.env && cp server/.env.example server/.env)
# then open server/.env and set MONGODB_URI (local MongoDB or Atlas)

npm run dev                  # starts the API (port 5000) and the website (port 5173) together
```

Open http://localhost:5173. The API health check is at http://localhost:5000/api/health.

Without MongoDB the site works fully; the contact form just shows a friendly
"temporarily unavailable" message until `MONGODB_URI` is set.

### Scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | API and website together |
| `npm run dev:client` | Website only |
| `npm run dev:server` | API only (auto-restarts on changes) |
| `npm run build` | Production build of the website into `client/dist` |
| `npm start` | API in production mode |
| `npm test` | API tests (validation, spam protection, rate limiting, errors) |

---

## 2. Environment variables

### `client/.env`

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | Yes | API base URL. Dev: `http://localhost:5000/api`. Production: your deployed API, e.g. `https://your-api.onrender.com/api` |

### `server/.env`

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | **Yes** (to save messages) | MongoDB Atlas or local connection string |
| `CLIENT_URL` | **Yes** in production | Allowed website origin(s), comma-separated, no trailing slash |
| `PORT` | No | Default `5000` |
| `NODE_ENV` | No | `development` or `production` |
| `TRUST_PROXY` | No | Set `1` on Render/Railway so rate limiting sees real visitor IPs |
| `CONTACT_RATE_WINDOW_MINUTES`, `CONTACT_RATE_MAX` | No | Contact rate limit (default 5 messages per 15 minutes per IP) |
| `MAIL_PROVIDER` | No | `resend`, `smtp`, `console` or empty (notifications off) |
| `CONTACT_TO_EMAIL` | For email | Your inbox for new-message notifications |
| `MAIL_FROM` | For email | Sender, e.g. `Portfolio <hello@yourdomain.com>` |
| `RESEND_API_KEY` | For Resend | From resend.com |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` | For SMTP | Any SMTP server (Gmail with an app password, Zoho, Brevo...) |

If email is not configured, or sending fails, **the message is still saved** to MongoDB
and the visitor still sees success. Failures are logged without secrets.

---

## 3. Editing content (and reusing this for someone else)

Everything personal lives in data files. Components never need editing.

| To change | Edit |
|-----------|------|
| Name, title, bio, email, WhatsApp, social links, CV path, education, contact text, SEO | `client/src/config/portfolio.js` |
| Accent colour, background, fonts, radius, spacing | `client/src/config/theme.js` |
| Projects (featured and selected) | `client/src/data/projects.js` |
| Technologies and their groups | `client/src/data/technologies.js` |
| Profile photo | Replace `client/src/assets/profile.webp` and `profile.jpg` (portrait, about 640×800) |
| Project images | Put files in `client/src/assets/projects/` and import them in `projects.js` |
| CV | Replace `client/public/cv/Rasheed_Ayomide_CV.pdf` (or change `cv.file` in `portfolio.js`) |
| Share image and favicon | `client/public/og-image.jpg` (1200×630), `client/public/favicon.svg` |
| Static page title / Open Graph tags | `client/index.html` |

**New accent colour:** in `theme.js` change `accent: '#FFB900'` to e.g. `'#4F46E5'`,
and set `accentText` to `'#FFFFFF'` if the new colour is dark. Also update the colour in
`favicon.svg`.

**Hiding things:** set a link to `null` (for example `x: null`, `whatsapp: null`,
`liveUrl: null`) and it disappears everywhere.

**Project status** values: `live`, `source`, `in-progress`, `coming-soon`.
Only list `technicalDecisions` that are true for the project.

---

## 4. Contact API

`POST /api/contact` with JSON `{ name, email, message, website, startedAt }`.

Protection built in:
- Server-side validation (never trusts the browser) and length limits (message max 2000 characters)
- Input sanitising (HTML tags and control characters stripped; only plain strings accepted)
- Honeypot field (`website`) and a minimum fill time, which silently drop bots
- Link-stuffing check (more than 3 links is rejected)
- Duplicate protection (the same email + message within 10 minutes returns 409)
- Rate limiting (contact route and all `/api` routes)
- Helmet security headers, CORS restricted to `CLIENT_URL`, 10 KB body limit
- Safe error responses: no stack traces or internal details are ever returned

Messages are stored in the `contactmessages` collection:
`name`, `email`, `message`, `status` (`new` | `read` | `archived`), `createdAt`, `updatedAt`.
View them in MongoDB Compass or Atlas.

### Tests

```bash
npm test
```

To also run the database tests, point `TEST_MONGODB_URI` at a **throwaway** database
(the test collection is cleared):

```bash
# Windows (cmd)
set TEST_MONGODB_URI=mongodb://127.0.0.1:27017/portfolio_test && npm test
```

---

## 5. Deploying

**Website (Vercel):** import the repo, set *Root Directory* to `client`, add
`VITE_API_URL` pointing to your API. `client/vercel.json` already handles page refreshes
on `/about`, `/portfolio` and `/cv`.

**API (Render or Railway):** root directory `server`, build `npm install`, start
`npm start`. Add the variables from `server/.env.example`, with
`NODE_ENV=production`, `TRUST_PROXY=1` and `CLIENT_URL=https://your-site.vercel.app`.

**Database:** a free MongoDB Atlas M0 cluster is enough. Allow your host's IPs under
*Network Access*.

After deploying, update `og:url` and `og:image` in `client/index.html` to your full domain
so link previews show the image.

---

## 6. Things to finish

- [ ] Confirm the **Saki Stars FC role** wording in `projects.js` (`role` field).
- [ ] Add **Spring Financial Bank** `githubUrl` / `liveUrl` when ready and change its `status`.
- [ ] Replace the illustrated previews for Saki Stars FC, Spring Financial Bank and
      Natural Blackstrap Molasses (`src/assets/projects/*.svg`) with real screenshots.
- [ ] Add your X profile link in `portfolio.js` if you want it shown.
- [ ] Set up MongoDB and email in `server/.env`.
