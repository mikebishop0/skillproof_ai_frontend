import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Award, CheckCircle2, Clock3, Sparkles } from 'lucide-react';
import { badges, assessments } from '../../data/candidateMock';
import { profileApi } from '../../services/profileApi';
import type { UserProfileDto, ProjectDto } from '../../services/profileApi';
import { useAuthStore } from '../../store/authStore';

export default function DashboardHome() {
  const user = useAuthStore((state) => state.user);
  const [profile, setProfile] = useState<UserProfileDto | null>(null);
  const [projectsList, setProjectsList] = useState<ProjectDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, projectsRes] = await Promise.all([
          profileApi.getCandidateProfile().catch(() => ({ data: null })),
          profileApi.getProjects().catch(() => ({ data: [] })),
        ]);
        setProfile(profileRes.data);
        setProjectsList(projectsRes.data);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const profileName = profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() : user?.name || 'Mayur';
  const profileFields = profile ? [profile.about_section, profile.github_url, profile.linkedin_url, profile.skills] : [];
  const completeness = profile ? Math.round((profileFields.filter(Boolean).length / profileFields.length) * 100) : 0;
  
  // Project counts
  const projectQuota = 5;
  const reviewedProjects = projectsList.filter((p) => p.status === 'COMPLETED');
  const latestScore = reviewedProjects.length > 0 ? 88 : null; // fallback AI score for completed projects
  const availableAssessment = assessments.find((item) => item.status === 'available');

  if (loading) {
    return <div style={{ padding: 24, textAlign: 'center', color: 'var(--spai-slate)' }}>Loading dashboard details...</div>;
  }


  return (
    <div className="candidate-home">
      <div className="candidate-welcome">
        <div className="dash-head">
          <div className="eyebrow">Candidate overview</div>
          <h1>Welcome back, {profileName.split(' ')[0]}.</h1>
          <p>Build a proof-backed profile recruiters can trust.</p>
        </div>
        <Link to="/dashboard/profile" className="btn btn-primary candidate-profile-link">Complete profile <ArrowUpRight size={16} /></Link>
      </div>

      <div className="stat-grid">
        <div className="stat-cell">
          <div className="num">{completeness}%</div>
          <div className="lbl">Profile complete</div>
        </div>
        <div className="stat-cell">
          <div className="num">
            {projectsList.length}/{projectQuota}
          </div>
          <div className="lbl">Projects uploaded</div>
        </div>
        <div className="stat-cell">
          <div className="num">{badges.length}</div>
          <div className="lbl">Badges earned</div>
        </div>
        <div className="stat-cell">
          <div className="num">{latestScore !== null ? `${latestScore}%` : '-'}</div>
          <div className="lbl">Latest AI score</div>
        </div>
      </div>

      <div className="grid-2 candidate-content-grid">
        <div className="card candidate-reviews-card">
          <div className="card-title-row"><div><span className="card-kicker">Evidence</span><h2>Recent AI reviews</h2></div><Sparkles size={19} /></div>
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
              <span className="review-score mono">{(project as any).score ?? 88}%</span>
            </div>
          ))}
          <Link to="/dashboard/projects" className="btn btn-ghost" style={{ marginTop: 16, width: '100%', justifyContent: 'center' }}>
            View all projects
          </Link>
        </div>

        <div className="card candidate-next-card">
          <span className="card-kicker">Next opportunity</span>
          <h2>Keep your momentum going</h2>
          {availableAssessment ? <>
            <p>Pass one more assessment to add a verified skill badge to your profile.</p>
            <div className="next-assessment"><div className="next-icon"><Award size={20} /></div><div><strong>{availableAssessment.name}</strong><span><Clock3 size={13} /> {availableAssessment.durationMinutes} min · {availableAssessment.type}</span></div></div>
            <Link to={`/dashboard/assessments/${availableAssessment.id}/take`} className="btn btn-primary">Start assessment <ArrowUpRight size={16} /></Link>
          </> : <><p>All caught up. Your completed assessments are ready to share.</p><Link to="/dashboard/assessments" className="btn btn-primary">View assessments</Link></>}
        </div>
      </div>

      <div className="card candidate-share-card" style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="share-copy">
            <div className="share-icon"><CheckCircle2 size={19} /></div><div><h2>Share your verified evidence</h2>
            <p style={{ color: 'var(--spai-slate)', fontSize: 13.5, marginTop: 4 }}>
              Your public profile is live and ready to share with recruiters.
            </p>
            </div>
          </div>
          <Link to={`/profile/${profile?.username || 'mayur-ramgir'}`} className="btn btn-primary">
            View public profile
          </Link>
        </div>
      </div>
    </div>
  );
}
