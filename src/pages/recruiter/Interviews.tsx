import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { interviews } from '../../data/recruiterMock';

type StatusFilter = 'all' | 'scheduled' | 'completed' | 'cancelled';

const statusColor: Record<string, string> = {
  scheduled: 'var(--spai-verified)',
  completed: 'var(--spai-slate)',
  cancelled: 'var(--spai-danger)',
};

export default function Interviews() {
  const [filter, setFilter] = useState<StatusFilter>('all');
  const filtered = interviews.filter((i) => filter === 'all' || i.status === filter);
  const scheduledCount = interviews.filter((i) => i.status === 'scheduled').length;

  return (
    <div>
      <div className="dash-head">
        <div className="eyebrow">Interviews</div>
        <h1>Interview schedule</h1>
        <p>Upcoming and past interviews with candidates in your pipeline.</p>
      </div>

      <div className="stat-grid">
        <div className="stat-cell">
          <div className="num">{interviews.length}</div>
          <div className="lbl">Total interviews</div>
        </div>
        <div className="stat-cell">
          <div className="num">{scheduledCount}</div>
          <div className="lbl">Upcoming</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {(['all', 'scheduled', 'completed', 'cancelled'] as StatusFilter[]).map((status) => (
          <button
            key={status}
            type="button"
            className="btn btn-ghost"
            style={{
              textTransform: 'capitalize',
              borderColor: filter === status ? 'var(--spai-verified)' : undefined,
              color: filter === status ? 'var(--spai-verified)' : undefined,
            }}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="card">
        {filtered.map((interview) => (
          <div
            key={interview.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '14px 0',
              borderBottom: '1px solid var(--spai-line)',
            }}
          >
            <div>
              <Link to={`/recruiter/candidate/${interview.candidateId}`} style={{ fontSize: 14 }}>
                {interview.candidateName}
              </Link>
              <div className="mono" style={{ fontSize: 12, color: 'var(--spai-slate)', marginTop: 2 }}>
                {interview.role}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12.5, color: 'var(--spai-slate)' }}>
                <Calendar size={13} /> {interview.date}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12.5, color: 'var(--spai-slate)' }}>
                <Clock size={13} /> {interview.time}
              </span>
              <span
                className="mono"
                style={{
                  fontSize: 11.5,
                  textTransform: 'uppercase',
                  color: statusColor[interview.status],
                }}
              >
                {interview.status}
              </span>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p style={{ color: 'var(--spai-slate)', fontSize: 14 }}>No interviews match this filter.</p>
        )}
      </div>
    </div>
  );
}
