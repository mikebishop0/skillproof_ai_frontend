import { Link, useParams } from 'react-router-dom';
import { aiReports } from '../../data/candidateMock';

export default function AIReport() {
  const { id } = useParams();
  const report = aiReports.find((r) => r.id === id);

  if (!report) {
    return (
      <div className="card">
        <h1>Report not found</h1>
        <Link to="/dashboard/ai-reports" className="btn btn-ghost" style={{ marginTop: 16 }}>
          Back to AI reports
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="dash-head">
        <div className="eyebrow">{report.type}</div>
        <h1>{report.title}</h1>
        <p>Generated {report.date}</p>
      </div>

      <div className="card" style={{ marginBottom: 20, textAlign: 'center' }}>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 44, color: 'var(--spai-verified)' }}>
          {report.score}%
        </div>
        <p style={{ color: 'var(--spai-slate)', fontSize: 13.5, marginTop: 4 }}>competency score</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="eyebrow" style={{ color: 'var(--spai-verified)' }}>Strengths</div>
          {report.strengths.length > 0 ? (
            <ul style={{ listStyle: 'none', fontSize: 13.5 }}>
              {report.strengths.map((item) => (
                <li key={item} style={{ paddingLeft: 14, position: 'relative', marginBottom: 8 }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--spai-verified)' }}>+</span>
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: 'var(--spai-slate)', fontSize: 13.5 }}>No strengths recorded.</p>
          )}
        </div>
        <div className="card">
          <div className="eyebrow" style={{ color: 'var(--spai-claim)' }}>Improvement areas</div>
          {report.improvements.length > 0 ? (
            <ul style={{ listStyle: 'none', fontSize: 13.5 }}>
              {report.improvements.map((item) => (
                <li key={item} style={{ paddingLeft: 14, position: 'relative', marginBottom: 8 }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--spai-claim)' }}>→</span>
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: 'var(--spai-slate)', fontSize: 13.5 }}>No improvement areas flagged.</p>
          )}
        </div>
      </div>

      <p style={{ marginTop: 20 }}>
        <Link to="/dashboard/ai-reports" className="btn btn-ghost">
          Back to AI reports
        </Link>
      </p>
    </div>
  );
}
