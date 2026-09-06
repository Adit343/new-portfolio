import { defineLive } from 'next-sanity/live';
import { client } from './client';

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    apiVersion: '2024-03-01',
    stega: {
      enabled: true,
      studioUrl: '/studio',
      filter: (props) => {
        const last = props.sourcePath.at(-1);
        if (
          last === 'url' ||
          last === 'linkedin' ||
          last === 'github' ||
          last === 'email' ||
          last === 'phone' ||
          last === 'phoneRaw' ||
          last === 'liveUrl' ||
          last === 'githubUrl' ||
          last === 'resumeUrl' ||
          last === 'resumeFileUrl' ||
          last === 'href' ||
          props.sourcePath.includes('socialLinks') ||
          props.sourcePath.includes('resumeFile')
        ) {
          return false;
        }
        return true;
      },
    },
  }),
});
