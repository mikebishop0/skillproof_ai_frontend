import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Star, Check, Bookmark, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { candidatePool } from '../../data/recruiterMock';
import { useShortlistStore } from '../../store/shortlistStore';
import { useSavedProfilesStore } from '../../store/savedProfilesStore';
import { extractErrorMessage } from '../../services/apiClient';
import { profileApi, type PortfolioReviewResultDto } from '../../services/profileApi';
import { assessmentApi, type TechnicalCompetencyResultDto } from '../../services/assessmentApi';

export default function CandidateView() {
  const { id } = useParams();
  const candidate = candidatePool.find((c) => c.id === id);
  const toggle = useShortlistStore((state) => state.toggle);
  const shortlistedIds = useShortlistStore((state) => state.shortlistedIds);
  const toggleSaved = useSavedProfilesStore((state) => state.toggle);
  const savedIds = useSavedProfilesStore((state) => state.savedIds);

  const [portfolioResult, setPortfolioResult] = useState<PortfolioReviewResultDto | null>(null);
  const [portfolioLoading, setPortfolioLoading] = useState(false);
  const [competencyResult, setCompetencyResult] = useState<TechnicalCompetencyResultDto | null>(null);
  const [competencyLoading, setCompetencyLoading] = useState(false);

  const runPortfolioReview = async () => {
    if (!id) return;
    setPortfolioLoading(true);
    try {
      const res = await profileApi.runPortfolioEvaluation(id);
      setPortfolioResult(res.data);
      toast.success('Portfolio review complete');
    } catch (err) {
      console.error('Failed to run portfolio review:', err);
      toast.error(extractErrorMessage(err, 'Failed to run portfolio review'));
    } finally {
      setPortfolioLoading(false);
    }
  };

  const runCompetencyEvaluation = async () => {
    if (!id) return;
    setCompetencyLoading(true);
    try {
      const res = await assessmentApi.runTechnicalCompetencyEvaluation(id);
      setCompetencyResult(res.data);
      toast.success('Technical competency evaluation complete');
    } catch (err) {
      console.error('Failed to run technical competency evaluation:', err);
      toast.error(extractErrorMessage(err, 'Failed to run technical competency evaluation'));
    } finally {
      setCompetencyLoading(false);
    }
  };

  if (!candidate) {
    return (
      <div className="card">
        <h1>Candidate not found</h1>
        <Link to="/recruiter/search" className="btn btn-ghost" style={{ marginTop: 16 }}>
          Back to search
        </Link>
      </div>
    );
  }

  const isCandShortlisted = shortlistedIds.includes(candidate.id);
  const isCandSaved = savedIds.includes(candidate.id);

  return (
    <div>
      <div className="dash-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="eyebrow">Candidate profile</div>
          <h1>{candidate.name}</h1>
          <p>{candidate.role} {candidate.location}</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => toggle(candidate.id)}
            style={isCandShortlisted ? { color: 'var(--spai-verified)', borderColor: 'rgba(0,88,190,0.35)' } : undefined}
          >
            <Star size={14} fill={isCandShortlisted ? 'currentColor' : 'none'} />
            {isCandShortlisted ? 'Shortlisted' : 'Shortlist'}
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => toggleSaved(candidate.id)}
            style={isCandSaved ? { color: 'var(--spai-verified)', borderColor: 'rgba(0,88,190,0.35)' } : undefined}
          >
            <Bookmark size={14} fill={isCandSaved ? 'currentColor' : 'none'} />
            {isCandSaved ? 'Saved' : 'Save profile'}
          </button>
          <Link to={`/profile/${candidate.id}`} className="btn btn-ghost">
            Open public profile
          </Link>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-cell">
          <div className="num">{candidate.score}%</div>
          <div className="lbl">Competency score</div>
        </div>
        <div className="stat-cell">
          <div className="num">{candidate.projectCount}</div>
          <div className="lbl">Verified projects</div>
        </div>
        <div className="stat-cell">
          <div className="num">{candidate.badges.length}</div>
          <div className="lbl">Badges earned</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 16, marginBottom: 14 }}>Skills</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {candidate.skills.map((skill, index) => {
            const pct = Math.max(55, candidate.score - index * 5);
            return (
              <div key={skill} style={{ display: 'grid', gridTemplateColumns: '180px 1fr 48px', gap: 16, alignItems: 'center' }}>
                <span style={{ fontSize: 13.5 }}>{skill}</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${pct}%` }} />
                </div>
                <span className="mono" style={{ fontSize: 12.5, color: 'var(--spai-verified)', textAlign: 'right' }}>
                  {pct}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 16, marginBottom: 14 }}>
          <Sparkles size={16} style={{ verticalAlign: -2, marginRight: 6 }} />
          AI evaluation
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <h3 style={{ fontSize: 14 }}>Portfolio review</h3>
              <button type="button" className="btn btn-ghost" onClick={runPortfolioReview} disabled={portfolioLoading}>
                {portfolioLoading ? 'Running...' : portfolioResult ? 'Re-run' : 'Run AI portfolio review'}
              </button>
            </div>
            {portfolioResult && (
              <div>
                <div className="stat-grid" style={{ marginBottom: 12 }}>
                  <div className="stat-cell">
                    <div className="num">{portfolioResult.overall_portfolio_score ?? '—'}%</div>
                    <div className="lbl">Overall score</div>
                  </div>
                  <div className="stat-cell">
                    <div className="num">{portfolioResult.technical_depth_score ?? '—'}%</div>
                    <div className="lbl">Technical depth</div>
                  </div>
                  <div className="stat-cell">
                    <div className="num">{portfolioResult.evidence_quality_score ?? '—'}%</div>
                    <div className="lbl">Evidence quality</div>
                  </div>
                </div>
                {portfolioResult.summary && (
                  <p style={{ color: 'var(--spai-slate)', fontSize: 13.5, marginBottom: 10 }}>{portfolioResult.summary}</p>
                )}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {portfolioResult.strengths && portfolioResult.strengths.length > 0 && (
                    <div>
                      <div className="eyebrow" style={{ marginBottom: 6 }}>Strengths</div>
                      <ul style={{ fontSize: 13, color: 'var(--spai-slate)', paddingLeft: 18 }}>
                        {portfolioResult.strengths.map((s, i) => <li key={i}>{s}</li>)}
                      </ul>
                    </div>
                  )}
                  {portfolioResult.weaknesses && portfolioResult.weaknesses.length > 0 && (
                    <div>
                      <div className="eyebrow" style={{ marginBottom: 6 }}>Weaknesses</div>
                      <ul style={{ fontSize: 13, color: 'var(--spai-slate)', paddingLeft: 18 }}>
                        {portfolioResult.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <h3 style={{ fontSize: 14 }}>Technical competency</h3>
              <button type="button" className="btn btn-ghost" onClick={runCompetencyEvaluation} disabled={competencyLoading}>
                {competencyLoading ? 'Running...' : competencyResult ? 'Re-run' : 'Run AI competency evaluation'}
              </button>
            </div>
            {competencyResult && (
              <div>
                <div className="stat-grid" style={{ marginBottom: 12 }}>
                  <div className="stat-cell">
                    <div className="num">{competencyResult.overall_competency_score ?? '—'}%</div>
                    <div className="lbl">Overall score</div>
                  </div>
                  <div className="stat-cell">
                    <div className="num">{competencyResult.code_quality_score ?? '—'}%</div>
                    <div className="lbl">Code quality</div>
                  </div>
                  <div className="stat-cell">
                    <div className="num">{competencyResult.problem_solving_score ?? '—'}%</div>
                    <div className="lbl">Problem solving</div>
                  </div>
                </div>
                {competencyResult.evidence_summary && (
                  <p style={{ color: 'var(--spai-slate)', fontSize: 13.5 }}>{competencyResult.evidence_summary}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 16, marginBottom: 10 }}>Evidence top project</h2>
        <h3 style={{ fontSize: 15, marginBottom: 6 }}>{candidate.topProject.title}</h3>
        <p style={{ color: 'var(--spai-slate)', fontSize: 13.5 }}>{candidate.topProject.description}</p>
      </div>

      <div className="card">
        <h2 style={{ fontSize: 16, marginBottom: 14 }}>Badges</h2>
        {candidate.badges.length > 0 ? (
          <div className="grid-3">
            {candidate.badges.map((badge) => (
              <div key={badge} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'rgba(0,88,190,0.12)',
                    border: '1px solid rgba(0,88,190,0.35)',
                    color: 'var(--spai-verified)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 8px',
                  }}
                >
                  <Check size={18} />
                </div>
                <p style={{ fontSize: 12.5 }}>{badge}</p>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--spai-slate)', fontSize: 13.5 }}>No badges earned yet.</p>
        )}
      </div>
    </div>
  );
}
