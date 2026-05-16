import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth }  from '../../context/AuthContext';

export default function Navbar() {
  const { dark, toggle } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [accOpen,  setAccOpen]  = useState(false);
  const accRef = useRef<HTMLLIElement>(null);

  // Close account dropdown on outside click
  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (accRef.current && !accRef.current.contains(e.target as Node)) {
        setAccOpen(false);
      }
    }
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, []);

  const close = () => { setMenuOpen(false); setAccOpen(false); };

  function handleLogout() {
    logout();
    close();
    navigate('/login');
  }

  const navLink =
    'text-white/90 no-underline font-semibold text-sm px-3 py-1.5 rounded-[6px] ' +
    'transition-all duration-300 hover:bg-white/15 hover:text-white';

  const mainLinks = [
    ['/',         'Home'   ],
    ['/pets',     'Pets'   ],
    ['/about',    'About'  ],
    ['/contact',  'Contact'],
    ['/cart',     'Cart'   ],
    ['/reviews',  'Reviews'],
  ] as const;

  return (
    <nav className="flex flex-wrap justify-between items-center px-8 py-3.5
                    sticky top-0 z-[1000] shadow-md bg-brand-primary">

      {/* Brand */}
      <Link to="/"
        className="text-xl font-extrabold text-white no-underline tracking-wide whitespace-nowrap">
        🐾 Pet Adoption
      </Link>

      {/* Hamburger */}
      <button
        onClick={() => setMenuOpen(p => !p)}
        aria-label="Toggle navigation"
        className="md:hidden flex flex-col gap-1.5 cursor-pointer bg-transparent
                   border-none p-1.5 mt-0 shadow-none rounded-[6px]
                   hover:bg-white/15 transition-colors duration-300"
      >
        <span className="block w-6 h-0.5 bg-white rounded-sm transition-all duration-300" />
        <span className="block w-6 h-0.5 bg-white rounded-sm transition-all duration-300" />
        <span className="block w-6 h-0.5 bg-white rounded-sm transition-all duration-300" />
      </button>

      {/* Nav list */}
      <ul className={`
        ${menuOpen
          ? 'flex bg-brand-third shadow-[0_6px_18px_rgba(0,0,0,0.15)]'
          : 'hidden'}
        md:flex md:bg-transparent md:shadow-none
        flex-col md:flex-row
        w-full md:w-auto
        list-none m-0 p-0 gap-0 md:gap-1
        items-start md:items-center
        mt-2.5 md:mt-0
        rounded-[10px] md:rounded-none
      `}>

        {/* Main nav links */}
        {mainLinks.map(([path, label]) => (
          <li key={path} className="w-full md:w-auto">
            <Link
              to={path}
              onClick={close}
              className={`${navLink} block md:inline-block px-6 md:px-3 py-3 md:py-1.5 rounded-none md:rounded-[6px]`}
            >
              {label}
            </Link>
          </li>
        ))}

        {/* Account dropdown */}
        <li ref={accRef} className="relative w-full md:w-auto">
          <button
            onClick={() => setAccOpen(p => !p)}
            className="w-full md:w-auto text-left mt-0 px-6 md:px-3 py-3 md:py-1.5
                       bg-white/[0.18] border border-white/40 text-white text-sm font-semibold
                       rounded-none md:rounded-[6px] cursor-pointer
                       transition-all duration-300 hover:bg-white/30"
          >
            {user ? `👤 ${user.name.split(' ')[0]}` : 'Account'} ▾
          </button>

          {accOpen && (
            <div className="md:absolute static top-[calc(100%+8px)] left-0
                            bg-card border border-border-token rounded-[10px]
                            min-w-[160px] z-[999] flex flex-col py-1.5 shadow-lg">

              {/* Always visible */}
              {[
                { to: '/dashboard', label: 'Dashboard' },
                { to: '/profile',   label: 'Profile'   },
                { to: '/login',     label: 'Login'     },
                { to: '/register',  label: 'Register'  },
                { to: '/signup',    label: 'Sign Up'   },
              ].map(({ to, label }) => (
                <Link key={to} to={to} onClick={close}
                  className="block px-4 py-2 text-sm no-underline text-primary
                             transition-colors duration-300 hover:bg-main hover:text-brand-primary">
                  {label}
                </Link>
              ))}

              {/* Logout only when logged in */}
              {user && (
                <button
                  onClick={handleLogout}
                  className="text-left px-4 py-2 text-sm text-brand-accent font-semibold
                             bg-transparent border-none cursor-pointer
                             transition-colors duration-300 hover:bg-main"
                >
                  Logout
                </button>
              )}
            </div>
          )}
        </li>

        {/* Dark mode toggle */}
        <li className="w-full md:w-auto px-3 md:px-0 py-2 md:py-0">
          <button
            onClick={toggle}
            className="mt-0 px-4 py-1.5 text-sm rounded-[6px]
                       border border-white/40 text-white bg-white/[0.18]
                       hover:bg-white/30 transition-all duration-300
                       w-full md:w-auto cursor-pointer"
          >
            {dark ? '☀️ Light' : '🌙 Dark'}
          </button>
        </li>
      </ul>
    </nav>
  );
}
