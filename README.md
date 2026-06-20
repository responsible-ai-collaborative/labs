# RAIC Labs

A jumping-off point for in-development projects related to AI incidents,
published by the **[Responsible AI Collaborative](https://incidentdatabase.ai/about/)**.

This is a **single-page static site** built with Next.js and assembled from
MDX files. It is designed to be hosted on **GitHub Pages**. The style follows
the [AI Incident Database](https://github.com/responsible-ai-collaborative/aiid)
(deep navy chrome, a blue accent, clean neutral surfaces).

> **Have something to share?** The projects here are open and in development.
> Submit your own work, corrections, or ideas by opening a pull request against
> [this repository](https://github.com/responsible-ai-collaborative/labs).

## How it works

Every piece of content lives in [`content/`](./content) as an `.mdx` file. Each
file declares which of four sections it belongs to, plus its metadata. At build
time the page reads every file, groups entries by section, and renders them
top to bottom on one page.

The four valid sections are:

| Section    | Anchor       | What goes here                                       |
| ---------- | ------------ | ---------------------------------------------------- |
| `taxonomy` | `#taxonomy`  | Vocabularies and classification schemes for AI harms |
| `database`  | `#database`  | The systems and data behind indexing incidents       |
| `research`  | `#research`  | Studies, prototypes, and findings                    |
| `community` | `#community` | More projects advancing collaborative AI safety data |

## Adding content

Create a new `.mdx` file in `content/` (any filename ending in `.mdx`). It must
start with this frontmatter:

```mdx
---
section: research        # one of: taxonomy | database | research | community
status: in development   # one of: in development | complete | perpetual
affiliation: raic        # one of: raic | friends | fans | communication
title: Your Project Title
author: Your Name or Team
lastUpdated: 2026-06-20   # YYYY-MM-DD
url: https://example.org # project page, docs, or repo (http(s)://, /, or #)
description: One-sentence summary shown under the title.
intendedUser: Who this work is for
purpose: Why this work exists
---

Your MDX body here. Standard Markdown plus JSX/React components are supported.
```

All ten frontmatter fields are required — the build fails with a clear error if
one is missing, if `section` / `status` / `affiliation` is not one of its valid
values, or if `url` does not start with `http://`, `https://`, `/`, or `#`.
`status` and `affiliation` each show as a colored badge on the entry, and the
entry title links to `url`. Within a section, entries are ordered newest-first
by `lastUpdated`.

`affiliation` marks a project's relationship to the Responsible AI Collaborative
(RAIC): `raic` (organized by the RAIC), `friends` (works with the RAIC but is
not organized by it), `fans` (not affiliated, but shares a related mission), or
`communication` (in communication with the RAIC).

## Local development

```bash
npm install
npm run dev      # http://localhost:3000 (served at the root)
```

## Build & preview the static export

```bash
npm run build    # outputs the static site to ./out
npm run serve    # serves ./out locally with `npx serve`
```

When previewing the production build locally, assets are served under the
`/labs` base path (matching GitHub Pages). To preview at the root instead:

```bash
PAGES_BASE_PATH="" npm run build
```

## Deploying to GitHub Pages

A workflow at [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml)
builds and deploys on every push to `main`. To enable it:

1. In the repository, go to **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the **Actions** tab).

The site will be available at
`https://responsible-ai-collaborative.github.io/labs/`.

The workflow passes the repository's base path to the build automatically, so
no manual configuration is needed. For a user/organization page or a custom
domain served at the root, set the `PAGES_BASE_PATH` environment variable to an
empty string.

## Tech stack

- [Next.js](https://nextjs.org/) (App Router, `output: 'export'`)
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) for MDX
- [gray-matter](https://github.com/jonschlinkert/gray-matter) for frontmatter
- [Tailwind CSS](https://tailwindcss.com/) + the Typography plugin

## License

AGPL-3.0, consistent with the AI Incident Database. See [LICENSE](./LICENSE).
