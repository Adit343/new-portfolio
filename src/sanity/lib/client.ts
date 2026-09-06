import { createClient } from 'next-sanity';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-01';

export const client = createClient({
  projectId: projectId || 'dummy_project_id',
  dataset,
  apiVersion,
  useCdn: false, // false for real-time live data
  stega: {
    enabled: true,
    studioUrl: '/studio',
    filter: () => true, // Force stega metadata on every text field for complete visual editing
  },
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
