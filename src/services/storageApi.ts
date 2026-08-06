import { storageApiClient } from './apiClient';

export interface FileDto {
  id: string;
  user_id: string;
  entity_type: 'PROFILE' | 'PROJECT' | 'PORTFOLIO' | 'ASSESSMENT' | 'COMPANY' | 'CERTIFICATE' | 'RESUME';
  entity_id: string;
  bucket_name: string;
  file_name: string;
  original_name: string;
  mime_type: string;
  file_size: number;
  storage_path?: string;
  public_url?: string;
  visibility: 'PUBLIC' | 'PRIVATE';
  uploaded_at?: string;
}

export const storageApi = {
  uploadFile: (
    file: File,
    entityType: 'PROFILE' | 'PROJECT' | 'PORTFOLIO' | 'ASSESSMENT' | 'COMPANY' | 'CERTIFICATE' | 'RESUME',
    entityId: string,
    visibility: 'PUBLIC' | 'PRIVATE'
  ) => {
    const formData = new FormData();
    formData.append('file', file);

    return storageApiClient.post<FileDto>('/api/v1/upload-files', formData, {
      params: {
        entityType,
        entityId,
        visibility,
      },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  getFiles: (
    entityType: 'PROFILE' | 'PROJECT' | 'PORTFOLIO' | 'ASSESSMENT' | 'COMPANY' | 'CERTIFICATE' | 'RESUME',
    entityId: string
  ) => {
    return storageApiClient.get<any>('/api/v1/files', {
      params: {
        entityType,
        entityId,
      },
    });
  },

  getDownloadUrl: (fileId: string) => {
    return storageApiClient.get<Record<string, string>>(`/api/v1/files/${fileId}/download-url`);
  },
};
