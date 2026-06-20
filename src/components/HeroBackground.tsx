/**
 * Decorative backdrop for the navy hero sections: a faint dot grid plus soft
 * brand-blue glows, echoing the RAIC chip motif. Purely cosmetic.
 */
export function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg className="absolute inset-0 h-full w-full text-white/[0.06]">
        <defs>
          <pattern
            id="hero-dots"
            width="26"
            height="26"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.4" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-dots)" />
      </svg>
      <div className="absolute -right-24 -top-28 h-96 w-96 rounded-full bg-brand/20 blur-3xl" />
      <div className="absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
    </div>
  );
}
