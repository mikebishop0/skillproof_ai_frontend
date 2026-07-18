import { useState } from 'react';
import toast from 'react-hot-toast';
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

      <form onSubmit={handleSubmit} className="card" style={{ maxWidth: 560 }}>
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
    </div>
  );
}
