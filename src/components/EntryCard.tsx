import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/components/mdx-components';
import {
  STATUS_INFO,
  AFFILIATION_INFO,
  SECTION_ACCENT,
  type ContentEntry,
} from '@/lib/content';

/** A single MDX entry: metadata header + compiled body, anchored by slug. */
export function EntryCard({ entry }: { entry: ContentEntry }) {
  const isExternal = entry.url.startsWith('http');

  return (
    <article
      id={entry.slug}
      className={`scroll-mt-24 overflow-hidden rounded-xl border border-l-4 border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md ${SECTION_ACCENT[entry.section].cardBorder}`}
    >
      <div className="border-b border-slate-100 bg-slate-50 px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold tracking-tight text-navy-900">
            <a
              href={entry.url}
              {...(isExternal
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className="group/title transition-colors hover:text-brand-700"
            >
              {entry.title}
              <span
                aria-hidden
                className="ml-1 inline-block text-brand-600 opacity-60 transition group-hover/title:opacity-100"
              >
                {isExternal ? '↗' : '→'}
              </span>
            </a>
          </h3>
          <div className="mt-0.5 flex shrink-0 flex-wrap items-center justify-end gap-1.5">
            <span
              title={AFFILIATION_INFO[entry.affiliation].description}
              className={`cursor-help whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${AFFILIATION_INFO[entry.affiliation].badgeClass}`}
            >
              {AFFILIATION_INFO[entry.affiliation].label}
            </span>
            <span
              className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${STATUS_INFO[entry.status].badgeClass}`}
            >
              {STATUS_INFO[entry.status].label}
            </span>
          </div>
        </div>
        <p className="mt-1 text-slate-600">{entry.description}</p>

        <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
          <Meta label="Author" value={entry.author} />
          <Meta label="Intended user" value={entry.intendedUser} />
          <Meta label="Purpose" value={entry.purpose} />
        </dl>
      </div>

      {/* Full description, collapsed by default. Native <details> keeps this a
          server component and needs no client JS. */}
      <details className="group/entry">
        <summary className="flex cursor-pointer list-none items-center gap-2 px-6 py-4 text-sm font-semibold text-brand-700 transition-colors hover:bg-slate-50 [&::-webkit-details-marker]:hidden">
          <svg
            viewBox="0 0 20 20"
            aria-hidden
            className="h-4 w-4 shrink-0 transition-transform duration-200 group-open/entry:rotate-90"
          >
            <path
              d="M7 5l6 5-6 5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="group-open/entry:hidden">Read full description</span>
          <span className="hidden group-open/entry:inline">Hide description</span>
        </summary>
        <div className="prose prose-slate max-w-none px-6 pb-6 prose-headings:text-navy-900 prose-a:text-brand-700 prose-a:no-underline hover:prose-a:underline">
          <MDXRemote source={entry.body} components={mdxComponents} />
        </div>
      </details>
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-semibold uppercase tracking-wide text-[0.7rem] text-slate-500">
        {label}
      </dt>
      <dd className="mt-0.5 text-navy-900">{value}</dd>
    </div>
  );
}
