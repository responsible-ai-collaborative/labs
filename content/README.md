# Content

Each `.mdx` file in this directory becomes one entry on the single-page site.

## Required frontmatter

```yaml
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
```

All ten fields are required. The build fails with a descriptive error if a
field is missing, if `section` / `status` / `affiliation` is not one of its
valid values, or if `url` does not start with `http://`, `https://`, `/`, or
`#`. `status` and `affiliation` render as colored badges on the entry, and the
entry title links to `url`.

`affiliation` describes the project's relationship to the Responsible AI
Collaborative (RAIC):

| Value     | Meaning                                                          |
| --------- | ---------------------------------------------------------------- |
| `raic`          | Organized by the RAIC.                                     |
| `friends`       | Works with the RAIC, but is not organized by it.           |
| `fans`          | Not affiliated with the RAIC, but shares a related mission. |
| `communication` | In communication with the RAIC.                            |

## Body

Below the frontmatter, write standard Markdown. MDX also lets you use JSX and
import React components if you need richer layouts. Links to other sections work
with anchors, e.g. `[the taxonomy](#taxonomy)`.

## Ordering

Within each section, entries are sorted newest-first by `lastUpdated`.

## Authoring tip: colons in frontmatter

YAML treats a colon-then-space (`: `) as a key/value separator, so a value that
contains one — e.g. `author: AIID (maintainer: Jane Doe)` — corrupts the whole
frontmatter block and surfaces as a confusing "missing required field" error.
Either rephrase to drop the inner colon, or wrap the value in quotes:

```yaml
author: "AIID (maintainer: Jane Doe)"
```
