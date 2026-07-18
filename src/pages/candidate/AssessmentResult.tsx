import { Link, useParams } from 'react-router-dom';
import { assessments } from '../../data/candidateMock';

export default function AssessmentResult() {
  const { id } = useParams();
  const assessment = assessments.find((a) => a.id === id);

  if (!assessment) {
    return <div className="card"><h1>Assessment not found</h1></div>;
  }

  // Freshly-submitted assessments have no score yet in the mock data - show a plausible just-scored result.
  const score = assessment.score ?? 87;
  const passed = score >= assessment.passScore;

  return (
    <div>
      <div className="dash-head">
        <div className="eyebrow">Assessment result</div>
        <h1>{assessment.name}</h1>
      </div>

      <div className="card" style={{ textAlign: 'center', marginBottom: 20 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: passed ? 'rgba(47,174,122,0.14)' : 'rgba(217,107,92,0.14)',
            border: `1px solid ${passed ? 'rgba(47,174,122,0.4)' : 'rgba(217,107,92,0.4)'}`,
            color: passed ? 'var(--spai-verified)' : 'var(--spai-danger)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 18px',
            fontSize: 28,
          }}
        >
          {passed ? '✓' : '×'}
        </div>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 44, color: 'var(--spai-verified)' }}>
          {score}%
        </div>
        <p style={{ color: 'var(--spai-slate)', fontSize: 14, marginTop: 6 }}>
          {passed ? 'Passed' : 'Not passed'} - pass threshold {assessment.passScore}%
        </p>
      </div>

      {passed && assessment.badgeOnPass && (
        <div className="card" style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: 16 }}>Badge earned</h2>
            <p style={{ color: 'var(--spai-slate)', fontSize: 13.5, marginTop: 4 }}>{assessment.badgeOnPass}</p>
          </div>
          <Link to="/dashboard/badges" className="btn btn-primary">
            View badges
          </Link>
        </div>
      )}

      <div className="card">
        <h2 style={{ fontSize: 16, marginBottom: 14 }}>Breakdown</h2>
        {assessment.questions.length > 0 ? (
          assessment.questions.map((q, i) => (
            <div
              key={q.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: '1px solid var(--spai-line)',
                fontSize: 13.5,
              }}
            >
              <span>Question {i + 1} - {q.type}</span>
              <span style={{ color: 'var(--spai-verified)' }}>Reviewed</span>
            </div>
          ))
        ) : (
          <p style={{ color: 'var(--spai-slate)', fontSize: 13.5 }}>
            Scored across scenario judgment, technical accuracy, and communication clarity.
          </p>
        )}
      </div>

      <div style={{ marginTop: 20 }}>
        <Link to="/dashboard/assessments" className="btn btn-ghost">
          Back to assessments
        </Link>
      </div>
    </div>
  );
}
