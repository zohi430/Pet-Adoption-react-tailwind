import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-brand-third text-white/90 px-9 pt-10 pb-5
                       max-sm:px-5 max-sm:pt-7 max-sm:pb-4">

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8
                      max-sm:gap-5">

        {/* Brand + social */}
        <div>
          <h2 className="text-2xl font-extrabold text-white mb-2">🐾 Pet Adoption</h2>
          <p className="text-sm text-white/60 leading-relaxed mb-4">
            Connecting loving families with pets in need since 2020.
            Every adoption saves a life.
          </p>
          <div className="flex gap-3">
            {[
              { href: '#', label: 'Facebook',  icon: '📘' },
              { href: '#', label: 'Instagram', icon: '📸' },
              { href: '#', label: 'Twitter',   icon: '🐦' },
            ].map(s => (
              <a key={s.label} href={s.href} aria-label={s.label}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center
                           text-sm no-underline hover:bg-brand-secondary
                           transition-colors duration-300">
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-sm font-bold text-white/80 mb-3.5 uppercase tracking-widest">
            Quick Links
          </h3>
          {[
            ['/pets',      'Browse Pets'   ],
            ['/about',     'About Us'      ],
            ['/contact',   'Contact'       ],
            ['/adopt',     'Apply to Adopt'],
            ['/reviews',   'Reviews'       ],
            ['/dashboard', 'Dashboard'     ],
          ].map(([to, label]) => (
            <Link key={to} to={to}
              className="block no-underline text-sm text-white/70 mb-2
                         transition-colors duration-300 hover:text-brand-secondary">
              {label}
            </Link>
          ))}
        </div>

        {/* Contact info */}
        <div>
          <h3 className="text-sm font-bold text-white/80 mb-3.5 uppercase tracking-widest">
            Contact Us
          </h3>
          <ul className="space-y-2.5 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <span className="mt-0.5">📍</span>
              <span>123 Paw Street, Animal City, AC 45678</span>
            </li>
            <li className="flex items-center gap-2">
              <span>📞</span>
              <a href="tel:+11234567890"
                className="no-underline text-white/70 hover:text-brand-secondary transition-colors duration-300">
                +1 (123) 456-7890
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span>✉️</span>
              <a href="mailto:hello@petadoption.com"
                className="no-underline text-white/70 hover:text-brand-secondary transition-colors duration-300">
                hello@petadoption.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span>🕐</span>
              <span>Mon–Sat: 9am – 6pm</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 pt-5 text-center text-sm text-white/50">
        &copy; 2026 Pet Adoption Website. All rights reserved.
      </div>
    </footer>
  );
}
