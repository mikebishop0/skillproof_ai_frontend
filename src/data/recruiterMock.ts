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
  joinedDate: string;
}

export const candidatePool: CandidateSummary[] = [
  {
    id: 'mayur-ramgir',
    name: 'Mayur Ramgir',
    role: 'Java Architecture Backend Systems',
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
    joinedDate: '2026-06-28',
  },
  {
    id: 'priya-nair',
    name: 'Priya Nair',
    role: 'Frontend Engineer React',
    location: 'Bengaluru, India',
    score: 88,
    skills: ['React', 'TypeScript', 'Accessibility', 'Performance optimization'],
    badges: ['Verified React developer'],
    projectCount: 4,
    topProject: {
      title: 'Accessible design system',
      description: 'A component library used across four product teams, audited to WCAG 2.1 AA with automated accessibility testing.',
    },
    joinedDate: '2026-07-10',
  },
  {
    id: 'arjun-mehta',
    name: 'Arjun Mehta',
    role: 'DevOps Engineer Cloud Infrastructure',
    location: 'Hyderabad, India',
    score: 85,
    skills: ['Kubernetes', 'Terraform', 'AWS', 'CI/CD pipelines'],
    badges: ['Certified DevOps engineer'],
    projectCount: 2,
    topProject: {
      title: 'Zero-downtime deployment pipeline',
      description: 'Terraform + GitHub Actions pipeline enabling blue-green deploys across staging and production on AWS.',
    },
    joinedDate: '2026-05-14',
  },
  {
    id: 'sana-sheikh',
    name: 'Sana Sheikh',
    role: 'Data Engineer Distributed Systems',
    location: 'Remote',
    score: 79,
    skills: ['Apache Spark', 'Python', 'Data pipelines', 'SQL optimization'],
    badges: [],
    projectCount: 2,
    topProject: {
      title: 'Batch-to-streaming data migration',
      description: 'Migrated a nightly batch ETL job to a near-real-time Spark streaming pipeline, cutting data latency from hours to minutes.',
    },
    joinedDate: '2026-07-15',
  },
  {
    id: 'rohit-verma',
    name: 'Rohit Verma',
    role: 'Security Engineer Application Security',
    location: 'Pune, India',
    score: 90,
    skills: ['Application security', 'Penetration testing', 'Threat modeling'],
    badges: ['Cloud architect expert'],
    projectCount: 3,
    topProject: {
      title: 'Application security review program',
      description: 'Built a recurring threat-modeling and penetration-testing process that found and fixed 12 critical vulnerabilities pre-launch.',
    },
    joinedDate: '2026-04-02',
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
    joinedDate: '2026-07-19',
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

export interface InterviewEntry {
  id: string;
  candidateId: string;
  candidateName: string;
  role: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export const interviews: InterviewEntry[] = [
  { id: '1', candidateId: 'mayur-ramgir', candidateName: 'Mayur Ramgir', role: 'Java Architecture Backend Systems', date: '2026-07-25', time: '11:00 AM', status: 'scheduled' },
  { id: '2', candidateId: 'priya-nair', candidateName: 'Priya Nair', role: 'Frontend Engineer React', date: '2026-07-26', time: '3:30 PM', status: 'scheduled' },
  { id: '3', candidateId: 'arjun-mehta', candidateName: 'Arjun Mehta', role: 'DevOps Engineer Cloud Infrastructure', date: '2026-07-18', time: '10:00 AM', status: 'completed' },
  { id: '4', candidateId: 'rohit-verma', candidateName: 'Rohit Verma', role: 'Security Engineer Application Security', date: '2026-07-15', time: '2:00 PM', status: 'completed' },
  { id: '5', candidateId: 'sana-sheikh', candidateName: 'Sana Sheikh', role: 'Data Engineer Distributed Systems', date: '2026-07-20', time: '4:00 PM', status: 'cancelled' },
];

export interface MessageThread {
  id: string;
  candidateId: string;
  candidateName: string;
  role: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  messages: { fromRecruiter: boolean; text: string; time: string }[];
}

export const messageThreads: MessageThread[] = [
  {
    id: '1',
    candidateId: 'mayur-ramgir',
    candidateName: 'Mayur Ramgir',
    role: 'Java Architecture Backend Systems',
    lastMessage: 'Looking forward to the interview on the 25th!',
    timestamp: '10:42 AM',
    unread: true,
    messages: [
      { fromRecruiter: true, text: "Hi Mayur, we'd love to schedule an interview based on your Spring Boot project.", time: 'Yesterday' },
      { fromRecruiter: false, text: 'Sounds great, I am available this week.', time: 'Yesterday' },
      { fromRecruiter: false, text: 'Looking forward to the interview on the 25th!', time: '10:42 AM' },
    ],
  },
  {
    id: '2',
    candidateId: 'priya-nair',
    candidateName: 'Priya Nair',
    role: 'Frontend Engineer React',
    lastMessage: 'Sure, sending my portfolio link shortly.',
    timestamp: 'Yesterday',
    unread: true,
    messages: [
      { fromRecruiter: true, text: 'Could you share a couple more examples of your accessibility work?', time: '2 days ago' },
      { fromRecruiter: false, text: 'Sure, sending my portfolio link shortly.', time: 'Yesterday' },
    ],
  },
  {
    id: '3',
    candidateId: 'arjun-mehta',
    candidateName: 'Arjun Mehta',
    role: 'DevOps Engineer Cloud Infrastructure',
    lastMessage: 'Thanks for the update on the offer.',
    timestamp: '3 days ago',
    unread: false,
    messages: [
      { fromRecruiter: true, text: 'We are moving forward with an offer, details incoming.', time: '3 days ago' },
      { fromRecruiter: false, text: 'Thanks for the update on the offer.', time: '3 days ago' },
    ],
  },
];
