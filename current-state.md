# Current State
> Last updated: April 12, 2026. Commit this to chedonline/context to resume from any machine.

---

## What we built this session (Apr 12 — Crooked Pixels Webflow Build)

### crookedpixels.com — Phase 1 Front-End Rebuild (Webflow)
- **Webflow MCP build started** — Connected via Webflow MCP bridge, site ID `652c683af9121f403bb46dc4`, shortName `crkdpxls`
- **Layout restructured** — Replaced top nav bar with fixed left sidebar (260px, position fixed) matching WordPress layout. Main content offset via `section_main` style with `margin-left: 260px`
- **Sidebar component created** — Reusable "Sidebar" component (group: Layout) with logo, H1 "Crooked Pixels", tagline, byline. Used on homepage + article template
- **Typography restyled** — Body: `Merriweather, Georgia, serif` #444 18px. Headings: `Merriweather Sans, Arial, sans-serif` #333 weight 900. Links: `#0f3a40` default, `#dc1f2e` hover
- **Post card styles updated** — `post-title` responsive (46px→24px), `post-container` flex, `post-image` at 22.9% width, all Client-First naming
- **10+ new styles created** — `header_sidebar`, `section_main`, `footer_main`, `header_title`, `header_tagline`, `header_byline`, `header_logo-image`, `related_section`, `related_grid`, `related_heading`, `post-metadata`, `post-tags-link`, `post-divider`, `post-excerpt`
- **Old components removed** — Navigation, Contact, Email form stripped from homepage. Old Footer replaced with simple copyright div
- **Article template restructured** — Same Sidebar component + `section_main` offset. "What to Read Next" section with 2-column `related_grid`. Simple footer
- **`Heading` style fixed** — Removed Roboto override, now inherits Merriweather. Weight 900, color #333
- **Container widths set** — `container-medium` and `container-small` both set to `max-width: 880px`
- **All 18 dek lines written and published** — Subheadlines for every article in the CMS. Voice: provocative reframe, not summary. Field: `dek` (PlainText)
- **WP theme images downloaded** — `mask.png`, `logo.png`, 7 decoration GIFs saved to `projects/crookedpixels.com/images/`
- **Responsive breakpoints** — Sidebar collapses to relative on tablet. Post titles scale down. Related grid goes single-column on mobile

### Remaining manual tasks (Webflow Designer)
- Upload `mask.png` to Asset Manager → assign to `post-image_mask` images
- Bind CMS Dek field to post card excerpt element
- Bind CMS thumbnail as background-image on post figure
- Add CMS Collection List inside `related_grid` on article template (limit 6, exclude current)
- Any custom code embeds for base tag styling

---

## What we built last session (Apr 4–5 — Charles Lim Personal Site)

### charleslim.net Updates
- **Messaging rewrite** — Repositioned from "Brand, Content and Creative Leader" to "Creative & Design Leader" targeting senior creative/brand leadership roles
- **New expertise pillars** — Brand Identity & Visual Direction, Creative Leadership & Team Building, Strategic Design Execution
- **Nerd list removed** — Dropped the "topics I nerd out about" section to strengthen senior positioning
- **Hero image updated** — Replaced illustration GIF with 2025 headshot (charles-lim-2025.png)
- **Portfolio redirect** — charleslim.net/portfolio now redirects to Google Slides portfolio deck
- **WOW.js flash fix** — Added `.wow { visibility: hidden }` CSS to prevent content flash before animations
- **Legacy file cleanup** — Deleted 3.7 GB of old files (robots*.zip, PHP files, .htaccess, dbinfo.inc, sftp-config.json)
- **Backup saved** — Pre-rewrite version saved as index-2026-04-04.html

