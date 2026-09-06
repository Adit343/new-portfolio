import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool } from 'sanity/presentation';
import { schemaTypes } from './src/sanity/schemas';
import { deskStructure } from './src/sanity/deskStructure';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dummy_project_id';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'portfolio-studio',
  title: 'Adit Shah Portfolio Studio',
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [
    presentationTool({
      title: 'Presentation',
      previewUrl: {
        origin: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    structureTool({
      structure: deskStructure,
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    // Hide 'create' action for Contact Form Responses so users cannot manually add entries in Studio
    actions: (prev, context) => {
      if (context.schemaType === 'contactMessage') {
        return prev.filter((action: any) => action.action !== 'create');
      }
      return prev;
    },
    // Remove contactMessage from the global "+" (Create New Document) menu in Studio
    newDocumentOptions: (prev) => {
      return prev.filter((item) => item.templateId !== 'contactMessage');
    },
  },
});
