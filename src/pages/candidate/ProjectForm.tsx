import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { projects } from '../../data/candidateMock';

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const existing = id ? projects.find((p) => p.id === id) : undefined;
  const isEdit = Boolean(existing);

  const [title, setTitle] = useState(existing?.title ?? '');
  const [description, setDescription] = useState(existing?.description ?? '');
  const [github, setGithub] = useState(existing?.github ?? '');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState(existing?.tags ?? []);

  const addTag = () => {
    const value = tagInput.trim();
    if (value && !tags.includes(value)) {
      setTags((prev) => [...prev, value]);
    }
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(
      isEdit ? 'Project updated (backend not connected yet)' : 'Project submitted for AI review (backend not connected yet)',
    );
    navigate('/dashboard/projects');
  };

  return (
    <div>
      <div className="dash-head">
        <div className="eyebrow">Portfolio</div>
        <h1>{isEdit ? 'Edit project' : 'Add a project'}</h1>
        <p>Upload real evidence — our AI reviews complexity, code quality, and technical depth.</p>
      </div>

      <form onSubmit={handleSubmit} className="card" style={{ maxWidth: 560 }}>
        <div className="field">
          <label htmlFor="title">Project title</label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Spring Boot microservices platform"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What did you build, and what problem does it solve?"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="github">GitHub link</label>
          <input
            id="github"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            placeholder="github.com/you/project"
          />
        </div>

        <div className="field">
          <label>Architecture diagrams / certificates</label>
          <input type="file" multiple />
          <div className="field-hint">PDF, PNG, or JPG — up to 10MB each.</div>
        </div>

        <div className="field">
          <label>Tags</label>
          <div className="tag-input-row">
            {tags.map((tag) => (
              <span className="tag" key={tag}>
                {tag}
                <button type="button" onClick={() => removeTag(tag)} aria-label={`Remove ${tag}`}>
                  ×
                </button>
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag();
                }
              }}
              placeholder="e.g. Spring Boot, and press Enter"
            />
            <button type="button" className="btn btn-ghost" onClick={addTag}>
              Add
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
          <button type="submit" className="btn btn-primary">
            {isEdit ? 'Save changes' : 'Submit for AI review'}
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => navigate('/dashboard/projects')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
