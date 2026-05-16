import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { User } from '../../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const { login } = useAuth();
  const navigate  = useNavigate();
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [k]: e.target.value });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const { name, email, phone, password, confirm } = form;
    if (!name || !email || !phone || !password || !confirm) { alert('Please fill all fields.'); return; }
    if (password !== confirm) { alert('Passwords do not match.'); return; }

    const user: User = {
      name,
      email,
      phone,
      location: 'Not specified',
      avatar:   `https://i.pravatar.cc/150?u=${email}`,
      joined:   new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
    };
    login(user);
    navigate('/dashboard');
  }

  const inputCls = 'w-full px-4 py-2.5 rounded-xl text-sm border transition-all duration-300 box-border';
  const labelCls = 'block font-semibold text-sm mb-1.5 text-[var(--text-secondary)]';

  return (
    <section className="px-9 py-10 min-h-[calc(100vh-160px)] flex items-center justify-center max-sm:px-4">
      <div className="w-full max-w-md bg-[var(--bg-card)] border border-[var(--border-muted)]
                      rounded-2xl px-10 py-9 shadow-lg max-sm:px-5 max-sm:py-6">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🐾</div>
          <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">Create Account</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Join our community and give a pet a loving home.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: 'Full Name',        key: 'name',     type: 'text',     ph: 'John Smith'               },
            { label: 'Email Address',    key: 'email',    type: 'email',    ph: 'you@example.com'          },
            { label: 'Phone Number',     key: 'phone',    type: 'tel',      ph: '+1 234 567 8900'          },
            { label: 'Password',         key: 'password', type: 'password', ph: 'Create a strong password' },
            { label: 'Confirm Password', key: 'confirm',  type: 'password', ph: 'Repeat your password'     },
          ].map(f => (
            <div key={f.key}>
              <label className={labelCls}>{f.label}</label>
              <input type={f.type} placeholder={f.ph}
                value={form[f.key as keyof typeof form]}
                onChange={set(f.key as keyof typeof form)}
                className={inputCls} />
            </div>
          ))}
          <button type="submit"
            className="w-full py-3 bg-brand-primary text-white font-bold rounded-xl
                       border-none cursor-pointer transition-all duration-300
                       hover:bg-brand-secondary hover:-translate-y-0.5 hover:shadow-md">
            Create Account
          </button>
        </form>

        <p className="text-sm text-center mt-5 text-[var(--text-secondary)]">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-brand-primary hover:text-brand-accent transition-colors duration-300">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
