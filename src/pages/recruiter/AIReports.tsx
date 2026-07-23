import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { candidatePool } from '../../data/recruiterMock';

export default function RecruiterAIReports() {
  const sorted = candidatePool.slice().sort((a, b) => b.score - a.score);
  const avgScore = Math.round(candidatePool.reduce((sum, c) => sum + c.score, 0) / candidatePool.length);

  return (
    <div>
      <div className="dash-head">
        <div className="eyebrow">AI Evaluation Service</div>
        <h1>AI reports</h1>
        <p>AI-generated competency reports for every candidate in your pipeline.</p>
      </div>

      <div className="stat-grid">
        <div className="stat-cell">
          <div className="num">{candidatePool.length}</div>
          <div className="lbl">Reports available</div>
        </div>
        <div className="stat-cell">
          <div className="num">{avgScore}%</div>
          <div className="lbl">Average AI score</div>
        </div>
      </div>

      <div className="card">
        {sorted.map((candidate) => (
          <div
            key={candidate.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '14px 0',
              borderBottom: '1px solid var(--spai-line)',
            }}
          >
            <div>
              <div style={{ fontSize: 14 }}>{candidate.topProject.title}</div>
              <div className="mono" style={{ fontSize: 12, color: 'var(--spai-slate)', marginTop: 2 }}>
                {candidate.name} {candidate.role}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  fontSize: 13,
                  color: 'var(--spai-verified)',
                  background: 'rgba(0,88,190,0.1)',
                  padding: '4px 10px',
                  borderRadius: 12,
                }}
              >
                <Sparkles size={12} /> {candidate.score}%
              </span>
              <Link to={`/recruiter/candidate/${candidate.id}`} className="btn btn-ghost">
                View report
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
