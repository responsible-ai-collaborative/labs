import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroBackground } from '@/components/HeroBackground';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: `Criteria — ${SITE.publisher}`,
  description:
    'The criteria for getting a project, dataset, taxonomy, or research effort listed on RAIC Projects and Data.',
};

/** Shared rules that apply to every section. */
const GENERAL_PRINCIPLES = [
  {
    title: 'No shaming',
    body: 'Effective safety culture requires learning from failures, and shame is counterproductive.',
  },
  {
    title: 'No sensationalism',
    body: 'A sober presentation of what is known is expected.',
  },
  {
    title: 'Effort',
    body: 'Clear signs of effort in the production of the item are required.',
  },
  {
    title: 'Collaborative spirit',
    body: 'Listed items are expected to lift each other up.',
  },
  {
    title: 'Human-centrism',
    body: 'Listed items are encouraged to center human perspectives — including the non-human nature of machine intelligence — in their work.',
  },
];

/** The seven RAIC AIID Taxonomy Policy principles, summarized. */
const TAXONOMY_PRINCIPLES = [
  {
    title: 'Relevance and scope alignment',
    body: 'Directly addresses AI/ML failures, hazards, or incidents in the AIID, maps to existing incidents, and is not substantially duplicative.',
  },
  {
    title: 'Scientific rigor and credibility',
    body: 'Classifiers have established expertise, the taxonomy is grounded in research or substantial experience, peer review is preferred, and the methodology is documented.',
  },
  {
    title: 'Practical applicability',
    body: 'Categories are specific enough to apply, definitions resolve classification disputes, guidance or examples are provided, and the number of categories is reasonable.',
  },
  {
    title: 'Neutrality and objectivity',
    body: 'Free of political or ideological bias, describes incidents without blaming implicated parties, and is vendor-neutral.',
  },
  {
    title: 'Maintenance, updates, and scale',
    body: 'Source organizations intend to maintain the taxonomy and keep applying it to new incidents; prior application across incidents is preferred.',
  },
  {
    title: 'Legal and licensing compatibility',
    body: 'Assignable to the AIID Creative Commons license with no conflicting intellectual property claims.',
  },
  {
    title: 'Interoperability standards',
    body: 'Available in a machine-readable format with unique category identifiers, following established metadata standards, and ideally mappable to other AI incident taxonomies.',
  },
];

const DATABASE_CRITERIA = [
  'Catalogs real-world AI safety data — incidents, harms, litigation, or risks — rather than hypotheticals.',
  'Documents its scope, sources, and methodology so that entries can be verified and reused.',
  'Is actively maintained with updates in the last month and a clear way to submit corrections and additions.',
];

const RESEARCH_CRITERIA = [
  'Presents a substantive study, prototype, or finding that advances understanding of real-world AI safety.',
  'Makes verifiable claims grounded in data or method; peer review or open documentation is preferred.',
  'Is openly accessible so that others can learn from and build on it.',
];

const COMMUNITY_CRITERIA = [
  'Is a mission-aligned project advancing the goal of collaborative AI safety data.',
  'Invites participation and strengthens the broader ecosystem rather than competing with it.',
  'Upholds the general principles above.',
];

const JUMP_LINKS = [
  { id: 'general-principles', label: 'General Principles' },
  { id: 'databases', label: 'Databases' },
  { id: 'taxonomies', label: 'Taxonomies' },
  { id: 'research', label: 'Research' },
  { id: 'community', label: 'Community' },
];

const TAXONOMY_POLICY_URL =
  'https://docs.google.com/document/d/1LpP0jt7Mn3nW0zsLwhB-8uh-WgMZMJyZVDLvLDq-T0U/edit';

