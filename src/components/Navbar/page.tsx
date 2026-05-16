import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark,     setDark]     = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      setDark(true);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function toggleDarkMode() {
    const html = document.documentElement;
    if (html.getAttribute('data-theme') === 'dark') {
      html.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      setDark(false);
    } else {
      html.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      setDark(true);
    }
  }

  const close = () => { setMenuOpen(false); setDropOpen(false); };

  const navLink =
    'text-white/90 no-underline font-semibold text-sm px-3 py-1.5 rounded-[6px] ' +
    'transition-all duration-300 hover:bg-white/15 hover:text-white';

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

        {(['/', '/pets', '/about', '/contact'] as const).map((path, i) => {
          const labels = ['Home', 'Pets', 'About', 'Contact'];
          return (
            <li key={path} className="w-full md:w-auto">
              <Link
                to={path}
                onClick={close}
                className={`${navLink} block md:inline-block px-6 md:px-3 py-3 md:py-1.5 rounded-none md:rounded-[6px]`}
              >
                {labels[i]}
              </Link>
            </li>
          );
        })}

        {/* Account dropdown */}
        <li ref={dropRef} className="relative w-full md:w-auto">
          <button
            onClick={() => setDropOpen(p => !p)}
            className="w-full md:w-auto text-left mt-0 px-6 md:px-3 py-3 md:py-1.5
                       bg-white/[0.18] border border-white/40 text-white text-sm font-semibold
                       rounded-none md:rounded-[6px] cursor-pointer
                       transition-all duration-300 hover:bg-white/30"
          >
            Account ▾
          </button>

          {dropOpen && (
            <div className="md:absolute static top-[calc(100%+8px)] left-0
                            bg-card border border-border-token rounded-[10px]
                            min-w-[160px] z-[999] flex flex-col py-1.5 shadow-lg">
              {[
                { to: '/login',     label: 'Login'     },
                { to: '/signup',    label: 'Sign Up'   },
                { to: '/dashboard', label: 'Dashboard' },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={close}
                  className="block px-4 py-2 text-sm no-underline text-primary
                             transition-colors duration-300
                             hover:bg-main hover:text-brand-primary"
                >
                  {label}
                </Link>
              ))}
            </div>
          )}
        </li>

        {/* Dark mode toggle */}
        <li className="w-full md:w-auto px-3 md:px-0 py-2 md:py-0">
          <button
            onClick={toggleDarkMode}
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
