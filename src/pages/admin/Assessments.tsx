import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { extractErrorMessage } from '../../services/apiClient';
import {
  assessmentApi,
  type AssessmentDto,
  type CategoryDto,
  type QuestionDto,
} from '../../services/assessmentApi';

type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';
const difficulties: Difficulty[] = ['EASY', 'MEDIUM', 'HARD'];

export default function AdminAssessments() {
  const [assessments, setAssessments] = useState<AssessmentDto[]>([]);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [manageId, setManageId] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skillCategory, setSkillCategory] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('MEDIUM');
  const [categoryId, setCategoryId] = useState('');
  const [duration, setDuration] = useState(30);
  const [passingScore, setPassingScore] = useState(60);
  const [totalMarks, setTotalMarks] = useState(100);
  const [maxAttempts, setMaxAttempts] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [newCategoryName, setNewCategoryName] = useState('');
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [assessmentsRes, categoriesRes] = await Promise.all([
        assessmentApi.getAssessments(),
        assessmentApi.getAllCategories(),
      ]);
      setAssessments(assessmentsRes.data);
      setCategories(categoriesRes.data);
    } catch (err) {
      console.error('Failed to load assessments:', err);
      toast.error(extractErrorMessage(err, 'Failed to load assessments'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setSkillCategory('');
    setDifficulty('MEDIUM');
    setCategoryId('');
    setDuration(30);
    setPassingScore(60);
    setTotalMarks(100);
    setMaxAttempts(1);
    setStartDate('');
    setEndDate('');
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      await assessmentApi.createAssessment({
        title,
        description: description || undefined,
        skill_category: skillCategory || undefined,
        difficulty,
        duration,
        passing_score: passingScore,
        total_marks: totalMarks,
        category_id: categoryId || undefined,
        max_attempts: maxAttempts,
        start_date: startDate ? new Date(startDate).toISOString() : undefined,
        end_date: endDate ? new Date(endDate).toISOString() : undefined,
      });
      toast.success('Assessment created as draft');
      resetForm();
      setShowForm(false);
      loadData();
    } catch (err) {
      console.error('Failed to create assessment:', err);
      toast.error(extractErrorMessage(err, 'Failed to create assessment'));
    } finally {
      setSubmitting(false);
    }
  };

  const setStatus = async (assessment: AssessmentDto, status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED') => {
    try {
      await assessmentApi.updateAssessment(assessment.id!, { status });
      setAssessments((prev) => prev.map((a) => (a.id === assessment.id ? { ...a, status } : a)));
      toast.success(`Assessment ${status.toLowerCase()}`);
    } catch (err) {
      console.error('Failed to update assessment status:', err);
      toast.error(extractErrorMessage(err, 'Failed to update assessment'));
    }
  };

  const remove = async (id: string) => {
    try {
      await assessmentApi.deleteAssessment(id);
      setAssessments((prev) => prev.filter((a) => a.id !== id));
      toast.success('Assessment deleted');
    } catch (err) {
      console.error('Failed to delete assessment:', err);
      toast.error(extractErrorMessage(err, 'Failed to delete assessment'));
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    try {
      const res = await assessmentApi.createCategory({ name: newCategoryName.trim() });
      setCategories((prev) => [...prev, res.data]);
      setNewCategoryName('');
      toast.success('Category added');
    } catch (err) {
      console.error('Failed to create category:', err);
      toast.error(extractErrorMessage(err, 'Failed to create category'));
    }
  };

  const removeCategory = async (name: string) => {
    try {
      await assessmentApi.deleteCategory(name);
      setCategories((prev) => prev.filter((c) => c.name !== name));
      toast.success('Category deleted');
    } catch (err) {
      console.error('Failed to delete category:', err);
      toast.error(extractErrorMessage(err, 'Failed to delete category'));
    }
  };

  const categoryName = (id?: string) => categories.find((c) => c.id === id)?.name ?? '—';

  const statusColor = (status: AssessmentDto['status']) =>
    status === 'PUBLISHED' ? 'var(--spai-verified)' : status === 'ARCHIVED' ? 'var(--spai-danger)' : 'var(--spai-slate)';
  const statusBg = (status: AssessmentDto['status']) =>
    status === 'PUBLISHED' ? 'rgba(0,88,190,0.12)' : 'var(--spai-ink-lighter)';

  if (loading) {
    return <div style={{ padding: 24, textAlign: 'center', color: 'var(--spai-slate)' }}>Loading assessments...</div>;
  }

  return (
    <div>
      <div className="dash-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="eyebrow">Assessments</div>
          <h1>Manage assessments</h1>
          <p>Create and publish assessment definitions used across the platform.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button type="button" className="btn btn-ghost" onClick={() => setShowCategoryForm((prev) => !prev)}>
            Categories
          </button>
          <button type="button" className="btn btn-primary" onClick={() => setShowForm((prev) => !prev)}>
            {showForm ? 'Cancel' : 'New assessment'}
          </button>
        </div>
      </div>

      {showCategoryForm && (
        <div className="card" style={{ marginBottom: 20, maxWidth: 480 }}>
          <label>Assessment categories</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '10px 0' }}>
            {categories.map((c) => (
              <span key={c.id} className="tag">
                {c.name}
                <button type="button" onClick={() => removeCategory(c.name)} aria-label={`Remove ${c.name}`}>
                  ×
                </button>
              </span>
            ))}
            {categories.length === 0 && <span style={{ color: 'var(--spai-slate)', fontSize: 13 }}>No categories yet.</span>}
          </div>
          <form onSubmit={handleCreateCategory} style={{ display: 'flex', gap: 8 }}>
            <input
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="e.g. Backend Engineering"
              style={{ flex: 1 }}
            />
            <button type="submit" className="btn btn-ghost">Add</button>
          </form>
        </div>
      )}

      {showForm && (
        <form onSubmit={handleCreate} className="card" style={{ marginBottom: 20, maxWidth: 560 }}>
          <div className="field">
            <label htmlFor="title">Assessment title</label>
            <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="field">
            <label htmlFor="description">Description</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={2} />
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
              <label htmlFor="skillCategory">Skill tag</label>
              <input id="skillCategory" value={skillCategory} onChange={(e) => setSkillCategory(e.target.value)} placeholder="e.g. Java" />
            </div>
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="difficulty">Difficulty</label>
              <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value as Difficulty)}>
                {difficulties.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="duration">Duration (minutes)</label>
              <input id="duration" type="number" min={1} value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
            </div>
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="passingScore">Passing score</label>
              <input id="passingScore" type="number" min={0} value={passingScore} onChange={(e) => setPassingScore(Number(e.target.value))} />
            </div>
            <div className="field">
              <label htmlFor="totalMarks">Total marks</label>
              <input id="totalMarks" type="number" min={0} value={totalMarks} onChange={(e) => setTotalMarks(Number(e.target.value))} />
            </div>
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="startDate">Start date (optional)</label>
              <input id="startDate" type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="endDate">End date (optional)</label>
              <input id="endDate" type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>

          <div className="field">
            <label htmlFor="maxAttempts">Max attempts per candidate</label>
            <input id="maxAttempts" type="number" min={1} value={maxAttempts} onChange={(e) => setMaxAttempts(Number(e.target.value))} />
          </div>

          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Creating...' : 'Create as draft'}
          </button>
        </form>
      )}

      <div className="card">
        {assessments.map((assessment) => (
          <div key={assessment.id} style={{ borderBottom: '1px solid var(--spai-line)', padding: '14px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 14 }}>{assessment.title}</div>
                <div className="mono" style={{ fontSize: 12, color: 'var(--spai-slate)', marginTop: 2 }}>
                  {categoryName(assessment.category_id)} &middot; {assessment.difficulty ?? '—'} &middot; {assessment.duration ?? '—'} min &middot; {assessment.total_marks ?? '—'} marks
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span
                  className="mono"
                  style={{
                    fontSize: 11.5,
                    textTransform: 'uppercase',
                    color: statusColor(assessment.status),
                    background: statusBg(assessment.status),
                    padding: '3px 9px',
                    borderRadius: 10,
                  }}
                >
                  {assessment.status}
                </span>
                <button type="button" className="btn btn-ghost" onClick={() => setManageId(manageId === assessment.id ? null : (assessment.id ?? null))}>
                  {manageId === assessment.id ? 'Close' : 'Questions'}
                </button>
                {assessment.status === 'PUBLISHED' ? (
                  <button type="button" className="btn btn-ghost" onClick={() => setStatus(assessment, 'ARCHIVED')}>
                    Archive
                  </button>
                ) : (
                  <button type="button" className="btn btn-ghost" onClick={() => setStatus(assessment, 'PUBLISHED')}>
                    Publish
                  </button>
                )}
                <button type="button" className="btn btn-danger" onClick={() => remove(assessment.id!)}>
                  Delete
                </button>
              </div>
            </div>
            {manageId === assessment.id && <ManageQuestions assessment={assessment} />}
          </div>
        ))}
        {assessments.length === 0 && (
          <p style={{ color: 'var(--spai-slate)', fontSize: 14 }}>No assessments yet.</p>
        )}
      </div>
    </div>
  );
}

