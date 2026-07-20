import { useState } from 'react';
import toast from 'react-hot-toast';
import { assessmentDefinitions, type AssessmentDefinition } from '../../data/adminMock';

const assessmentTypes: AssessmentDefinition['type'][] = ['MCQ', 'Coding test', 'Architecture test', 'Scenario-based'];

export default function AdminAssessments() {
  const [assessments, setAssessments] = useState(assessmentDefinitions);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState<AssessmentDefinition['type']>('MCQ');
  const [questionCount, setQuestionCount] = useState(5);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setAssessments((prev) => [
      { id: crypto.randomUUID(), name, type, questionCount, status: 'draft' },
      ...prev,
    ]);
    setName('');
    setQuestionCount(5);
    setShowForm(false);
    toast.success('Assessment created as draft');
  };

  const togglePublish = (id: string) => {
    setAssessments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: a.status === 'published' ? 'draft' : 'published' } : a)),
    );
  };

  const remove = (id: string) => {
    setAssessments((prev) => prev.filter((a) => a.id !== id));
    toast.success('Assessment deleted');
  };

  return (
    <div>
      <div className="dash-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="eyebrow">Assessments</div>
          <h1>Manage assessments</h1>
          <p>Create and publish assessment definitions used across the platform.</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => setShowForm((prev) => !prev)}>
          {showForm ? 'Cancel' : 'New assessment'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="card" style={{ marginBottom: 20, maxWidth: 480 }}>
          <div className="field">
            <label htmlFor="name">Assessment name</label>
            <input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="field-row">
            <div className="field">
              <label htmlFor="type">Type</label>
              <select id="type" value={type} onChange={(e) => setType(e.target.value as AssessmentDefinition['type'])}>
                {assessmentTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="questionCount">Question count</label>
              <input
                id="questionCount"
                type="number"
                min={1}
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Create as draft</button>
        </form>
      )}

      <div className="card">
        {assessments.map((assessment) => (
          <div
            key={assessment.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '14px 0',
              borderBottom: '1px solid var(--spai-line)',
            }}
          >
            <div>
              <div style={{ fontSize: 14 }}>{assessment.name}</div>
              <div className="mono" style={{ fontSize: 12, color: 'var(--spai-slate)', marginTop: 2 }}>
                {assessment.type} {assessment.questionCount} questions
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span
                className="mono"
                style={{
                  fontSize: 11.5,
                  textTransform: 'uppercase',
                  color: assessment.status === 'published' ? 'var(--spai-verified)' : 'var(--spai-slate)',
                  background: assessment.status === 'published' ? 'rgba(19,170,216,0.12)' : 'var(--spai-ink-lighter)',
                  padding: '3px 9px',
                  borderRadius: 10,
                }}
              >
                {assessment.status}
              </span>
              <button type="button" className="btn btn-ghost" onClick={() => togglePublish(assessment.id)}>
                {assessment.status === 'published' ? 'Unpublish' : 'Publish'}
              </button>
              <button type="button" className="btn btn-danger" onClick={() => remove(assessment.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
        {assessments.length === 0 && (
          <p style={{ color: 'var(--spai-slate)', fontSize: 14 }}>No assessments yet.</p>
        )}
      </div>
    </div>
  );
}
