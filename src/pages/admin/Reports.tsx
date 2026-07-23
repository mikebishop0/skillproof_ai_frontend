import toast from 'react-hot-toast';
import { Download, FileText } from 'lucide-react';
import { availableReports } from '../../data/adminMock';

export default function AdminReports() {
  const handleDownload = (name: string) => {
    toast.success(`${name} downloaded (mock)`);
  };

  return (
    <div>
      <div className="dash-head">
        <div className="eyebrow">Reports</div>
        <h1>Reports</h1>
        <p>Generate and download platform-wide reports.</p>
      </div>

      <div className="card">
        {availableReports.map((report) => (
          <div
            key={report.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 0',
              borderBottom: '1px solid var(--spai-line)',
              gap: 16,
            }}
          >
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: 'rgba(0,88,190,0.1)',
                  color: 'var(--spai-verified)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <FileText size={18} />
              </div>
              <div>
                <div style={{ fontSize: 14 }}>{report.name}</div>
                <p style={{ color: 'var(--spai-slate)', fontSize: 12.5, marginTop: 3, maxWidth: 420 }}>
                  {report.description}
                </p>
                <div className="mono" style={{ fontSize: 11.5, color: 'var(--spai-slate)', marginTop: 6 }}>
                  Last generated {report.lastGenerated}
                </div>
              </div>
            </div>
            <button type="button" className="btn btn-ghost" onClick={() => handleDownload(report.name)}>
              <Download size={14} /> Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
