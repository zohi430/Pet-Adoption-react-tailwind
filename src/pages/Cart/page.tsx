import { useState } from 'react';
import { Link } from 'react-router-dom';

interface CartItem {
  id: number;
  name: string;
  breed: string;
  img: string;
  fee: number;
}

const initial: CartItem[] = [
  { id: 1, name: 'Buddy', breed: 'Labrador',       img: '/images/pic 1.jpg', fee: 150 },
  { id: 2, name: 'Luna',  breed: 'Domestic Cat',   img: '/images/pic 2.jpg', fee: 100 },
  { id: 3, name: 'Max',   breed: 'Border Collie',  img: '/images/pic 3.png', fee: 175 },
];

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>(initial);

  const remove = (id: number) => setItems(prev => prev.filter(i => i.id !== id));
  const total  = items.reduce((s, i) => s + i.fee, 0);

  return (
    <section className="px-9 py-10 min-h-[calc(100vh-160px)] max-sm:px-4 max-sm:py-6">
      <h1 className="text-4xl max-sm:text-3xl font-extrabold mb-2 text-brand-primary">
        Adoption Cart
      </h1>
      <p className="text-sm text-[var(--text-secondary)] mb-8">
        Review your selected pets before submitting your adoption application.
      </p>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">Your cart is empty</h2>
          <p className="text-[var(--text-secondary)] mb-6">Browse our available pets and add them to your cart.</p>
          <Link to="/pets"
            className="inline-block px-6 py-3 bg-brand-primary text-white font-bold rounded-xl
                       no-underline hover:bg-brand-secondary transition-all duration-300">
            Browse Pets
          </Link>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto">
          {/* Cart items */}
          <div className="space-y-4 mb-8">
            {items.map(item => (
              <div key={item.id}
                className="flex items-center gap-4 bg-[var(--bg-card)] border border-[var(--border-muted)]
                           rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                <img src={item.img} alt={item.name}
                  className="w-20 h-20 object-cover rounded-xl flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base text-[var(--text-primary)]">{item.name}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{item.breed}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">Adoption fee</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-lg font-extrabold text-brand-primary">${item.fee}</p>
                  <button onClick={() => remove(item.id)}
                    className="mt-2 text-xs text-brand-accent hover:text-red-600 font-semibold
                               bg-transparent border-none cursor-pointer transition-colors duration-200">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-muted)] rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              {items.map(i => (
                <div key={i.id} className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">{i.name} adoption fee</span>
                  <span className="font-semibold text-[var(--text-primary)]">${i.fee}</span>
                </div>
              ))}
              <div className="border-t border-[var(--border-muted)] pt-3 flex justify-between font-bold text-base">
                <span className="text-[var(--text-primary)]">Total</span>
                <span className="text-brand-primary">${total}</span>
              </div>
            </div>
            <Link to="/adopt"
              className="block w-full text-center py-3 bg-brand-primary text-white font-bold rounded-xl
                         no-underline transition-all duration-300 hover:bg-brand-secondary hover:-translate-y-0.5 hover:shadow-md">
              Proceed to Application
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
