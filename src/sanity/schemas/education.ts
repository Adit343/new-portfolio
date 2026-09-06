import { defineType, defineField, Rule } from 'sanity';
import { BookIcon } from '@sanity/icons/Book';

export const education = defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'degree',
      title: 'Degree Program Title',
      type: 'string',
      initialValue: 'Bachelor of Engineering in Computer Science Engineering',
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: 'institution',
      title: 'University / Institution Name',
      type: 'string',
      initialValue: 'LJUniversity',
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: 'period',
      title: 'Study Period (e.g. Nov 2021 - Nov 2025)',
      type: 'string',
      initialValue: 'Nov 2021 - Nov 2025',
    }),
    defineField({
      name: 'cgpa',
      title: 'CGPA / Grade (e.g. 8.19 CGPA)',
      type: 'string',
      initialValue: '8.19 CGPA',
    }),
    defineField({
      name: 'highlights',
      title: 'Academic Highlights & Achievement Notes',
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
      title: 'degree',
      subtitle: 'institution',
    },
  },
});
