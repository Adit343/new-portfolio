import { defineType, defineField, Rule } from 'sanity';
import { RocketIcon } from '@sanity/icons/Rocket';

export const project = defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  icon: RocketIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'badge',
      title: 'Badge Tag (e.g. EV Infrastructure, Quality Assurance)',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle / Tagline',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category (e.g. Full-Stack Enterprise, Admin Panel)',
      type: 'string',
    }),
    defineField({
      name: 'tech',
      title: 'Tech Stack Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'summary',
      title: 'Short Summary',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'role',
      title: 'Your Engineering Role',
      type: 'string',
      initialValue: 'Lead Frontend Architect',
    }),
    defineField({
      name: 'keyFeatures',
      title: 'Key Features List',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'metrics',
      title: 'Key Metrics / Specs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'value', type: 'string', title: 'Value' },
          ],
        },
      ],
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent Hex Color (e.g. #10b981)',
      type: 'string',
      initialValue: '#10b981',
    }),
    defineField({
      name: 'coverImage',
      title: 'Project Image / Cover Screenshot',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live Demo URL',
      type: 'url',
    }),
    defineField({
      name: 'githubUrl',
      title: 'Repository URL',
      type: 'url',
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
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
    },
  },
});
