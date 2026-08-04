import { useState } from 'react';
import PublicLayout from '../../layouts/PublicLayout';
import { BookOpen, Sparkles } from 'lucide-react';

const categories = ['All', 'AI Trends', 'Skill Verification', 'Hiring Insights', 'Engineering'];

export default function BlogPage() {
  const [selectedCat, setSelectedCat] = useState('All');

  return (
    <PublicLayout>
      <div className="public-card-container">
        <div className="public-page-head">
          <div className="public-page-eyebrow">
            <BookOpen size={14} /> SkillProof AI Blog
          </div>
          <h1>Insights on AI, Hiring, and Skill Verification</h1>
          <p>
            Explore articles written by our engineering team, AI researchers, and hiring experts on the future of work and talent credentials.
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
          {categories.map((cat) => {
            const isSelected = selectedCat === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCat(cat)}
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

        {/* Coming Soon Section */}
        <div 
          style={{ 
            textAlign: 'center', 
            maxWidth: '640px', 
            margin: '0 auto 32px',
            background: '#f8fafc',
            padding: '48px 32px',
            borderRadius: '16px',
            border: '1px solid #e2e8f0'
          }}
        >
          <div className="public-icon-badge" style={{ margin: '0 auto 20px' }}>
            <Sparkles size={24} />
          </div>
          <h2 style={{ fontSize: '26px', color: 'var(--spai-claim)', marginTop: 0, marginBottom: '12px' }}>
            Our Blog is Coming Soon
          </h2>
          <p style={{ color: '#64748b', fontSize: '16px', lineHeight: '1.7', margin: 0 }}>
            We are working on bringing you in-depth research, tech benchmarks, and hiring insights. Stay tuned for expert articles and platform updates!
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
