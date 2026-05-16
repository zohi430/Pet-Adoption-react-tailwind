import { useState } from 'react';
import PetCard     from '../../components/ui/PetCard';
import SelectField from '../../components/ui/SelectField';

const pets = [
  { name: 'Buddy', species: 'dog',    img: '/images/pic 1.jpg', breed: 'Labrador',          age: '3 yrs', sex: 'Male',   desc: 'Playful and energetic. Loves outdoor adventures and children.' },
  { name: 'Luna',  species: 'cat',    img: '/images/pic 2.jpg', breed: 'Domestic Shorthair', age: '2 yrs', sex: 'Female', desc: 'Calm and affectionate. Perfect for apartment living.'          },
  { name: 'Max',   species: 'dog',    img: '/images/pic 3.png', breed: 'Border Collie',      age: '4 yrs', sex: 'Male',   desc: 'Highly intelligent and loyal. Thrives with active owners.'     },
  { name: 'Bella', species: 'cat',    img: '/images/pic 4.jpg', breed: 'Persian',            age: '3 yrs', sex: 'Female', desc: 'Gentle and quiet. Loves being groomed and cuddling.'           },
  { name: 'Cleo',  species: 'rabbit', img: '/images/pic 5.png', breed: 'Holland Lop',        age: '1 yr',  sex: 'Female', desc: 'Curious and friendly rabbit who enjoys being handled.'         },
  { name: 'Rocky', species: 'dog',    img: '/images/pic 6.jpg', breed: 'German Shepherd',    age: '5 yrs', sex: 'Male',   desc: 'Brave, loyal, and well-trained. Great family guardian.'        },
];

export default function Pets() {
  const [filter, setFilter] = useState('all');
  const visible = pets.filter(p => filter === 'all' || p.species === filter);

  return (
    <section className="px-9 py-10 min-h-[calc(100vh-160px)] max-sm:px-4 max-sm:py-6">

      <h1 className="text-4xl max-sm:text-3xl font-extrabold leading-tight mb-2 text-brand-primary">
        Browse Available Pets
      </h1>
      <p className="text-sm leading-relaxed my-1 text-secondary">
        All pets listed below are vaccinated, health-checked, and ready for adoption.
        Filter by species to find your match.
      </p>

      <div className="max-w-xs mt-4">
        <SelectField
          id="species-filter"
          label="Filter by Species"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option value="all">All Animals</option>
          <option value="dog">Dogs</option>
          <option value="cat">Cats</option>
          <option value="rabbit">Rabbits</option>
        </SelectField>
      </div>

      <div className="flex flex-wrap justify-center gap-6 my-8 max-sm:flex-col max-sm:items-center">
        {visible.map(pet => (
          <PetCard
            key={pet.name}
            img={pet.img}
            alt={pet.name}
            name={pet.name}
            breed={pet.breed}
            age={pet.age}
            sex={pet.sex}
            desc={pet.desc}
          />
        ))}
      </div>
    </section>
  );
}
