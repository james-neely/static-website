export interface HeroData {
  name: string;
  title: string;
  summary: string;
}

export interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  highlights: string[];
}

export interface EducationEntry {
  institution: string;
  credential: string;
  graduationDate: string;
  honors?: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface ProjectEntry {
  name: string;
  description: string;
}

export interface ContactData {
  location: string;
  phone: string;
  email: string;
  github: string;
}

export interface ResumeData {
  hero: HeroData;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: SkillGroup[];
  projects: ProjectEntry[];
  contact: ContactData;
}
