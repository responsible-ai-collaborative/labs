/** Central place for publisher metadata and outbound links. */
export const SITE = {
  publisher: 'Responsible AI Collaborative',
  shortName: 'RAIC Labs',
  title: 'Responsible AI Collaborative Labs — The convening body for AI safety data',
  description:
    'A jumping-off point for in-development projects related to AI safety data, ' +
    'organized by taxonomy, database, and research.',

  // Mission copy mirrored from raicollab.org.
  tagline: 'The convening body for AI safety data',
  mission:
    'The Responsible AI Collaborative (TheCollab) is a non-profit organization ' +
    'bringing together multiple contributors to produce a safer world with AI.',

  repoUrl: 'https://github.com/responsible-ai-collaborative/labs',
  // Opens a new issue pre-filled with the "Submit an entry" form.
  newEntryUrl:
    'https://github.com/responsible-ai-collaborative/labs/issues/new?template=new-entry.yml',
  githubOrgUrl: 'https://github.com/responsible-ai-collaborative',
  // The AI Incident Database — TheCollab's primary focus.
  aiidUrl: 'https://incidentdatabase.ai/',
  donateUrl: 'https://donate.stripe.com/28E7sDbq18xN82kbJ8bQY00',
} as const;
