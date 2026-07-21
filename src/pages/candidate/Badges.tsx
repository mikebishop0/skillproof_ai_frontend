import { useState } from 'react';
import toast from 'react-hot-toast';
import { Award, Check, Copy, Medal, Share2, Sparkles } from 'lucide-react';
import { badges, candidate } from '../../data/candidateMock';

export default function Badges() {
  const [selected, setSelected] = useState(badges[0]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    toast.success('Certificate link copied');
  };

  return (
    <div className="badges-page">
      <div className="dash-head">
        <div className="eyebrow">Badges</div>
        <h1>Your verified badges</h1>
        <p>Each badge is backed by a scored assessment and reviewed evidence.</p>
      </div>

      <div className="badges-summary-row">
        <div><span>Verified credentials</span><strong>{badges.length}</strong><p>Ready to show recruiters</p></div>
        <div className="badges-summary-divider" />
        <div><span>Latest achievement</span><strong>Jun 2026</strong><p>Cloud architecture expert</p></div>
        <div className="badges-summary-mark"><Medal size={30} /></div>
      </div>

      <div className="grid-3 badges-grid">
        {badges.map((badge) => (
          <button key={badge.id} type="button" onClick={() => setSelected(badge)} className={`card badge-choice ${selected.id === badge.id ? 'selected' : ''}`}>
            <div className="badge-choice-icon"><Check size={22} strokeWidth={2.5} /></div>
            <span className="badge-choice-label">Verified skill</span>
            <h3>{badge.name}</h3>
            <div className="mono">{badge.date}</div>
          </button>
        ))}
      </div>

      <div className="badges-detail-grid">
        <div className="badge-certificate-card">
          <div className="certificate-watermark"><Award size={150} /></div>
          <div className="eyebrow">Selected certificate</div>
          <div className="certificate-medallion"><Check size={29} strokeWidth={2.5} /></div>
          <p className="certificate-issued">This certifies that</p>
          <h2>{candidate.name}</h2>
          <p className="certificate-title">has demonstrated verified competency in</p>
          <h3>{selected.name}</h3>
          <p className="certificate-date">{selected.date}</p>
          <div className="certificate-actions">
            <button type="button" className="btn btn-primary" onClick={copyLink}><Share2 size={16} /> Share certificate</button>
            <button type="button" className="btn btn-ghost"><Copy size={16} /> Download PDF</button>
          </div>
        </div>
        <div className="badge-side-stack">
          <div className="badge-insight-card">
            <div className="badge-insight-icon"><Sparkles size={19} /></div>
            <div><span>Profile strength</span><h2>Top 12% of Java candidates</h2><p>Your verified evidence makes your profile easier for recruiters to trust.</p></div>
          </div>
          <div className="badge-share-card">
            <span>Share your proof</span>
            <h2>Make every application stronger.</h2>
            <p>Verified badges travel with your public profile and give recruiters a fast, credible signal.</p>
            <button type="button" className="badge-link-button" onClick={copyLink}>Copy public profile link <Copy size={15} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
