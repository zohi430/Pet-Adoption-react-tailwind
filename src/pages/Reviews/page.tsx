import { useState } from 'react';
import type { FormEvent } from 'react';
import { useAuth } from '../../context/AuthContext';

interface Review {
  id: number; name: string; avatar: string;
  rating: number; pet: string; date: string; text: string;
}

const initial: Review[] = [
  { id: 1, name: 'Emily Carter',  avatar: 'https://i.pravatar.cc/60?img=5',  rating: 5, pet: 'Buddy', date: 'April 2026',    text: 'Adopting Buddy was the best decision of my life. The process was smooth and the team was incredibly supportive throughout.' },
  { id: 2, name: 'Marcus Lee',    avatar: 'https://i.pravatar.cc/60?img=11', rating: 5, pet: 'Luna',  date: 'March 2026',    text: 'Luna has brought so much joy to our home. The staff made sure she was the perfect fit for our family. Highly recommend!'  },
  { id: 3, name: 'Sophia Patel',  avatar: 'https://i.pravatar.cc/60?img=25', rating: 4, pet: 'Cleo',  date: 'February 2026', text: 'Great experience overall. Cleo is adorable and healthy. The health check documentation was thorough and reassuring.'        },
  { id: 4, name: 'David Kim',     avatar: 'https://i.pravatar.cc/60?img=8',  rating: 5, pet: 'Rocky', date: 'January 2026',  text: 'Rocky is an amazing dog. The adoption team was professional and genuinely cared about finding Rocky the right home.'       },
  { id: 5, name: 'Aisha Johnson', avatar: 'https://i.pravatar.cc/60?img=20', rating: 4, pet: 'Bella', date: 'December 2025', text: 'Bella is the sweetest cat. The team answered all our questions patiently. Would definitely adopt from here again.'          },
];

function Stars({ rating, interactive = false, onSet }: {
  rating: number; interactive?: boolean; onSet?: (n: number) => void;
}) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <button
          key={s}
          type="button"
          onClick={() => interactive && onSet?.(s)}
          className={`text-xl bg-transparent border-none cursor-pointer
                      transition-transform ${interactive ? 'hover:scale-110' : 'cursor-default'}
                      ${s <= rating ? 'text-brand-fourth' : 'text-muted'}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function Reviews() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>(initial);
  const [form, setForm] = useState({ rating: 5, pet: '', text: '' });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!user) { alert('Please login to leave a review.'); return; }
    if (!form.pet || !form.text) { alert('Please fill all fields.'); return; }
    setReviews(prev => [{
      id:     Date.now(),
      name:   user.name,
      avatar: user.avatar,
      rating: form.rating,
      pet:    form.pet,
      date:   new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      text:   form.text,
    }, ...prev]);
    setForm({ rating: 5, pet: '', text: '' });
  }

  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <section className="px-9 py-10 min-h-[calc(100vh-160px)] max-sm:px-4 max-sm:py-6">

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl max-sm:text-3xl font-extrabold mb-2 text-brand-primary">
          Adoption Reviews
        </h1>
        <p className="text-sm text-secondary mb-4">
          Hear from families who found their perfect companion through us.
        </p>
        <div className="inline-flex items-center gap-2 bg-card border border-border-token
                        rounded-full px-5 py-2 shadow-sm">
          <span className="text-2xl font-extrabold text-brand-primary">{avg}</span>
          <Stars rating={Math.round(Number(avg))} />
          <span className="text-sm text-secondary">({reviews.length} reviews)</span>
        </div>
      </div>

      {/* Write a review */}
      <div className="max-w-xl mx-auto mb-12 bg-card border border-border-token
                      rounded-[10px] p-6 shadow-sm">
        <h2 className="text-lg font-bold text-primary mb-4">
          {user ? 'Write a Review' : 'Login to Write a Review'}
        </h2>

        {user ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={user.avatar} alt={user.name}
                className="w-10 h-10 rounded-full object-cover" />
              <span className="font-semibold text-sm text-primary">{user.name}</span>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5 text-secondary">Rating</label>
              <Stars rating={form.rating} interactive onSet={n => setForm(f => ({ ...f, rating: n }))} />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5 text-secondary">Pet Adopted</label>
              <input
                type="text"
                placeholder="e.g. Buddy the Labrador"
                value={form.pet}
                onChange={e => setForm(f => ({ ...f, pet: e.target.value }))}
                className="w-full px-3 py-2 rounded-[6px] text-sm border
                           transition-all duration-300 box-border"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5 text-secondary">Your Review</label>
              <textarea
                rows={3}
                placeholder="Share your adoption experience..."
                value={form.text}
                onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
                className="w-full px-3 py-2 rounded-[6px] text-sm border resize-y
                           transition-all duration-300 box-border"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-brand-primary text-white font-bold rounded-[6px]
                         border-none cursor-pointer transition-all duration-300
                         hover:bg-brand-secondary hover:-translate-y-0.5"
            >
              Submit Review
            </button>
          </form>
        ) : (
          <p className="text-sm text-secondary">
            Please{' '}
            <a href="/login"
              className="text-brand-primary font-bold hover:text-brand-accent
                         transition-colors duration-200 no-underline">
              login
            </a>{' '}
            to share your adoption experience.
          </p>
        )}
      </div>

      {/* Review cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {reviews.map(r => (
          <div key={r.id}
            className="bg-card border border-border-token rounded-[10px] p-6
                       hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-3">
              <img src={r.avatar} alt={r.name}
                className="w-11 h-11 rounded-full object-cover" />
              <div>
                <p className="font-bold text-sm text-primary">{r.name}</p>
                <p className="text-xs text-muted">{r.date}</p>
              </div>
              <div className="ml-auto">
                <Stars rating={r.rating} />
              </div>
            </div>
            <p className="text-xs font-semibold text-brand-primary mb-2">
              Adopted: {r.pet}
            </p>
            <p className="text-sm text-secondary leading-relaxed">{r.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
