import { Link, NavLink, Outlet } from 'react-router-dom';
import './dashboard.css';

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
    <div className="spai-dashboard">
      <div className="dash-shell">
        <aside className="dash-sidebar">
          <Link to="/" className="dash-logo">
            <span className="logo-mark">S</span>SkillProof AI
          </Link>
          <p className="dash-role">{roleLabel}</p>
          <nav className="dash-nav">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="dash-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
