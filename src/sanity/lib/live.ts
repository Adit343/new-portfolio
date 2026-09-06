import { defineLive } from 'next-sanity/live';
import { client } from './client';

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    apiVersion: '2024-03-01',
    stega: {
      enabled: true,
      studioUrl: '/studio',
      filter: () => true,
    },
  }),
});
