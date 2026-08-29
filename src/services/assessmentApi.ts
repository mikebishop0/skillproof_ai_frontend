import { assessmentApiClient } from './apiClient';

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';
export type AssessmentStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
export type QuestionType = 'MCQ' | 'CODING' | 'SCENARIO' | 'ARCHITECTURE';
export type TestCaseVisibility = 'PUBLIC' | 'PRIVATE';

export interface CategoryDto {
  id?: string;
  name: string;
}

export interface AssessmentDto {
  id: string;
  title: string;
  description?: string;
  skill_category?: string;
  difficulty?: Difficulty;
  duration?: number;
  passing_score?: number;
  total_marks?: number;
  status: AssessmentStatus;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
  category_id?: string;
  start_date?: string;
  end_date?: string;
  max_attempts?: number;
}

export interface CreateAssessmentPayload {
  title: string;
  description?: string;
  skill_category?: string;
  difficulty?: Difficulty;
  duration?: number;
  passing_score?: number;
  total_marks?: number;
  category_id?: string;
  start_date?: string;
  end_date?: string;
  max_attempts?: number;
}

export type UpdateAssessmentPayload = Partial<CreateAssessmentPayload> & { status?: AssessmentStatus };

export interface QuestionOptionDto {
  id?: string;
  option_text: string;
  is_correct?: boolean;
  display_order?: number;
}

export interface CodingTestCaseDto {
  id?: string;
  input: string;
  expected_output: string;
  visibility: TestCaseVisibility;
  weight: number;
}

export interface ScenarioQuestionDto {
  id?: string;
  expected_concepts?: string;
  key_points?: string;
  scoring_rubric?: string;
  max_score?: number;
}

export interface QuestionDto {
  id: string;
  question_group_id: string;
  version: number;
  is_latest: boolean;
  question_type: QuestionType;
  content: string;
  difficulty?: Difficulty;
  category_id?: string;
  marks?: number;
  explanation?: string;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
  options?: QuestionOptionDto[];
  coding_question?: { id: string; question_id: string; test_cases?: CodingTestCaseDto[] };
  scenario_question?: ScenarioQuestionDto;
}

export interface CreateQuestionPayload {
  question_type: QuestionType;
  content: string;
  difficulty?: Difficulty;
  category_id?: string;
  marks?: number;
  explanation?: string;
  options?: QuestionOptionDto[];
  test_cases?: CodingTestCaseDto[];
  scenario_question?: ScenarioQuestionDto;
}

export interface UpdateQuestionPayload {
  question_type?: QuestionType;
  content?: string;
  difficulty?: Difficulty;
  category_id?: string;
  marks?: number;
  explanation?: string;
}

export const assessmentApi = {
  // Categories
  getCategories: () => assessmentApiClient.get<CategoryDto[]>('/api/v1/assessment-categories'),
  createCategory: (name: string) =>
    assessmentApiClient.post<CategoryDto>('/api/v1/admin/assessment-categories', { name }),
  updateCategory: (name: string, newName: string) =>
    assessmentApiClient.patch<CategoryDto>(`/api/v1/admin/assessment-categories/${encodeURIComponent(name)}`, { name: newName }),
  deleteCategory: (name: string) =>
    assessmentApiClient.delete<void>(`/api/v1/admin/assessment-categories/${encodeURIComponent(name)}`),

  // Assessments
  getAssessments: (status?: AssessmentStatus) =>
    assessmentApiClient.get<AssessmentDto[]>('/api/v1/assessments', { params: status ? { status } : undefined }),
  getAssessment: (id: string) => assessmentApiClient.get<AssessmentDto>(`/api/v1/assessments/${id}`),
  createAssessment: (payload: CreateAssessmentPayload) =>
    assessmentApiClient.post<AssessmentDto>('/api/v1/assessments', payload),
  updateAssessment: (id: string, payload: UpdateAssessmentPayload) =>
    assessmentApiClient.patch<AssessmentDto>(`/api/v1/assessments/${id}`, payload),
  deleteAssessment: (id: string) => assessmentApiClient.delete<void>(`/api/v1/assessments/${id}`),
  getAssessmentQuestions: (assessmentId: string) =>
    assessmentApiClient.get<QuestionDto[]>(`/api/v1/assessments/${assessmentId}/questions`),
  linkQuestion: (assessmentId: string, questionId: string) =>
    assessmentApiClient.post<void>(`/api/v1/assessments/${assessmentId}/questions/${questionId}`),
  unlinkQuestion: (assessmentId: string, questionId: string) =>
    assessmentApiClient.delete<void>(`/api/v1/assessments/${assessmentId}/questions/${questionId}`),

  // Questions
  getQuestions: (type?: QuestionType) =>
    assessmentApiClient.get<QuestionDto[]>('/api/v1/questions', { params: type ? { type } : undefined }),
  getQuestion: (groupId: string) => assessmentApiClient.get<QuestionDto>(`/api/v1/questions/${groupId}`),
  createQuestion: (payload: CreateQuestionPayload) =>
    assessmentApiClient.post<QuestionDto>('/api/v1/questions', payload),
  updateQuestion: (groupId: string, payload: UpdateQuestionPayload) =>
    assessmentApiClient.patch<QuestionDto>(`/api/v1/questions/${groupId}`, payload),
  deleteQuestion: (groupId: string) => assessmentApiClient.delete<void>(`/api/v1/questions/${groupId}`),
};
