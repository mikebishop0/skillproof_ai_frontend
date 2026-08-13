import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { assessmentApi } from '../../services/assessmentApi';
import type { AssessmentDto } from '../../services/assessmentApi';
import { assessments as mockAssessments } from '../../data/candidateMock';

export default function Assessments() {
  const [assessmentList, setAssessmentList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const res = await assessmentApi.getAssessments();
        if (res.data && res.data.length > 0) {
          const mapped = res.data.map((item: AssessmentDto) => ({
            id: item.id || '',
            name: item.title || 'Untitled Assessment',
            type: item.skill_category || item.difficulty || 'Technical',
            durationMinutes: item.duration || 20,
            questions: [],
            status: item.status === 'PUBLISHED' ? 'available' : 'completed',
            score: item.passing_score || 85,
          }));
          setAssessmentList(mapped);
        } else {
          setAssessmentList(mockAssessments);
        }
      } catch (err) {
        console.warn('Backend assessment service unreachable, using fallback:', err);
        setAssessmentList(mockAssessments);
      } finally {
        setLoading(false);
      }
    };
    fetchAssessments();
  }, []);

  const available = assessmentList.filter((a) => a.status === 'available' || a.status === 'PUBLISHED');
  const completed = assessmentList.filter((a) => a.status === 'completed' || a.status === 'ARCHIVED');

  if (loading) {
    return <div style={{ padding: 24, textAlign: 'center', color: 'var(--spai-slate)' }}>Loading assessments...</div>;
  }

  return (
    <div>
      <div className="dash-head">
        <div className="eyebrow">Assessments</div>
        <h1>Prove it with a test</h1>
        <p>Coding tests, architecture scenarios, and MCQs each scored by AI.</p>
      </div>

      <h2 style={{ fontSize: 16, marginBottom: 14 }}>Available</h2>
      <div className="grid-2" style={{ marginBottom: 28 }}>
        {available.map((assessment) => (
          <div key={assessment.id} className="card">
            <h3 style={{ fontSize: 15, marginBottom: 6 }}>{assessment.name}</h3>
            <p className="mono" style={{ fontSize: 12.5, color: 'var(--spai-slate)', marginBottom: 16 }}>
              {assessment.type} {assessment.durationMinutes} min {assessment.questions?.length ?? 0} questions
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

