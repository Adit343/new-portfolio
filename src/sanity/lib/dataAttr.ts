import { createDataAttribute } from 'next-sanity';

/**
 * Explicit click-to-edit target for the Presentation tool.
 * Spread onto the element that renders the field: <h1 {...sanityAttr(doc, 'name')} />
 * Returns nothing for content that isn't backed by a Sanity document (static fallbacks).
 */
export function sanityAttr(source: object | null | undefined, path: string) {
  const doc = source as { _id?: string; _type?: string } | null | undefined;
  if (!doc?._id || !doc?._type) return {};
  return {
    'data-sanity': createDataAttribute({
      id: doc._id.replace(/^drafts\./, ''),
      type: doc._type,
      path,
    }).toString(),
  };
}
