import { useState } from 'react';
import toast from 'react-hot-toast';
import { questionBank, assessmentDefinitions } from '../../data/adminMock';

const difficulties = ['Easy', 'Medium', 'Hard'] as const;

export default function AdminQuestions() {
  const [questions, setQuestions] = useState(questionBank);
  const [showForm, setShowForm] = useState(false);
  const [text, setText] = useState('');
  const [assessmentId, setAssessmentId] = useState(assessmentDefinitions[0]?.id ?? '');
  const [difficulty, setDifficulty] = useState<(typeof difficulties)[number]>('Medium');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const assessment = assessmentDefinitions.find((a) => a.id === assessmentId);
    setQuestions((prev) => [
      { id: crypto.randomUUID(), text, assessmentId, assessmentName: assessment?.name ?? '', difficulty },
      ...prev,
    ]);
    setText('');
    setShowForm(false);
    toast.success('Question added to bank');
  };

  const remove = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
    toast.success('Question deleted');
  };

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
        <form onSubmit={handleCreate} className="card" style={{ marginBottom: 20, maxWidth: 560 }}>
          <div className="field">
            <label htmlFor="text">Question text</label>
            <textarea id="text" value={text} onChange={(e) => setText(e.target.value)} rows={3} required />
          </div>
          <div className="field-row">
            <div className="field">
              <label htmlFor="assessmentId">Assessment</label>
              <select id="assessmentId" value={assessmentId} onChange={(e) => setAssessmentId(e.target.value)}>
                {assessmentDefinitions.map((a) => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="difficulty">Difficulty</label>
              <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value as typeof difficulty)}>
                {difficulties.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Add question</button>
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
              <div style={{ fontSize: 14 }}>{question.text}</div>
              <div className="mono" style={{ fontSize: 12, color: 'var(--spai-slate)', marginTop: 2 }}>
                {question.assessmentName}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <span
                className="mono"
                style={{
                  fontSize: 11.5,
                  textTransform: 'uppercase',
                  color:
                    question.difficulty === 'Hard'
                      ? 'var(--spai-danger)'
                      : question.difficulty === 'Medium'
                        ? 'var(--spai-claim)'
                        : 'var(--spai-verified)',
                }}
              >
                {question.difficulty}
              </span>
              <button type="button" className="btn btn-danger" onClick={() => remove(question.id)}>
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
