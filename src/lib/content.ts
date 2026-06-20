import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

/**
 * The single page is assembled from MDX files in /content. Every file declares
 * which of these four sections it belongs to via its `section` frontmatter key.
 */
export const SECTIONS = ['taxonomy', 'database', 'research', 'community'] as const;
export type Section = (typeof SECTIONS)[number];

export interface SectionInfo {
  /** Stable id used for the in-page anchor (#taxonomy, #database, ...). */
  id: Section;
  /** Heading shown in the navigation and section header. */
  title: string;
  /** One-line framing shown under the section heading. */
  tagline: string;
  /** Optional sentence rendered after the tagline as a link. */
  link?: { href: string; text: string };
}

export const SECTION_INFO: Record<Section, SectionInfo> = {
  taxonomy: {
    id: 'taxonomy',
    title: 'Applied Taxonomies',
    tagline:
      'Shared classification schemes applied to one or more of the databases above. Every database has its own native schema, which we are not stating here. This section is for schema intended for broad application or standardization.',
  },
  database: {
    id: 'database',
    title: 'Operating AI Safety Databases',
    tagline:
      'The systems and data behind indexing real-world AI incidents.',
  },
  research: {
    id: 'research',
    title: 'Responsible AI Collaborative Research',
    tagline:
      'Studies, prototypes, and findings emerging from the collaborative.',
    link: {
      href: 'https://bib.raicollab.org',
      text: 'More than 600 academic, government, and journalistic citations use or point to the AIID.',
    },
  },
  community: {
    id: 'community',
    title: 'Community',
    tagline:
      'More projects advancing the goal of collaborative AI safety data. These might eventually be promoted to the headings above if their developers meet all the criteria (e.g., apply the taxonomy across the entire AIID).',
  },
};

/** Ordered list used to render sections top-to-bottom and in the nav. */
export const SECTION_ORDER: Section[] = ['database', 'taxonomy', 'research', 'community'];

/** Per-section accent: card left border + heading icon chip (full Tailwind classes for JIT). */
export const SECTION_ACCENT: Record<Section, { cardBorder: string; iconChip: string }> = {
  database: { cardBorder: 'border-l-blue-400', iconChip: 'bg-blue-100 text-blue-700' },
  taxonomy: { cardBorder: 'border-l-violet-400', iconChip: 'bg-violet-100 text-violet-700' },
  research: { cardBorder: 'border-l-emerald-400', iconChip: 'bg-emerald-100 text-emerald-700' },
  community: { cardBorder: 'border-l-teal-400', iconChip: 'bg-teal-100 text-teal-700' },
};

/** Lifecycle state every entry declares via its `status` frontmatter key. */
export const STATUSES = ['in development', 'complete', 'perpetual'] as const;
export type Status = (typeof STATUSES)[number];

/** Display label and badge styling (full Tailwind classes for JIT) per status. */
export const STATUS_INFO: Record<Status, { label: string; badgeClass: string }> = {
  'in development': {
    label: 'In development',
    badgeClass: 'bg-amber-100 text-amber-800 ring-amber-600/20',
  },
  complete: {
    label: 'Complete',
    badgeClass: 'bg-emerald-100 text-emerald-800 ring-emerald-600/20',
  },
  perpetual: {
    label: 'Perpetual',
    badgeClass: 'bg-sky-100 text-sky-800 ring-sky-600/20',
  },
};

/** Relationship between an entry's project and the Responsible AI Collaborative. */
export const AFFILIATIONS = ['raic', 'friends', 'fans', 'communication'] as const;
export type Affiliation = (typeof AFFILIATIONS)[number];

/** Display label, tooltip text, and badge styling per affiliation. */
export const AFFILIATION_INFO: Record<
  Affiliation,
  { label: string; description: string; badgeClass: string }
> = {
  raic: {
    label: 'Responsible AI Collaborative Led Project',
    description: 'Organized by the Responsible AI Collaborative.',
    badgeClass: 'bg-brand-50 text-brand-700 ring-brand-600/20',
  },
  friends: {
    label: 'Responsible AI Collaborators',
    description:
      'Works with the Responsible AI Collaborative but is not organized by it.',
    badgeClass: 'bg-violet-100 text-violet-800 ring-violet-600/20',
  },
  fans: {
    label: 'We are fans',
    description:
      'Not affiliated with the Responsible AI Collaborative, but shares a related mission.',
    badgeClass: 'bg-slate-100 text-slate-700 ring-slate-600/20',
  },
  communication: {
    label: 'In communication with TheCollab',
    description: 'In communication with the Responsible AI Collaborative.',
    badgeClass: 'bg-teal-100 text-teal-800 ring-teal-600/20',
  },
};

