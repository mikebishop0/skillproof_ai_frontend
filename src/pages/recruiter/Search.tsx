import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Star } from 'lucide-react';
import { allBadges, allSkills, candidatePool } from '../../data/recruiterMock';
import { useShortlistStore } from '../../store/shortlistStore';

export default function Search() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [skill, setSkill] = useState('');
  const [badge, setBadge] = useState('');
  const [minScore, setMinScore] = useState(0);

  const toggle = useShortlistStore((state) => state.toggle);
  const isShortlisted = useShortlistStore((state) => state.isShortlisted);

  const results = useMemo(() => {
    return candidatePool.filter((candidate) => {
      const matchesQuery =
        !query ||
        candidate.name.toLowerCase().includes(query.toLowerCase()) ||
        candidate.role.toLowerCase().includes(query.toLowerCase()) ||
        candidate.skills.some((s) => s.toLowerCase().includes(query.toLowerCase()));
      const matchesSkill = !skill || candidate.skills.includes(skill);
      const matchesBadge = !badge || candidate.badges.includes(badge);
      const matchesScore = candidate.score >= minScore;
      return matchesQuery && matchesSkill && matchesBadge && matchesScore;
    });
  }, [query, skill, badge, minScore]);

  return (
    <div>
      <div className="dash-head">
        <div className="eyebrow">Search</div>
        <h1>Candidate search</h1>
        <p>Filter by skill, score range, and badge type.</p>
      </div>

      <div className="card" style={{ marginBottom: 24 }}>
        <div className="field-row" style={{ gridTemplateColumns: '1.4fr 1fr 1fr', marginBottom: 0 }}>
          <div className="field">
            <label htmlFor="query">Keyword</label>
            <input
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Name, role, or skill"
            />
          </div>
          <div className="field">
            <label htmlFor="skill">Skill</label>
            <select id="skill" value={skill} onChange={(e) => setSkill(e.target.value)}>
              <option value="">Any skill</option>
              {allSkills.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="badge">Badge</label>
            <select id="badge" value={badge} onChange={(e) => setBadge(e.target.value)}>
              <option value="">Any badge</option>
              {allBadges.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="field" style={{ marginBottom: 0, marginTop: 4 }}>
          <label htmlFor="minScore">Minimum AI score: {minScore}%</label>
          <input
            id="minScore"
            type="range"
            min={0}
            max={100}
            step={5}
            value={minScore}
            onChange={(e) => setMinScore(Number(e.target.value))}
            style={{ padding: 0, background: 'none' }}
          />
        </div>
      </div>

      <p style={{ color: 'var(--spai-slate)', fontSize: 13, marginBottom: 14 }}>
        {results.length} candidate{results.length === 1 ? '' : 's'} found
      </p>

      <div className="grid-2">
        {results.map((candidate) => (
          <div key={candidate.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div>
                <h3 style={{ fontSize: 15 }}>{candidate.name}</h3>
                <p style={{ color: 'var(--spai-slate)', fontSize: 12.5, marginTop: 2 }}>{candidate.role}</p>
              </div>
              <span
                className="mono"
                style={{
                  fontSize: 12,
                  color: 'var(--spai-verified)',
                  background: 'rgba(0,88,190,0.12)',
                  padding: '3px 9px',
                  borderRadius: 12,
                  whiteSpace: 'nowrap',
                }}
              >
                {candidate.score}%
              </span>
            </div>
            <p style={{ color: 'var(--spai-slate)', fontSize: 12.5, marginBottom: 10 }}>{candidate.location}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
              {candidate.skills.slice(0, 3).map((s) => (
                <span className="tag" key={s}>{s}</span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Link to={`/recruiter/candidate/${candidate.id}`} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                View profile
              </Link>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => toggle(candidate.id)}
                style={isShortlisted(candidate.id) ? { color: 'var(--spai-verified)', borderColor: 'rgba(0,88,190,0.35)' } : undefined}
              >
                <Star size={14} fill={isShortlisted(candidate.id) ? 'currentColor' : 'none'} />
                {isShortlisted(candidate.id) ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>
        ))}
        {results.length === 0 && (
          <p style={{ color: 'var(--spai-slate)', fontSize: 14 }}>No candidates match these filters.</p>
        )}
      </div>
    </div>
  );
}
