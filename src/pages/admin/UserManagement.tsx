import { useState } from 'react';
import toast from 'react-hot-toast';
import { platformUsers, type PlatformUser } from '../../data/adminMock';

export default function UserManagement() {
  const [users, setUsers] = useState(platformUsers);

  const toggleSuspend = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u)),
    );
  };

  const changeRole = (id: string, role: PlatformUser['role']) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
    toast.success('Role updated');
  };

  return (
    <div>
      <div className="dash-head">
        <div className="eyebrow">Users</div>
        <h1>User management</h1>
        <p>View accounts, manage roles, and suspend access when needed.</p>
      </div>

      <div className="card">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1.6fr 1fr 1fr 1fr',
            gap: 8,
            fontSize: 12,
            color: 'var(--spai-slate)',
            paddingBottom: 8,
            borderBottom: '1px solid var(--spai-line)',
          }}
        >
          <span>Name</span>
          <span>Email</span>
          <span>Role</span>
          <span>Status</span>
          <span></span>
        </div>
        {users.map((user) => (
          <div
            key={user.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '1.4fr 1.6fr 1fr 1fr 1fr',
              gap: 8,
              alignItems: 'center',
              padding: '12px 0',
              borderBottom: '1px solid var(--spai-line)',
              fontSize: 13.5,
            }}
          >
            <span>{user.name}</span>
            <span style={{ color: 'var(--spai-slate)' }}>{user.email}</span>
            <select
              value={user.role}
              onChange={(e) => changeRole(user.id, e.target.value as PlatformUser['role'])}
              style={{
                background: 'var(--spai-ink-lighter)',
                border: '1px solid var(--spai-line)',
                borderRadius: 6,
                padding: '6px 8px',
                color: 'var(--spai-white)',
                fontSize: 12.5,
              }}
            >
              <option value="candidate">Candidate</option>
              <option value="recruiter">Recruiter</option>
              <option value="admin">Admin</option>
            </select>
            <span
              className="mono"
              style={{
                fontSize: 11.5,
                textTransform: 'uppercase',
                color: user.status === 'active' ? 'var(--spai-verified)' : 'var(--spai-danger)',
              }}
            >
              {user.status}
            </span>
            <button type="button" className="btn btn-ghost" onClick={() => toggleSuspend(user.id)}>
              {user.status === 'active' ? 'Suspend' : 'Reactivate'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
