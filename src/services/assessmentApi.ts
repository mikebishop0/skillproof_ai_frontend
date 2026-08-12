import { assessmentApiClient } from './apiClient';

export interface CreateCodingTestCaseDto {
  input: string;
  expected_output: string;
  visibility: 'PUBLIC' | 'PRIVATE';
  weight: number;
}

export interface CreateQuestionOptionDto {
  option_text: string;
  is_correct?: boolean;
  display_order?: number;
}

export interface CreateScenarioQuestionDto {
  expected_concepts?: string;
  key_points?: string;
  scoring_rubric?: string;
  max_score?: number;
}

export interface CreateQuestionDto {
  question_type: 'MCQ' | 'CODING' | 'SCENARIO' | 'ARCHITECTURE';
  content: string;
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
  category_id?: string;
  marks?: number;
  explanation?: string;
  options?: CreateQuestionOptionDto[];
  test_cases?: CreateCodingTestCaseDto[];
  scenario_question?: CreateScenarioQuestionDto;
}

export interface CodingTestCaseDto {
  id?: string;
  coding_question_id?: string;
  input?: string;
  expected_output?: string;
  visibility?: 'PUBLIC' | 'PRIVATE';
  weight?: number;
}

export interface CodingQuestionDto {
  id?: string;
  question_id?: string;
  test_cases?: CodingTestCaseDto[];
}

export interface QuestionOptionDto {
  id?: string;
  question_id?: string;
  option_text?: string;
  is_correct?: boolean;
  display_order?: number;
}

export interface ScenarioQuestionDto {
  id?: string;
  question_id?: string;
  expected_concepts?: string;
  key_points?: string;
  scoring_rubric?: string;
  max_score?: number;
}

export interface QuestionDto {
  id?: string;
  question_group_id?: string;
  version?: number;
  is_latest?: boolean;
  question_type?: 'MCQ' | 'CODING' | 'SCENARIO' | 'ARCHITECTURE';
  content?: string;
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
  category_id?: string;
  marks?: number;
  explanation?: string;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  options?: QuestionOptionDto[];
  coding_question?: CodingQuestionDto;
  scenario_question?: ScenarioQuestionDto;
}

export interface SubmitAnswerDto {
  question_id?: string;
  selected_options_id?: string[];
}

export interface SubmitAttemptDto {
  answers?: SubmitAnswerDto[];
}

export interface AttemptResultDto {
  attempt_id?: string;
  score?: number;
  total_marks?: number;
  passing_score?: number;
  passed?: boolean;
  time_taken?: number;
  submitted_at?: string;
}

export interface CreateScenarioSubmissionDto {
  question_id: string;
  response_text: string;
}

export interface ScenarioSubmissionDto {
  id?: string;
  attempt_id?: string;
  question_id?: string;
  response_text?: string;
  status?: 'UNDER_EVALUATION' | 'EVALUATED' | 'EVALUATION_FAILED' | 'ERROR';
  submitted_at?: string;
  evaluated_at?: string;
  score?: number;
  evaluation_output?: string;
}

export interface AssessmentResultDto {
  id?: string;
  attempt_id?: string;
  user_id?: string;
  assessment_id?: string;
  total_score?: number;
  percentage?: number;
  pass_fail?: boolean;
  completed_at?: string;
  result_status?: 'PENDING' | 'COMPLETE';
  section_scores?: Record<string, number>;
  created_at?: string;
}

export interface CreateCodeSubmissionDto {
  question_id?: string;
  language?: 'JAVA' | 'PYTHON' | 'JAVASCRIPT' | 'TYPESCRIPT' | 'C' | 'CPP' | 'CSHARP' | 'GO' | 'RUBY' | 'PHP' | 'KOTLIN' | 'SWIFT' | 'RUST' | 'SCALA' | 'PERL' | 'R' | 'DART' | 'ELIXIR' | 'HASKELL' | 'OBJECTIVE_C' | 'LUA' | 'GROOVY' | 'CLOJURE' | 'SQL' | 'BASH' | 'POWERSHELL';
  source_code?: string;
}

