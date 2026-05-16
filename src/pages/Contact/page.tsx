import { useState } from 'react';
import type { FormEvent } from 'react';
import FormField from '../../components/ui/FormField';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert('Please complete the contact form.');
      return;
    }
    alert('Message Sent Successfully!');
    setForm({ name: '', email: '', subject: '', message: '' });
  }

  return (
    <section className="px-9 py-10 min-h-[calc(100vh-160px)] max-sm:px-4 max-sm:py-6">

      <h1 className="text-4xl max-sm:text-3xl font-extrabold leading-tight mb-2 text-brand-primary">
        Contact Us
      </h1>
      <p className="text-sm leading-relaxed my-1 text-secondary">
        Have a question? We'd love to hear from you. Fill out the form below and we'll get back to you
        within 24 hours.
      </p>

      <div className="max-w-lg mx-auto my-10 rounded-[10px] px-10 py-9
                      bg-card border border-border-token shadow-lg
                      max-sm:px-5 max-sm:py-6 max-sm:mx-4 max-sm:my-5">

        <h2 className="text-2xl font-bold mb-2 text-primary">Send a Message</h2>

        <form onSubmit={handleSubmit}>
          <FormField id="contact-name"    label="Full Name"     placeholder="Your full name"      value={form.name}    onChange={e => setForm({ ...form, name:    e.target.value })} />
          <FormField id="contact-email"   label="Email Address" type="email" placeholder="you@example.com" value={form.email}   onChange={e => setForm({ ...form, email:   e.target.value })} />
          <FormField id="contact-subject" label="Subject"       placeholder="What is this about?" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} />

          <div className="mb-3.5">
            <label htmlFor="contact-message" className="block font-semibold text-sm mb-1 text-secondary">
              Message
            </label>
            <textarea
              id="contact-message"
              rows={5}
              placeholder="Write your message here..."
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              className="w-full px-3 py-2 rounded-[6px] text-sm border resize-y
                         transition-all duration-300 box-border"
            />
          </div>

          <button
            type="submit"
            className="inline-block px-5 py-2.5 mt-3 rounded-[6px] font-bold text-sm
                       text-white bg-brand-primary cursor-pointer border-none tracking-wide
                       transition-all duration-300
                       hover:bg-brand-secondary hover:-translate-y-0.5 hover:shadow-md"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
