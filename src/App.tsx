import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar    from './components/Navbar/page';
import Footer    from './components/Footer/page';
import PetCard   from './components/ui/PetCard';
import Pets      from './pages/Pets/page';
import About     from './pages/About/page';
import Contact   from './pages/Contact/page';
import Login     from './pages/Login/page';
import Signup    from './pages/Signup/page';
import Register  from './pages/Register/page';
import Dashboard from './pages/Dashboard/page';
import Adopt     from './pages/Adopt/page';
import Cart      from './pages/Cart/page';
import Reviews   from './pages/Reviews/page';
import Profile   from './pages/Profile/page';

/* ── Home ────────────────────────────────────────────── */
function Home() {
  const featured = [
    { name: 'Buddy', img: '/images/pic 1.jpg', desc: 'Friendly and playful Labrador looking for an active family.' },
    { name: 'Luna',  img: '/images/pic 2.jpg', desc: 'Calm and affectionate indoor cat, great with children.'      },
    { name: 'Max',   img: '/images/pic 3.png', desc: 'Energetic Border Collie who loves fetch and long walks.'      },
  ];

  return (
    <section className="px-9 py-10 min-h-[calc(100vh-160px)] max-sm:px-4 max-sm:py-6">
      <h1 className="text-4xl max-sm:text-3xl font-extrabold leading-tight mb-2 text-brand-primary">
        Find Your New Best Friend
      </h1>
      <p className="text-sm leading-relaxed my-1 text-secondary">
        Give a loving pet a forever home. Browse our available animals and start your adoption journey today.
      </p>

      <div className="flex flex-wrap justify-center gap-6 my-8 max-sm:flex-col max-sm:items-center">
        {featured.map(p => (
          <PetCard key={p.name} img={p.img} alt={p.name} name={p.name} desc={p.desc} />
        ))}
      </div>

      <div>
        <h2 className="text-2xl max-sm:text-xl font-bold mb-2 text-primary">Why Adopt?</h2>
        <p className="text-sm leading-relaxed my-1 text-secondary">
          Every year thousands of animals wait for a loving family. Adoption saves lives, supports shelters,
          and brings joy into your home.
        </p>
        <Link
          to="/pets"
          className="inline-block no-underline px-4 py-2 mt-3 font-bold rounded-[6px] text-sm
                     text-white bg-brand-accent transition-all duration-300
                     hover:bg-brand-secondary hover:-translate-y-0.5"
        >
          Browse All Pets
        </Link>
      </div>
    </section>
  );
}

/* ── App ─────────────────────────────────────────────── */
export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/"          element={<Home />}      />
            <Route path="/pets"      element={<Pets />}      />
            <Route path="/about"     element={<About />}     />
            <Route path="/contact"   element={<Contact />}   />
            <Route path="/login"     element={<Login />}     />
            <Route path="/signup"    element={<Signup />}    />
            <Route path="/register"  element={<Register />}  />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/adopt"     element={<Adopt />}     />
            <Route path="/cart"      element={<Cart />}      />
            <Route path="/reviews"   element={<Reviews />}   />
            <Route path="/profile"   element={<Profile />}   />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
