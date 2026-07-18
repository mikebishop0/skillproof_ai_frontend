import { Link } from 'react-router-dom';
import { assessments } from '../../data/candidateMock';

export default function Assessments() {
  const available = assessments.filter((a) => a.status === 'available');
  const completed = assessments.filter((a) => a.status === 'completed');

  return (
    <div>
      <div className="dash-head">
        <div className="eyebrow">Assessments</div>
        <h1>Prove it with a test</h1>
        <p>Coding tests, architecture scenarios, and MCQs - each scored by AI.</p>
      </div>

      <h2 style={{ fontSize: 16, marginBottom: 14 }}>Available</h2>
      <div className="grid-2" style={{ marginBottom: 28 }}>
        {available.map((assessment) => (
          <div key={assessment.id} className="card">
            <h3 style={{ fontSize: 15, marginBottom: 6 }}>{assessment.name}</h3>
            <p className="mono" style={{ fontSize: 12.5, color: 'var(--spai-slate)', marginBottom: 16 }}>
              {assessment.type} - {assessment.durationMinutes} min - {assessment.questions.length} questions
            </p>
            <Link to={`/dashboard/assessments/${assessment.id}/take`} className="btn btn-primary">
              Start assessment
            </Link>
          </div>
        ))}
        {available.length === 0 && (
          <p style={{ color: 'var(--spai-slate)', fontSize: 14 }}>No new assessments available right now.</p>
        )}
      </div>

      <h2 style={{ fontSize: 16, marginBottom: 14 }}>Completed</h2>
      <div className="card">
        {completed.map((assessment) => (
          <div
            key={assessment.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 0',
              borderBottom: '1px solid var(--spai-line)',
            }}
          >
            <div>
              <div style={{ fontSize: 14 }}>{assessment.name}</div>
              <div className="mono" style={{ fontSize: 12, color: 'var(--spai-slate)', marginTop: 2 }}>
                {assessment.type}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span className="mono" style={{ color: 'var(--spai-verified)', fontSize: 14 }}>
                {assessment.score}%
              </span>
              <Link to={`/dashboard/assessments/${assessment.id}/result`} className="btn btn-ghost">
                View result
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
