import { useState } from 'react';
import toast from 'react-hot-toast';
import { aiEvaluationLog, type AiEvaluationLogEntry } from '../../data/adminMock';

type StatusFilter = 'all' | AiEvaluationLogEntry['status'];

const statusColor: Record<AiEvaluationLogEntry['status'], string> = {
  success: 'var(--spai-verified)',
  failed: 'var(--spai-danger)',
  pending: 'var(--spai-claim)',
};

export default function AIMonitor() {
  const [log, setLog] = useState(aiEvaluationLog);
  const [filter, setFilter] = useState<StatusFilter>('all');

  const filtered = log.filter((entry) => filter === 'all' || entry.status === filter);
  const failedCount = log.filter((e) => e.status === 'failed').length;
  const pendingCount = log.filter((e) => e.status === 'pending').length;

  const retry = (id: string) => {
    setLog((prev) => prev.map((entry) => (entry.id === id ? { ...entry, status: 'success' } : entry)));
    toast.success('Re-queued for AI evaluation');
  };

  return (
    <div>
      <div className="dash-head">
        <div className="eyebrow">AI Evaluation Service</div>
        <h1>Monitor AI evaluations</h1>
        <p>Queue and log of project reviews, assessment scoring, and badge eligibility checks.</p>
      </div>

      <div className="stat-grid">
        <div className="stat-cell">
          <div className="num">{log.length}</div>
          <div className="lbl">Total events</div>
        </div>
        <div className="stat-cell">
          <div className="num" style={{ color: 'var(--spai-danger)' }}>{failedCount}</div>
          <div className="lbl">Failed</div>
        </div>
        <div className="stat-cell">
          <div className="num" style={{ color: 'var(--spai-claim)' }}>{pendingCount}</div>
          <div className="lbl">Pending</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {(['all', 'success', 'failed', 'pending'] as StatusFilter[]).map((status) => (
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
        {filtered.map((entry) => (
          <div
            key={entry.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 0',
              borderBottom: '1px solid var(--spai-line)',
            }}
          >
            <div>
              <div style={{ fontSize: 14 }}>{entry.target}</div>
              <div className="mono" style={{ fontSize: 12, color: 'var(--spai-slate)', marginTop: 2 }}>
                {entry.type} - {entry.timestamp}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span
                className="mono"
                style={{
                  fontSize: 11.5,
                  textTransform: 'uppercase',
                  color: statusColor[entry.status],
                }}
              >
                {entry.status}
              </span>
              {entry.status === 'failed' && (
                <button type="button" className="btn btn-ghost" onClick={() => retry(entry.id)}>
                  Retry
                </button>
              )}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p style={{ color: 'var(--spai-slate)', fontSize: 14 }}>No events match this filter.</p>
        )}
      </div>
    </div>
  );
}