### resume-slide Skill (NEW)
- **Full skill built** — `skills/resume-slide/` generates tailored Google Slides resumes from job descriptions
- **Google OAuth** — credentials.json + token.json centralized in root ~/Dropbox/claude/ with Slides + Drive read/write scopes
- **Template sourcing** — Reads 6 most recent CVs from Google Drive folder as source material
- **Formatting preserved** — Applies correct fonts, sizes, bold, colors, bullet indentation (0.05in left, 0.05in hanging) matching the template
- **Contact links** — LinkedIn, email, phone (tel:), website, blog, portfolio all hyperlinked
- **Draft naming** — Output named `YYYY-MM-DD-DRAFT`, overwrites on re-run, user removes `-DRAFT` when finalized
- **Verification pass** — Generate → verify against source for hallucinations → fix → write (3 Claude calls)
- **Anti-hallucination rules** — Experience bullets copied verbatim from source CVs, skills hardcoded, stats line exact. Summary paragraphs are free-write.
- **Column balance** — Min 20 / max 23 lines per column, both columns target same height

---

## What we built last session (Apr 3 — Status Dashboard)

### Changes
- **domains.md moved** — Moved from `agents/site-admin/domains.md` to `context/domains.md` as single source of truth
- **briefing.md created** — Portable context doc at `context/briefing.md` for pasting into regular Claude chats
- **Slopportunist domains added** — slopportunist.com + slopportunity.dev (Vercel), transfer to Cloudflare scheduled May 5
- **Cloudflare migration planned** — All Bluehost domains (except crookedpixels.com) to transfer to Cloudflare

---

## What we built earlier (Apr 3 — Kingston + Kingston 2)

### Infrastructure
- **SSH key for GitHub** — Generated ed25519 key on mbp-m1, added to chedonline GitHub account
- **Claude Code auto-approve** — Configured `~/.claude/settings.json` with `acceptEdits` mode
- **charleslim.net DNS** — Registrar moved from 1and1 to Cloudflare. DNS resolving, site serving via GitHub Pages through Cloudflare proxy
- **Cloudflare SSL** — Set to Full for charleslim.net
- **Cloudflare API token** — Scoped to charleslim.net DNS edit, saved in root `.env`
- **gh CLI** — Installed v2.89.0, authed as chedonline
- **context/machines.md** — New machine inventory with SSH key tracking

---

## What we built (Apr 1–2)

### New Skills
- **site-status** — Puppeteer-based health check + screenshot for any URL
- **deck-analysis** — Google Slides API extractor + Claude analysis (parked — now unblocked by credentials.json)

### New Agents
- **Sophie (job-hunter)** — Job search + CV generation
- **Charlotte (site-admin)** — Domain registry and site lifecycle manager

### New Sites
- **status-dashboard** — Live at https://chedonline.github.io/status-dashboard/
- **charleslim.net** — Live on GitHub Pages with custom domain
- **site-template** — Shared footer component

---

## Repo structure

```
chedonline/          =    ~/Dropbox/claude/
  agents/            ←    ai-news, job-hunter (sophie), site-admin (charlotte), mme-claude
  projects/          ←    charleslim.net, site-template, status-dashboard
  skills/            ←    status, site-status, company-analysis, deck-analysis, resume-slide
  context/           ←    current-state.md, projects.md, stack.md, skills-registry.md, domains.md
  credentials.json   ←    Google OAuth client credentials (gitignored)
  token.json         ←    Google OAuth token — Slides + Drive read/write (gitignored)
  .env               ←    ANTHROPIC_API_KEY, CLOUDFLARE_API_TOKEN (gitignored)
```

---

## GitHub repos (all private except status-dashboard)

| Repo | Visibility | Pages |
|---|---|---|
| agents | Private | ai-news at chedonline.github.io/agents/ai-news/output/ |
| context | Private | — |
| skills | Private | — |
| charleslim.net | Private | https://charleslim.net (custom domain, HTTPS, Cloudflare) |
| site-template | Private | — |
| status-dashboard | **Public** | https://chedonline.github.io/status-dashboard/ |
| claude | Private | — |
| projects | Private | — |

---

## Domain registrars

