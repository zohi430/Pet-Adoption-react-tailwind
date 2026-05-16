import { Link } from 'react-router-dom';
import PetCard from '../../components/ui/PetCard';

const featured = [
  { name: 'Buddy', img: '/images/pic 1.jpg', desc: 'Friendly and playful Labrador looking for an active family.' },
  { name: 'Luna',  img: '/images/pic 2.jpg', desc: 'Calm and affectionate indoor cat, great with children.'      },
  { name: 'Max',   img: '/images/pic 3.png', desc: 'Energetic Border Collie who loves fetch and long walks.'      },
];

const stats = [
  { value: '3,000+', label: 'Pets Adopted'     },
  { value: '42',     label: 'Partner Shelters'  },
  { value: '380+',   label: 'Volunteers'        },
  { value: '98%',    label: 'Happy Families'    },
];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-primary to-brand-third
                          text-white px-9 py-20 max-sm:px-4 max-sm:py-12 text-center">
        <h1 className="text-5xl max-sm:text-3xl font-extrabold leading-tight mb-4">
          Find Your New Best Friend
        </h1>
        <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
          Give a loving pet a forever home. Browse our available animals and start your adoption journey today.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/pets"
            className="px-6 py-3 bg-brand-secondary text-white font-bold rounded-xl
                       no-underline transition-all duration-300 hover:bg-brand-accent hover:-translate-y-0.5 hover:shadow-lg">
            Browse Pets
          </Link>
          <Link to="/adopt"
            className="px-6 py-3 bg-white/20 border border-white/40 text-white font-bold rounded-xl
                       no-underline transition-all duration-300 hover:bg-white/30 hover:-translate-y-0.5">
            Apply to Adopt
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[var(--bg-card)] py-10 px-9 max-sm:px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map(s => (
            <div key={s.label} className="p-4">
              <div className="text-3xl font-extrabold text-brand-primary mb-1">{s.value}</div>
              <div className="text-sm text-[var(--text-secondary)]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured pets */}
      <section className="px-9 py-12 max-sm:px-4 max-sm:py-8">
        <h2 className="text-3xl font-extrabold text-center text-[var(--text-primary)] mb-2">
          Featured Pets
        </h2>
        <p className="text-center text-[var(--text-secondary)] text-sm mb-8">
          Meet some of our adorable animals waiting for a loving home.
        </p>
        <div className="flex flex-wrap justify-center gap-6 max-sm:flex-col max-sm:items-center">
          {featured.map(p => (
            <PetCard key={p.name} img={p.img} alt={p.name} name={p.name} desc={p.desc} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/pets"
            className="inline-block px-6 py-3 bg-brand-primary text-white font-bold rounded-xl
                       no-underline transition-all duration-300 hover:bg-brand-secondary hover:-translate-y-0.5">
            View All Pets
          </Link>
        </div>
      </section>

      {/* Why adopt */}
      <section className="bg-[var(--bg-card)] px-9 py-12 max-sm:px-4">
        <h2 className="text-3xl font-extrabold text-center text-[var(--text-primary)] mb-8">
          Why Adopt?
        </h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '❤️', title: 'Save a Life',       desc: 'Every adoption gives a pet a second chance at a happy, healthy life.' },
            { icon: '🏠', title: 'Gain a Companion',  desc: 'Adopted pets are loyal, loving, and grateful for their forever home.'  },
            { icon: '🌍', title: 'Help the Community', desc: 'Adoption supports local shelters and reduces animal homelessness.'     },
          ].map(c => (
            <div key={c.title}
              className="bg-[var(--bg-main)] rounded-xl p-6 text-center
                         border border-[var(--border-muted)] hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-3">{c.icon}</div>
              <h3 className="font-bold text-lg text-[var(--text-primary)] mb-2">{c.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
