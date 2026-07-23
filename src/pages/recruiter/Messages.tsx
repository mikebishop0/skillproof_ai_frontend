import { useState } from 'react';
import toast from 'react-hot-toast';
import { Send } from 'lucide-react';
import { messageThreads } from '../../data/recruiterMock';

export default function Messages() {
  const [activeId, setActiveId] = useState(messageThreads[0]?.id ?? '');
  const [draft, setDraft] = useState('');
  const active = messageThreads.find((t) => t.id === activeId);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    toast.success('Message sent (mock, not persisted)');
    setDraft('');
  };

  return (
    <div>
      <div className="dash-head">
        <div className="eyebrow">Messages</div>
        <h1>Messages</h1>
        <p>Conversations with candidates in your pipeline.</p>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', minHeight: 420 }}>
          <div style={{ borderRight: '1px solid var(--spai-line)' }}>
            {messageThreads.map((thread) => (
              <button
                key={thread.id}
                type="button"
                onClick={() => setActiveId(thread.id)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '14px 16px',
                  border: 'none',
                  borderBottom: '1px solid var(--spai-line)',
                  background: activeId === thread.id ? 'var(--spai-ink-lighter)' : 'transparent',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: 13.5, fontWeight: thread.unread ? 700 : 500, color: 'var(--spai-white)' }}>
                    {thread.candidateName}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--spai-slate)' }}>{thread.timestamp}</span>
                </div>
                <div
                  style={{
                    fontSize: 12.5,
                    color: 'var(--spai-slate)',
                    marginTop: 4,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {thread.lastMessage}
                </div>
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {active ? (
              <>
                <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--spai-line)' }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{active.candidateName}</div>
                  <div style={{ fontSize: 12, color: 'var(--spai-slate)' }}>{active.role}</div>
                </div>
                <div style={{ flex: 1, padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {active.messages.map((message, index) => (
                    <div
                      key={index}
                      style={{
                        alignSelf: message.fromRecruiter ? 'flex-end' : 'flex-start',
                        maxWidth: '70%',
                        background: message.fromRecruiter ? 'var(--spai-verified)' : 'var(--spai-ink-lighter)',
                        color: message.fromRecruiter ? '#ffffff' : 'var(--spai-white)',
                        padding: '10px 14px',
                        borderRadius: 12,
                        fontSize: 13.5,
                      }}
                    >
                      {message.text}
                      <div style={{ fontSize: 10.5, opacity: 0.7, marginTop: 4 }}>{message.time}</div>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSend} style={{ display: 'flex', gap: 8, padding: '14px 20px', borderTop: '1px solid var(--spai-line)' }}>
                  <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="Type a message..."
                    style={{
                      flex: 1,
                      background: 'var(--spai-ink-lighter)',
                      border: '1px solid var(--spai-line)',
                      borderRadius: 8,
                      padding: '10px 14px',
                      color: 'var(--spai-white)',
                      fontSize: 13.5,
                    }}
                  />
                  <button type="submit" className="btn btn-primary">
                    <Send size={14} />
                  </button>
                </form>
              </>
            ) : (
              <p style={{ padding: 20, color: 'var(--spai-slate)', fontSize: 14 }}>Select a conversation.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