- **Bluehost** (account #52750862): 21 domains. All on NS1/NS2.BLUEHOST.COM.
- **Cloudflare**: charleslim.net, chedched.com, chedonline.com (transferred from 1and1, account canceled)
- **1and1**: ~~canceled~~ — all domains ported to Cloudflare

---

## Current issues / pending

- [ ] **Machine config parity** — All machines need: acceptEdits mode, Dropbox, GitHub (chedonline), SSH key, Tailscale, Remote Control. `~/.claude/settings.json` doesn't sync via Dropbox, must be set per machine
- [ ] **Windows SSH key** — Generate + add to GitHub for win-desktop
- [x] **Identify second MacBook Pro** — mbp-intel: MBP 16" 2019, Intel i7, 16 GB
- [ ] **charleslim.net redesign** — Messaging updated; visual design refresh still pending
- [ ] **crookedpixels.com** — Phase 1 ~35% done (Webflow layout + styles + deks complete, manual Designer tasks remain: mask.png, CMS bindings, related articles wiring). Phase 2: glossary/taxonomy, Phase 3: distribution plan. Domain migration after.
- [ ] **designordeath.com** — Strongest domain, first showcase site to build
- [ ] **site-template** — Deploy to Pages, test footer include from CDN
- [ ] **Article count** — ai-news only 9-10 items passing threshold
- [ ] **Status dashboard sync** — post-commit hook works locally; no GitHub Action
- [ ] **stepkick.com** — Expires May 2026, decide: keep or let go

---

## Agent aliases

| Alias | Namespace | Type | Location | Suite |
|---|---|---|---|---|
| Sophie | job-hunter | Agent | agents/job-hunter/ | Job search, resume-slide, company-analysis |
| Charlotte | site-admin | Agent | agents/site-admin/ | Domain/site lifecycle |
| Mme Claude | mme-claude | Agent | agents/mme-claude/ | General ops, status, handoff |
| Beatrice | ai-news | Agent | agents/ai-news/ | Daily news digest |
| Pippa | mandatory-funtime | Skill | skills/mandatory-funtime/ | Biweekly trivia quiz |
| Florence | site-status | Skill | skills/site-status/ | Health checks + screenshots |
| Margaret | deck-analysis | Skill | skills/deck-analysis/ | Slides analysis |

---

## Key decisions

- Node.js for browser/web skills, Python for data/API agents
- Unified projects.md — one table, type column distinguishes
- GitHub Pro for private repo Pages
- charleslim.net positioning: creative & design leader (updated Apr 4)
- Root .env for centralized secrets
- Root credentials.json + token.json for Google API auth (centralized)
- SSH for GitHub auth (per-machine keys)
- `.dropboxignore` in every repo root — excludes `.git` so Dropbox doesn't corrupt git metadata. Each machine clones fresh and keeps its own `.git`
- Claude Code: acceptEdits mode + pre-approved safe tools globally
- charleslim.net registrar moved to Cloudflare (from 1and1)
- Oxford commas OK for resumes, removed from website copy
- resume-slide: verbatim bullets from source CVs, free-write summary only
- Agent aliases follow English royalty motif. Reserved names (family): Victoria, Elizabeth, Mary, Charles

---

## How to resume on another machine

```bash
cd ~/Dropbox/claude

# 1. Set up SSH key (one-time per machine)
ssh-keygen -t ed25519 -C "machine-name" -f ~/.ssh/id_ed25519 -N ""
gh ssh-key add ~/.ssh/id_ed25519.pub --title "machine-name"

# 2. Clone all repos fresh (Dropbox syncs files but not .git)
for repo in agents context skills; do
  cd ~/Dropbox/claude/$repo && git init && git remote add origin git@github.com:chedonline/$repo.git && git fetch origin && git checkout main
done
for repo in charleslim.net crookedpixels.com site-template status-dashboard; do
  cd ~/Dropbox/claude/projects/$repo && git init && git remote add origin git@github.com:chedonline/$repo.git && git fetch origin && git checkout main
done

# 3. Say "status" in Claude Code
```
