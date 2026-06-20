import { EntryCard } from '@/components/EntryCard';
import { SectionIcon } from '@/components/SectionIcon';
import { SECTION_ACCENT, type ContentEntry, type SectionInfo } from '@/lib/content';

interface SectionBlockProps {
  info: SectionInfo;
  entries: ContentEntry[];
}

/** One of the four canonical sections, with its heading and entry list. */
export function SectionBlock({ info, entries }: SectionBlockProps) {
  return (
    <section id={info.id} className="scroll-mt-20 py-14">
      <div className="mx-auto max-w-content px-6">
        {/* Section is collapsed by default; the heading toggles it open. */}
        <details className="group/section">
          {/* Heading sticks to the top while scrolling through the section. */}
          <summary className="sticky top-0 z-30 cursor-pointer list-none border-b border-transparent bg-white/95 py-3 backdrop-blur group-open/section:border-slate-200 [&::-webkit-details-marker]:hidden">
            <span className="flex items-center gap-3">
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${SECTION_ACCENT[info.id].iconChip}`}
              >
                <SectionIcon section={info.id} className="h-5 w-5" />
              </span>
              <h2 className="font-display text-2xl font-bold tracking-tight text-navy-900 transition-colors group-hover/section:text-brand-700">
                {info.title}
              </h2>
              <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
                {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
              </span>
              <svg
                viewBox="0 0 20 20"
                aria-hidden
                className="ml-auto h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 group-open/section:rotate-90"
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
            </span>
            {/* Preview of what is inside — shown only while collapsed. */}
            {entries.length > 0 && (
              <span className="mt-2 block pl-12 text-sm text-slate-400 group-open/section:hidden">
                {entries.map((entry) => entry.title).join('  ·  ')}
              </span>
            )}
          </summary>

          <p className="mt-3 max-w-2xl text-slate-600">
            {info.tagline}
            {info.link && (
              <>
                {' '}
                <a
                  href={info.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brand-700 underline-offset-2 hover:underline"
                >
                  {info.link.text}
                </a>
              </>
            )}
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6">
            {entries.length > 0 ? (
              entries.map((entry) => <EntryCard key={entry.slug} entry={entry} />)
            ) : (
              <p className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-center text-sm text-slate-500">
                No entries yet. Be the first to contribute to {info.title}.
              </p>
            )}
          </div>
        </details>
      </div>
    </section>
  );
}
