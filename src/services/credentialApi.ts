import { userApiClient } from './apiClient';

export type BadgeStatus = 'ACTIVE' | 'EXPIRED' | 'REVOKED';
export type CertificateStatus = 'ACTIVE' | 'REVOKED';
export type CertificateVisibility = 'PRIVATE' | 'PUBLIC';

export interface BadgeCreateDto {
  candidate_id: string;
  badge_template_id: string;
  source_evaluation_id: string;
  expires_at?: string;
  reissued_from_badge_id?: string;
  reissue_reason?: string;
}

export interface BadgeDto {
  id?: string;
  badge_id?: string;
  candidate_id?: string;
  badge_template_id?: string;
  source_evaluation_id?: string;
  issued_at?: string;
  expires_at?: string;
  status?: BadgeStatus;
  created_at?: string;
  updated_at?: string;
  reissued_from_badge_id?: string;
  reissue_reason?: string;
}

export interface BadgeStatusUpdateDto {
  status: BadgeStatus;
}

export interface BadgeVerificationDto {
  badge_id?: string;
  valid?: boolean;
  status?: BadgeStatus;
  badge_name?: string;
  skill_category?: string;
  issued_at?: string;
  expires_at?: string;
  candidate_name?: string;
}

export interface BadgeTemplateCreateDto {
  name: string;
  description?: string;
  skill_category: string;
  minimum_score: number;
  icon_url?: string;
}

export interface BadgeTemplateUpdateDto {
  name?: string;
  description?: string;
  skill_category?: string;
  minimum_score?: number;
  icon_url?: string;
}

export interface BadgeTemplateDto {
  id?: string;
  name?: string;
  description?: string;
  skill_category?: string;
  minimum_score?: number;
  icon_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CertificateCreateDto {
  candidate_id: string;
  source_evaluation_id?: string;
  title: string;
  skill_category?: string;
}

export interface CertificateDto {
  id?: string;
  certificate_id?: string;
  candidate_id?: string;
  source_evaluation_id?: string;
  title?: string;
  skill_category?: string;
  competency_score?: number;
  verification_code?: string;
  issued_at?: string;
  storage_file_id?: string;
  created_at?: string;
  updated_at?: string;
  status?: CertificateStatus;
  visibility?: CertificateVisibility;
}

export interface CertificateStatusUpdateDto {
  status: CertificateStatus;
}

export interface CertificateVisibilityUpdateDto {
  visibility: CertificateVisibility;
}

export interface CertificateVerificationDto {
  certificate_id?: string;
  valid?: boolean;
  status?: CertificateStatus;
  candidate_name?: string;
  title?: string;
  skill_category?: string;
  issued_at?: string;
}

export interface CertificateDownloadDto {
  download_url?: string;
}

export const credentialApi = {
  // Badges
  createBadge: (payload: BadgeCreateDto) =>
    userApiClient.post<BadgeDto>('/api/v1/badges', payload),
  getBadge: (badgeId: string) =>
    userApiClient.get<BadgeDto>(`/api/v1/badges/${badgeId}`),
  getCandidateBadges: (candidateId: string) =>
    userApiClient.get<BadgeDto[]>(`/api/v1/candidates/${candidateId}/badges`),
  getCandidateBadgeHistory: (candidateId: string) =>
    userApiClient.get<BadgeDto[]>(`/api/v1/candidates/${candidateId}/badges/history`),
  updateBadgeStatus: (badgeId: string, payload: BadgeStatusUpdateDto) =>
    userApiClient.patch<BadgeDto>(`/api/v1/badges/${badgeId}/status`, payload),
  verifyBadge: (badgeId: string) =>
    userApiClient.get<BadgeVerificationDto>(`/api/v1/public/badges/${badgeId}/verify`),
  getBadgeQrCode: (badgeId: string) =>
    userApiClient.get<Blob>(`/api/v1/badges/${badgeId}/qr`, { responseType: 'blob' }),

  // Badge Templates
  createBadgeTemplate: (payload: BadgeTemplateCreateDto) =>
    userApiClient.post<BadgeTemplateDto>('/api/v1/badge-templates', payload),
  getAllBadgeTemplates: () =>
    userApiClient.get<BadgeTemplateDto[]>('/api/v1/badge-templates'),
  getBadgeTemplate: (templateId: string) =>
    userApiClient.get<BadgeTemplateDto>(`/api/v1/badge-templates/${templateId}`),
  updateBadgeTemplate: (templateId: string, payload: BadgeTemplateUpdateDto) =>
    userApiClient.patch<BadgeTemplateDto>(`/api/v1/badge-templates/${templateId}`, payload),

  // Certificates
  createCertificate: (payload: CertificateCreateDto) =>
    userApiClient.post<CertificateDto>('/api/v1/certificates', payload),
  getCertificate: (certificateId: string) =>
    userApiClient.get<CertificateDto>(`/api/v1/certificates/${certificateId}`),
  getCandidateCertificates: (candidateId: string) =>
    userApiClient.get<CertificateDto[]>(`/api/v1/candidates/${candidateId}/certificates`),
  verifyCertificate: (certificateId: string) =>
    userApiClient.get<CertificateVerificationDto>(`/api/v1/public/certificates/${certificateId}/verify`),
  updateCertificateStatus: (certificateId: string, payload: CertificateStatusUpdateDto) =>
    userApiClient.patch<CertificateDto>(`/api/v1/certificates/${certificateId}/status`, payload),
  updateCertificateVisibility: (certificateId: string, payload: CertificateVisibilityUpdateDto) =>
    userApiClient.patch<CertificateDto>(`/api/v1/certificates/${certificateId}/visibility`, payload),
  getCertificateDownloadLink: (certificateId: string) =>
    userApiClient.get<CertificateDownloadDto>(`/api/v1/certificates/${certificateId}/download`),
};
