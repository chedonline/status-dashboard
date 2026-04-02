# Current State
> Last updated: March 30, 2026. Commit this to chedonline/context to resume from any machine.

---

## What we built today

A complete AI news digest agent that:
- Fetches RSS feeds from 10 sources (Reddit, Simon Willison, Ben Evans, TechCrunch, etc.)
- Uses Claude Haiku to score and filter articles (target: 31 items scoring 7+)
- Fetches transcripts from YouTube subscriptions and summarizes AI-relevant videos
- Renders everything to a single HTML page
- Runs automatically at 8am EST via GitHub Actions
- Publishes to GitHub Pages

**Live URL:** https://chedonline.github.io/agents/ai-news/output/

---

## Repo structure established today

```
chedonline/          =    ~/Dropbox/claude/
  agents/            ←    autonomous scripts
  projects/          ←    shipped sites and apps
  skills/            ←    reusable prompt skills (.md)
  context/           ←    this folder — bootstrap for any Claude session
```

All old repos deleted. Clean slate.

---

## agents/ai-news — file map

```
agents/
  .github/workflows/daily.yml    ← cron: 8am EST, GitHub Actions
  ai-news/
    agent.py                     ← main runner: RSS fetch → curate → render
    youtube_agent.py             ← YouTube sub fetch → RSS → transcript → summarize
    CLAUDE.md                    ← system prompt for curation (max 31 items, score 7+)
    sources.md                   ← list of RSS feed URLs (edit to add/remove sources)
    skills/
      score-relevance.md         ← scoring rubric prompt skill
    output/
      index.html                 ← generated daily, served via GitHub Pages
    .gitignore                   ← excludes token.json, credentials.json, .env
    .env                         ← local only: ANTHROPIC_API_KEY=...
    token.json                   ← local only: YouTube OAuth token (gitignored)
    subscriptions.json           ← cached after first YouTube API call (gitignored)
```

---

## GitHub Secrets (chedonline/agents)

| Secret | Purpose |
|---|---|
| `ANTHROPIC_API_KEY` | Claude API access |
| `YOUTUBE_TOKEN` | OAuth token for YouTube subscriptions |
| `YOUTUBE_CREDENTIALS` | OAuth client credentials |

---

## YouTube agent — current status

**Working:** RSS-based video fetching (zero quota cost daily)
**Blocked today:** Quota exceeded from earlier testing — resets midnight Pacific
**Tomorrow:** On first run, will call YouTube API once to cache `subscriptions.json`, then use RSS only forever after

**How it works:**
1. First run: YouTube API fetches ~300 subscriptions → saves `subscriptions.json`
2. Every run after: reads cache + uses free RSS feeds per channel
3. Filters by AI keywords in title before fetching transcripts
4. Sends transcripts to Claude Haiku for summary + scoring

---

## Current issues / pending

- [ ] **Article count** — only 9-10 items passing 7+ threshold from 45 inputs. Need more sources OR lower threshold to 6. Haven't decided yet.
- [ ] **YouTube quota** — resets midnight Pacific. Tomorrow's 8am run should cache subscriptions and work end-to-end.
- [ ] **Transcript gaps** — many videos (Shorts, trailers) have no transcripts. Agent silently skips these.
- [ ] **Git identity** — fix with: `git config --global user.name "Charles Lim"` and `git config --global user.email "him@chedonline.com"`
- [ ] **Test SSH from cloud session** — try `ssh chedo@100.84.97.111` to verify OpenSSH Server works over Tailscale
- [ ] **Kill old dashboard on desktop** — old Python dashboard server may still be running on port 8080
- [ ] **Hub Pages dashboard** — `docs/index.html` is built; needs GitHub Pages enabled (requires public repo or GitHub Pro)
- [ ] **Install /status on Mac** — run `bash ~/Dropbox/claude/context/setup/install.sh` to install Claude Code slash commands

---

## How to run locally

```bash
cd ~/Dropbox/claude/agents/ai-news
export $(cat .env | xargs) && python3 agent.py
open output/index.html
```

## How to add RSS sources

Edit `~/Dropbox/claude/agents/ai-news/sources.md` — add a line:
```
- https://example.com/feed
```
Then `git add . && git commit -m "Add source" && git push`.

## Suggested sources to add (not yet added)

```
- https://www.theverge.com/rss/ai-artificial-intelligence/index.xml
- https://feeds.feedburner.com/venturebeat/SZYF
- https://huggingface.co/blog/feed.xml
- https://www.oneusefulthing.org/feed
- https://www.ignorance.ai/feed
- https://newsletter.pragmaticengineer.com/feed
```

---

## Claude Hub project

Created a Claude Project called "Claude Hub" with this system prompt:

```
When the user says "status", respond with exactly this, no prose:

🗞️ AI News — https://chedonline.github.io/agents/ai-news/output/
⚙️ Actions — https://github.com/chedonline/agents/actions
🐙 GitHub — https://github.com/chedonline
☁️ Anthropic — https://console.anthropic.com
📁 Context — https://github.com/chedonline/context
```

Open any chat inside Claude Hub and type `status` to get your links.

---

## Key decisions made today

- `chedonline` GitHub = `~/Dropbox/claude/` on local machine (SOT is GitHub)
- Skills are `.md` files, not `.py` — prompt instructions, not code
- Python is "the pipes" — all intelligence lives in markdown files
- `context/` repo is the universal bootstrap — load it at the start of any new Claude session
- `agents/` is a monorepo; `projects/` will be individual repos (for GitHub Pages per domain)
- `.dropboxignore` on `.git` folders to avoid Dropbox/Git conflicts

---

## Concepts covered in this session

- What an agent is: `System Prompt + Tools + Loop`
- Claude Code = agent runtime (bash tools, file r/w, chained actions)
- `CLAUDE.md` = system prompt layer; `skills/*.md` = reusable prompt fragments
- GitHub Actions as cloud agent scheduler (no machine needs to be on)
- OAuth2 flow for YouTube API: credentials.json → auth once → token.json → store as GitHub Secret
- YouTube Data API quota: `search.list` = 100 units/call; 10k daily limit; RSS = free
- `.env` + `export $(cat .env | xargs)` for local secret injection

---

## Tomorrow's priorities

1. Verify YouTube subscriptions cache on first morning run (8am EST)
2. Decide: lower score threshold to 6 OR add more RSS sources to hit 31 items
3. Scaffold `projects/crookedpixels.com`

---

## Fundamental constraint — multi-machine workflow

Charles works across two machines:
- MacBook Pro (primary, Dropbox synced, ~/Dropbox/claude/)
- Windows desktop (primary, same Dropbox sync)
- iPhone for quick edits/checks

**All decisions flow from this constraint.** Every tool, workflow, and automation must work identically on both machines. This is why:
- GitHub is SOT, not local filesystem
- Dropbox syncs the working directory
- .env files store secrets locally (gitignored)
- Claude.ai chat (this thread) is the primary interface — cloud synced, machine agnostic
- Claude Code is used for file operations, not this chat
- "Status" in Claude Hub loads context regardless of which machine you're on

**When switching machines:** just open this same Claude thread or open Claude Hub on the new machine. Everything is in GitHub and Dropbox. No setup needed.

## Machine hierarchy
- **Primary:** Windows desktop (AMD Ryzen 7 7800X3D) — main dev machine, C:\Users\chedo\Dropbox\claude\
- **Secondary:** MacBook Pro — ~/Dropbox/claude/
- **Tertiary:** iPhone — quick checks, Claude mobile

All machines sync via Dropbox. GitHub is SOT. This thread is machine-agnostic.
