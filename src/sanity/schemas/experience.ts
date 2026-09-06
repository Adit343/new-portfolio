import { defineType, defineField, Rule } from 'sanity';
import { CaseIcon } from '@sanity/icons/Case';

export const experience = defineType({
  name: 'experience',
  title: 'Work Experience',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'role',
      title: 'Job Role / Title',
      type: 'string',
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Company Name',
      type: 'string',
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: 'period',
      title: 'Employment Period (e.g. Apr 2025 - Present)',
      type: 'string',
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: 'isCurrent',
      title: 'Current Role?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'highlights',
      title: 'Key Achievements & Responsibilities',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'tech',
      title: 'Technologies & Tools Used',
      type: 'array',
      of: [{ type: 'string' }],
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
      title: 'role',
      subtitle: 'company',
    },
  },
});