export default function CriteriaPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy-900 to-navy-800 text-white">
        <HeroBackground />
        <div className="relative mx-auto max-w-content px-6 py-16 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-100/80">
            {SITE.publisher}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Criteria
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-200">
            These are the criteria for being listed on Projects and Data. Every
            submission is reviewed by {SITE.publisher} personnel and added only
            if it meets the general principles below, along with any criteria
            specific to its section.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {JUMP_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="rounded-full border border-white/25 px-3.5 py-1.5 text-sm font-medium text-slate-100 transition-colors hover:bg-white/10"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <main className="divide-y divide-slate-200">
        {/* General Principles */}
        <section id="general-principles" className="scroll-mt-20 py-14">
          <div className="mx-auto max-w-content px-6">
            <h2 className="font-display text-2xl font-bold tracking-tight text-navy-900">
              General Principles
            </h2>
            <p className="mt-1 max-w-2xl text-slate-600">
              Rules shared across every section. They apply to databases,
              taxonomies, research, and community projects alike.
            </p>
            <ol className="mt-8 space-y-4">
              {GENERAL_PRINCIPLES.map((principle, index) => (
                <li
                  key={principle.title}
                  className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-50 text-sm font-bold text-brand-700">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-navy-900">
                      {principle.title}
                    </h3>
                    <p className="mt-0.5 text-slate-600">{principle.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Databases */}
        <CriteriaSection
          id="databases"
          title="Databases"
          intro="In addition to the general principles, databases should meet the following:"
          criteria={DATABASE_CRITERIA}
        />

        {/* Taxonomies */}
        <section id="taxonomies" className="scroll-mt-20 py-14">
          <div className="mx-auto max-w-content px-6">
            <h2 className="font-display text-2xl font-bold tracking-tight text-navy-900">
              Taxonomies
            </h2>
            <p className="mt-1 max-w-2xl text-slate-600">
              Beyond the general principles, taxonomies are assessed against the{' '}
              <a
                href={TAXONOMY_POLICY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-brand-700 underline-offset-2 hover:underline"
              >
                RAIC AIID Taxonomy Policy
              </a>
              , which evaluates each proposal against all of the following:
            </p>
            <ol className="mt-8 space-y-4">
              {TAXONOMY_PRINCIPLES.map((principle, index) => (
                <li
                  key={principle.title}
                  className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-50 text-sm font-bold text-brand-700">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-navy-900">
                      {principle.title}
                    </h3>
                    <p className="mt-0.5 text-slate-600">{principle.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-slate-500">
              Questions about the taxonomy principles, or about joining AIID
              classification processes, can go to{' '}
              <a
                href="mailto:info@incidentdatabase.ai"
                className="text-brand-700 underline-offset-2 hover:underline"
              >
                info@incidentdatabase.ai
              </a>
              .
            </p>
          </div>
        </section>

        {/* Research */}
        <CriteriaSection
          id="research"
          title="Research"
          intro="In addition to the general principles, research entries should meet the following:"
          criteria={RESEARCH_CRITERIA}
        />

        {/* Community */}
        <CriteriaSection
          id="community"
          title="Community"
          intro="In addition to the general principles, community entries should meet the following:"
          criteria={COMMUNITY_CRITERIA}
        />

        {/* Submit CTA */}
        <section className="py-14">
          <div className="mx-auto max-w-content px-6">
            <div className="flex flex-col items-start gap-4 rounded-xl border border-brand-100 bg-brand-50 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-navy-900">
                  Think your work fits?
                </h2>
                <p className="mt-1 text-slate-600">
                  Propose it through the submission form. RAIC personnel will
                  review it against these criteria.
                </p>
              </div>
              <a
                href={SITE.newEntryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-md bg-brand px-5 py-2.5 font-semibold text-white transition-colors hover:bg-brand-700"
              >
                Submit an entry ↗
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function CriteriaSection({
  id,
  title,
  intro,
  criteria,
}: {
  id: string;
  title: string;
  intro: string;
  criteria: string[];
}) {
  return (
    <section id={id} className="scroll-mt-20 py-14">
      <div className="mx-auto max-w-content px-6">
        <h2 className="font-display text-2xl font-bold tracking-tight text-navy-900">
          {title}
        </h2>
        <p className="mt-1 max-w-2xl text-slate-600">{intro}</p>
        <ul className="mt-6 max-w-2xl space-y-3">
          {criteria.map((item) => (
            <li key={item} className="flex gap-3 text-slate-700">
              <span aria-hidden className="mt-1 text-brand-600">
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
