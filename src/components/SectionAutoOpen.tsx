'use client';

import { useEffect } from 'react';

/**
 * Sections render collapsed by default. This expands the targeted section when
 * the page is loaded with a hash (e.g. /#taxonomy) or when an in-page anchor to
 * a section is clicked, then scrolls it into view. Renders nothing.
 */
export function SectionAutoOpen() {
  useEffect(() => {
    const openSection = (id: string, scroll: boolean) => {
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      // Open every <details> the target lives inside so it becomes visible...
      for (let node: HTMLElement | null = el; node; node = node.parentElement) {
        if (node.tagName === 'DETAILS') (node as HTMLDetailsElement).open = true;
      }
      // ...and, when the target is a whole section, open that section's details.
      if (el.tagName === 'SECTION') {
        const inner = el.querySelector('details');
        if (inner) inner.open = true;
      }
      if (scroll) {
        requestAnimationFrame(() =>
          el.scrollIntoView({ behavior: 'smooth', block: 'start' }),
        );
      }
    };

    // 1. On load / hash change (covers plain anchors and direct URLs).
    const fromHash = () => openSection(decodeURIComponent(location.hash.slice(1)), true);
    fromHash();
    window.addEventListener('hashchange', fromHash);

    // 2. On any same-page anchor click (covers Next <Link> that may not fire
    //    hashchange). Open before the browser scrolls.
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest('a');
      if (!anchor) return;
      const url = new URL(anchor.href, location.href);
      if (url.pathname === location.pathname && url.hash) {
        openSection(decodeURIComponent(url.hash.slice(1)), false);
      }
    };
    document.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('hashchange', fromHash);
      document.removeEventListener('click', onClick);
    };
  }, []);

  return null;
}
