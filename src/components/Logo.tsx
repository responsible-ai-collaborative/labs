/**
 * The RAIC microchip mark, recreated from the Responsible AI Collaborative
 * logo (raicollab.org). Renders white on a transparent background, sized to
 * sit on the navy header. The favicon counterpart lives at src/app/icon.svg.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Responsible AI Collaborative logo"
    >
      <g fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
        <rect x="15.5" y="21" width="33" height="22" rx="3.5" />
        <path d="M23 21V13M32 21V13M41 21V13" />
        <path d="M23 43v8M32 43v8M41 43v8" />
        <path d="M15.5 28H8M15.5 36H8" />
        <path d="M48.5 28H56M48.5 36H56" />
        <g strokeWidth={1.9} fill="#001934">
          <circle cx="23" cy="10" r="2" />
          <circle cx="32" cy="10" r="2" />
          <circle cx="41" cy="10" r="2" />
          <circle cx="23" cy="54" r="2" />
          <circle cx="32" cy="54" r="2" />
          <circle cx="41" cy="54" r="2" />
          <circle cx="5" cy="28" r="2" />
          <circle cx="5" cy="36" r="2" />
          <circle cx="59" cy="28" r="2" />
          <circle cx="59" cy="36" r="2" />
        </g>
      </g>
      <text
        x="32"
        y="33"
        fill="currentColor"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="Verdana, Geneva, sans-serif"
        fontSize="11.5"
        fontWeight={700}
        letterSpacing="-0.3"
      >
        RAIC
      </text>
    </svg>
  );
}
