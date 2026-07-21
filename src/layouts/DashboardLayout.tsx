import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  Award,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  ClipboardCheck,
  CreditCard,
  FileText,
  Grid2X2,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Search,
  Settings,
  ShieldCheck,
  UserRound,
  Users,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import logo from '../assets/logo1.png';
import './dashboard.css';

interface NavItem {
  label: string;
  to: string;
}

interface DashboardLayoutProps {
  roleLabel: string;
  navItems: NavItem[];
}

const navIcons: Record<string, typeof LayoutDashboard> = {
  Overview: LayoutDashboard,
  Dashboard: LayoutDashboard,
  Profile: UserRound,
  Projects: BriefcaseBusiness,
  Assessments: ClipboardCheck,
  Badges: Award,
  'AI Reports': FileText,
  Billing: CreditCard,
  'Search Candidates': Search,
  Shortlisted: ShieldCheck,
  'Team Dashboard': Users,
  'AI Monitor': BrainCircuit,
  Users,
};

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
      <div className={`dash-shell ${roleLabel.toLowerCase()}-shell`}>
        <aside className="dash-sidebar">
          <Link to="/" className="dash-logo">
            <img src={logo} alt="SkillProof AI" className="logo-img" />
          </Link>
          <p className="dash-role">{roleLabel} workspace</p>
          <nav className="dash-nav">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end className={({ isActive }) => (isActive ? 'active' : '')}>
                {(() => {
                  const Icon = navIcons[item.label] ?? Grid2X2;
                  return <Icon size={18} strokeWidth={2} aria-hidden="true" />;
                })()}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
          <div className="dash-sidebar-bottom">
            <Link to={roleLabel === 'Candidate' ? '/dashboard/ai-reports' : roleLabel === 'Admin' ? '/admin/ai-monitor' : '/recruiter'} className="ai-sidebar-cta">
              <Bot size={17} />
              <span>{roleLabel === 'Candidate' ? 'Improve with AI' : 'Analyze with AI'}</span>
            </Link>
            <div className="dash-secondary-nav">
              <Link to={roleLabel === 'Candidate' ? '/dashboard/settings' : roleLabel === 'Admin' ? '/admin' : '/recruiter'}><Settings size={18} /> Settings</Link>
              <a href="mailto:developer@zonopact.com"><HelpCircle size={18} /> Support</a>
            </div>
            <div className="dash-account">
              <div className="dash-avatar">{user?.name?.charAt(0) ?? roleLabel.charAt(0)}</div>
              <div className="dash-account-copy">
                <strong>{user?.name ?? `${roleLabel} account`}</strong>
                <span>{user?.email ?? `${roleLabel.toLowerCase()}@zonopact.com`}</span>
              </div>
              <button type="button" className="logout-icon" onClick={handleLogout} aria-label="Log out"><LogOut size={17} /></button>
            </div>
          </div>
        </aside>
        <main className="dash-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
