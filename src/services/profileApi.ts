import { profileApiClient } from './apiClient';

export interface UserProfileDto {
  cognito_id?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  slug?: string;
  profile_photo?: string;
  professional_headline?: string;
  about_section?: string;
  skills?: string;
  experience?: string;
  education?: string;
  location?: string;
  website?: string;
  github_url?: string;
  linkedin_url?: string;
  portfolio_visibility?: boolean;
  profile_completion_percentage?: number;
  updated_at?: string;
}

export interface RecruiterProfileDto {
  cognito_id?: string;
  company: string;
  designation?: string;
  industry?: string;
  company_website?: string;
  company_logo?: string;
  business_email?: string;
  contact_number?: string;
}

export interface CreateProjectDto {
  title: string;
  description: string;
  summary: string;
  start_date?: string;
  end_date?: string;
  is_current?: boolean;
  project_url?: string;
  github_url?: string;
  demo_url?: string;
  status?: 'IN_PROGRESS' | 'COMPLETED';
  display_order?: number;
  category: 'WEB_DEVELOPMENT' | 'MOBILE_DEVELOPMENT' | 'AI_MACHINE_LEARNING' | 'CYBER_SECURITY' | 'DEVOPS' | 'CLOUD_COMPUTING' | 'DATA_ENGINEERING' | 'UI_UX' | 'BLOCKCHAIN';
  visibility?: 'PUBLIC' | 'RECRUITER_ONLY' | 'PRIVATE';
}

export interface ProjectDto extends CreateProjectDto {
  id: string;
  portfolio_id?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  technologies?: Array<{ id: string; name: string }>;
}

export const profileApi = {
  // Candidate Profile
  getCandidateProfile: () =>
    profileApiClient.get<UserProfileDto>('/api/v1/profiles/me'),
  createCandidateProfile: (profile: UserProfileDto) =>
    profileApiClient.post<UserProfileDto>('/api/v1/profiles', profile),
  updateCandidateProfile: (profile: UserProfileDto) =>
    profileApiClient.patch<UserProfileDto>('/api/v1/profiles', profile),

  // Recruiter Profile
  getRecruiterProfile: () =>
    profileApiClient.get<RecruiterProfileDto>('/api/v1/recruiter_profiles/me'),
  createRecruiterProfile: (profile: RecruiterProfileDto) =>
    profileApiClient.post<RecruiterProfileDto>('/api/v1/recruiter_profiles', profile),
  updateRecruiterProfile: (profile: RecruiterProfileDto) =>
    profileApiClient.patch<RecruiterProfileDto>('/api/v1/recruiter_profiles', profile),

  // Projects
  getProjects: () =>
    profileApiClient.get<ProjectDto[]>('/api/v1/projects'),
  getProject: (projectId: string) =>
    profileApiClient.get<ProjectDto>(`/api/v1/projects/${projectId}`),
  createProject: (project: CreateProjectDto) =>
    profileApiClient.post<ProjectDto>('/api/v1/projects', project),
  updateProject: (projectId: string, project: Partial<CreateProjectDto>) =>
    profileApiClient.patch<ProjectDto>(`/api/v1/projects/${projectId}`, project),
  deleteProject: (projectId: string) =>
    profileApiClient.delete<any>(`/api/v1/projects/${projectId}`),
};
