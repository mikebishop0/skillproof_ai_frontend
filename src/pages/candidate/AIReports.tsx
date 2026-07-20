import { Link } from 'react-router-dom';
import { aiReports } from '../../data/candidateMock';

export default function AIReports() {
  const avgScore = Math.round(aiReports.reduce((sum, r) => sum + r.score, 0) / aiReports.length);

  return (
    <div>
      <div className="dash-head">
        <div className="eyebrow">AI Evaluation Service</div>
        <h1>AI reports</h1>
        <p>Every AI-generated competency report from your reviewed projects and assessments.</p>
      </div>

      <div className="stat-grid">
        <div className="stat-cell">
          <div className="num">{aiReports.length}</div>
          <div className="lbl">Reports generated</div>
        </div>
        <div className="stat-cell">
          <div className="num">{avgScore}%</div>
          <div className="lbl">Average score</div>
        </div>
      </div>

      <div className="card">
        {aiReports
          .slice()
          .sort((a, b) => b.score - a.score)
          .map((report) => (
            <div
              key={report.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 0',
                borderBottom: '1px solid var(--spai-line)',
              }}
            >
              <div>
                <div style={{ fontSize: 14 }}>{report.title}</div>
                <div className="mono" style={{ fontSize: 12, color: 'var(--spai-slate)', marginTop: 2 }}>
                  {report.type} {report.date}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span className="mono" style={{ color: 'var(--spai-verified)', fontSize: 14 }}>
                  {report.score}%
                </span>
                <Link to={`/dashboard/ai-report/${report.id}`} className="btn btn-ghost">
                  View report
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
