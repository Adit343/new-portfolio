import { defineLive } from 'next-sanity/live';
import { client } from './client';

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    apiVersion: '2024-03-01',
    stega: {
      enabled: true,
      studioUrl: '/studio',
      filter: (props) => {
        if (
          props.sourcePath.at(-1) === 'url' ||
          props.sourcePath.includes('resumeUrl') ||
          props.sourcePath.includes('resumeFileUrl')
        ) {
          return false;
        }
        return true;
      },
    },
  }),
});
