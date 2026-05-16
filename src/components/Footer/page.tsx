import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="px-9 pt-10 pb-5 bg-brand-third text-white/90
                       max-sm:px-5 max-sm:pt-7 max-sm:pb-4">

      <div className="flex flex-wrap gap-8 justify-between max-w-5xl mx-auto mb-6
                      max-sm:flex-col max-sm:gap-5">

        {/* Brand */}
        <div className="flex-1 min-w-[180px]">
          <h2 className="text-2xl font-extrabold text-white mb-2">🐾 Pet Adoption</h2>
          <p className="text-sm text-white/60 my-1">
            Connecting loving families with pets in need since 2020.
          </p>
        </div>

        {/* Quick links */}
        <div className="flex-1 min-w-[180px]">
          <h3 className="text-sm font-bold text-white/80 mb-3.5 uppercase tracking-widest">
            Quick Links
          </h3>
          {[
            { to: '/pets',    label: 'Browse Pets'    },
            { to: '/about',   label: 'About Us'       },
            { to: '/contact', label: 'Contact'        },
            { to: '/adopt',   label: 'Apply to Adopt' },
          ].map(({ to, label }) => (
            <Link key={to} to={to}
              className="block no-underline text-sm text-white/70 mb-2
                         transition-colors duration-300 hover:text-brand-secondary">
              {label}
            </Link>
          ))}
        </div>

        {/* Account */}
        <div className="flex-1 min-w-[180px]">
          <h3 className="text-sm font-bold text-white/80 mb-3.5 uppercase tracking-widest">
            Account
          </h3>
          {[
            { to: '/login',     label: 'Login'     },
            { to: '/signup',    label: 'Sign Up'   },
            { to: '/dashboard', label: 'Dashboard' },
          ].map(({ to, label }) => (
            <Link key={to} to={to}
              className="block no-underline text-sm text-white/70 mb-2
                         transition-colors duration-300 hover:text-brand-secondary">
              {label}
            </Link>
          ))}
        </div>
      </div>

      <p className="text-sm text-white/60 text-center my-1">
        &copy; 2026 Pet Adoption Website. All rights reserved.
      </p>
    </footer>
  );
}
