import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { User } from '../../context/AuthContext';
import FormField from '../../components/ui/FormField';

export default function Login() {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate  = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || !password) { alert('Please fill all login fields.'); return; }

    const user: User = {
      name:     email.split('@')[0].replace(/[._]/g, ' ')
                     .replace(/\b\w/g, c => c.toUpperCase()),
      email,
      phone:    '+1 (555) 000-0000',
      location: 'New York, USA',
      avatar:   `https://i.pravatar.cc/150?u=${encodeURIComponent(email)}`,
      joined:   new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
    };
    login(user);
    navigate('/dashboard');
  }

  return (
    <section className="px-9 py-10 min-h-[calc(100vh-160px)] max-sm:px-4 max-sm:py-6">
      <div className="max-w-lg mx-auto my-10 rounded-[10px] px-10 py-9
                      bg-card border border-border-token shadow-lg
                      max-sm:px-5 max-sm:py-6 max-sm:mx-4 max-sm:my-5">

        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🐾</div>
          <h2 className="text-2xl font-bold text-primary">Welcome Back</h2>
          <p className="text-sm leading-relaxed mt-1 text-secondary">
            Login to access your dashboard and adoption applications.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <FormField id="login-email"    label="Email Address" type="email"    placeholder="you@example.com"     value={email}    onChange={e => setEmail(e.target.value)}    />
          <FormField id="login-password" label="Password"      type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />

          <button
            type="submit"
            className="w-full py-2.5 mt-3 rounded-[6px] font-bold text-sm
                       text-white bg-brand-primary cursor-pointer border-none tracking-wide
                       transition-all duration-300
                       hover:bg-brand-secondary hover:-translate-y-0.5 hover:shadow-md"
          >
            Login
          </button>
        </form>

        <p className="text-sm leading-relaxed mt-4 text-center text-secondary">
          Don't have an account?{' '}
          <Link to="/register"
            className="font-bold text-brand-primary transition-colors duration-300 hover:text-brand-accent">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
}
