export interface CandidateSummary {
  id: string;
  name: string;
  role: string;
  location: string;
  score: number;
  skills: string[];
  badges: string[];
  projectCount: number;
  topProject: { title: string; description: string };
}

export const candidatePool: CandidateSummary[] = [
  {
    id: 'mayur-ramgir',
    name: 'Mayur Ramgir',
    role: 'Java Architecture · Backend Systems',
    location: 'Pune, India',
    score: 92,
    skills: ['Java architecture', 'Microservices design', 'Event-driven systems', 'Cloud deployment', 'Security practices'],
    badges: ['Verified Java developer', 'Certified DevOps engineer', 'Cloud architect expert'],
    projectCount: 3,
    topProject: {
      title: 'Spring Boot microservices platform',
      description:
        'A multi-service order management system handling checkout, inventory, and payment flows across five independently deployed services.',
    },
  },
  {
    id: 'priya-nair',
    name: 'Priya Nair',
    role: 'Frontend Engineer · React',
    location: 'Bengaluru, India',
    score: 88,
    skills: ['React', 'TypeScript', 'Accessibility', 'Performance optimization'],
    badges: ['Verified React developer'],
    projectCount: 4,
    topProject: {
      title: 'Accessible design system',
      description: 'A component library used across four product teams, audited to WCAG 2.1 AA with automated accessibility testing.',
    },
  },
  {
    id: 'arjun-mehta',
    name: 'Arjun Mehta',
    role: 'DevOps Engineer · Cloud Infrastructure',
    location: 'Hyderabad, India',
    score: 85,
    skills: ['Kubernetes', 'Terraform', 'AWS', 'CI/CD pipelines'],
    badges: ['Certified DevOps engineer'],
    projectCount: 2,
    topProject: {
      title: 'Zero-downtime deployment pipeline',
      description: 'Terraform + GitHub Actions pipeline enabling blue-green deploys across staging and production on AWS.',
    },
  },
  {
    id: 'sana-sheikh',
    name: 'Sana Sheikh',
    role: 'Data Engineer · Distributed Systems',
    location: 'Remote',
    score: 79,
    skills: ['Apache Spark', 'Python', 'Data pipelines', 'SQL optimization'],
    badges: [],
    projectCount: 2,
    topProject: {
      title: 'Batch-to-streaming data migration',
      description: 'Migrated a nightly batch ETL job to a near-real-time Spark streaming pipeline, cutting data latency from hours to minutes.',
    },
  },
  {
    id: 'rohit-verma',
    name: 'Rohit Verma',
    role: 'Security Engineer · Application Security',
    location: 'Pune, India',
    score: 90,
    skills: ['Application security', 'Penetration testing', 'Threat modeling'],
    badges: ['Cloud architect expert'],
    projectCount: 3,
    topProject: {
      title: 'Application security review program',
      description: 'Built a recurring threat-modeling and penetration-testing process that found and fixed 12 critical vulnerabilities pre-launch.',
    },
  },
  {
    id: 'neha-kulkarni',
    name: 'Neha Kulkarni',
    role: 'Full Stack Developer',
    location: 'Mumbai, India',
    score: 74,
    skills: ['Node.js', 'React', 'PostgreSQL'],
    badges: [],
    projectCount: 1,
    topProject: {
      title: 'Internal tools dashboard',
      description: 'A full-stack internal dashboard for support ticket triage, built solo with Node.js, React, and PostgreSQL.',
    },
  },
];

export const allSkills = Array.from(new Set(candidatePool.flatMap((c) => c.skills))).sort();
export const allBadges = Array.from(new Set(candidatePool.flatMap((c) => c.badges))).sort();

export const orgEmployees = [
  { name: 'Mayur Ramgir', team: 'Platform', topSkill: 'Java architecture', score: 92, gap: 'Security optimization' },
  { name: 'Priya Nair', team: 'Web', topSkill: 'React', score: 88, gap: 'Testing coverage' },
  { name: 'Arjun Mehta', team: 'Infra', topSkill: 'Kubernetes', score: 85, gap: 'Cost optimization' },
  { name: 'Sana Sheikh', team: 'Data', topSkill: 'Apache Spark', score: 79, gap: 'Streaming pipelines' },
  { name: 'Rohit Verma', team: 'Security', topSkill: 'Application security', score: 90, gap: 'Cloud-native security' },
  { name: 'Neha Kulkarni', team: 'Web', topSkill: 'Node.js', score: 74, gap: 'System design' },
];

export const skillGaps = [
  { skill: 'Cloud-native security', teamsAffected: 3, severity: 'high' as const },
  { skill: 'Streaming pipelines', teamsAffected: 2, severity: 'medium' as const },
  { skill: 'System design', teamsAffected: 4, severity: 'high' as const },
  { skill: 'Testing coverage', teamsAffected: 2, severity: 'medium' as const },
  { skill: 'Cost optimization', teamsAffected: 1, severity: 'low' as const },
];
