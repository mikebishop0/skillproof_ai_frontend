import { useState } from 'react';
import { Link } from 'react-router-dom';
import './pricingPage.css';

const compareRows: Array<
  | { category: string }
  | { feature: string; free: 'yes' | 'no' | string; premium: 'yes' | 'no' | string; enterprise: 'yes' | 'no' | string }
> = [
  { category: 'Profile and portfolio' },
  { feature: 'Public skill profile', free: 'yes', premium: 'yes', enterprise: 'yes' },
  { feature: 'Uploaded projects', free: 'Up to 3', premium: 'Unlimited', enterprise: 'Unlimited' },
  { feature: 'Verified skill badges', free: 'yes', premium: 'yes', enterprise: 'yes' },

  { category: 'AI evaluation' },
  { feature: 'AI project review', free: 'yes', premium: 'yes', enterprise: 'yes' },
  { feature: 'AI career coach', free: 'no', premium: 'yes', enterprise: 'yes' },
  { feature: 'Resume optimization', free: 'no', premium: 'yes', enterprise: 'yes' },
  { feature: 'Interview preparation', free: 'no', premium: 'yes', enterprise: 'yes' },

  { category: 'Team and hiring' },
  { feature: 'Candidate search', free: 'no', premium: 'no', enterprise: 'yes' },
  { feature: 'Employee skills mapping', free: 'no', premium: 'no', enterprise: 'yes' },
  { feature: 'Team dashboards', free: 'no', premium: 'no', enterprise: 'yes' },
  { feature: 'Skills gap analysis', free: 'no', premium: 'no', enterprise: 'yes' },

  { category: 'Support' },
  { feature: 'Community support', free: 'yes', premium: 'yes', enterprise: 'yes' },
  { feature: 'Priority support', free: 'no', premium: 'yes', enterprise: 'yes' },
  { feature: 'Dedicated account manager', free: 'no', premium: 'no', enterprise: 'yes' },
];

const faqs = [
  {
    q: 'Do I need a credit card for the free plan?',
    a: 'No. The free plan is free forever — no credit card, no trial clock, no auto-charge.',
  },
  {
    q: 'Can I switch plans later?',
    a: 'Yes. Upgrade, downgrade, or cancel anytime from your account settings — changes apply to your next billing cycle.',
  },
  {
    q: 'What happens to my badges if I downgrade?',
    a: 'Your earned badges and public profile stay yours permanently, regardless of plan.',
  },
  {
    q: 'Is recruiter access really free?',
    a: 'Yes. Recruiters can search and view verified candidate profiles at no cost. Enterprise pricing is only for team-level tools.',
  },
];

function renderCell(value: string) {
  if (value === 'yes') return <span className="yes">✓</span>;
  if (value === 'no') return <span className="no">—</span>;
  return <span className="val">{value}</span>;
}

export default function PricingPage() {
  const [yearly, setYearly] = useState(false);

  const premiumPrice = yearly ? '$7.65' : '$9';
  const enterprisePrice = yearly ? '$254' : '$299';

  return (
    <div className="spai">
      <nav>
        <div className="wrap">
          <div className="logo">
            <span className="logo-mark">S</span>SkillProof AI
          </div>
          <div className="nav-links">
            <a href="/#how">How it works</a>
            <Link to="/pricing" className="active">Pricing</Link>
            <a href="/#recruiters">For recruiters</a>
          </div>
          <div className="nav-cta">
            <Link to="/login" className="btn btn-ghost">Log in</Link>
            <Link to="/register" className="btn btn-primary">Get verified</Link>
          </div>
        </div>
      </nav>

      <header className="page-head">
        <div className="wrap">
          <div className="eyebrow">Pricing</div>
          <h1>Simple plans, no surprise fees.</h1>
          <p>Start free and prove your first skill today. Upgrade only when you need more room to prove more.</p>
          <div className="toggle-row">
            <span className={`toggle-label ${!yearly ? 'on' : ''}`}>Monthly</span>
            <div
              className={`toggle ${yearly ? 'yearly' : ''}`}
              role="button"
              aria-label="Toggle yearly billing"
              onClick={() => setYearly((prev) => !prev)}
            >
              <div className="toggle-dot" />
            </div>
            <span className={`toggle-label ${yearly ? 'on' : ''}`}>Yearly</span>
            <span className="save-tag">Save 15%</span>
          </div>
        </div>
      </header>

      <section className="pricing-section">
        <div className="wrap">
          <div className="pricing-grid">
            <div className="price-card">
              <div className="price-tier">Free</div>
              <div className="price-amount">
                $0 <span>/ forever</span>
              </div>
              <div className="price-desc">For candidates proving their first skill.</div>
              <ul className="price-features">
                <li>Public profile and badge</li>
                <li>Portfolio, up to 3 projects</li>
                <li>AI project review</li>
                <li className="dim">Interview preparation</li>
                <li className="dim">AI career coach</li>
              </ul>
              <Link to="/register" className="btn btn-ghost">Get started free</Link>
            </div>

            <div className="price-card featured">
              <div className="badge-pop">Most popular</div>
              <div className="price-tier">Premium</div>
              <div className="price-amount">
                <span>{premiumPrice}</span>
                <span> / month</span>
              </div>
              <div className="price-desc">For candidates actively job hunting.</div>
              <ul className="price-features">
                <li>Everything in Free</li>
                <li>Unlimited projects</li>
                <li>Interview preparation</li>
                <li>AI career coach</li>
                <li>Resume optimization</li>
              </ul>
              <Link to="/register" className="btn btn-primary">Upgrade to Premium</Link>
            </div>

            <div className="price-card">
              <div className="price-tier">Enterprise</div>
              <div className="price-amount">
                <span>{enterprisePrice}</span>
                <span> / month</span>
              </div>
              <div className="price-desc">For teams hiring and mapping skills.</div>
              <ul className="price-features">
                <li>Everything in Premium</li>
                <li>Employee skills mapping</li>
                <li>Team dashboards</li>
                <li>Skills gap analysis</li>
              </ul>
              <a href="#" className="btn btn-ghost">Talk to sales</a>
            </div>
          </div>
        </div>
      </section>

      <section className="compare">
        <div className="wrap">
          <div className="section-head">
            <h2>Compare plans in detail</h2>
            <p>Every feature, side by side.</p>
          </div>
          <table>
            <thead>
              <tr>
                <th></th>
                <th className="plan-col">Free</th>
                <th className="plan-col featured">Premium</th>
                <th className="plan-col">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {compareRows.map((row) =>
                'category' in row ? (
                  <tr className="cat-row" key={row.category}>
                    <td colSpan={4}>{row.category}</td>
                  </tr>
                ) : (
                  <tr key={row.feature}>
                    <td>{row.feature}</td>
                    <td>{renderCell(row.free)}</td>
                    <td>{renderCell(row.premium)}</td>
                    <td>{renderCell(row.enterprise)}</td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="faq">
        <div className="wrap">
          <div className="section-head">
            <h2>Questions, answered</h2>
          </div>
          <div className="faq-grid">
            {faqs.map((item) => (
              <div className="faq-item" key={item.q}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="wrap">
          <h2>Prove your first skill today.</h2>
          <p>Free forever for up to 3 projects. Upgrade when you&apos;re ready for more.</p>
          <Link to="/register" className="btn btn-primary">Get started free</Link>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div>© {new Date().getFullYear()} SkillProof AI</div>
          <div className="foot-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
