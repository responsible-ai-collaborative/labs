import { SECTION_ORDER, SECTION_INFO } from '@/lib/content';

/** Sticky secondary nav that tracks the four canonical page sections. */
export function SectionNav() {
  return (
    <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav
        aria-label="Page sections"
        className="mx-auto max-w-content overflow-x-auto px-6"
      >
        <ul className="flex gap-1 py-2 text-sm font-medium text-slate-600">
          {SECTION_ORDER.map((section) => (
            <li key={section}>
              <a
                href={`#${section}`}
                className="block whitespace-nowrap rounded-md px-3 py-1.5 transition-colors hover:bg-brand-50 hover:text-brand-700"
              >
                {SECTION_INFO[section].title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
