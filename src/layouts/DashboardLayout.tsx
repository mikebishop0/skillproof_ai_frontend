import { Link, NavLink, Outlet } from 'react-router-dom';

interface NavItem {
  label: string;
  to: string;
}

interface DashboardLayoutProps {
  roleLabel: string;
  navItems: NavItem[];
}

export default function DashboardLayout({ roleLabel, navItems }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <aside className="w-64 shrink-0 border-r border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <Link to="/" className="text-base font-semibold text-slate-900 dark:text-white">
          Zonopact <span className="text-brand-500">SkillProof AI</span>
        </Link>
        <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">{roleLabel}</p>
        <nav className="mt-8 flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
