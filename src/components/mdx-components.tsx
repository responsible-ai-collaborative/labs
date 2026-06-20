import Link from 'next/link';
import type { MDXComponents } from 'mdx/types';

/**
 * Element overrides used when compiling MDX bodies. Most styling comes from the
 * Tailwind Typography `prose` wrapper around each entry; here we mainly make
 * links route-aware and open external links safely.
 */
export const mdxComponents: MDXComponents = {
  a: ({ href = '', children, ...props }) => {
    const isInternal = href.startsWith('/') || href.startsWith('#');
    if (isInternal) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },
};
