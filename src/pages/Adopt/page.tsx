import { useState } from 'react';
import type { FormEvent } from 'react';
import FormField   from '../../components/ui/FormField';
import SelectField from '../../components/ui/SelectField';

export default function Adopt() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '',
    pet: '', housing: '', experience: '', reason: '',
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const { name, email, phone, address, pet, housing, experience, reason } = form;
    if (!name || !email || !phone || !address || !pet || !housing || !experience || !reason) {
      alert('Please fill all fields in the adoption form.');
      return;
    }
    alert('Adoption Application Submitted! We will contact you soon.');
    setForm({ name: '', email: '', phone: '', address: '', pet: '', housing: '', experience: '', reason: '' });
  }

  const set = (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [key]: e.target.value });

  return (
    <section className="px-9 py-10 min-h-[calc(100vh-160px)] max-sm:px-4 max-sm:py-6">

      <h1 className="text-4xl max-sm:text-3xl font-extrabold leading-tight mb-2 text-brand-primary">
        Adoption Application
      </h1>
      <p className="text-sm leading-relaxed my-1 text-secondary">
        Please fill out the form below carefully. Our team will review your application and contact you
        within 2–3 business days.
      </p>

      <div className="max-w-lg mx-auto my-10 rounded-[10px] px-10 py-9
                      bg-card border border-border-token shadow-lg
                      max-sm:px-5 max-sm:py-6 max-sm:mx-4 max-sm:my-5">

        <h2 className="text-2xl font-bold mb-4 text-primary">Your Details</h2>

        <form onSubmit={handleSubmit}>
          <FormField id="adopt-name"    label="Full Name"     placeholder="Your full legal name"     value={form.name}    onChange={set('name')    as React.ChangeEventHandler<HTMLInputElement>} />
          <FormField id="adopt-email"   label="Email Address" type="email" placeholder="you@example.com"  value={form.email}   onChange={set('email')   as React.ChangeEventHandler<HTMLInputElement>} />
          <FormField id="adopt-phone"   label="Phone Number"  type="tel"   placeholder="+1 234 567 8900"   value={form.phone}   onChange={set('phone')   as React.ChangeEventHandler<HTMLInputElement>} />
          <FormField id="adopt-address" label="Home Address"  placeholder="Street, City, State, ZIP" value={form.address} onChange={set('address') as React.ChangeEventHandler<HTMLInputElement>} />

          <SelectField id="adopt-pet" label="Which Pet Would You Like to Adopt?" value={form.pet} onChange={set('pet') as React.ChangeEventHandler<HTMLSelectElement>}>
            <option value="">-- Select a pet --</option>
            <option value="buddy">Buddy (Labrador)</option>
            <option value="luna">Luna (Domestic Shorthair Cat)</option>
            <option value="max">Max (Border Collie)</option>
            <option value="bella">Bella (Persian Cat)</option>
            <option value="cleo">Cleo (Holland Lop Rabbit)</option>
            <option value="rocky">Rocky (German Shepherd)</option>
          </SelectField>

          <SelectField id="adopt-housing" label="Type of Housing" value={form.housing} onChange={set('housing') as React.ChangeEventHandler<HTMLSelectElement>}>
            <option value="">-- Select housing type --</option>
            <option value="house">House with Garden</option>
            <option value="apartment">Apartment</option>
            <option value="condo">Condominium</option>
            <option value="farm">Farm / Rural</option>
          </SelectField>

          <SelectField id="adopt-experience" label="Previous Pet Experience" value={form.experience} onChange={set('experience') as React.ChangeEventHandler<HTMLSelectElement>}>
            <option value="">-- Select experience level --</option>
            <option value="first">First-time owner</option>
            <option value="some">Some experience</option>
            <option value="experienced">Experienced owner</option>
          </SelectField>

          <div className="mb-3.5">
            <label htmlFor="adopt-reason" className="block font-semibold text-sm mb-1 text-secondary">
              Why Do You Want to Adopt?
            </label>
            <textarea
              id="adopt-reason"
              rows={4}
              placeholder="Tell us a little about your lifestyle and why you'd like to adopt this pet..."
              value={form.reason}
              onChange={set('reason') as React.ChangeEventHandler<HTMLTextAreaElement>}
              className="w-full px-3 py-2 rounded-[6px] text-sm border resize-y
                         transition-all duration-300 box-border"
            />
          </div>

          <button
            type="submit"
            className="inline-block px-8 py-3.5 mt-3 rounded-[6px] font-bold text-lg
                       text-white bg-brand-primary cursor-pointer border-none tracking-wide
                       transition-all duration-300
                       hover:bg-brand-secondary hover:-translate-y-0.5 hover:shadow-md"
          >
            Submit Application
          </button>
        </form>
      </div>
    </section>
  );
}
