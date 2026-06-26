# DNS Records — tasweeqat.com (Cloudflare)

> Managed via Cloudflare | Last updated: 2026-06-26 (all records updated to new VPS)

## Server IPs

| Server | IP | Notes |
|--------|-----|-------|
| **New VPS (Hostinger)** | `187.124.51.48` | Ubuntu 24.04 + Coolify — active |
| **Nailart server** | `65.21.236.178` | Separate server for nailart project |

---

## A Records (all updated to 187.124.51.48)

| Subdomain | IP | Proxy | Notes |
|-----------|-----|-------|-------|
| `tasweeqat.com` (root) | 187.124.51.48 | Proxied | ✅ Main Tasweeqat website |
| `www` | 187.124.51.48 | Proxied | ✅ Same as root |
| `ai` | 187.124.51.48 | Proxied | ✅ Hermes Agent (Abdullah) |
| `hermes` | 187.124.51.48 | Proxied | ✅ Hermes Agent (brother) — add this record |
| `automation` | 187.124.51.48 | Proxied | Future |
| `business` | 187.124.51.48 | Proxied | Future |
| `consult` | 187.124.51.48 | Proxied | Future |
| `crm` | 187.124.51.48 | Proxied | Future: CRM system |
| `smartcrm` | 187.124.51.48 | Proxied | Future |
| `smartsolution` | 187.124.51.48 | Proxied | Future |
| `store` | 187.124.51.48 | Proxied | Future: E-commerce |
| `website` | 187.124.51.48 | Proxied | Future |
| `whatsapp` | 187.124.51.48 | Proxied | Future |
| `nailart` | 65.21.236.178 | Proxied | Nailart client site |
| `nice.nailart` | 65.21.236.178 | Proxied | ⚠️ Warning on record |

---

## Other Records

| Name | Type | Content | Proxy | Notes |
|------|------|---------|-------|-------|
| `mail` | CNAME | ghs.googlehosted.com | Proxied | Google Workspace mail |
| `n8n` | A → pending | 187.124.51.48 | Proxied | n8n automation (was Tunnel, update later) |
| `tasweeqat.com` | MX | smtp.google.com | DNS only | Google Workspace email |
| `google._domainkey` | TXT | v=DKIM1;k=rsa;p=... | DNS only | Google DKIM for email |

---

## Active Subdomain Map

| URL | Project | Status |
|-----|---------|--------|
| `tasweeqat.com` | Main marketing website (Next.js) | 🚧 Deploying |
| `www.tasweeqat.com` | Redirect → root | 🚧 Deploying |
| `n8n.tasweeqat.com` | n8n automation platform | 🔜 Later |
| `ai.tasweeqat.com` | Hermes Agent — Abdullah | 🔜 Later |
| `hermes.tasweeqat.com` | Hermes Agent — brother | 🔜 Later |

---

## Deployment Plan — New VPS (187.124.51.48)

When deploying a new project, add an A record in Cloudflare:

```
Type:    A
Name:    <subdomain>
Content: 187.124.51.48
Proxy:   Proxied (orange cloud ON)
TTL:     Auto
```

### Steps to deploy via Coolify

1. Go to Cloudflare → tasweeqat.com → DNS → verify A record exists
2. In Coolify: New Project → New Resource → Application
3. Connect GitHub repo or upload files
4. Set domain to `<subdomain>.tasweeqat.com`
5. Coolify handles SSL automatically via Let's Encrypt

### Steps to add a new project subdomain

1. Go to Cloudflare → tasweeqat.com → DNS → Records
2. Click **Add record**
3. Type: `A`, Name: `<subdomain>`, Content: `187.124.51.48`, Proxy: ON
4. In Coolify: New Project → New Resource → point domain to `<subdomain>.tasweeqat.com`
5. Coolify handles SSL automatically via Let's Encrypt
