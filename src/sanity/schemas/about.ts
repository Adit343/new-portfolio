import { defineType, defineField, Rule } from 'sanity';
import { UserIcon } from '@sanity/icons/User';

export const about = defineType({
  name: 'about',
  title: 'About Section & Profile',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      initialValue: 'ADIT SHAH',
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Professional Title',
      type: 'string',
      initialValue: 'MERN Stack Developer',
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: 'yearsExperience',
      title: 'Years of Experience Tag',
      type: 'string',
      initialValue: '2 Years Hands-on',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      initialValue: 'shahadit68@gmail.com',
    }),
    defineField({
      name: 'phone',
      title: 'Display Phone Number',
      type: 'string',
      initialValue: '+91 9265955849',
    }),
    defineField({
      name: 'phoneRaw',
      title: 'Raw Phone Number',
      type: 'string',
      initialValue: '9265955849',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      initialValue: 'India',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
      initialValue: 'https://linkedin.com',
    }),
    defineField({
      name: 'github',
      title: 'GitHub URL',
      type: 'url',
      initialValue: 'https://github.com',
    }),
    defineField({
      name: 'englishProficiency',
      title: 'English Speaking Proficiency Note',
      type: 'string',
      initialValue: 'Proficient English Speaking',
    }),
    defineField({
      name: 'clientCommunication',
      title: 'Client Communication Note',
      type: 'string',
      initialValue: 'Excellent Client Communication & Management',
    }),
    defineField({
      name: 'summary',
      title: 'Profile Bio / Summary',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'highlights',
      title: 'Core Engineering Highlights',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
});