export interface ContentEntry {
  /** Filename without extension; used for the per-entry anchor. */
  slug: string;
  section: Section;
  title: string;
  author: string;
  /** ISO date string (YYYY-MM-DD) from the `lastUpdated` frontmatter. */
  lastUpdated: string;
  description: string;
  /** Who the work is for (from `intendedUser`). */
  intendedUser: string;
  /** Why the work exists (from `purpose`). */
  purpose: string;
  /** Lifecycle state: in development | complete | perpetual. */
  status: Status;
  /** Relationship to the RAIC: raic | friends | fans. */
  affiliation: Affiliation;
  /** Canonical link for the entry (project page, docs, repo, etc.). */
  url: string;
  /** Raw MDX body, compiled to React at render time. */
  body: string;
}

const CONTENT_DIR = path.join(process.cwd(), 'content');

const REQUIRED_FIELDS = [
  'section',
  'title',
  'author',
  'lastUpdated',
  'description',
  'intendedUser',
  'purpose',
  'status',
  'affiliation',
  'url',
] as const;

function isSection(value: unknown): value is Section {
  return typeof value === 'string' && (SECTIONS as readonly string[]).includes(value);
}

function isStatus(value: unknown): value is Status {
  return typeof value === 'string' && (STATUSES as readonly string[]).includes(value);
}

function isAffiliation(value: unknown): value is Affiliation {
  return typeof value === 'string' && (AFFILIATIONS as readonly string[]).includes(value);
}

function isUrl(value: unknown): value is string {
  return typeof value === 'string' && /^(https?:\/\/|\/|#)/.test(value);
}

/**
 * Normalize a frontmatter date to an ISO `YYYY-MM-DD` string. YAML parses
 * unquoted dates (e.g. `2026-06-20`) into Date objects, which `String()` would
 * render as "Sat Jun 20 2026 …" — breaking chronological sorting. Coerce them
 * back to a comparable ISO string.
 */
function toISODate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
}

/** Read, parse, and validate every MDX file in /content. */
export function getAllEntries(): ContentEntry[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs
    .readdirSync(CONTENT_DIR)
    // Treat .md/.mdx as entries, but ignore docs (README) and partials (_*).
    .filter((file) => /\.mdx?$/.test(file))
    .filter((file) => !/^_/.test(file) && !/^README\./i.test(file));

  const entries = files.map((file) => {
    const fullPath = path.join(CONTENT_DIR, file);
    const raw = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(raw);

    for (const field of REQUIRED_FIELDS) {
      if (data[field] === undefined || data[field] === '') {
        throw new Error(
          `Content file "${file}" is missing required frontmatter field "${field}".`,
        );
      }
    }

    if (!isSection(data.section)) {
      throw new Error(
        `Content file "${file}" has invalid section "${data.section}". ` +
          `Valid sections are: ${SECTIONS.join(', ')}.`,
      );
    }

    if (!isStatus(data.status)) {
      throw new Error(
        `Content file "${file}" has invalid status "${data.status}". ` +
          `Valid statuses are: ${STATUSES.join(', ')}.`,
      );
    }

    if (!isAffiliation(data.affiliation)) {
      throw new Error(
        `Content file "${file}" has invalid affiliation "${data.affiliation}". ` +
          `Valid affiliations are: ${AFFILIATIONS.join(', ')}.`,
      );
    }

    if (!isUrl(data.url)) {
      throw new Error(
        `Content file "${file}" has invalid url "${data.url}". ` +
          `URLs must start with http://, https://, /, or #.`,
      );
    }

    const entry: ContentEntry = {
      slug: file.replace(/\.mdx?$/, ''),
      section: data.section,
      title: String(data.title),
      author: String(data.author),
      lastUpdated: toISODate(data.lastUpdated),
      description: String(data.description),
      intendedUser: String(data.intendedUser),
      purpose: String(data.purpose),
      status: data.status,
      affiliation: data.affiliation,
      url: String(data.url),
      body: content,
    };
    return entry;
  });

  // Sort (applied globally; getEntriesBySection filters per section, preserving
  // this order):
  //   1. Perpetual projects first.
  //   2. Then by affiliation, in AFFILIATIONS order (raic → friends → fans).
  //   3. Then newest first, as a tiebreaker.
  return entries.sort((a, b) => {
    const byPerpetual =
      Number(b.status === 'perpetual') - Number(a.status === 'perpetual');
    if (byPerpetual !== 0) return byPerpetual;

    const byAffiliation =
      AFFILIATIONS.indexOf(a.affiliation) - AFFILIATIONS.indexOf(b.affiliation);
    if (byAffiliation !== 0) return byAffiliation;

    if (a.lastUpdated > b.lastUpdated) return -1;
    if (a.lastUpdated < b.lastUpdated) return 1;
    return 0;
  });
}

/** Group entries under their declared section, preserving the canonical order. */
export function getEntriesBySection(): Array<{
  info: SectionInfo;
  entries: ContentEntry[];
}> {
  const all = getAllEntries();
  return SECTION_ORDER.map((section) => ({
    info: SECTION_INFO[section],
    entries: all.filter((entry) => entry.section === section),
  }));
}
