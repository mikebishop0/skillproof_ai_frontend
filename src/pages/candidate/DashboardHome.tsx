const stats = [
  { label: 'Projects uploaded', value: '2 / 3' },
  { label: 'Assessments completed', value: '1' },
  { label: 'Badges earned', value: '1' },
];

export default function DashboardHome() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Welcome back</h1>
      <p className="mt-1 text-slate-500 dark:text-slate-400">Here&apos;s your skill-proof progress.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="text-2xl font-bold text-brand-500">{stat.value}</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
