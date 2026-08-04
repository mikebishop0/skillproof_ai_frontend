import { useState } from 'react';
import PublicLayout from '../../layouts/PublicLayout';
import { ChevronDown, ChevronUp, Search, HelpCircle, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqCategories = ['All', 'Candidate', 'Recruiter', 'Pricing & Billing'];

const faqs = [
  {
    category: 'Candidate',
    q: 'How does AI scoring work?',
    a: 'Our AI engine analyzes your submitted code repositories, architectural choices, and assessment answers against industry-standard rubrics. It evaluates technical accuracy, design patterns, and code clarity to generate an objective competency score.',
  },
  {
    category: 'Candidate',
    q: 'Is SkillProof AI free for candidates?',
    a: 'Yes, the Free Tier is free forever. It allows you to build a public profile, upload up to 3 projects, complete initial skill assessments, and earn public verified badges without entering a credit card.',
  },
  {
    category: 'Recruiter',
    q: 'How can recruiters verify candidate badges?',
    a: 'Every badge issued by SkillProof AI includes a cryptographic link to the candidate’s public profile. Recruiters can inspect the actual evidence, including AI project code reviews, test scores, and architectural diagrams.',
  },
  {
    category: 'Candidate',
    q: 'What kind of assessments are available?',
    a: 'We currently offer comprehensive assessments across AI Engineering, Frontend/Backend Software Development, Cloud Architecture (AWS/Azure), DevOps, and Cybersecurity.',
  },
  {
    category: 'Pricing & Billing',
    q: 'What are the limits on the Premium and Enterprise plans?',
    a: 'The Premium tier ($9/month) unlocks unlimited project reviews, AI interview preparation, and resume optimization. The Enterprise tier ($299/month) provides team dashboards, skill gap analysis, and candidate search filters for hiring managers.',
  },
  {
    category: 'Recruiter',
    q: 'Is recruiter access completely free for candidate search?',
    a: 'Yes! Recruiters can search, view candidate profiles, and review verified AI reports for free. Enterprise subscription is only required for team-level features like employee skill mapping.',
  },
  {
    category: 'Candidate',
    q: 'Can I upload private or commercial projects for AI evaluation?',
    a: 'Yes. Our AI evaluation engine runs code analysis in isolated, secure sandboxes. Your proprietary code is never shared, published publicly, or used to train public LLM models.',
  },
  {
    category: 'Candidate',
    q: 'How does SkillProof AI prevent cheating or plagiarized code?',
    a: 'We use multi-modal AST (Abstract Syntax Tree) analysis and similarity detection to verify code originality. Timed assessments also include proctoring signals to maintain evaluation integrity.',
  },
  {
    category: 'Recruiter',
    q: 'How can companies integrate SkillProof AI into their existing ATS?',
    a: 'Enterprise accounts gain access to our REST API and webhooks, allowing seamless export of candidate skill scores and report links into platforms like Greenhouse, Lever, and Workday.',
  },
  {
    category: 'Candidate',
    q: 'Can I retake an assessment if I am not satisfied with my score?',
    a: 'Yes! Candidates can retake assessments after a 7-day cool-down period. Your profile will always showcase your highest verified score.',
  },
  {
    category: 'Pricing & Billing',
    q: 'What payment methods are supported for subscriptions?',
    a: 'We accept all major credit cards (Visa, MasterCard, American Express) via Stripe. Annual subscriptions receive a 15% discount.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setOpenIndex(0);
  };

  const filteredFaqs = faqs.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <PublicLayout>
      <div className="public-card-container">
        <div className="public-page-head">
          <div className="public-page-eyebrow">
            <HelpCircle size={14} /> FREQUENTLY ASKED QUESTIONS
          </div>
          <h1>About SkillProof AI, Answered</h1>
          <p>
            Have a question about how our AI evaluation engine works or how to share your badges? Find clear answers below.
          </p>
        </div>

        {/* Search Bar */}
        <div className="public-search-bar">
          <Search className="public-search-icon" size={18} />
          <input 
            type="text" 
            placeholder="Search questions (e.g. scoring, badges, recruiter)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Tabs */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '36px' }}>
          {faqCategories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategorySelect(cat)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: isSelected ? 600 : 500,
                  border: '1px solid',
                  borderColor: isSelected ? '#0f172a' : '#cbd5e1',
                  background: isSelected ? '#0f172a' : '#f8fafc',
                  color: isSelected ? '#ffffff' : '#475569',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 2px 8px rgba(15, 23, 42, 0.15)' : 'none',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Accordion List */}
        <div className="faq-accordion">
          {filteredFaqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={item.q} 
                className={`faq-accordion-item ${isOpen ? 'open' : ''}`}
              >
                <button 
                  type="button"
                  className="faq-accordion-header"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="faq-question">{item.q}</span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="faq-icon" size={20} />
                  ) : (
                    <ChevronDown className="faq-icon" size={20} />
                  )}
                </button>
                {isOpen && (
                  <div className="faq-accordion-body">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 16px', color: '#64748b' }}>
              No questions found matching your search.
            </div>
          )}
        </div>

        <div 
          style={{ 
            marginTop: '56px', 
            background: 'linear-gradient(135deg, rgba(0,88,190,0.06) 0%, rgba(0,63,138,0.02) 100%)', 
            borderRadius: '16px', 
            padding: '32px', 
            textAlign: 'center',
            border: '1px solid rgba(0,88,190,0.15)'
          }}
        >
          <h3 style={{ fontSize: '20px', marginTop: 0, marginBottom: '8px' }}>Have more questions?</h3>
          <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>
            We're here to help you get the most out of SkillProof AI.
          </p>
          <Link to="/contact" className="public-btn-primary">
            <MessageSquare size={16} /> Contact Support
          </Link>
        </div>
      </div>
    </PublicLayout>
  );
}
