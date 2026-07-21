import { Routes, Route } from 'react-router-dom';

import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';

import LandingPage from './pages/public/LandingPage';
import PricingPage from './pages/public/PricingPage';
import AuthPage from './pages/public/AuthPage';
import ForgotPasswordPage from './pages/public/ForgotPasswordPage';
import PublicProfilePage from './pages/public/PublicProfilePage';
import RecruitersPage from './pages/public/RecruitersPage';
import FeaturesPage from './pages/public/FeaturesPage';
import HowItWorksPage from './pages/public/HowItWorksPage';

import DashboardHome from './pages/candidate/DashboardHome';
import ProfileEdit from './pages/candidate/ProfileEdit';
import Projects from './pages/candidate/Projects';
import ProjectForm from './pages/candidate/ProjectForm';
import ProjectDetail from './pages/candidate/ProjectDetail';
import Assessments from './pages/candidate/Assessments';
import AssessmentTake from './pages/candidate/AssessmentTake';
import AssessmentResult from './pages/candidate/AssessmentResult';
import Badges from './pages/candidate/Badges';
import AIReports from './pages/candidate/AIReports';
import AIReport from './pages/candidate/AIReport';
import Billing from './pages/candidate/Billing';
import Settings from './pages/candidate/Settings';

import RecruiterDashboard from './pages/recruiter/RecruiterDashboard';
import RecruiterSearch from './pages/recruiter/Search';
import CandidateView from './pages/recruiter/CandidateView';
import Shortlist from './pages/recruiter/Shortlist';
import TeamDashboard from './pages/recruiter/TeamDashboard';

import AdminAssessments from './pages/admin/Assessments';
import AdminBadges from './pages/admin/Badges';
import Analytics from './pages/admin/Analytics';
import AIMonitor from './pages/admin/AIMonitor';
import UserManagement from './pages/admin/UserManagement';

const candidateNavItems = [
  { label: 'Overview', to: '/dashboard' },
  { label: 'Profile', to: '/dashboard/profile' },
  { label: 'Projects', to: '/dashboard/projects' },
  { label: 'Assessments', to: '/dashboard/assessments' },
  { label: 'Badges', to: '/dashboard/badges' },
  { label: 'AI Reports', to: '/dashboard/ai-reports' },
  { label: 'Billing', to: '/dashboard/billing' },
  { label: 'Settings', to: '/dashboard/settings' },
];

const recruiterNavItems = [
  { label: 'Dashboard', to: '/recruiter' },
  { label: 'Search Candidates', to: '/recruiter/search' },
  { label: 'Shortlisted', to: '/recruiter/shortlist' },
  { label: 'Team Dashboard', to: '/recruiter/team' },
];

const adminNavItems = [
  { label: 'Dashboard', to: '/admin' },
  { label: 'Assessments', to: '/admin/assessments' },
  { label: 'Badges', to: '/admin/badges' },
  { label: 'AI Monitor', to: '/admin/ai-monitor' },
  { label: 'Users', to: '/admin/users' },
];

function App() {
  return (
    <Routes>
      {/* Standalone pages (ship their own nav/footer) */}
      <Route path="/" element={<LandingPage />} />
      <Route path="pricing" element={<PricingPage />} />
      <Route path="recruiters" element={<RecruitersPage />} />
      <Route path="features" element={<FeaturesPage />} />
      <Route path="how-it-works" element={<HowItWorksPage />} />
      <Route path="profile/:username" element={<PublicProfilePage />} />
      <Route path="login" element={<AuthPage />} />
      <Route path="register" element={<AuthPage />} />
      <Route path="forgot-password" element={<ForgotPasswordPage />} />

      {/* Candidate dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={['candidate']}>
            <DashboardLayout roleLabel="Candidate" navItems={candidateNavItems} />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="profile" element={<ProfileEdit />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/new" element={<ProjectForm />} />
        <Route path="projects/:id" element={<ProjectDetail />} />
        <Route path="projects/:id/edit" element={<ProjectForm />} />
        <Route path="assessments" element={<Assessments />} />
        <Route path="assessments/:id/take" element={<AssessmentTake />} />
        <Route path="assessments/:id/result" element={<AssessmentResult />} />
        <Route path="badges" element={<Badges />} />
        <Route path="ai-reports" element={<AIReports />} />
        <Route path="ai-report/:id" element={<AIReport />} />
        <Route path="billing" element={<Billing />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Recruiter dashboard */}
      <Route
        path="/recruiter"
        element={
          <ProtectedRoute allowedRoles={['recruiter']}>
            <DashboardLayout roleLabel="Recruiter" navItems={recruiterNavItems} />
          </ProtectedRoute>
        }
      >
        <Route index element={<RecruiterDashboard />} />
        <Route path="search" element={<RecruiterSearch />} />
        <Route path="candidate/:id" element={<CandidateView />} />
        <Route path="shortlist" element={<Shortlist />} />
        <Route path="team" element={<TeamDashboard />} />
      </Route>

      {/* Admin dashboard */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DashboardLayout roleLabel="Admin" navItems={adminNavItems} />
          </ProtectedRoute>
        }
      >
        <Route index element={<Analytics />} />
        <Route path="assessments" element={<AdminAssessments />} />
        <Route path="badges" element={<AdminBadges />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="ai-monitor" element={<AIMonitor />} />
        <Route path="users" element={<UserManagement />} />
      </Route>
    </Routes>
  );
}

export default App;
