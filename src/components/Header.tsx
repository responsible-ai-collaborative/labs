import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { SECTION_ORDER, SECTION_INFO } from '@/lib/content';

/** Dark navy top bar with branding and section anchor navigation. */
export function Header() {
  return (
    <header className="bg-navy-900 text-white">
      <div className="mx-auto flex max-w-content flex-wrap items-center gap-x-8 gap-y-3 px-6 py-4">
        <Link href="/" className="flex items-center gap-3 font-semibold tracking-tight">
          <Logo className="h-10 w-10 text-white" />
          <span className="font-display text-lg">Projects and Data</span>
        </Link>

        <nav className="order-last w-full sm:order-none sm:ml-auto sm:w-auto">
          <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-200">
            {SECTION_ORDER.map((section) => (
              <li key={section}>
                {/* Home-relative anchors so the nav works from any page. */}
                <Link
                  href={`/#${section}`}
                  className="transition-colors hover:text-white"
                >
                  {SECTION_INFO[section].title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
