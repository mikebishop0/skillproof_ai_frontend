import { useState } from 'react';
import toast from 'react-hot-toast';
import { badges, candidate } from '../../data/candidateMock';

export default function Badges() {
  const [selected, setSelected] = useState(badges[0]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    toast.success('Certificate link copied');
  };

  return (
    <div>
      <div className="dash-head">
        <div className="eyebrow">Badges</div>
        <h1>Your verified badges</h1>
        <p>Each badge is backed by a scored assessment and reviewed evidence.</p>
      </div>

      <div className="grid-3" style={{ marginBottom: 24 }}>
        {badges.map((badge) => (
          <button
            key={badge.id}
            type="button"
            onClick={() => setSelected(badge)}
            className="card"
            style={{
              textAlign: 'center',
              cursor: 'pointer',
              border:
                selected.id === badge.id
                  ? '1.5px solid var(--spai-verified)'
                  : '1px solid var(--spai-line)',
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'rgba(47,174,122,0.12)',
                border: '1px solid rgba(47,174,122,0.35)',
                color: 'var(--spai-verified)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px',
                fontSize: 18,
              }}
            >
              ✓
            </div>
            <h3 style={{ fontSize: 14, marginBottom: 4 }}>{badge.name}</h3>
            <div className="mono" style={{ fontSize: 12, color: 'var(--spai-slate)' }}>{badge.date}</div>
          </button>
        ))}
      </div>

      <div className="card" style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
        <div className="eyebrow" style={{ justifyContent: 'center' }}>Certificate</div>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'rgba(47,174,122,0.14)',
            border: '1px solid rgba(47,174,122,0.4)',
            color: 'var(--spai-verified)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '12px auto 18px',
            fontSize: 26,
          }}
        >
          ✓
        </div>
        <h2 style={{ fontSize: 19 }}>{selected.name}</h2>
        <p style={{ color: 'var(--spai-slate)', fontSize: 13.5, marginTop: 6 }}>
          Awarded to {candidate.name} - {selected.date}
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 20 }}>
          <button type="button" className="btn btn-primary" onClick={copyLink}>
            Share certificate
          </button>
          <button type="button" className="btn btn-ghost">
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
