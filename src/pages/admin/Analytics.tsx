import { platformStats, topSkills, userGrowth } from '../../data/adminMock';

export default function Analytics() {
  const maxUsers = Math.max(...userGrowth.map((m) => m.users));
  const maxSkillCount = Math.max(...topSkills.map((s) => s.candidates));

  return (
    <div>
      <div className="dash-head">
        <div className="eyebrow">Platform analytics</div>
        <h1>Admin dashboard</h1>
        <p>User growth, assessment completion, and top skills across the platform.</p>
      </div>

      <div className="stat-grid">
        <div className="stat-cell">
          <div className="num">{platformStats.totalUsers}</div>
          <div className="lbl">Total users</div>
        </div>
        <div className="stat-cell">
          <div className="num">{platformStats.assessmentCompletionRate}%</div>
          <div className="lbl">Assessment completion rate</div>
        </div>
        <div className="stat-cell">
          <div className="num">{platformStats.avgCompetencyScore}%</div>
          <div className="lbl">Avg competency score</div>
        </div>
        <div className="stat-cell">
          <div className="num">{platformStats.activeRecruiters}</div>
          <div className="lbl">Active recruiters</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 16, marginBottom: 18 }}>User growth</h2>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 140 }}>
          {userGrowth.map((m) => (
            <div key={m.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div
                style={{
                  width: '100%',
                  height: `${(m.users / maxUsers) * 100}%`,
                  background: 'var(--spai-verified)',
                  borderRadius: '4px 4px 0 0',
                  minHeight: 4,
                }}
                title={`${m.users} users`}
              />
              <span className="mono" style={{ fontSize: 11, color: 'var(--spai-slate)' }}>{m.month}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: 16, marginBottom: 14 }}>Top skills across candidates</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {topSkills.map((item) => (
            <div key={item.skill} style={{ display: 'grid', gridTemplateColumns: '180px 1fr 48px', gap: 16, alignItems: 'center' }}>
              <span style={{ fontSize: 13.5 }}>{item.skill}</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${(item.candidates / maxSkillCount) * 100}%` }} />
              </div>
              <span className="mono" style={{ fontSize: 12.5, color: 'var(--spai-verified)', textAlign: 'right' }}>
                {item.candidates}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
