import { defineType, defineField, Rule } from 'sanity';
import { EnvelopeIcon } from '@sanity/icons/Envelope';

export const contactMessage = defineType({
  name: 'contactMessage',
  title: 'Contact Form Responses',
  type: 'document',
  icon: EnvelopeIcon,
  readOnly: false,
  fields: [
    defineField({
      name: 'name',
      title: 'Sender Name',
      type: 'string',
      readOnly: true,
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Sender Email Address',
      type: 'string',
      readOnly: true,
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: 'subject',
      title: 'Subject / Topic',
      type: 'string',
      readOnly: true,
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: 'message',
      title: 'Message Body',
      type: 'text',
      rows: 5,
      readOnly: true,
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submission Date & Time',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'status',
      title: 'Response Status',
      type: 'string',
      options: {
        list: [
          { title: '🆕 New Unread', value: 'new' },
          { title: '👀 Read', value: 'read' },
          { title: '✅ Replied', value: 'replied' },
        ],
        layout: 'radio',
      },
      initialValue: 'new',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'subject',
      date: 'submittedAt',
    },
    prepare({ title, subtitle, date }: { title?: string; subtitle?: string; date?: string }) {
      const formattedDate = date ? new Date(date).toLocaleString() : '';
      return {
        title: title || 'Anonymous Sender',
        subtitle: `${subtitle || 'No subject'} — ${formattedDate}`,
      };
    },
  },
  orderings: [
    {
      title: 'Submission Date, Newest First',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
  ],
});
