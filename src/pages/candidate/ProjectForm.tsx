import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { profileApi } from '../../services/profileApi';
import { storageApi } from '../../services/storageApi';

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [github, setGithub] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (!id) return;
    const fetchProject = async () => {
      try {
        const res = await profileApi.getProject(id);
        const p = res.data;
        setTitle(p.title ?? '');
        setDescription(p.description ?? '');
        setGithub(p.github_url ?? '');
        setTags(p.technologies?.map((t) => t.name) ?? []);
      } catch (err) {
        console.error('Failed to fetch project:', err);
        toast.error('Failed to load project details');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dto = {
        title,
        description,
        summary: description.slice(0, 150),
        github_url: github,
        category: 'WEB_DEVELOPMENT' as const,
        status: 'IN_PROGRESS' as const,
      };

      let projectId = id;
      if (isEdit && id) {
        await profileApi.updateProject(id, dto);
        toast.success('Project updated successfully');
      } else {
        const res = await profileApi.createProject(dto);
        projectId = res.data.id;
        toast.success('Project submitted for AI review');
      }

      if (files.length > 0 && projectId) {
        const uploadPromises = files.map((file) =>
          storageApi.uploadFile(file, 'PROJECT', projectId, 'PUBLIC')
        );
        await Promise.all(uploadPromises);
        toast.success('Files uploaded successfully');
      }

      navigate('/dashboard/projects');
    } catch (err) {
      console.error('Failed to save project:', err);
      toast.error('Failed to save project. Please try again.');
    }
  };

  if (loading) {
    return <div style={{ padding: 24, textAlign: 'center', color: 'var(--spai-slate)' }}>Loading project...</div>;
  }

  return (
    <div>
      <div className="dash-head">
        <div className="eyebrow">Portfolio</div>
        <h1>{isEdit ? 'Edit project' : 'Add a project'}</h1>
        <p>Upload real evidence our AI reviews complexity, code quality, and technical depth.</p>
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
          <input
            type="file"
            multiple
            onChange={(e) => {
              if (e.target.files) {
                setFiles(Array.from(e.target.files));
              }
            }}
          />
          <div className="field-hint">PDF, PNG, or JPG up to 10MB each.</div>
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
