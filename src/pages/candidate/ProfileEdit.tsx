import { useState } from 'react';
import toast from 'react-hot-toast';
import { BriefcaseBusiness, CheckCircle2, Code2, Link2, MapPin, Sparkles } from 'lucide-react';
import { candidate, skills as initialSkills } from '../../data/candidateMock';

export default function ProfileEdit() {
  const [name, setName] = useState(candidate.name);
  const [role, setRole] = useState(candidate.role);
  const [location, setLocation] = useState(candidate.location);
  const [bio, setBio] = useState(candidate.bio);
  const [github, setGithub] = useState(candidate.github);
  const [linkedin, setLinkedin] = useState(candidate.linkedin);
  const [skillTags, setSkillTags] = useState(initialSkills.map((s) => s.name));
  const [skillInput, setSkillInput] = useState('');
  const completedFields = [name, role, location, bio, github, linkedin, skillTags.length > 0].filter(Boolean).length;
  const profileCompletion = Math.round((completedFields / 7) * 100);

  const addSkill = () => {
    const value = skillInput.trim();
    if (value && !skillTags.includes(value)) {
      setSkillTags((prev) => [...prev, value]);
    }
    setSkillInput('');
  };

  const removeSkill = (skill: string) => {
    setSkillTags((prev) => prev.filter((s) => s !== skill));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile saved (backend not connected yet)');
  };

  return (
    <div>
      <div className="dash-head">
        <div className="eyebrow">Profile</div>
        <h1>Edit your profile</h1>
        <p>This is what recruiters see on your public evidence page.</p>
      </div>

      <div className="profile-editor-layout">
      <form onSubmit={handleSubmit} className="card profile-form-card">
        <div className="profile-form-heading">
          <div><span>Public profile details</span><p>Keep this clear, specific, and easy to verify.</p></div>
          <div className="profile-completion">{profileCompletion}% complete</div>
        </div>
        <div className="field-row">
          <div className="field">
            <label htmlFor="name">Full name</label>
            <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="location">Location</label>
            <input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
        </div>

        <div className="field">
          <label htmlFor="role">Role / title</label>
          <input id="role" value={role} onChange={(e) => setRole(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="bio">Bio</label>
          <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="github">GitHub</label>
            <input id="github" value={github} onChange={(e) => setGithub(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="linkedin">LinkedIn</label>
            <input id="linkedin" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
          </div>
        </div>

        <div className="field">
          <label>Skills</label>
          <div className="tag-input-row">
            {skillTags.map((skill) => (
              <span className="tag" key={skill}>
                {skill}
                <button type="button" onClick={() => removeSkill(skill)} aria-label={`Remove ${skill}`}>
                  ×
                </button>
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addSkill();
                }
              }}
              placeholder="Add a skill and press Enter"
            />
            <button type="button" className="btn btn-ghost" onClick={addSkill}>
              Add
            </button>
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ marginTop: 8 }}>
          Save profile
        </button>
      </form>
      <aside className="profile-preview-column">
        <div className="profile-preview-card">
          <div className="profile-preview-top">
            <div className="profile-avatar-large">{name.charAt(0) || 'M'}</div>
            <div className="profile-ready"><CheckCircle2 size={14} /> Recruiter ready</div>
          </div>
          <h2>{name || 'Your name'}</h2>
          <p className="profile-preview-role"><BriefcaseBusiness size={15} /> {role || 'Your professional title'}</p>
          <p className="profile-preview-location"><MapPin size={15} /> {location || 'Add your location'}</p>
          <p className="profile-preview-bio">{bio || 'Add a short introduction so recruiters understand your strengths.'}</p>
          <div className="preview-skill-list">
            {skillTags.slice(0, 4).map((skill) => <span key={skill}>{skill}</span>)}
            {skillTags.length > 4 && <span>+{skillTags.length - 4}</span>}
          </div>
          <div className="preview-links">
            <span><Code2 size={15} /> GitHub</span><span><Link2 size={15} /> LinkedIn</span>
          </div>
        </div>
        <div className="profile-tips-card">
          <div className="profile-tips-icon"><Sparkles size={18} /></div>
          <div><h3>Make a stronger first impression</h3><p>Add evidence-rich skills and a concise bio so recruiters can understand your impact in seconds.</p></div>
        </div>
      </aside>
      </div>
    </div>
  );
}