function ManageQuestions({ assessment }: { assessment: AssessmentDto }) {
  const [linked, setLinked] = useState<QuestionDto[]>([]);
  const [bank, setBank] = useState<QuestionDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const [linkedRes, bankRes] = await Promise.all([
        assessmentApi.getAssessmentQuestions(assessment.id!),
        assessmentApi.getAllQuestions(),
      ]);
      setLinked(linkedRes.data);
      setBank(bankRes.data);
    } catch (err) {
      console.error('Failed to load assessment questions:', err);
      toast.error(extractErrorMessage(err, 'Failed to load questions'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessment.id]);

  const linkedIds = new Set(linked.map((q) => q.question_group_id));
  const available = bank.filter((q) => !linkedIds.has(q.question_group_id));

  const addQuestion = async (questionId: string) => {
    if (!questionId) return;
    try {
      await assessmentApi.linkQuestion(assessment.id!, questionId);
      toast.success('Question added to assessment');
      setAddingId('');
      load();
    } catch (err) {
      console.error('Failed to link question:', err);
      toast.error(extractErrorMessage(err, 'Failed to add question'));
    }
  };

  const removeQuestion = async (questionId: string) => {
    try {
      await assessmentApi.unlinkQuestion(assessment.id!, questionId);
      toast.success('Question removed from assessment');
      setLinked((prev) => prev.filter((q) => q.id !== questionId));
    } catch (err) {
      console.error('Failed to unlink question:', err);
      toast.error(extractErrorMessage(err, 'Failed to remove question'));
    }
  };

  if (loading) {
    return <p style={{ color: 'var(--spai-slate)', fontSize: 13, marginTop: 12 }}>Loading questions...</p>;
  }

  return (
    <div style={{ marginTop: 12, paddingLeft: 4 }}>
      <div style={{ fontSize: 13, color: 'var(--spai-slate)', marginBottom: 8 }}>
        {linked.length} question{linked.length === 1 ? '' : 's'} linked
      </div>
      {linked.map((q) => (
        <div key={q.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0' }}>
          <span style={{ fontSize: 13 }}>{q.content}</span>
          <button type="button" className="btn btn-ghost" onClick={() => removeQuestion(q.id!)}>
            Remove
          </button>
        </div>
      ))}
      <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
        <select value={addingId} onChange={(e) => setAddingId(e.target.value)} style={{ flex: 1 }}>
          <option value="">Select a question to add...</option>
          {available.map((q) => (
            <option key={q.id} value={q.id}>
              [{q.question_type}] {(q.content ?? '').slice(0, 60)}
            </option>
          ))}
        </select>
        <button type="button" className="btn btn-ghost" onClick={() => addQuestion(addingId)} disabled={!addingId}>
          Add
        </button>
      </div>
    </div>
  );
}
