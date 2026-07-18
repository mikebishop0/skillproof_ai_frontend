import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
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
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
          <div style={{ marginTop: 'auto', paddingTop: 20 }}>
            {user && (
              <p style={{ fontSize: 12, color: 'var(--spai-slate)', padding: '0 10px', marginBottom: 8 }}>
                {user.email}
              </p>
            )}
            <button
              type="button"
              className="btn btn-ghost"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        </aside>
        <main className="dash-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
