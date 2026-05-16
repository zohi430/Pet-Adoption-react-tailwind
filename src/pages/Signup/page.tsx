import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormField from '../../components/ui/FormField';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const { name, email, phone, password, confirm } = form;
    if (!name || !email || !phone || !password || !confirm) {
      alert('Please fill all signup fields.');
      return;
    }
    alert('Signup Successful!');
    navigate('/login');
  }

  const set = (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [key]: e.target.value });

  return (
    <section className="px-9 py-10 min-h-[calc(100vh-160px)] max-sm:px-4 max-sm:py-6">
      <div className="max-w-lg mx-auto my-10 rounded-[10px] px-10 py-9
                      bg-card border border-border-token shadow-lg
                      max-sm:px-5 max-sm:py-6 max-sm:mx-4 max-sm:my-5">

        <h2 className="text-2xl font-bold mb-2 text-primary">Create Account</h2>
        <p className="text-sm leading-relaxed my-1 text-secondary">
          Join our community and give a pet a loving home.
        </p>

        <form onSubmit={handleSubmit}>
          <FormField id="signup-name"     label="Full Name"        placeholder="John Smith"               value={form.name}     onChange={set('name')}     />
          <FormField id="signup-email"    label="Email Address"    type="email"    placeholder="you@example.com"          value={form.email}    onChange={set('email')}    />
          <FormField id="signup-phone"    label="Phone Number"     type="tel"      placeholder="+1 234 567 8900"          value={form.phone}    onChange={set('phone')}    />
          <FormField id="signup-password" label="Password"         type="password" placeholder="Create a strong password" value={form.password} onChange={set('password')} />
          <FormField id="signup-confirm"  label="Confirm Password" type="password" placeholder="Repeat your password"     value={form.confirm}  onChange={set('confirm')}  />

          <button
            type="submit"
            className="inline-block px-5 py-2.5 mt-3 rounded-[6px] font-bold text-sm
                       text-white bg-brand-primary cursor-pointer border-none tracking-wide
                       transition-all duration-300
                       hover:bg-brand-secondary hover:-translate-y-0.5 hover:shadow-md"
          >
            Create Account
          </button>
        </form>

        <p className="text-sm leading-relaxed mt-4 text-secondary">
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
