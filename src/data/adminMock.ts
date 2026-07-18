export const userGrowth = [
  { month: 'Jan', users: 120 },
  { month: 'Feb', users: 180 },
  { month: 'Mar', users: 260 },
  { month: 'Apr', users: 340 },
  { month: 'May', users: 460 },
  { month: 'Jun', users: 610 },
];

export const platformStats = {
  totalUsers: 610,
  assessmentCompletionRate: 78,
  avgCompetencyScore: 84,
  activeRecruiters: 42,
};

export const topSkills = [
  { skill: 'Java architecture', candidates: 132 },
  { skill: 'React', candidates: 118 },
  { skill: 'Kubernetes', candidates: 96 },
  { skill: 'Microservices design', candidates: 87 },
  { skill: 'Apache Spark', candidates: 54 },
];

export interface AssessmentDefinition {
  id: string;
  name: string;
  type: 'MCQ' | 'Coding test' | 'Architecture test' | 'Scenario-based';
  questionCount: number;
  status: 'published' | 'draft';
}

export const assessmentDefinitions: AssessmentDefinition[] = [
  { id: '1', name: 'Java architecture assessment', type: 'Scenario-based', questionCount: 8, status: 'published' },
  { id: '2', name: 'Microservices design patterns', type: 'Architecture test', questionCount: 6, status: 'published' },
  { id: '3', name: 'Distributed systems coding test', type: 'Coding test', questionCount: 5, status: 'published' },
  { id: '4', name: 'Event-driven systems assessment', type: 'Scenario-based', questionCount: 4, status: 'published' },
  { id: '5', name: 'Cloud security fundamentals', type: 'MCQ', questionCount: 10, status: 'draft' },
];

export interface BadgeDefinition {
  id: string;
  name: string;
  criteria: string;
  issuedCount: number;
}

export const badgeDefinitions: BadgeDefinition[] = [
  { id: '1', name: 'Verified Java developer', criteria: 'Score 85%+ on Java architecture assessment', issuedCount: 214 },
  { id: '2', name: 'Certified DevOps engineer', criteria: 'Score 80%+ on 2 DevOps-related assessments', issuedCount: 96 },
  { id: '3', name: 'Cloud architect expert', criteria: 'Score 88%+ average across cloud assessments', issuedCount: 58 },
  { id: '4', name: 'Verified React developer', criteria: 'Score 85%+ on frontend assessment + 2 reviewed projects', issuedCount: 132 },
];

export interface AiEvaluationLogEntry {
  id: string;
  timestamp: string;
  type: 'Project review' | 'Assessment scoring' | 'Badge eligibility check';
  target: string;
  status: 'success' | 'failed' | 'pending';
}

export const aiEvaluationLog: AiEvaluationLogEntry[] = [
  { id: '1', timestamp: '18 Jul 2026, 10:42', type: 'Project review', target: 'Spring Boot microservices platform', status: 'success' },
  { id: '2', timestamp: '18 Jul 2026, 10:15', type: 'Assessment scoring', target: 'Event-driven systems assessment', status: 'success' },
  { id: '3', timestamp: '18 Jul 2026, 09:58', type: 'Badge eligibility check', target: 'Verified React developer', status: 'failed' },
  { id: '4', timestamp: '18 Jul 2026, 09:30', type: 'Project review', target: 'Accessible design system', status: 'pending' },
  { id: '5', timestamp: '17 Jul 2026, 22:12', type: 'Assessment scoring', target: 'Cloud security fundamentals', status: 'failed' },
  { id: '6', timestamp: '17 Jul 2026, 20:05', type: 'Project review', target: 'Zero-downtime deployment pipeline', status: 'success' },
];

export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  role: 'candidate' | 'recruiter' | 'admin';
  status: 'active' | 'suspended';
}

export const platformUsers: PlatformUser[] = [
  { id: '1', name: 'Mayur Ramgir', email: 'mayur.ramgir@example.com', role: 'candidate', status: 'active' },
  { id: '2', name: 'Priya Nair', email: 'priya.nair@example.com', role: 'candidate', status: 'active' },
  { id: '3', name: 'Arjun Mehta', email: 'arjun.mehta@example.com', role: 'candidate', status: 'active' },
  { id: '4', name: 'Recruiter Team', email: 'recruiter@example.com', role: 'recruiter', status: 'active' },
  { id: '5', name: 'Sana Sheikh', email: 'sana.sheikh@example.com', role: 'candidate', status: 'suspended' },
  { id: '6', name: 'Admin Ops', email: 'admin@example.com', role: 'admin', status: 'active' },
];
