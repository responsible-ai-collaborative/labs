import type { Section } from '@/lib/content';

const PATHS: Record<Section, React.ReactNode> = {
  database: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
      <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
    </>
  ),
  taxonomy: (
    <>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
    </>
  ),
  research: (
    <>
      <path d="M9 3h6" />
      <path d="M10 3v6l-4.6 8.2A2 2 0 0 0 7.2 20h9.6a2 2 0 0 0 1.8-2.8L14 9V3" />
      <path d="M7.5 14h9" />
    </>
  ),
  community: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.2a3 3 0 0 1 0 5.6M20.5 20a5.5 5.5 0 0 0-4.3-5.4" />
    </>
  ),
};

/** Small line icon identifying each section, used in the section heading. */
export function SectionIcon({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {PATHS[section]}
    </svg>
  );
}
