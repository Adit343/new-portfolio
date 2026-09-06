import { client, projectId } from './client';
import { 
  siteSettingsQuery, 
  aboutQuery, 
  experienceQuery, 
  projectsQuery, 
  skillsQuery, 
  educationQuery 
} from './queries';
import { draftMode } from 'next/headers';

// Helper to check if Sanity is configured
export const isSanityConfigured = Boolean(
  projectId && projectId !== 'dummy_project_id' && projectId.length > 3
);

async function getClientOptions() {
  const isDraft = (await draftMode()).isEnabled;
  if (isDraft) {
    return {
      perspective: 'previewDrafts' as const,
      token: process.env.SANITY_API_WRITE_TOKEN,
      stega: true,
      useCdn: false,
    };
  }
  return {
    perspective: 'published' as const,
    stega: false,
    useCdn: false,
  };
}

export async function getSiteSettings() {
  if (!isSanityConfigured) return null;
  try {
    const options = await getClientOptions();
    const data = await client.fetch(siteSettingsQuery, {}, options);
    return data || null;
  } catch (error) {
    console.warn('Sanity fetch error (siteSettings):', error);
    return null;
  }
}

export async function getPersonalDetails() {
  if (!isSanityConfigured) return null;
  try {
    const options = await getClientOptions();
    const data = await client.fetch(aboutQuery, {}, options);
    return data || null;
  } catch (error) {
    console.warn('Sanity fetch error (about):', error);
    return null;
  }
}

export async function getExperienceData() {
  if (!isSanityConfigured) return [];
  try {
    const options = await getClientOptions();
    const data = await client.fetch(experienceQuery, {}, options);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.warn('Sanity fetch error (experience):', error);
    return [];
  }
}

export async function getProjectsData() {
  if (!isSanityConfigured) return [];
  try {
    const options = await getClientOptions();
    const data = await client.fetch(projectsQuery, {}, options);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.warn('Sanity fetch error (projects):', error);
    return [];
  }
}

export async function getSkillsData() {
  if (!isSanityConfigured) return [];
  try {
    const options = await getClientOptions();
    const data = await client.fetch(skillsQuery, {}, options);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.warn('Sanity fetch error (skills):', error);
    return [];
  }
}

export async function getEducationData() {
  if (!isSanityConfigured) return null;
  try {
    const options = await getClientOptions();
    const data = await client.fetch(educationQuery, {}, options);
    return data || null;
  } catch (error) {
    console.warn('Sanity fetch error (education):', error);
    return null;
  }
}
