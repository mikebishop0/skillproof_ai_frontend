import { Routes, Route } from 'react-router-dom';

import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';

import LandingPage from './pages/public/LandingPage';
import PricingPage from './pages/public/PricingPage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import PublicProfilePage from './pages/public/PublicProfilePage';

import DashboardHome from './pages/candidate/DashboardHome';
import ProfileEdit from './pages/candidate/ProfileEdit';
import Projects from './pages/candidate/Projects';
import ProjectDetail from './pages/candidate/ProjectDetail';
import Assessments from './pages/candidate/Assessments';
import AssessmentTake from './pages/candidate/AssessmentTake';
import AssessmentResult from './pages/candidate/AssessmentResult';
import Badges from './pages/candidate/Badges';
import AIReport from './pages/candidate/AIReport';

import RecruiterSearch from './pages/recruiter/Search';
import CandidateView from './pages/recruiter/CandidateView';

import AdminAssessments from './pages/admin/Assessments';
import AdminBadges from './pages/admin/Badges';
import Analytics from './pages/admin/Analytics';
import AIMonitor from './pages/admin/AIMonitor';

const candidateNavItems = [
  { label: 'Overview', to: '/dashboard' },
  { label: 'Profile', to: '/dashboard/profile' },
  { label: 'Projects', to: '/dashboard/projects' },
  { label: 'Assessments', to: '/dashboard/assessments' },
  { label: 'Badges', to: '/dashboard/badges' },
];

const recruiterNavItems = [{ label: 'Search Candidates', to: '/recruiter/search' }];

const adminNavItems = [
  { label: 'Assessments', to: '/admin/assessments' },
  { label: 'Badges', to: '/admin/badges' },
  { label: 'Analytics', to: '/admin/analytics' },
  { label: 'AI Monitor', to: '/admin/ai-monitor' },
];

function App() {
  return (
    <Routes>
      {/* Standalone pages (ship their own nav/footer) */}
      <Route path="/" element={<LandingPage />} />
      <Route path="pricing" element={<PricingPage />} />
      <Route path="profile/:username" element={<PublicProfilePage />} />

      {/* Public marketing + auth routes */}
      <Route element={<PublicLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      {/* Candidate dashboard */}
      <Route
        path="/dashboard"
        element={<DashboardLayout roleLabel="Candidate" navItems={candidateNavItems} />}
      >
        <Route index element={<DashboardHome />} />
        <Route path="profile" element={<ProfileEdit />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:id" element={<ProjectDetail />} />
        <Route path="assessments" element={<Assessments />} />
        <Route path="assessments/:id/take" element={<AssessmentTake />} />
        <Route path="assessments/:id/result" element={<AssessmentResult />} />
        <Route path="badges" element={<Badges />} />
        <Route path="ai-report/:id" element={<AIReport />} />
      </Route>

      {/* Recruiter dashboard */}
      <Route
        path="/recruiter"
        element={<DashboardLayout roleLabel="Recruiter" navItems={recruiterNavItems} />}
      >
        <Route index element={<RecruiterSearch />} />
        <Route path="search" element={<RecruiterSearch />} />
        <Route path="candidate/:id" element={<CandidateView />} />
      </Route>

      {/* Admin dashboard */}
      <Route path="/admin" element={<DashboardLayout roleLabel="Admin" navItems={adminNavItems} />}>
        <Route index element={<Analytics />} />
        <Route path="assessments" element={<AdminAssessments />} />
        <Route path="badges" element={<AdminBadges />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="ai-monitor" element={<AIMonitor />} />
      </Route>
    </Routes>
  );
}

export default App;
