import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SectionBlock } from '@/components/SectionBlock';
import { HeroBackground } from '@/components/HeroBackground';
import { SectionAutoOpen } from '@/components/SectionAutoOpen';
import { getEntriesBySection } from '@/lib/content';
import { SITE } from '@/lib/site';

/**
 * The entire site is this one page. Content is read from /content at build
 * time, grouped into the four canonical sections, and rendered top to bottom.
 */
export default function HomePage() {
  const sections = getEntriesBySection();

  return (
    <>
      <span id="top" />
      <SectionAutoOpen />
      <Header />

      {/* Hero — mission and focus mirrored from raicollab.org. */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy-900 to-navy-800 text-white">
        <HeroBackground />
        <div className="relative mx-auto max-w-content px-6 py-16 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-100/80">
            {SITE.publisher} &middot; Non-profit
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            {SITE.tagline}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-200">
            {SITE.mission}
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-200">
            TheCollab develops the{' '}
            <a
              href={SITE.aiidUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white underline decoration-brand-100/50 underline-offset-4 hover:decoration-white"
            >
              AI Incident Database (AIID)
            </a>
            , the leading catalog of real world AI harm events
            (i.e.&nbsp;&ldquo;incidents&rdquo;). TheCollab&rsquo;s goal is to support
            collaborative projects across the world advancing the breadth
            or depth of real world AI safety data coverage.
          </p>
          <p className="mt-4 max-w-2xl text-lg font-medium leading-relaxed text-white">
            Safety is a team sport &mdash; and we all play on the same team.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={SITE.aiidUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-white px-5 py-2.5 font-semibold text-navy-900 transition-colors hover:bg-slate-100"
            >
              Visit the AI Incident Database ↗
            </a>
            <a
              href={SITE.donateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-brand px-5 py-2.5 font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Donate ↗
            </a>
          </div>
        </div>
      </section>

      <main className="divide-y divide-slate-200">
        {sections.map(({ info, entries }) => (
          <SectionBlock key={info.id} info={info} entries={entries} />
        ))}
      </main>

      <Footer />
    </>
  );
}
