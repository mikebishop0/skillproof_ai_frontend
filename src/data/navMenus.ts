export interface NavLinkItem {
  title: string;
  description?: string;
  to: string;
}

export interface NavMenuColumn {
  heading: string;
  links: NavLinkItem[];
  footer?: NavLinkItem;
}

export interface NavPromoCard {
  kicker: string;
  title: string;
  description: string;
  links: NavLinkItem[];
}

export interface NavMenuConfig {
  label: string;
  columns: [NavMenuColumn, NavMenuColumn];
  promo: NavPromoCard;
}

export const navMenus: NavMenuConfig[] = [
  {
    label: 'Platform',
    columns: [
      {
        heading: 'For Candidates',
        links: [
          { title: 'Build Your Profile', description: 'Showcase real projects and portfolios', to: '/register' },
          { title: 'Take Assessments', description: 'Prove your skills with AI-reviewed tests', to: '/register' },
          { title: 'Earn Verified Badges', description: 'Get AI-verified skill badges', to: '/register' },
          { title: 'Public Profile', description: 'Share your evidence-based profile', to: '/register' },
        ],
        footer: { title: 'All features', to: '/register' },
      },
      {
        heading: 'For Recruiters',
        links: [
          { title: 'Search Candidates', to: '/recruiter/search' },
          { title: 'View AI Reports', to: '/recruiter/search' },
          { title: 'Skill Verification', to: '/recruiter/search' },
          { title: 'Team Analytics', to: '/recruiter/search' },
        ],
      },
    ],
    promo: {
      kicker: 'Meet your new',
      title: 'AI Evaluator',
      description: 'The AI reviewer built to verify every skill claim',
      links: [
        { title: 'How SkillProof compares', to: '/pricing' },
        { title: 'Badges & certifications', to: '/pricing' },
        { title: 'Pricing plans', to: '/pricing' },
      ],
    },
  },
  {
    label: 'Solutions',
    columns: [
      {
        heading: 'By Audience',
        links: [
          { title: 'Students', description: 'Build proof before you graduate', to: '/register' },
          { title: 'Professionals', description: 'Showcase real workplace impact', to: '/register' },
          { title: 'Freelancers', description: 'Win clients with verified evidence', to: '/register' },
          { title: 'Job Seekers', description: 'Stand out with AI-backed proof', to: '/register' },
        ],
      },
      {
        heading: 'Use Cases',
        links: [
          { title: 'Portfolio Building', to: '/register' },
          { title: 'Interview Preparation', to: '/register' },
          { title: 'Career Switching', to: '/register' },
          { title: 'Skill Certification', to: '/register' },
        ],
      },
    ],
    promo: {
      kicker: 'Meet your new',
      title: 'Career Coach',
      description: 'AI-powered coaching to help you land your next role',
      links: [
        { title: 'Premium features', to: '/pricing' },
        { title: 'Resume optimization', to: '/pricing' },
        { title: 'Interview prep', to: '/pricing' },
      ],
    },
  },
  {
    label: 'For Recruiters',
    columns: [
      {
        heading: 'Hiring Tools',
        links: [
          { title: 'Search Candidates', description: 'Filter by verified skills and badges', to: '/recruiter/search' },
          { title: 'AI Competency Reports', description: 'Deep-dive into every skill score', to: '/recruiter/search' },
          { title: 'Skill Verification', description: 'Confirm real evidence, not just claims', to: '/recruiter/search' },
          { title: 'Candidate Comparison', description: 'Compare shortlisted candidates side by side', to: '/recruiter/search' },
        ],
      },
      {
        heading: 'For Teams',
        links: [
          { title: 'Team Dashboards', to: '/admin/analytics' },
          { title: 'Skills Gap Analysis', to: '/admin/analytics' },
          { title: 'Employee Skills Mapping', to: '/admin/analytics' },
          { title: 'Workforce Analytics', to: '/admin/analytics' },
        ],
      },
    ],
    promo: {
      kicker: 'Meet',
      title: 'Enterprise',
      description: 'Employee skills mapping and team-wide dashboards',
      links: [
        { title: 'Enterprise pricing', to: '/pricing' },
        { title: 'Team dashboards', to: '/pricing' },
        { title: 'Talk to sales', to: '/pricing' },
      ],
    },
  },
  {
    label: 'Resources',
    columns: [
      {
        heading: 'Learn',
        links: [
          { title: 'Skill Verification Guide', description: 'How AI evaluates your evidence', to: '/pricing' },
          { title: 'Badge Directory', description: 'Every verified badge we offer', to: '/pricing' },
          { title: 'Success Stories', description: 'Candidates hired through SkillProof', to: '/pricing' },
          { title: 'Blog', description: 'Hiring and skills insights', to: '/pricing' },
        ],
      },
      {
        heading: 'Developers',
        links: [
          { title: 'API Documentation', to: '/pricing' },
          { title: 'Integration Guide', to: '/pricing' },
          { title: 'Support Center', to: '/pricing' },
          { title: 'Status Page', to: '/pricing' },
        ],
      },
    ],
    promo: {
      kicker: 'Meet your new',
      title: 'Support Team',
      description: 'Get help setting up your evidence-based profile',
      links: [
        { title: 'Contact support', to: '/pricing' },
        { title: 'Community forum', to: '/pricing' },
        { title: 'FAQs', to: '/pricing' },
      ],
    },
  },
];
