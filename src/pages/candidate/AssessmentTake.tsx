import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { assessments } from '../../data/candidateMock';

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export default function AssessmentTake() {
  const { id } = useParams();
  const navigate = useNavigate();
  const assessment = assessments.find((a) => a.id === id);

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [secondsLeft, setSecondsLeft] = useState((assessment?.durationMinutes ?? 20) * 60);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsLeft]);

  if (!assessment) {
    return <div className="card"><h1>Assessment not found</h1></div>;
  }

  const question = assessment.questions[index];
  const isLast = index === assessment.questions.length - 1;

  const setAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  };

  const handleSubmit = () => {
    toast.success('Assessment submitted for AI review (backend not connected yet)');
    navigate(`/dashboard/assessments/${assessment.id}/result`);
  };

  return (
    <div>
      <div
        className="dash-head"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
      >
        <div>
          <div className="eyebrow">Assessment</div>
          <h1>{assessment.name}</h1>
        </div>
        <div
          className="mono"
          style={{
            padding: '8px 14px',
            borderRadius: 8,
            border: '1px solid var(--spai-line)',
            color: secondsLeft < 60 ? 'var(--spai-danger)' : 'var(--spai-white)',
          }}
        >
          {formatTime(secondsLeft)}
        </div>
      </div>

      <div className="bar-track" style={{ marginBottom: 24 }}>
        <div
          className="bar-fill"
          style={{ width: `${((index + 1) / assessment.questions.length) * 100}%` }}
        />
      </div>

      <div className="card">
        <p className="mono" style={{ fontSize: 12, color: 'var(--spai-slate)', marginBottom: 12 }}>
          Question {index + 1} of {assessment.questions.length}
        </p>
        <h2 style={{ fontSize: 18, marginBottom: 20 }}>{question.prompt}</h2>

        {question.type === 'mcq' && question.options && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {question.options.map((option) => (
              <label
                key={option}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px 14px',
                  borderRadius: 8,
                  border:
                    answers[question.id] === option
                      ? '1px solid var(--spai-verified)'
                      : '1px solid var(--spai-line)',
                  background: answers[question.id] === option ? 'rgba(0,88,190,0.06)' : 'transparent',
                  cursor: 'pointer',
                  fontSize: 14,
                }}
              >
                <input
                  type="radio"
                  name={question.id}
                  checked={answers[question.id] === option}
                  onChange={() => setAnswer(option)}
                />
                {option}
              </label>
            ))}
          </div>
        )}

        {question.type === 'coding' && (
          <textarea
            value={answers[question.id] ?? ''}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="// Write your solution here"
            style={{
              width: '100%',
              minHeight: 220,
              background: 'var(--spai-ink-lighter)',
              border: '1px solid var(--spai-line)',
              borderRadius: 8,
              padding: 14,
              color: 'var(--spai-white)',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 13.5,
              resize: 'vertical',
            }}
          />
        )}

        {question.type === 'scenario' && (
          <textarea
            value={answers[question.id] ?? ''}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Describe your approach..."
            style={{
              width: '100%',
              minHeight: 160,
              background: 'var(--spai-ink-lighter)',
              border: '1px solid var(--spai-line)',
              borderRadius: 8,
              padding: 14,
              color: 'var(--spai-white)',
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              resize: 'vertical',
            }}
          />
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
          <button
            type="button"
            className="btn btn-ghost"
            disabled={index === 0}
            onClick={() => setIndex((prev) => prev - 1)}
          >
            Previous
          </button>
          {isLast ? (
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              Submit assessment
            </button>
          ) : (
            <button type="button" className="btn btn-primary" onClick={() => setIndex((prev) => prev + 1)}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
