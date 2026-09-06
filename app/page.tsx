import { MainPortfolio } from '@/src/components/MainPortfolio';
import { SanityLive } from '@/src/sanity/lib/live';
import { 
  getPersonalDetails, 
  getExperienceData, 
  getProjectsData, 
  getSkillsData, 
  getEducationData,
  getSiteSettings 
} from '@/src/sanity/lib/fetch';

export default async function Home() {
  const [siteSettings, heroData, experience, projects, skills, education] = await Promise.all([
    getSiteSettings(),
    getPersonalDetails(),
    getExperienceData(),
    getProjectsData(),
    getSkillsData(),
    getEducationData(),
  ]);

  return (
    <>
      <MainPortfolio
        initialSiteSettings={siteSettings}
        initialHeroData={heroData}
        initialExperience={experience}
        initialProjects={projects}
        initialSkills={skills}
        initialEducation={education}
      />
      <SanityLive />
    </>
  );
}
