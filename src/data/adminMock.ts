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

export interface RecruiterAccount {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  plan: 'Free' | 'Enterprise';
  candidatesViewed: number;
  shortlisted: number;
  status: 'active' | 'suspended';
}

export const recruiterAccounts: RecruiterAccount[] = [
  { id: '1', companyName: 'CloudScale', contactName: 'Neel Bhatia', email: 'neel@cloudscale.io', plan: 'Enterprise', candidatesViewed: 284, shortlisted: 18, status: 'active' },
  { id: '2', companyName: 'NeoVibe', contactName: 'Ritika Shah', email: 'ritika@neovibe.com', plan: 'Enterprise', candidatesViewed: 156, shortlisted: 9, status: 'active' },
  { id: '3', companyName: 'StructIQ', contactName: 'Devansh Rao', email: 'devansh@structiq.dev', plan: 'Free', candidatesViewed: 42, shortlisted: 3, status: 'active' },
  { id: '4', companyName: 'OpenNode', contactName: 'Alia Fernandes', email: 'alia@opennode.tech', plan: 'Enterprise', candidatesViewed: 198, shortlisted: 12, status: 'active' },
  { id: '5', companyName: 'SecureLayer', contactName: 'Karan Malhotra', email: 'karan@securelayer.io', plan: 'Free', candidatesViewed: 27, shortlisted: 1, status: 'suspended' },
];

export interface QuestionBankEntry {
  id: string;
  text: string;
  assessmentId: string;
  assessmentName: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export const questionBank: QuestionBankEntry[] = [
  { id: '1', text: 'Explain the trade-offs between synchronous and event-driven service communication.', assessmentId: '1', assessmentName: 'Java architecture assessment', difficulty: 'Hard' },
  { id: '2', text: 'How would you handle schema evolution in a Kafka-based event pipeline?', assessmentId: '4', assessmentName: 'Event-driven systems assessment', difficulty: 'Hard' },
  { id: '3', text: 'Design a rate limiter for a public API used by multiple client tiers.', assessmentId: '2', assessmentName: 'Microservices design patterns', difficulty: 'Medium' },
  { id: '4', text: 'Implement a function to detect a cycle in a directed graph.', assessmentId: '3', assessmentName: 'Distributed systems coding test', difficulty: 'Medium' },
  { id: '5', text: 'What is the shared responsibility model in cloud security?', assessmentId: '5', assessmentName: 'Cloud security fundamentals', difficulty: 'Easy' },
];

export interface SubscriptionPlanSummary {
  plan: 'Free' | 'Premium' | 'Enterprise';
  subscribers: number;
  mrr: number;
}

export const subscriptionPlans: SubscriptionPlanSummary[] = [
  { plan: 'Free', subscribers: 486, mrr: 0 },
  { plan: 'Premium', subscribers: 94, mrr: 846 },
  { plan: 'Enterprise', subscribers: 18, mrr: 5382 },
];

export const revenueByMonth = [
  { month: 'Feb', revenue: 3200 },
  { month: 'Mar', revenue: 3850 },
  { month: 'Apr', revenue: 4400 },
  { month: 'May', revenue: 5120 },
  { month: 'Jun', revenue: 5760 },
  { month: 'Jul', revenue: 6228 },
];

export interface ReportDefinition {
  id: string;
  name: string;
  description: string;
  lastGenerated: string;
}

export const availableReports: ReportDefinition[] = [
  { id: '1', name: 'User growth report', description: 'Monthly signups and activation rate across all roles.', lastGenerated: '18 Jul 2026' },
  { id: '2', name: 'Assessment completion report', description: 'Completion and pass rates broken down by assessment.', lastGenerated: '17 Jul 2026' },
  { id: '3', name: 'Revenue report', description: 'MRR, plan breakdown, and churn for the current quarter.', lastGenerated: '15 Jul 2026' },
  { id: '4', name: 'Recruiter activity report', description: 'Candidates viewed, shortlisted, and hired per recruiter account.', lastGenerated: '12 Jul 2026' },
];
