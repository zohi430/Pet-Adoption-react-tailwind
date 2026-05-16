import { Link } from 'react-router-dom';

interface PetCardProps {
  img: string;
  alt: string;
  name: string;
  breed?: string;
  age?: string;
  sex?: string;
  desc: string;
  adoptPath?: string;
}

export default function PetCard({
  img, alt, name, breed, age, sex, desc, adoptPath = '/adopt',
}: PetCardProps) {
  return (
    <div className="flex flex-col w-72 max-sm:w-[90%] max-sm:max-w-sm
                    bg-card border border-border-token rounded-[10px] p-4
                    text-center shadow-sm
                    transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

      <img src={img} alt={alt} className="w-full h-48 object-cover rounded-[6px]" />

      <h3 className="text-lg font-bold mt-3 mb-1 text-primary">{name}</h3>

      {breed && (
        <h4 className="text-base font-semibold mb-1 text-secondary">
          {breed}{age ? ` · ${age}` : ''}{sex ? ` · ${sex}` : ''}
        </h4>
      )}

      <p className="text-sm leading-relaxed my-1 text-secondary">{desc}</p>

      <Link
        to={adoptPath}
        className="mt-auto pt-2 font-bold text-sm no-underline
                   text-brand-primary transition-colors duration-300
                   hover:text-brand-accent"
      >
        Adopt {name}
      </Link>
    </div>
  );
}
