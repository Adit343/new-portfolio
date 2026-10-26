import { createClient } from 'next-sanity';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-01';

export const client = createClient({
  projectId: projectId || 'dummy_project_id',
  dataset,
  apiVersion,
  useCdn: false, // false for real-time live data
  // Click-to-edit uses explicit data-sanity attributes (see dataAttr.ts), not stega, so text
  // stays clean for typing/splitting/uppercasing and non-text fields are covered too.
  stega: { enabled: false },
});

export const writeClient = createClient({
  projectId: projectId || 'dummy_project_id',
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  stega: {
    enabled: false,
  },
});
