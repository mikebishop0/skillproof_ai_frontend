import { userApiClient } from './apiClient';

export interface AssessmentResultSummaryDto {
  assessment_id?: string;
  title?: string;
  score?: number;
  skill_category?: string;
}

export interface RelevantProjectDto {
  project_id?: string;
  title?: string;
  project_description?: string;
  project_score?: number;
}

export interface RecruiterReportDto {
  id?: string;
  candidate_id?: string;
  candidate_summary?: string;
  verified_skill_scores?: Array<Record<string, any>>;
  technical_competency_score?: number;
  relevant_projects?: RelevantProjectDto[];
  assessment_results?: AssessmentResultSummaryDto[];
  verified_badges?: Array<Record<string, any>>;
  technical_strengths?: string[];
  version?: number;
  is_latest?: boolean;
  generated_at?: string;
}

export interface CodingResultDto {
  id?: string;
  language?: string;
  score?: number;
  status?: string;
  compilation_status?: string;
  question_id?: string;
}

export interface CompetencyReportDto {
  id?: string;
  candidate_id?: string;
  overall_competency_score?: number;
  skills_scores?: Array<Record<string, any>>;
  technical_strengths?: string[];
  improvement_areas?: string[];
  project_id?: string;
  technical_competency_summary?: string;
  ai_recommendations?: Array<Record<string, any>>;
  generated_at?: string;
  coding_evaluation_results?: CodingResultDto[];
  version?: number;
  is_latest?: boolean;
  source_evaluation_id?: string;
}

export interface CandidateReportDto {
  id?: string;
  candidate_id?: string;
  overall_competency_score?: number;
  skill_scores?: Array<Record<string, any>>;
  strengths?: string[];
  improvement_areas?: string[];
  learning_suggestions?: Array<Record<string, any>>;
  project_and_assessment_feedback?: string;
  version?: number;
  is_latest?: boolean;
  generated_at?: string;
}

export interface ReportVisibilityDto {
  is_public: boolean;
}

export interface PublicReportSettingsDto {
  isPublic?: boolean;
  slug?: string;
  publicUrl?: string;
}

export interface PublicReportDto {
  slug?: string;
  candidate_name?: string;
  professional_profile?: string;
  selected_skills?: string[];
  overall_competency_score?: number;
  public_badges?: string[];
  selected_projects?: Array<Record<string, any>>;
  report_summary?: string;
}

export const reportApi = {
  // Recruiter Reports
  getRecruiterReport: (candidateId: string) =>
    userApiClient.get<RecruiterReportDto>(`/api/v1/candidates/${candidateId}/recruiter-reports`),

  generateRecruiterReport: (candidateId: string) =>
    userApiClient.post<RecruiterReportDto>(`/api/v1/candidates/${candidateId}/recruiter-reports`),

  getRecruiterReportHistory: (candidateId: string) =>
    userApiClient.get<RecruiterReportDto[]>(`/api/v1/candidates/${candidateId}/recruiter-reports/history`),

  // Competency Reports
  getCompetencyReport: (candidateId: string, internalApiKey?: string) =>
    userApiClient.get<CompetencyReportDto>(`/api/v1/candidates/${candidateId}/competency-reports`, {
      headers: internalApiKey ? { 'X-Internal-Api-Key': internalApiKey } : undefined,
    }),

  generateCompetencyReport: (candidateId: string, internalApiKey?: string) =>
    userApiClient.post<CompetencyReportDto>(`/api/v1/candidates/${candidateId}/competency-reports`, undefined, {
      headers: internalApiKey ? { 'X-Internal-Api-Key': internalApiKey } : undefined,
    }),

  getCompetencyReportHistory: (candidateId: string, internalApiKey?: string) =>
    userApiClient.get<CompetencyReportDto[]>(`/api/v1/candidates/${candidateId}/competency-reports/history`, {
      headers: internalApiKey ? { 'X-Internal-Api-Key': internalApiKey } : undefined,
    }),

  // Candidate Reports
  getCandidateReport: (candidateId: string) =>
    userApiClient.get<CandidateReportDto>(`/api/v1/candidates/${candidateId}/candidate-reports`),

  generateCandidateReport: (candidateId: string) =>
    userApiClient.post<CandidateReportDto>(`/api/v1/candidates/${candidateId}/candidate-reports`),

  getCandidateReportHistory: (candidateId: string) =>
    userApiClient.get<CandidateReportDto[]>(`/api/v1/candidates/${candidateId}/candidate-reports/history`),

  generateCandidateReportPdf: (candidateId: string) =>
    userApiClient.post<Record<string, any>>(`/api/v1/candidates/${candidateId}/candidate-reports/pdf`),

  getCandidateReportDownloadLink: (candidateId: string, version: number) =>
    userApiClient.get<Record<string, string>>(`/api/v1/candidates/${candidateId}/candidate-reports/${version}/download`),

  // Public Reports & Visibility
  setPublicReportVisibility: (candidateId: string, payload: ReportVisibilityDto) =>
    userApiClient.patch<PublicReportSettingsDto>(`/api/v1/candidates/${candidateId}/public-report/visibility`, payload),

  getPublicReport: (slug: string) =>
    userApiClient.get<PublicReportDto>(`/api/v1/public/reports/${slug}`),
};
