import { subscriptionPlans, revenueByMonth } from '../../data/adminMock';

export default function AdminSubscriptions() {
  const totalMrr = subscriptionPlans.reduce((sum, p) => sum + p.mrr, 0);
  const totalSubscribers = subscriptionPlans.reduce((sum, p) => sum + p.subscribers, 0);
  const maxRevenue = Math.max(...revenueByMonth.map((m) => m.revenue));

  return (
    <div>
      <div className="dash-head">
        <div className="eyebrow">Subscriptions</div>
        <h1>Subscriptions and revenue</h1>
        <p>Plan breakdown and monthly recurring revenue across the platform.</p>
      </div>

      <div className="stat-grid">
        <div className="stat-cell">
          <div className="num">${totalMrr.toLocaleString()}</div>
          <div className="lbl">Monthly recurring revenue</div>
        </div>
        <div className="stat-cell">
          <div className="num">{totalSubscribers}</div>
          <div className="lbl">Total subscribers</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 16, marginBottom: 18 }}>Revenue trend</h2>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 140 }}>
          {revenueByMonth.map((m) => (
            <div key={m.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div
                style={{
                  width: '100%',
                  height: `${(m.revenue / maxRevenue) * 100}%`,
                  background: 'var(--spai-verified)',
                  borderRadius: '4px 4px 0 0',
                  minHeight: 4,
                }}
                title={`$${m.revenue.toLocaleString()}`}
              />
              <span className="mono" style={{ fontSize: 11, color: 'var(--spai-slate)' }}>{m.month}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: 16, marginBottom: 14 }}>Plan breakdown</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 8,
            fontSize: 12,
            color: 'var(--spai-slate)',
            paddingBottom: 8,
            borderBottom: '1px solid var(--spai-line)',
          }}
        >
          <span>Plan</span>
          <span>Subscribers</span>
          <span>MRR</span>
        </div>
        {subscriptionPlans.map((plan) => (
          <div
            key={plan.plan}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 8,
              alignItems: 'center',
              padding: '12px 0',
              borderBottom: '1px solid var(--spai-line)',
              fontSize: 13.5,
            }}
          >
            <span>{plan.plan}</span>
            <span>{plan.subscribers}</span>
            <span className="mono" style={{ color: 'var(--spai-verified)' }}>${plan.mrr.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
