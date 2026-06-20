import Link from 'next/link';
import { SITE } from '@/lib/site';

const YEAR = 2026;

/** Navy footer carrying publisher attribution and the contribute invitation. */
export function Footer() {
  return (
    <footer className="bg-navy-900 text-slate-300">
      <div className="mx-auto max-w-content px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <p className="text-lg font-semibold text-white">{SITE.publisher}</p>
            <p className="mt-2 text-sm leading-relaxed">{SITE.description}</p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 p-5">
            <p className="font-semibold text-white">Have something to share?</p>
            <p className="mt-1 text-sm">
              These projects are open and in development. Submit your own work,
              corrections, or ideas through the repository — just review the{' '}
              <Link
                href="/criteria"
                className="font-medium text-white underline decoration-slate-500 underline-offset-2 hover:decoration-white"
              >
                criteria
              </Link>{' '}
              first.
            </p>
            <a
              href={SITE.newEntryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Contribute on GitHub
              <span aria-hidden>↗</span>
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Published by the {SITE.publisher}. Licensed under AGPL-3.0.
          </p>
          <p>
            &copy; {YEAR} {SITE.publisher} &middot;{' '}
            <a
              href={SITE.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-slate-500 underline-offset-2 hover:text-white"
            >
              Source on GitHub
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
