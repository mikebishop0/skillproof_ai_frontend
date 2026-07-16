import { Link, Outlet } from 'react-router-dom';
import NavMegaMenu from '../components/NavMegaMenu';
import { navMenus } from '../data/navMenus';

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
      <header className="relative z-20 border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-lg font-semibold text-slate-900 dark:text-white">
            Zonopact <span className="text-brand-500">SkillProof AI</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
            {navMenus.map((menu) => (
              <NavMegaMenu key={menu.label} menu={menu} />
            ))}
            <Link to="/pricing" className="rounded-md px-2 py-1.5 hover:bg-slate-100 hover:text-brand-500 dark:hover:bg-slate-800">Pricing</Link>
            <Link
              to="/login"
              className="ml-4 rounded-md border border-brand-500 bg-brand-100 px-4 py-2 text-brand-800 hover:bg-brand-200 dark:bg-brand-900/30 dark:text-brand-200"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="rounded-md bg-brand-500 px-4 py-2 text-white hover:bg-brand-600"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-400 dark:border-slate-800">
        &copy; {new Date().getFullYear()} Zonopact SkillProof AI. Turn Skills Into Verifiable Evidence.
      </footer>
    </div>
  );
}
