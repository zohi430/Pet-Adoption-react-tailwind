import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { User } from '../../context/AuthContext';
import FormField from '../../components/ui/FormField';

export default function Register() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirm: '',
  });
  const { login } = useAuth();
  const navigate  = useNavigate();

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const { name, email, phone, password, confirm } = form;
    if (!name || !email || !phone || !password || !confirm) {
      alert('Please fill all fields.');
      return;
    }
    if (password !== confirm) { alert('Passwords do not match.'); return; }

    const user: User = {
      name,
      email,
      phone,
      location: 'Not specified',
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
          <h2 className="text-2xl font-bold text-primary">Create Account</h2>
          <p className="text-sm leading-relaxed mt-1 text-secondary">
            Join our community and give a pet a loving home.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <FormField id="reg-name"     label="Full Name"        placeholder="John Smith"               value={form.name}     onChange={set('name')}     />
          <FormField id="reg-email"    label="Email Address"    type="email"    placeholder="you@example.com"          value={form.email}    onChange={set('email')}    />
          <FormField id="reg-phone"    label="Phone Number"     type="tel"      placeholder="+1 234 567 8900"          value={form.phone}    onChange={set('phone')}    />
          <FormField id="reg-password" label="Password"         type="password" placeholder="Create a strong password" value={form.password} onChange={set('password')} />
          <FormField id="reg-confirm"  label="Confirm Password" type="password" placeholder="Repeat your password"     value={form.confirm}  onChange={set('confirm')}  />

          <button
            type="submit"
            className="w-full py-2.5 mt-3 rounded-[6px] font-bold text-sm
                       text-white bg-brand-primary cursor-pointer border-none tracking-wide
                       transition-all duration-300
                       hover:bg-brand-secondary hover:-translate-y-0.5 hover:shadow-md"
          >
            Create Account
          </button>
        </form>

        <p className="text-sm leading-relaxed mt-4 text-center text-secondary">
          Already have an account?{' '}
          <Link to="/login"
            className="font-bold text-brand-primary transition-colors duration-300 hover:text-brand-accent">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
