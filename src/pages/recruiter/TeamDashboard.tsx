import { Link } from 'react-router-dom';
import { orgEmployees, skillGaps } from '../../data/recruiterMock';

const severityColor: Record<string, string> = {
  high: 'var(--spai-danger)',
  medium: 'var(--spai-claim)',
  low: 'var(--spai-slate)',
};

export default function TeamDashboard() {
  const avgScore = Math.round(orgEmployees.reduce((sum, e) => sum + e.score, 0) / orgEmployees.length);
  const teams = Array.from(new Set(orgEmployees.map((e) => e.team)));

  return (
    <div>
      <div className="dash-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="eyebrow">Enterprise</div>
          <h1>Team dashboard</h1>
          <p>Employee skills mapping and org-wide skills-gap analysis.</p>
        </div>
        <span
          className="mono"
          style={{
            fontSize: 12,
            color: 'var(--spai-verified)',
            background: 'rgba(0,88,190,0.12)',
            padding: '5px 12px',
            borderRadius: 12,
          }}
        >
          Enterprise plan
        </span>
      </div>

      <div className="stat-grid">
        <div className="stat-cell">
          <div className="num">{orgEmployees.length}</div>
          <div className="lbl">Employees mapped</div>
        </div>
        <div className="stat-cell">
          <div className="num">{teams.length}</div>
          <div className="lbl">Teams</div>
        </div>
        <div className="stat-cell">
          <div className="num">{avgScore}%</div>
          <div className="lbl">Average skill score</div>
        </div>
        <div className="stat-cell">
          <div className="num">{skillGaps.length}</div>
          <div className="lbl">Skill gaps identified</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 16, marginBottom: 14 }}>Skills-gap analysis</h2>
        {skillGaps.map((gap) => (
          <div
            key={gap.skill}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 0',
              borderBottom: '1px solid var(--spai-line)',
              fontSize: 13.5,
            }}
          >
            <span>{gap.skill}</span>
            <span style={{ color: 'var(--spai-slate)' }}>{gap.teamsAffected} team{gap.teamsAffected === 1 ? '' : 's'} affected</span>
            <span
              className="mono"
              style={{
                fontSize: 11.5,
                textTransform: 'uppercase',
                color: severityColor[gap.severity],
              }}
            >
              {gap.severity}
            </span>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 style={{ fontSize: 16, marginBottom: 14 }}>Employee skills mapping</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.8fr 1fr 0.6fr 1.2fr', gap: 8, fontSize: 12, color: 'var(--spai-slate)', paddingBottom: 8, borderBottom: '1px solid var(--spai-line)' }}>
          <span>Employee</span>
          <span>Team</span>
          <span>Top skill</span>
          <span>Score</span>
          <span>Skill gap</span>
        </div>
        {orgEmployees.map((employee) => (
          <div
            key={employee.name}
            style={{
              display: 'grid',
              gridTemplateColumns: '1.4fr 0.8fr 1fr 0.6fr 1.2fr',
              gap: 8,
              alignItems: 'center',
              padding: '12px 0',
              borderBottom: '1px solid var(--spai-line)',
              fontSize: 13.5,
            }}
          >
            <span>{employee.name}</span>
            <span style={{ color: 'var(--spai-slate)' }}>{employee.team}</span>
            <span>{employee.topSkill}</span>
            <span className="mono" style={{ color: 'var(--spai-verified)' }}>{employee.score}%</span>
            <span style={{ color: 'var(--spai-claim)' }}>{employee.gap}</span>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 20 }}>
        <Link to="/recruiter/search" style={{ color: 'var(--spai-slate)', fontSize: 13.5 }}>
          ← Back to candidate search
        </Link>
      </p>
    </div>
  );
}