export interface CodeSubmissionDto {
  id?: string;
  attempt_id?: string;
  question_id?: string;
  language?: 'JAVA' | 'PYTHON' | 'JAVASCRIPT' | 'TYPESCRIPT' | 'C' | 'CPP' | 'CSHARP' | 'GO' | 'RUBY' | 'PHP' | 'KOTLIN' | 'SWIFT' | 'RUST' | 'SCALA' | 'PERL' | 'R' | 'DART' | 'ELIXIR' | 'HASKELL' | 'OBJECTIVE_C' | 'LUA' | 'GROOVY' | 'CLOJURE' | 'SQL' | 'BASH' | 'POWERSHELL';
  source_code?: string;
  status?: 'UNDER_EVALUATION' | 'EVALUATED' | 'EVALUATION_FAILED' | 'ERROR';
  submitted_at?: string;
  evaluated_at?: string;
  score?: number;
  evaluation_output?: string;
}

export interface ArchitectureSubmissionDto {
  id?: string;
  question_id?: string;
  attempt_id?: string;
  written_explanation?: string;
  diagram_file_id?: string;
  status?: 'UNDER_EVALUATION' | 'EVALUATED' | 'EVALUATION_FAILED' | 'ERROR';
  submitted_at?: string;
  evaluated_at?: string;
  score?: number;
  evaluation_output?: string;
}

export interface CreateAssessmentDto {
  title: string;
  description?: string;
  skill_category?: string;
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
  duration?: number;
  passing_score?: number;
  total_marks?: number;
  category_id?: string;
  start_date?: string;
  end_date?: string;
  max_attempts?: number;
}

export interface AssessmentDto {
  id?: string;
  title?: string;
  description?: string;
  skill_category?: string;
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
  duration?: number;
  passing_score?: number;
  total_marks?: number;
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  created_by?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  category_id?: string;
  start_date?: string;
  end_date?: string;
  max_attempts?: number;
}

export interface PublicQuestionOptionDto {
  id?: string;
  option_text?: string;
  display_order?: number;
}

export interface AttemptQuestionDto {
  id?: string;
  question_type?: 'MCQ' | 'CODING' | 'SCENARIO' | 'ARCHITECTURE';
  content?: string;
  marks?: number;
  options?: PublicQuestionOptionDto[];
}

export interface AttemptDto {
  id?: string;
  assessment_id?: string;
  candidate_id?: string;
  status?: string;
  started_at?: string;
  questions?: AttemptQuestionDto[];
}

export interface CategoryDto {
  id?: string;
  name: string;
}

export interface UpdateQuestionDto {
  question_type?: 'MCQ' | 'CODING' | 'SCENARIO' | 'ARCHITECTURE';
  content?: string;
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
  category_id?: string;
  marks?: number;
  explanation?: string;
}

export interface UpdateAssessmentDto {
  title?: string;
  description?: string;
  skill_category?: string;
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
  duration?: number;
  passing_score?: number;
  total_marks?: number;
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  updated_at?: string;
  category_id?: string;
  start_date?: string;
  end_date?: string;
  max_attempts?: number;
}

export interface AttemptSubmissionsDto {
  attempt_id?: string;
  code_submissions?: CodeSubmissionDto[];
  scenario_submissions?: ScenarioSubmissionDto[];
  architecture_submissions?: ArchitectureSubmissionDto[];
}

