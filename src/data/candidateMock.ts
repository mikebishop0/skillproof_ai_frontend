export const candidate = {
  name: 'Mayur Ramgir',
  role: 'Java Architecture · Backend Systems',
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

export const assessments = [
  { name: 'Java architecture assessment', type: 'Scenario-based', score: 92 },
  { name: 'Microservices design patterns', type: 'Architecture test', score: 88 },
  { name: 'Distributed systems coding test', type: 'Coding test', score: 81 },
];
