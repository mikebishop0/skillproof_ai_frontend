import { Link } from 'react-router-dom';
import { candidate, projects, badges, assessments } from '../../data/candidateMock';

export default function DashboardHome() {
  const reviewedProjects = projects.filter((p) => p.status === 'reviewed');
  const latestScore = reviewedProjects[0]?.score ?? null;
  const profileFields = [candidate.bio, candidate.github, candidate.linkedin, skillsFilled()];
  const completeness = Math.round((profileFields.filter(Boolean).length / profileFields.length) * 100);

  function skillsFilled() {
    return true;
  }

  return (
    <div>
      <div className="dash-head">
        <div className="eyebrow">Overview</div>
        <h1>Welcome back, {candidate.name.split(' ')[0]}</h1>
        <p>Here&apos;s where your evidence trail stands today.</p>
      </div>

      <div className="stat-grid">
        <div className="stat-cell">
          <div className="num">{completeness}%</div>
          <div className="lbl">Profile complete</div>
        </div>
        <div className="stat-cell">
          <div className="num">
            {projects.length}/{candidate.projectQuota}
          </div>
          <div className="lbl">Projects uploaded</div>
        </div>
        <div className="stat-cell">
          <div className="num">{badges.length}</div>
          <div className="lbl">Badges earned</div>
        </div>
        <div className="stat-cell">
          <div className="num">{latestScore !== null ? `${latestScore}%` : '—'}</div>
          <div className="lbl">Latest AI score</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h2 style={{ fontSize: 16, marginBottom: 14 }}>Recent AI reviews</h2>
          {reviewedProjects.slice(0, 3).map((project) => (
            <div
              key={project.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: '1px solid var(--spai-line)',
                fontSize: 14,
              }}
            >
              <span>{project.title}</span>
              <span className="mono" style={{ color: 'var(--spai-verified)' }}>{project.score}%</span>
            </div>
          ))}
          <Link to="/dashboard/projects" className="btn btn-ghost" style={{ marginTop: 16, width: '100%', justifyContent: 'center' }}>
            View all projects
          </Link>
        </div>

        <div className="card">
          <h2 style={{ fontSize: 16, marginBottom: 14 }}>Assessments</h2>
          {assessments.slice(0, 3).map((item) => (
            <div
              key={item.name}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: '1px solid var(--spai-line)',
                fontSize: 14,
              }}
            >
              <span>{item.name}</span>
              <span className="mono" style={{ color: 'var(--spai-verified)' }}>{item.score}%</span>
            </div>
          ))}
          <Link to="/dashboard/assessments" className="btn btn-ghost" style={{ marginTop: 16, width: '100%', justifyContent: 'center' }}>
            View all assessments
          </Link>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: 16 }}>Share your evidence</h2>
            <p style={{ color: 'var(--spai-slate)', fontSize: 13.5, marginTop: 4 }}>
              Your public profile is live and ready to share with recruiters.
            </p>
          </div>
          <Link to="/profile/mayur-ramgir" className="btn btn-primary">
            View public profile
          </Link>
        </div>
      </div>
    </div>
  );
}