export const assessmentApi = {
  // Questions
  getAllQuestions: (type?: string) =>
    assessmentApiClient.get<QuestionDto[]>('/api/v1/questions', { params: { type } }),
  createQuestion: (payload: CreateQuestionDto) =>
    assessmentApiClient.post<QuestionDto>('/api/v1/questions', payload),
  getLatestVersionOfQuestion: (groupId: string) =>
    assessmentApiClient.get<QuestionDto>(`/api/v1/questions/${groupId}`),
  deleteQuestion: (groupId: string) =>
    assessmentApiClient.delete<any>(`/api/v1/questions/${groupId}`),
  updateQuestion: (groupId: string, payload: UpdateQuestionDto) =>
    assessmentApiClient.patch<QuestionDto>(`/api/v1/questions/${groupId}`, payload),
  getQuestionByVersion: (groupId: string, version: number) =>
    assessmentApiClient.get<QuestionDto>(`/api/v1/questions/${groupId}/${version}`),

  // Assessments
  getAssessments: (status?: string) =>
    assessmentApiClient.get<AssessmentDto[]>('/api/v1/assessments', { params: { status } }),
  createAssessment: (payload: CreateAssessmentDto) =>
    assessmentApiClient.post<AssessmentDto>('/api/v1/assessments', payload),
  getAssessment: (assessmentId: string) =>
    assessmentApiClient.get<AssessmentDto>(`/api/v1/assessments/${assessmentId}`),
  deleteAssessment: (assessmentId: string) =>
    assessmentApiClient.delete<any>(`/api/v1/assessments/${assessmentId}`),
  updateAssessment: (assessmentId: string, payload: UpdateAssessmentDto) =>
    assessmentApiClient.patch<AssessmentDto>(`/api/v1/assessments/${assessmentId}`, payload),

  // Assessment Question Linking
  linkQuestion: (assessmentId: string, questionId: string) =>
    assessmentApiClient.post<any>(`/api/v1/assessments/${assessmentId}/questions/${questionId}`),
  unlinkQuestion: (assessmentId: string, questionId: string) =>
    assessmentApiClient.delete<any>(`/api/v1/assessments/${assessmentId}/questions/${questionId}`),

  // Attempts
  createAttempt: (assessmentId: string) =>
    assessmentApiClient.post<AttemptDto>(`/api/v1/assessments/${assessmentId}/attempts`),
  submitAttempt: (attemptId: string, payload: SubmitAttemptDto) =>
    assessmentApiClient.post<AttemptResultDto>(`/api/v1/attempts/${attemptId}/submit`, payload),
  submitScenario: (attemptId: string, payload: CreateScenarioSubmissionDto) =>
    assessmentApiClient.post<ScenarioSubmissionDto>(`/api/v1/attempts/${attemptId}/scenario-submissions`, payload),
  getResult: (attemptId: string) =>
    assessmentApiClient.post<AssessmentResultDto>(`/api/v1/attempts/${attemptId}/result`),
  submitCode: (attemptId: string, payload: CreateCodeSubmissionDto) =>
    assessmentApiClient.post<CodeSubmissionDto>(`/api/v1/attempts/${attemptId}/code-submissions`, payload),
  saveProgress: (attemptId: string, payload: SubmitAnswerDto) =>
    assessmentApiClient.post<any>(`/api/v1/attempts/${attemptId}/answers`, payload),
  getSubmissionHistory: (attemptId: string) =>
    assessmentApiClient.get<AttemptSubmissionsDto>(`/api/v1/attempts/${attemptId}/submissions`),

  // Architecture Submissions (uses multipart/form-data)
  submitArchitecture: (attemptId: string, questionId: string, writtenExplanation: string, diagram: File) => {
    const formData = new FormData();
    formData.append('diagram', diagram);
    return assessmentApiClient.post<ArchitectureSubmissionDto>(
      `/api/v1/attempts/${attemptId}/architecture-submissions`,
      formData,
      {
        params: { questionId, writtenExplanation },
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
  },

  // Categories
  createCategory: (payload: CategoryDto) =>
    assessmentApiClient.post<CategoryDto>('/api/v1/admin/assessment-categories', payload),
  deleteCategory: (name: string) =>
    assessmentApiClient.delete<any>(`/api/v1/admin/assessment-categories/${name}`),
  updateCategory: (name: string, payload: CategoryDto) =>
    assessmentApiClient.patch<CategoryDto>(`/api/v1/admin/assessment-categories/${name}`, payload),
  getAllCategories: () =>
    assessmentApiClient.get<CategoryDto[]>('/api/v1/assessment-categories'),
};
