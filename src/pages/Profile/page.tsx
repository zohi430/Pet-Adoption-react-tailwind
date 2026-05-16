import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Profile() {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name:     user?.name     ?? '',
    email:    user?.email    ?? '',
    phone:    user?.phone    ?? '',
    location: user?.location ?? '',
  });

  /* ── Not logged in ─────────────────────────────────── */
  if (!user) {
    return (
      <section className="px-9 py-20 text-center min-h-[calc(100vh-160px)]">
        <div className="text-6xl mb-4">👤</div>
        <h2 className="text-2xl font-bold text-primary mb-2">Not Logged In</h2>
        <p className="text-secondary mb-6">Please login to view your profile.</p>
        <Link to="/login"
          className="inline-block px-6 py-3 bg-brand-primary text-white font-bold rounded-[6px]
                     no-underline hover:bg-brand-secondary transition-all duration-300">
          Login
        </Link>
      </section>
    );
  }

  function saveProfile() {
    login({ ...user!, ...form });
    setEditing(false);
  }

  function handleLogout() {
    logout();
    navigate('/login');
  }

  const inputCls =
    'w-full px-3 py-2 rounded-[6px] text-sm border transition-all duration-300 box-border';
  const labelCls =
    'block text-xs font-semibold uppercase tracking-wide text-muted mb-1';

  /* ── Profile view ──────────────────────────────────── */
  return (
    <section className="px-9 py-10 min-h-[calc(100vh-160px)] max-sm:px-4 max-sm:py-6">
      <h1 className="text-4xl max-sm:text-3xl font-extrabold mb-8 text-brand-primary">
        My Profile
      </h1>

      <div className="max-w-2xl mx-auto">

        {/* Profile card */}
        <div className="bg-card border border-border-token rounded-[10px]
                        overflow-hidden shadow-lg mb-6">

          {/* Cover banner */}
          <div className="h-28 bg-gradient-to-r from-brand-primary to-brand-third" />

          {/* Avatar + name row */}
          <div className="px-8 pb-6">
            <div className="flex items-end gap-4 -mt-12 mb-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover
                           border-4 border-card shadow-md"
              />
              <div className="mb-2">
                <h2 className="text-xl font-extrabold text-primary">{user.name}</h2>
                <p className="text-sm text-secondary">Member since {user.joined}</p>
              </div>
            </div>

            {/* Edit form */}
            {editing ? (
              <div className="space-y-4">
                {[
                  { label: 'Full Name', key: 'name',     type: 'text'  },
                  { label: 'Email',     key: 'email',    type: 'email' },
                  { label: 'Phone',     key: 'phone',    type: 'tel'   },
                  { label: 'Location',  key: 'location', type: 'text'  },
                ].map(f => (
                  <div key={f.key}>
                    <label className={labelCls}>{f.label}</label>
                    <input
                      type={f.type}
                      value={form[f.key as keyof typeof form]}
                      onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      className={inputCls}
                    />
                  </div>
                ))}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={saveProfile}
                    className="flex-1 py-2.5 bg-brand-primary text-white font-bold rounded-[6px]
                               border-none cursor-pointer hover:bg-brand-secondary
                               transition-all duration-300"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="flex-1 py-2.5 bg-transparent border-2 border-border-token
                               text-secondary font-bold rounded-[6px] cursor-pointer
                               hover:border-brand-primary hover:text-brand-primary
                               transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Details grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {[
                    { icon: '✉️', label: 'Email',    value: user.email    },
                    { icon: '📞', label: 'Phone',    value: user.phone    },
                    { icon: '📍', label: 'Location', value: user.location },
                    { icon: '📅', label: 'Joined',   value: user.joined   },
                  ].map(d => (
                    <div key={d.label}
                      className="bg-main rounded-[6px] p-4 border border-border-token">
                      <p className={labelCls}>{d.icon} {d.label}</p>
                      <p className="text-sm font-semibold text-primary truncate">{d.value}</p>
                    </div>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setForm({ name: user.name, email: user.email, phone: user.phone, location: user.location });
                      setEditing(true);
                    }}
                    className="flex-1 py-2.5 bg-brand-primary text-white font-bold rounded-[6px]
                               border-none cursor-pointer hover:bg-brand-secondary
                               transition-all duration-300"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 py-2.5 bg-transparent border-2 border-brand-accent
                               text-brand-accent font-bold rounded-[6px] cursor-pointer
                               hover:bg-brand-accent hover:text-white transition-all duration-300"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { to: '/dashboard', icon: '📊', label: 'My Dashboard'   },
            { to: '/adopt',     icon: '🐾', label: 'Apply to Adopt' },
            { to: '/reviews',   icon: '⭐', label: 'My Reviews'     },
            { to: '/cart',      icon: '🛒', label: 'Adoption Cart'  },
          ].map(l => (
            <Link
              key={l.to}
              to={l.to}
              className="flex items-center gap-3 bg-card border border-border-token
                         rounded-[10px] p-4 no-underline
                         hover:border-brand-primary hover:shadow-md
                         transition-all duration-300 group"
            >
              <span className="text-2xl">{l.icon}</span>
              <span className="text-sm font-semibold text-primary
                               group-hover:text-brand-primary transition-colors duration-200">
                {l.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
