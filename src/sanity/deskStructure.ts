import { StructureResolver } from 'sanity/structure';
import { CogIcon } from '@sanity/icons/Cog';
import { UserIcon } from '@sanity/icons/User';
import { CaseIcon } from '@sanity/icons/Case';
import { RocketIcon } from '@sanity/icons/Rocket';
import { TiersIcon } from '@sanity/icons/Tiers';
import { BookIcon } from '@sanity/icons/Book';
import { EnvelopeIcon } from '@sanity/icons/Envelope';

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('Portfolio Content Management')
    .items([
      // 1. Site Settings Singleton (Header & Footer)
      S.listItem()
        .title('Site Settings (Header & Footer)')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings')
        ),

      S.divider(),

      // 2. About Page / Hero Singleton
      S.listItem()
        .title('About Section & Profile')
        .icon(UserIcon)
        .child(
          S.document()
            .schemaType('about')
            .documentId('about')
            .title('About Profile')
        ),

      // 3. Work Experience Section
      S.listItem()
        .title('Work Experience')
        .icon(CaseIcon)
        .child(
          S.documentTypeList('experience')
            .title('Work Experience List')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      // 4. Projects Section
      S.listItem()
        .title('Projects')
        .icon(RocketIcon)
        .child(
          S.documentTypeList('project')
            .title('Projects List')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      // 5. Skills Section
      S.listItem()
        .title('Skill Categories')
        .icon(TiersIcon)
        .child(
          S.documentTypeList('skillCategory')
            .title('Skill Categories')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      // 6. Education Section
      S.listItem()
        .title('Education')
        .icon(BookIcon)
        .child(
          S.documentTypeList('education')
            .title('Education List')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.divider(),

      // 7. Contact Form Inbox (Create "+" action disabled)
      S.listItem()
        .title('Contact Form Responses')
        .icon(EnvelopeIcon)
        .child(
          S.documentTypeList('contactMessage')
            .title('Submissions Inbox')
            .canHandleIntent((intentName) => intentName !== 'create')
            .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
        ),
    ]);
