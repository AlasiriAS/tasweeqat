# Tasweeqat — Full App Documentation

**تسويقات** · 100 Websites in 100 Days CRM & Marketing Platform

---

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Local Development Setup](#local-development-setup)
5. [Database](#database)
6. [Authentication & Roles](#authentication--roles)
7. [Pages & Features](#pages--features)
8. [API Reference](#api-reference)
9. [Docker Deployment (VPS)](#docker-deployment-vps)
10. [Environment Variables](#environment-variables)
11. [Future Integrations](#future-integrations)
12. [Upgrade Path](#upgrade-path)

---

## Overview

Tasweeqat is a bilingual (Arabic/English) business platform for the **100 Websites in 100 Days** project.

**Business model:**
- Website build: **2,000 SAR** (one-time)
- Monthly hosting: **50 SAR/month**

**Core workflow:**
1. Gather leads from Google Maps (1,407+ Saudi businesses identified)
2. Filter and prioritize by website status, rating, and reviews
3. Contact prospects and pitch
4. Build website with AI assistance
5. Deliver and collect feedback (2 free revisions included)
6. Upsell: social media, SEO, CRM, paid ads

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 + custom design system |
| Database | SQLite (dev) → PostgreSQL (prod option) |
| ORM | Prisma 5 |
| Auth | NextAuth.js v4 (credentials + JWT) |
| Charts | Recharts |
| Drag & Drop | @hello-pangea/dnd |
| Animations | Framer Motion |
| Themes | next-themes (dark/light) |
| Notifications | react-hot-toast |
| Validation | Zod |
| Passwords | bcryptjs |

---

## Project Structure

```
tasweeqat/
├── prisma/
│   ├── schema.prisma          # Database models
│   └── seed.ts                # Seeds admin user + 1,407 leads
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout (Cairo font, Providers)
│   │   ├── page.tsx           # Public marketing homepage
│   │   ├── login/             # Login page
│   │   ├── dashboard/
│   │   │   ├── layout.tsx     # Dashboard shell (auth guard)
│   │   │   ├── page.tsx       # Overview KPIs + charts
│   │   │   ├── leads/         # Leads database + filters
│   │   │   └── crm/           # CRM Kanban pipeline
│   │   └── api/
│   │       ├── auth/          # NextAuth handler
│   │       ├── contact/       # Website contact form
│   │       ├── leads/         # Leads CRUD
│   │       └── crm/           # CRM pipeline API
│   ├── components/
│   │   ├── marketing/         # Public website sections
│   │   └── dashboard/         # Dashboard UI components
│   └── lib/
│       ├── auth.ts            # NextAuth config
│       ├── prisma.ts          # Prisma singleton
│       └── utils.ts           # cn(), formatSAR(), constants
├── Dockerfile
├── docker-compose.yml
├── docker-entrypoint.sh
└── .env.production            # Production env template
```

---

## Local Development Setup

### Prerequisites

- Node.js 20+
- npm 9+

### Steps

```bash
# 1. Enter the project folder
cd tasweeqat

# 2. Install dependencies
npm install

# 3. Create local env file
cp .env.production .env.local
# Edit .env.local and set:
#   DATABASE_URL="file:./dev.db"
#   NEXTAUTH_URL="http://localhost:3000"
#   NEXTAUTH_SECRET="any-long-random-string"

# 4. Create DB tables
npx prisma db push

# 5. Seed the database (admin user + 1,407 leads)
npx prisma db seed

# 6. Start dev server
npm run dev
```

Open http://localhost:3000

**Login:** admin@tasweeqat.com · **Password:** Admin@2024!

---

## Database

### Key Models

**User** — Team members with roles (admin, manager, sales, developer, it, support)

**Lead** — 1,407+ Saudi businesses from Google Maps with:
- `websiteStatus`: no_website | social_only | broken_website | has_website
- `priorityScore`: 0–100 computed from website status, rating, reviews, phone
- `priority`: high / medium / low
- `presaleInfo`: AI-generated pitch text
- `pipelineStage`: null (not in pipeline) or current stage

**CrmRecord** — One per lead in the pipeline:
- `stage`: contact → info_gathering → building → review → delivered → upsell
- `agreedPrice`: default 2,000 SAR
- `hostingActive`: boolean (50 SAR/mo)
- `upsellServices`: JSON array of selected services

**CrmNote** — Internal notes per CRM record

**Activity** — Audit log: stage changes, notes, calls, emails

**ContactSubmission** — Inquiries from the public website contact form

### Priority Scoring Logic

```
+40  no website
+35  social only (no real site)
+25  broken website
+10  rating < 4.0
+10  review count > 10
+5   has phone number

≥ 50 → high
≥ 30 → medium
< 30 → low
```

---

## Authentication & Roles

| Role | Access |
|---|---|
| admin | Everything including Users and Settings |
| manager | Everything including Users and Settings |
| sales | Dashboard, Leads, CRM, Contacts |
| developer | Dashboard, Leads, CRM |
| it | Dashboard, Leads |
| support | Dashboard, Contacts |

Session uses JWT strategy. The `role` field is injected into the NextAuth session via the `jwt` and `session` callbacks in `src/lib/auth.ts`.

---

## Pages & Features

### Public Website (`/`)

- Animated gradient hero with particle effects and live counter animations
- Stats section: 2,000 SAR / 50 SAR/mo / 1,407+ leads / 100 websites goal
- 6 service cards with fade-up scroll animation
- Vision, Mission & Values section
- 5-step process timeline
- About section
- Contact form (saves to DB)
- Bilingual toggle (EN ↔ AR) — switches `dir` and `lang` on `<html>`
- Dark / light mode toggle

### Dashboard (`/dashboard`)

- 6 KPI cards: Total Leads, High Priority, In Pipeline, Delivered, Revenue, New Contacts
- Bar chart: leads by city
- Pie chart: website status distribution
- Horizontal funnel: pipeline stage counts
- Radial progress: 100-website goal tracker
- Recent activity feed
- New website inquiries panel

### Leads (`/dashboard/leads`)

- Table with search + 3 filter dropdowns (priority, city, website status)
- Filters reflected in URL for shareable links
- One-click "Add to CRM" per lead
- Tap-to-call phone links, website links

### CRM Pipeline (`/dashboard/crm`)

- Drag-and-drop Kanban (6 columns matching pipeline stages)
- Click any card to open the detail panel:
  - Stage switcher
  - One-click call / website links
  - Financials: agreed price + hosting toggle
  - Notes: add and view internal notes
- Optimistic UI updates (instant feedback, reverts on error)

---

## API Reference

### `POST /api/auth/[...nextauth]`
NextAuth credentials sign-in / sign-out.

### `GET /api/leads`
Returns filtered leads. Query params: `priority`, `city`, `status`, `search`, `take`.

### `POST /api/leads`
Create a new lead. Body: `{ businessName, category?, city?, phone?, website?, websiteStatus?, rating?, reviewCount? }`.
Roles: admin, manager, sales.

### `POST /api/crm/add-to-pipeline`
Move a lead into the CRM pipeline at stage `contact`.
Body: `{ leadId }`.

### `GET /api/crm`
Returns all CRM records with lead, assigned user, and latest note.

### `PATCH /api/crm`
Update a CRM record. Body: `{ id, stage?, agreedPrice?, hostingActive?, upsellServices?, note? }`.
Stage changes automatically log to the Activity table.

### `GET /api/contact`
Returns last 50 contact form submissions.

### `POST /api/contact`
Save a contact form submission. Body: `{ name, company?, phone?, email, service?, message }`.

---

## Docker Deployment (VPS)

### One-time VPS Setup (Hostinger KVM 2, Ubuntu 22.04)

```bash
# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo apt install docker-compose-plugin -y
```

### Deploy Tasweeqat

```bash
# 1. Upload project to VPS (or clone from git)
scp -r tasweeqat/ root@YOUR_VPS_IP:/opt/tasweeqat/

# 2. Create production .env
cp /opt/tasweeqat/.env.production /opt/tasweeqat/.env
nano /opt/tasweeqat/.env
# Fill in: NEXTAUTH_SECRET (random 40+ chars), NEXTAUTH_URL, ADMIN_PASSWORD

# 3. Build and start
cd /opt/tasweeqat
docker compose up -d --build

# 4. View logs
docker compose logs -f app

# 5. App is running at http://YOUR_VPS_IP:3000
```

### With Coolify (Recommended)

If you installed Coolify on your VPS:

1. Open Coolify at `http://YOUR_VPS_IP:8000`
2. New Project → New Resource → Docker Compose
3. Paste or upload `docker-compose.yml`
4. Set environment variables in the Coolify UI
5. Deploy

Coolify handles: auto-restart, SSL certificates (Let's Encrypt), reverse proxy, deployment from git.

### Nginx Reverse Proxy (without Coolify)

```nginx
server {
    server_name tasweeqat.com www.tasweeqat.com;

    location / {
        proxy_pass         http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Then run: `sudo certbot --nginx -d tasweeqat.com`

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | SQLite: `file:/app/data/prod.db` |
| `NEXTAUTH_SECRET` | Yes | Random string ≥ 32 chars |
| `NEXTAUTH_URL` | Yes | Full URL e.g. `https://tasweeqat.com` |
| `ADMIN_EMAIL` | Seed only | First admin account email |
| `ADMIN_PASSWORD` | Seed only | First admin account password |
| `N8N_HOST` | Optional | Hostname for n8n automation |
| `N8N_WEBHOOK_URL` | Optional | Public URL for n8n webhooks |

---

## Future Integrations

### n8n Automation
n8n is already in `docker-compose.yml`. Use it to:
- Auto-send WhatsApp messages when a lead is added to pipeline
- Notify team on Telegram when a website is delivered
- Send follow-up emails via Hostinger SMTP
- Trigger AI content generation with Hermes Agent

### WhatsApp (via n8n)
1. Connect n8n to WhatsApp Business API (or Twilio/360dialog)
2. Create a workflow: `CRM stage = "contact"` → send intro message
3. Webhook: incoming WhatsApp replies → create CrmNote

### Hermes Agent (AI)
- Runs separately (see `hermes/` folder — future)
- Uses external LLM API, ~700 MB RAM on KVM 2
- Use for: auto-generating presale pitches, website copy, social media posts

### Mailcow Email Server
When you need 8+ email accounts, self-hosted Mailcow on a second KVM 1 VPS is more cost-effective than Hostinger Business Email:
```
KVM 1 (2GB RAM) → Mailcow → unlimited mailboxes
MX record: mail.tasweeqat.com
```

---

## Upgrade Path

| Phase | Trigger | Action |
|---|---|---|
| Now | 0–20 sites | Hostinger KVM 2, France DC |
| Phase 2 | 20–30 sites | Upgrade to KVM 4 (4 vCPU, 8GB) |
| Phase 3 | 30–60 sites | Add Mailcow on KVM 1 for email |
| Phase 4 | 60–100 sites | Upgrade to KVM 8 or add KVM 4 |
| Phase 5 | Saudi clients dominant | Migrate to LightNode Riyadh |

---

## Team Accounts

Created by seed (`Team@2024!` password — **change immediately after first login**):

| Name | Email | Role |
|---|---|---|
| Admin | admin@tasweeqat.com | admin |
| Sales Manager | sales@tasweeqat.com | sales |
| Developer | dev@tasweeqat.com | developer |
| Support | support@tasweeqat.com | support |

---

*Built with Claude · Tasweeqat 2024*
