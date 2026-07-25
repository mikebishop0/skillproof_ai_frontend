import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CalendarPlus } from 'lucide-react';
import { candidatePool, type CandidateSummary } from '../../data/recruiterMock';
import { useShortlistStore } from '../../store/shortlistStore';
import { useInterviewStore } from '../../store/interviewStore';

export default function Shortlist() {
  const shortlistedIds = useShortlistStore((state) => state.shortlistedIds);
  const toggle = useShortlistStore((state) => state.toggle);
  const scheduleInterview = useInterviewStore((state) => state.scheduleInterview);
  const candidates = candidatePool.filter((c) => shortlistedIds.includes(c.id));

  const [schedulingFor, setSchedulingFor] = useState<CandidateSummary | null>(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const closeModal = () => {
    setSchedulingFor(null);
    setDate('');
    setTime('');
  };

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schedulingFor) return;
    scheduleInterview({
      candidateId: schedulingFor.id,
      candidateName: schedulingFor.name,
      role: schedulingFor.role,
      date,
      time,
    });
    toast.success(`Interview scheduled with ${schedulingFor.name}`);
    closeModal();
  };

  return (
    <div>
      <div className="dash-head">
        <div className="eyebrow">Shortlist</div>
        <h1>Saved candidates</h1>
        <p>Candidates you&apos;ve shortlisted for follow-up.</p>
      </div>

      {candidates.length === 0 ? (
        <div className="card" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--spai-slate)', fontSize: 14, marginBottom: 16 }}>
            You haven&apos;t shortlisted any candidates yet.
          </p>
          <Link to="/recruiter/search" className="btn btn-primary">
            Search candidates
          </Link>
        </div>
      ) : (
        <div className="grid-2">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <h3 style={{ fontSize: 15 }}>{candidate.name}</h3>
                  <p style={{ color: 'var(--spai-slate)', fontSize: 12.5, marginTop: 2 }}>{candidate.role}</p>
                </div>
                <span
                  className="mono"
                  style={{
                    fontSize: 12,
                    color: 'var(--spai-verified)',
                    background: 'rgba(0,88,190,0.12)',
                    padding: '3px 9px',
                    borderRadius: 12,
                  }}
                >
                  {candidate.score}%
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                {candidate.skills.slice(0, 3).map((s) => (
                  <span className="tag" key={s}>{s}</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Link
                  to={`/recruiter/candidate/${candidate.id}`}
                  className="btn btn-primary"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  View profile
                </Link>
                <button type="button" className="btn btn-ghost" onClick={() => setSchedulingFor(candidate)}>
                  <CalendarPlus size={14} /> Schedule
                </button>
                <button type="button" className="btn btn-danger" onClick={() => toggle(candidate.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {schedulingFor && (
        <div className="modal-overlay" onClick={closeModal}>
          <form
            className="card modal-card"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSchedule}
          >
            <h2 style={{ fontSize: 16, marginBottom: 4 }}>Schedule interview</h2>
            <p style={{ color: 'var(--spai-slate)', fontSize: 13, marginBottom: 18 }}>
              with {schedulingFor.name} {schedulingFor.role}
            </p>
            <div className="field-row">
              <div className="field">
                <label htmlFor="interview-date">Date</label>
                <input
                  id="interview-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="interview-time">Time</label>
                <input
                  id="interview-time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                Confirm interview
              </button>
              <button type="button" className="btn btn-ghost" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
