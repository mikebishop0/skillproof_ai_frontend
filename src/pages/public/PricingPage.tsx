const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    features: ['Profile creation', 'Portfolio', 'Up to 3 projects', 'AI project review', 'Public badge'],
  },
  {
    name: 'Premium',
    price: '$9',
    period: '/month',
    features: ['Unlimited projects', 'Interview preparation', 'AI career coach', 'Resume optimization'],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '$299',
    period: '/month',
    features: ['Employee skills mapping', 'Team dashboards', 'Skills gap analysis'],
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="text-center text-3xl font-semibold text-slate-900 dark:text-white">
        Simple, transparent pricing
      </h1>
      <div className="mt-12 grid gap-8 sm:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-xl border p-6 ${
              plan.highlighted
                ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'
            }`}
          >
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{plan.name}</h2>
            <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              {plan.price}
              <span className="text-base font-normal text-slate-400">{plan.period}</span>
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-500 dark:text-slate-400">
              {plan.features.map((f) => (
                <li key={f}>&bull; {f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
