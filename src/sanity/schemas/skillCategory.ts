import { defineType, defineField, Rule } from 'sanity';
import { TiersIcon } from '@sanity/icons/Tiers';

export const skillCategory = defineType({
  name: 'skillCategory',
  title: 'Skill Categories & Technical Stack',
  type: 'document',
  icon: TiersIcon,
  fields: [
    defineField({
      name: 'category',
      title: 'Category Title (e.g. Frontend Architecture)',
      type: 'string',
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: 'iconName',
      title: 'Lucide Icon Name (e.g. Code2, Database, Sparkles, Wrench)',
      type: 'string',
      initialValue: 'Code2',
    }),
    defineField({
      name: 'description',
      title: 'Category Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'skills',
      title: 'Skill Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Skill Name (e.g. ReactJS)' },
            { name: 'level', type: 'string', title: 'Proficiency Level (e.g. Expert, Advanced, Familiar)' },
            { name: 'tag', type: 'string', title: 'Tag Badge (e.g. Primary, Core, State)' },
          ],
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order Rank',
      type: 'number',
      initialValue: 1,
    }),
  ],
  preview: {
    select: {
      title: 'category',
      subtitle: 'description',
    },
  },
});
