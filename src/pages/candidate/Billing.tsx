import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { candidate } from '../../data/candidateMock';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    features: ['Public profile and badge', 'Portfolio, up to 3 projects', 'AI project review'],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$9',
    period: '/ month',
    features: ['Everything in Free', 'Unlimited projects', 'Interview preparation', 'AI career coach'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$299',
    period: '/ month',
    features: ['Everything in Premium', 'Employee skills mapping', 'Team dashboards'],
  },
];

const invoices = [
  { date: '01 Jun 2026', amount: '$0.00', status: 'Free plan' },
  { date: '01 May 2026', amount: '$0.00', status: 'Free plan' },
];

export default function Billing() {
  const handleUpgrade = (planName: string) => {
    toast.success(`Upgrade to ${planName} started (payment not connected yet)`);
  };

  return (
    <div>
      <div className="dash-head">
        <div className="eyebrow">Billing</div>
        <h1>Subscription &amp; billing</h1>
        <p>Manage your plan and payment details.</p>
      </div>

      <div className="card" style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ color: 'var(--spai-slate)', fontSize: 13 }}>Current plan</p>
          <h2 style={{ fontSize: 20, marginTop: 4, textTransform: 'capitalize' }}>{candidate.plan}</h2>
        </div>
        {candidate.plan === 'free' && (
          <span
            className="mono"
            style={{
              fontSize: 12,
              color: 'var(--spai-claim)',
              background: 'rgba(0,63,138,0.12)',
              padding: '5px 12px',
              borderRadius: 12,
            }}
          >
            Upgrade for unlimited projects
          </span>
        )}
      </div>

      <div className="grid-3" style={{ marginBottom: 28 }}>
        {plans.map((plan) => {
          const isCurrent = plan.id === candidate.plan;
          return (
            <div
              key={plan.id}
              className="card"
              style={{
                border: isCurrent ? '1.5px solid var(--spai-verified)' : '1px solid var(--spai-line)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <p className="mono" style={{ fontSize: 12, color: 'var(--spai-slate)', textTransform: 'uppercase' }}>
                {plan.name}
              </p>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 30, margin: '6px 0' }}>
                {plan.price}
                <span style={{ fontSize: 13, color: 'var(--spai-slate)', fontFamily: "'Inter', sans-serif" }}>
                  {' '}
                  {plan.period}
                </span>
              </div>
              <ul style={{ listStyle: 'none', fontSize: 13.5, flex: 1, marginBottom: 16 }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ padding: '6px 0', borderBottom: '1px solid var(--spai-line)' }}>
                    ✓ {f}
                  </li>
                ))}
              </ul>
              {isCurrent ? (
                <button type="button" className="btn btn-ghost" disabled>
                  Current plan
                </button>
              ) : (
                <button type="button" className="btn btn-primary" onClick={() => handleUpgrade(plan.name)}>
                  {plan.id === 'enterprise' ? 'Talk to sales' : `Upgrade to ${plan.name}`}
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <h2 style={{ fontSize: 16 }}>Payment method</h2>
          <button type="button" className="btn btn-ghost" onClick={() => toast('No payment method on file for the Free plan')}>
            Add payment method
          </button>
        </div>
        <p style={{ color: 'var(--spai-slate)', fontSize: 13.5 }}>
          No payment method required on the Free plan.
        </p>
      </div>

      <div className="card">
        <h2 style={{ fontSize: 16, marginBottom: 14 }}>Billing history</h2>
        {invoices.map((invoice) => (
          <div
            key={invoice.date}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px 0',
              borderBottom: '1px solid var(--spai-line)',
              fontSize: 13.5,
            }}
          >
            <span>{invoice.date}</span>
            <span style={{ color: 'var(--spai-slate)' }}>{invoice.status}</span>
            <span className="mono">{invoice.amount}</span>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 20 }}>
        <Link to="/pricing" style={{ color: 'var(--spai-slate)', fontSize: 13.5 }}>
          Compare full plan details →
        </Link>
      </p>
    </div>
  );
}
