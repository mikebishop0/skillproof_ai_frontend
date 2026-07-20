export const candidate = {
  name: 'Mayur Ramgir',
  role: 'Java Architecture Backend Systems',
  location: 'Pune, India',
  bio: 'Backend engineer focused on microservices architecture and event-driven systems. Open to remote roles.',
  github: 'github.com/mayurramgir',
  linkedin: 'linkedin.com/in/mayurramgir',
  plan: 'free' as 'free' | 'premium' | 'enterprise',
  projectQuota: 3,
};

export const skills = [
  { name: 'Java architecture', pct: 92 },
  { name: 'Microservices design', pct: 88 },
  { name: 'Event-driven systems', pct: 85 },
  { name: 'Cloud deployment', pct: 74 },
  { name: 'Security practices', pct: 66 },
];

export interface CandidateProject {
  id: string;
  title: string;
  status: 'reviewed' | 'pending';
  score: number | null;
  description: string;
  github: string;
  tags: string[];
  strengths: string[];
  improvements: string[];
}

export const projects: CandidateProject[] = [
  {
    id: '1',
    title: 'Spring Boot microservices platform',
    status: 'reviewed',
    score: 92,
    description:
      'A multi-service order management system built with Spring Boot, handling checkout, inventory, and payment flows across five independently deployed services.',
    github: 'github.com/mayurramgir/order-platform',
    tags: ['Spring Boot', 'PostgreSQL', 'Docker', 'Kubernetes'],
    strengths: ['Strong microservices knowledge', 'Excellent architecture skills'],
    improvements: ['Security optimization', 'Better monitoring design'],
  },
  {
    id: '2',
    title: 'Event-driven order pipeline',
    status: 'reviewed',
    score: 85,
    description:
      'Kafka-based event pipeline replacing a synchronous REST chain, cutting order-processing latency and decoupling downstream services.',
    github: 'github.com/mayurramgir/event-pipeline',
    tags: ['Apache Kafka', 'Java 21', 'Redis'],
    strengths: ['Clean event schema design'],
    improvements: ['Add dead-letter queue handling'],
  },
  {
    id: '3',
    title: 'Cloud deployment automation',
    status: 'pending',
    score: null,
    description: 'Terraform + GitHub Actions pipeline for zero-downtime deploys across staging and production.',
    github: 'github.com/mayurramgir/deploy-automation',
    tags: ['Terraform', 'GitHub Actions', 'AWS'],
    strengths: [],
    improvements: [],
  },
];

export const badges = [
  { id: '1', name: 'Verified Java developer', date: 'Issued Mar 2026' },
  { id: '2', name: 'Certified DevOps engineer', date: 'Issued May 2026' },
  { id: '3', name: 'Cloud architect expert', date: 'Issued Jun 2026' },
];

export interface AssessmentQuestion {
  id: string;
  type: 'mcq' | 'coding' | 'scenario';
  prompt: string;
  options?: string[];
}

export interface Assessment {
  id: string;
  name: string;
  type: string;
  durationMinutes: number;
  status: 'completed' | 'available';
  score: number | null;
  passScore: number;
  badgeOnPass?: string;
  questions: AssessmentQuestion[];
}

export const assessments: Assessment[] = [
  {
    id: '1',
    name: 'Java architecture assessment',
    type: 'Scenario-based',
    durationMinutes: 30,
    status: 'completed',
    score: 92,
    passScore: 70,
    questions: [],
  },
  {
    id: '2',
    name: 'Microservices design patterns',
    type: 'Architecture test',
    durationMinutes: 25,
    status: 'completed',
    score: 88,
    passScore: 70,
    questions: [],
  },
  {
    id: '3',
    name: 'Distributed systems coding test',
    type: 'Coding test',
    durationMinutes: 20,
    status: 'completed',
    score: 81,
    passScore: 70,
    questions: [],
  },
  {
    id: '4',
    name: 'Event-driven systems assessment',
    type: 'Scenario-based',
    durationMinutes: 20,
    status: 'available',
    score: null,
    passScore: 70,
    badgeOnPass: 'Event-Driven Systems Expert',
    questions: [
      {
        id: 'q1',
        type: 'mcq',
        prompt: 'Which pattern best decouples a producer from multiple consumers reacting to the same event?',
        options: ['Request-response', 'Publish-subscribe', 'Two-phase commit', 'Shared database'],
      },
      {
        id: 'q2',
        type: 'mcq',
        prompt: 'What is the main risk of "at-least-once" message delivery?',
        options: [
          'Messages may be lost entirely',
          'Consumers must handle duplicate messages idempotently',
          'Producers cannot retry failed sends',
          'It requires a single consumer per topic',
        ],
      },
      {
        id: 'q3',
        type: 'coding',
        prompt: 'Write a short function (pseudocode is fine) that consumes an "OrderPlaced" event and idempotently updates an inventory count.',
      },
      {
        id: 'q4',
        type: 'scenario',
        prompt: 'Your event pipeline is falling behind under load and consumers are lagging. Describe how you would diagnose and fix it.',
      },
    ],
  },
  {
    id: '5',
    name: 'Cloud security fundamentals',
    type: 'MCQ',
    durationMinutes: 15,
    status: 'available',
    score: null,
    passScore: 70,
    badgeOnPass: 'Cloud Security Fundamentals',
    questions: [
      {
        id: 'q1',
        type: 'mcq',
        prompt: 'What is the principle of least privilege?',
        options: [
          'Giving every service admin access for simplicity',
          'Granting only the permissions required to perform a task',
          'Sharing one IAM role across all services',
          'Disabling all access controls in staging',
        ],
      },
      {
        id: 'q2',
        type: 'mcq',
        prompt: 'Which of these should never be committed to a public repository?',
        options: ['README.md', 'Environment variable names', 'API keys and secrets', 'Unit tests'],
      },
    ],
  },
];

export interface AiReportEntry {
  id: string;
  type: 'Project review' | 'Assessment scoring';
  title: string;
  score: number;
  date: string;
  strengths: string[];
  improvements: string[];
}

const reviewedProjects = projects.filter((p) => p.status === 'reviewed');
const completedAssessments = assessments.filter((a) => a.status === 'completed');

export const aiReports: AiReportEntry[] = [
  ...reviewedProjects.map((project, index) => ({
    id: `project-${project.id}`,
    type: 'Project review' as const,
    title: project.title,
    score: project.score as number,
    date: ['12 Jun 2026', '28 May 2026'][index] ?? '1 Jan 2026',
    strengths: project.strengths,
    improvements: project.improvements,
  })),
  ...completedAssessments.map((assessment, index) => ({
    id: `assessment-${assessment.id}`,
    type: 'Assessment scoring' as const,
    title: assessment.name,
    score: assessment.score as number,
    date: ['15 Jun 2026', '2 Jun 2026', '20 May 2026'][index] ?? '1 Jan 2026',
    strengths:
      (assessment.score as number) >= assessment.passScore
        ? [`Cleared the ${assessment.passScore}% pass threshold`]
        : [],
    improvements:
      (assessment.score as number) < assessment.passScore
        ? [`Retake recommended to reach the ${assessment.passScore}% threshold`]
        : [],
  })),
];
