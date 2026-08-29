import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { extractErrorMessage } from '../../services/apiClient';
import {
  assessmentApi,
  type CategoryDto,
  type CodingTestCaseDto,
  type Difficulty,
  type QuestionDto,
  type QuestionOptionDto,
  type QuestionType,
  type ScenarioQuestionDto,
} from '../../services/assessmentApi';

const questionTypes: QuestionType[] = ['MCQ', 'CODING', 'SCENARIO', 'ARCHITECTURE'];
const difficulties: Difficulty[] = ['EASY', 'MEDIUM', 'HARD'];

const emptyOption = (): QuestionOptionDto => ({ option_text: '', is_correct: false });
const emptyTestCase = (): CodingTestCaseDto => ({ input: '', expected_output: '', visibility: 'PUBLIC', weight: 1 });
const emptyScenario = (): ScenarioQuestionDto => ({ expected_concepts: '', key_points: '', scoring_rubric: '', max_score: 10 });

export default function AdminQuestions() {
  const [questions, setQuestions] = useState<QuestionDto[]>([]);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [questionType, setQuestionType] = useState<QuestionType>('MCQ');
  const [content, setContent] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('MEDIUM');
  const [categoryId, setCategoryId] = useState('');
  const [marks, setMarks] = useState(1);
  const [explanation, setExplanation] = useState('');
  const [options, setOptions] = useState<QuestionOptionDto[]>([emptyOption(), emptyOption()]);
  const [testCases, setTestCases] = useState<CodingTestCaseDto[]>([emptyTestCase()]);
  const [scenario, setScenario] = useState<ScenarioQuestionDto>(emptyScenario());

  const loadData = async () => {
    setLoading(true);
    try {
      const [questionsRes, categoriesRes] = await Promise.all([
        assessmentApi.getQuestions(),
        assessmentApi.getCategories(),
      ]);
      setQuestions(questionsRes.data);
      setCategories(categoriesRes.data);
    } catch (err) {
      console.error('Failed to load questions:', err);
      toast.error(extractErrorMessage(err, 'Failed to load questions'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const resetForm = () => {
    setQuestionType('MCQ');
    setContent('');
    setDifficulty('MEDIUM');
    setCategoryId('');
    setMarks(1);
    setExplanation('');
    setOptions([emptyOption(), emptyOption()]);
    setTestCases([emptyTestCase()]);
    setScenario(emptyScenario());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    if (questionType === 'MCQ') {
      const filled = options.filter((o) => o.option_text.trim());
      if (filled.length < 2) {
        toast.error('MCQ questions require at least 2 options');
        return;
      }
      if (!filled.some((o) => o.is_correct)) {
        toast.error('MCQ questions require at least one correct option');
        return;
      }
    }
    if (questionType === 'CODING') {
      const filled = testCases.filter((t) => t.input.trim() && t.expected_output.trim());
      if (filled.length < 1) {
        toast.error('Coding questions require at least one test case');
        return;
      }
    }

    setSubmitting(true);
    try {
      await assessmentApi.createQuestion({
        question_type: questionType,
        content,
        difficulty,
        category_id: categoryId || undefined,
        marks,
        explanation: explanation || undefined,
        options: questionType === 'MCQ' ? options.filter((o) => o.option_text.trim()) : undefined,
        test_cases: questionType === 'CODING' ? testCases.filter((t) => t.input.trim() && t.expected_output.trim()) : undefined,
        scenario_question: questionType === 'SCENARIO' ? scenario : undefined,
      });
      toast.success('Question added to bank');
      resetForm();
      setShowForm(false);
      loadData();
    } catch (err) {
      console.error('Failed to create question:', err);
      toast.error(extractErrorMessage(err, 'Failed to create question'));
    } finally {
      setSubmitting(false);
    }
  };

  const remove = async (groupId: string) => {
    try {
      await assessmentApi.deleteQuestion(groupId);
      setQuestions((prev) => prev.filter((q) => q.question_group_id !== groupId));
      toast.success('Question deleted');
    } catch (err) {
      console.error('Failed to delete question:', err);
      toast.error(extractErrorMessage(err, 'Failed to delete question'));
    }
  };

  const categoryName = (id?: string) => categories.find((c) => c.id === id)?.name ?? '—';

  const difficultyColor = (d?: Difficulty) =>
    d === 'HARD' ? 'var(--spai-danger)' : d === 'MEDIUM' ? 'var(--spai-claim)' : 'var(--spai-verified)';

  if (loading) {
    return <div style={{ padding: 24, textAlign: 'center', color: 'var(--spai-slate)' }}>Loading question bank...</div>;
  }

  return (
    <div>
      <div className="dash-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="eyebrow">Questions</div>
          <h1>Question bank</h1>
          <p>Individual questions used across assessment definitions.</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => setShowForm((prev) => !prev)}>
          {showForm ? 'Cancel' : 'New question'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card" style={{ marginBottom: 20, maxWidth: 640 }}>
          <div className="field-row">
            <div className="field">
              <label htmlFor="questionType">Question type</label>
              <select id="questionType" value={questionType} onChange={(e) => setQuestionType(e.target.value as QuestionType)}>
                {questionTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="difficulty">Difficulty</label>
              <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value as Difficulty)}>
                {difficulties.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="field">
            <label htmlFor="content">Question content</label>
            <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows={3} required />
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="category">Category</label>
              <select id="category" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                <option value="">No category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="marks">Marks</label>
              <input id="marks" type="number" min={0} value={marks} onChange={(e) => setMarks(Number(e.target.value))} />
            </div>
          </div>

          <div className="field">
            <label htmlFor="explanation">Explanation (shown after grading)</label>
            <textarea id="explanation" value={explanation} onChange={(e) => setExplanation(e.target.value)} rows={2} />
          </div>

          {questionType === 'MCQ' && (
            <div className="field">
              <label>Options (mark the correct one)</label>
              {options.map((option, index) => (
                <div key={index} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    checked={!!option.is_correct}
                    onChange={(e) =>
                      setOptions((prev) => prev.map((o, i) => (i === index ? { ...o, is_correct: e.target.checked } : o)))
                    }
                    title="Correct answer"
                  />
                  <input
                    value={option.option_text}
                    onChange={(e) =>
                      setOptions((prev) => prev.map((o, i) => (i === index ? { ...o, option_text: e.target.value } : o)))
                    }
                    placeholder={`Option ${index + 1}`}
                    style={{ flex: 1 }}
                  />
                  {options.length > 2 && (
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={() => setOptions((prev) => prev.filter((_, i) => i !== index))}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button type="button" className="btn btn-ghost" onClick={() => setOptions((prev) => [...prev, emptyOption()])}>
                Add option
              </button>
            </div>
          )}

          {questionType === 'CODING' && (
            <div className="field">
              <label>Test cases</label>
              {testCases.map((testCase, index) => (
                <div key={index} className="card" style={{ marginBottom: 10, padding: 12 }}>
                  <div className="field-row">
                    <div className="field">
                      <label>Input</label>
                      <textarea
                        rows={2}
                        value={testCase.input}
                        onChange={(e) =>
                          setTestCases((prev) => prev.map((t, i) => (i === index ? { ...t, input: e.target.value } : t)))
                        }
                      />
                    </div>
                    <div className="field">
                      <label>Expected output</label>
                      <textarea
                        rows={2}
                        value={testCase.expected_output}
                        onChange={(e) =>
                          setTestCases((prev) => prev.map((t, i) => (i === index ? { ...t, expected_output: e.target.value } : t)))
                        }
                      />
                    </div>
                  </div>
                  <div className="field-row">
                    <div className="field">
                      <label>Visibility</label>
                      <select
                        value={testCase.visibility}
                        onChange={(e) =>
                          setTestCases((prev) =>
                            prev.map((t, i) => (i === index ? { ...t, visibility: e.target.value as 'PUBLIC' | 'PRIVATE' } : t)),
                          )
                        }
                      >
                        <option value="PUBLIC">Public (shown to candidate)</option>
                        <option value="PRIVATE">Private (hidden)</option>
                      </select>
                    </div>
                    <div className="field">
                      <label>Weight</label>
                      <input
                        type="number"
                        min={1}
                        value={testCase.weight}
                        onChange={(e) =>
                          setTestCases((prev) => prev.map((t, i) => (i === index ? { ...t, weight: Number(e.target.value) } : t)))
                        }
                      />
                    </div>
                  </div>
                  {testCases.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={() => setTestCases((prev) => prev.filter((_, i) => i !== index))}
                    >
                      Remove test case
                    </button>
                  )}
                </div>
              ))}
              <button type="button" className="btn btn-ghost" onClick={() => setTestCases((prev) => [...prev, emptyTestCase()])}>
                Add test case
              </button>
            </div>
          )}

          {questionType === 'SCENARIO' && (
            <>
              <div className="field">
                <label>Expected concepts</label>
                <textarea
                  rows={2}
                  value={scenario.expected_concepts}
                  onChange={(e) => setScenario((prev) => ({ ...prev, expected_concepts: e.target.value }))}
                />
              </div>
              <div className="field">
                <label>Key points</label>
                <textarea
                  rows={2}
                  value={scenario.key_points}
                  onChange={(e) => setScenario((prev) => ({ ...prev, key_points: e.target.value }))}
                />
              </div>
              <div className="field-row">
                <div className="field">
                  <label>Scoring rubric</label>
                  <textarea
                    rows={2}
                    value={scenario.scoring_rubric}
                    onChange={(e) => setScenario((prev) => ({ ...prev, scoring_rubric: e.target.value }))}
                  />
                </div>
                <div className="field">
                  <label>Max score</label>
                  <input
                    type="number"
                    min={0}
                    value={scenario.max_score}
                    onChange={(e) => setScenario((prev) => ({ ...prev, max_score: Number(e.target.value) }))}
                  />
                </div>
              </div>
            </>
          )}

          {questionType === 'ARCHITECTURE' && (
            <p style={{ color: 'var(--spai-slate)', fontSize: 13 }}>
              Architecture questions are graded from a submitted diagram and written explanation - no extra setup needed here.
            </p>
          )}

          <button type="submit" className="btn btn-primary" disabled={submitting} style={{ marginTop: 8 }}>
            {submitting ? 'Adding...' : 'Add question'}
          </button>
        </form>
      )}

      <div className="card">
        {questions.map((question) => (
          <div
            key={question.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '14px 0',
              borderBottom: '1px solid var(--spai-line)',
              gap: 16,
            }}
          >
            <div>
              <div style={{ fontSize: 14 }}>{question.content}</div>
              <div className="mono" style={{ fontSize: 12, color: 'var(--spai-slate)', marginTop: 2 }}>
                {question.question_type} &middot; {categoryName(question.category_id)} &middot; {question.marks ?? 0} marks
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <span className="mono" style={{ fontSize: 11.5, textTransform: 'uppercase', color: difficultyColor(question.difficulty) }}>
                {question.difficulty ?? '—'}
              </span>
              <button type="button" className="btn btn-danger" onClick={() => remove(question.question_group_id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
        {questions.length === 0 && (
          <p style={{ color: 'var(--spai-slate)', fontSize: 14 }}>No questions in the bank yet.</p>
        )}
      </div>
    </div>
  );
}
