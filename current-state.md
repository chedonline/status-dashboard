# Current State
> Last updated: April 2, 2026. Commit this to chedonline/context to resume from any machine.

---

## What we built this session (Apr 1–2)

### New Skills
- **site-status** — Puppeteer-based health check + screenshot for any URL. Node.js. Supports named aliases (`crooked-pixels`, `ai-news`). Tested and working.
- **deck-analysis** — Google Slides API extractor + Claude analysis. Python. Parked at 0% — needs `credentials.json` from Google Cloud Console to auth.

### New Agents
- **Sophie (job-hunter)** — Fetches VP/Director marketing/creative roles from Himalayas + Remotive APIs, scores with Claude Haiku, generates tailored CVs + cover letters for 8+ matches. First run scored 125 jobs, 57 passed threshold. Filter tightened to Director+ only, threshold raised to 8+.
- **Charlotte (site-admin)** — Domain registry and site lifecycle manager. 25 domains across Bluehost + 1and1. Full domain list in `agents/site-admin/domains.md`.

### New Sites
- **status-dashboard** — Live web dashboard at https://chedonline.github.io/status-dashboard/. Fetches projects.md locally. Public repo.
- **charleslim.net** — 1:1 PHP→static HTML port. Live on GitHub Pages with custom domain. HTTPS enforced. DNS pointed from 1and1 to GitHub Pages.
- **site-template** — Shared footer component (`footer.js`). One `<script>` tag includes on any site. Links to crookedpixels.com + charleslim.net.

### Infrastructure
- **Unified projects.md** — Single source of truth for all agents, skills, sites, redirects. Replaces separate agents table, skills-registry, and domains list.
- **Status skill updated** — Now shows PROJECTS table (unified), with Readiness %, Pending, Type columns.
- **GitHub Pro** — Upgraded. All repos now private except status-dashboard.
- **Root .env** — Centralized at `~/Dropbox/claude/.env`. All agents/skills source from here.
- **Local sync hook** — `context/.git/hooks/post-commit` copies projects.md + current-state.md to status-dashboard on commit.

---

## Repo structure

```
chedonline/          =    ~/Dropbox/claude/
  agents/            ←    ai-news, job-hunter (sophie), site-admin (charlotte), mme-claude
  projects/          ←    charleslim.net, site-template, status-dashboard
  skills/            ←    status, site-status, company-analysis, deck-analysis
  context/           ←    current-state.md, projects.md, stack.md, skills-registry.md
```

---

## GitHub repos (all private except status-dashboard)

| Repo | Visibility | Pages |
|---|---|---|
| agents | Private | ai-news at chedonline.github.io/agents/ai-news/output/ |
| context | Private | — |
| skills | Private | — |
| charleslim.net | Private | https://charleslim.net (custom domain, HTTPS) |
| site-template | Private | — |
| status-dashboard | **Public** | https://chedonline.github.io/status-dashboard/ |
| claude | Private | — |
| projects | Private | — |

---

## Domain registrars

- **Bluehost** (account #52750862): 21 domains. All on NS1/NS2.BLUEHOST.COM.
- **1and1**: charleslim.net (DNS pointed to GitHub Pages), chedched.com (Tumblr), chedonline.com (redirect → charleslim.net)

---

## Current issues / pending

- [ ] **Sophie filters** — Confirm filter logic, figure out Google Docs workflow for CV export
- [ ] **Sophie company data** — Add company website, LinkedIn, employee count columns
- [ ] **deck-analysis** — Download credentials.json from Google Cloud Console, enable Slides API, run auth.py
- [ ] **charleslim.net redesign** — Currently 1:1 port; needs messaging update (strategic > production)
- [ ] **crookedpixels.com** — Webflow build not started
- [ ] **designordeath.com** — Strongest domain, first showcase site to build
- [ ] **site-template** — Deploy to Pages, test footer include from CDN
- [ ] **Article count** — ai-news only 9-10 items passing threshold
- [ ] **YouTube quota** — Should have reset
- [ ] **Git identity** — fix with `git config --global`
- [ ] **Status dashboard sync** — post-commit hook works locally; no GitHub Action (needs workflow scope)
- [ ] **stepkick.com** — Expires May 2026, decide: keep or let go

---

## Agent aliases

| Alias | Agent | Location |
|---|---|---|
| Sophie | job-hunter | agents/job-hunter/ |
| Charlotte | site-admin | agents/site-admin/ |

---

## Key decisions this session

- Node.js for browser/web skills (site-status), Python for data/API agents (sophie, deck-analysis)
- Unified projects.md replaces separate registries — one table, type column distinguishes
- Types: Agent, Skill, Site, Template, Redirect, Personal
- GitHub Pro for private repo Pages
- All repos private except status-dashboard (needs public for web access)
- charleslim.net positioning: strategic leader, not production portfolio
- Root .env for centralized secrets
- site-template = includable component (footer.js), not a full repo clone

---

## How to resume on another machine

```bash
cd ~/Dropbox/claude
# Everything syncs via Dropbox + GitHub
# Just open Claude Code and say "status"
```
