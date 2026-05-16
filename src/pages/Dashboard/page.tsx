import InfoCard from '../../components/ui/InfoCard';

interface Application { id: string; pet: string; species: string; date: string; status: string; }
interface SavedPet    { name: string; breed: string; age: string; location: string; }

function statusClass(s: string) {
  if (s === 'Approved') return 'text-brand-primary font-bold';
  if (s === 'Pending')  return 'text-brand-fourth  font-bold';
  if (s === 'Rejected') return 'text-brand-accent  font-bold';
  return '';
}

function Td({ children, extra = '' }: { children: React.ReactNode; extra?: string }) {
  return (
    <td className={`px-4 py-3 border-b border-border-token text-primary
                    overflow-hidden text-ellipsis whitespace-nowrap ${extra}`}>
      {children}
    </td>
  );
}

function Th({ children, minW }: { children: React.ReactNode; minW?: string }) {
  return (
    <th className={`px-4 py-3 text-left font-bold text-xs uppercase tracking-wide text-white
                    ${minW ? `min-w-[${minW}]` : ''}`}>
      {children}
    </th>
  );
}

function TrAlt({ children, even }: { children: React.ReactNode; even: boolean }) {
  return (
    <tr className={`cursor-pointer transition-colors duration-200 hover:bg-brand-primary/10
                    ${even ? 'bg-main' : 'bg-card'}`}>
      {children}
    </tr>
  );
}

const applications: Application[] = [
  { id: '#1021', pet: 'Buddy', species: 'Dog',    date: '2026-04-10', status: 'Approved' },
  { id: '#1022', pet: 'Luna',  species: 'Cat',    date: '2026-04-18', status: 'Approved' },
  { id: '#1031', pet: 'Max',   species: 'Dog',    date: '2026-05-01', status: 'Pending'  },
  { id: '#1034', pet: 'Cleo',  species: 'Rabbit', date: '2026-05-04', status: 'Rejected' },
];

const saved: SavedPet[] = [
  { name: 'Charlie', breed: 'Beagle',          age: '2 yrs', location: 'New York'    },
  { name: 'Bella',   breed: 'Persian Cat',      age: '3 yrs', location: 'Los Angeles' },
  { name: 'Rocky',   breed: 'German Shepherd',  age: '4 yrs', location: 'Chicago'     },
  { name: 'Daisy',   breed: 'Golden Retriever', age: '1 yr',  location: 'Houston'     },
  { name: 'Oliver',  breed: 'Siamese Cat',      age: '2 yrs', location: 'Phoenix'     },
];

const stats = [
  { icon: '🐾', label: 'Total Applications', value: '4', sub: 'Submitted adoption requests' },
  { icon: '✅', label: 'Approved',            value: '2', sub: 'Successfully adopted pets'   },
  { icon: '⏳', label: 'Pending',             value: '1', sub: 'Applications under review'   },
  { icon: '❤️', label: 'Saved Pets',          value: '5', sub: 'Pets saved to your wishlist' },
];

const tinyBtn =
  'px-2.5 py-1 text-xs rounded-[6px] font-bold text-white bg-brand-primary ' +
  'border-none cursor-pointer transition-all duration-300 ' +
  'hover:bg-brand-secondary hover:-translate-y-0.5';

export default function Dashboard() {
  return (
    <section className="px-9 py-10 min-h-[calc(100vh-160px)] max-sm:px-4 max-sm:py-6">

      <h1 className="text-4xl max-sm:text-3xl font-extrabold leading-tight mb-2 text-brand-primary">
        My Dashboard
      </h1>
      <p className="text-sm leading-relaxed my-1 text-secondary">
        Welcome back! Here is a summary of your adoption activity.
      </p>

      {/* Stats cards */}
      <div className="flex flex-wrap justify-center gap-6 my-8 max-sm:flex-col max-sm:items-center">
        {stats.map(s => (
          <InfoCard key={s.label}>
            <h3 className="text-lg font-bold mb-1 text-primary">{s.icon} {s.label}</h3>
            <h2 className="text-2xl font-bold mb-2 text-primary">{s.value}</h2>
            <p className="text-sm leading-relaxed my-1 text-secondary">{s.sub}</p>
          </InfoCard>
        ))}
      </div>

      {/* Applications table */}
      <h2 className="text-2xl max-sm:text-xl font-bold mt-8 mb-2 text-primary">
        My Adoption Applications
      </h2>
      <div className="w-full overflow-x-auto mt-5">
        <table className="w-full min-w-[600px] border-collapse rounded-[10px] overflow-hidden text-sm shadow-sm bg-card">
          <thead className="bg-brand-primary">
            <tr>
              <Th minW="50px">ID</Th>
              <Th minW="120px">Pet Name</Th>
              <Th minW="100px">Species</Th>
              <Th minW="120px">Applied On</Th>
              <Th minW="100px">Status</Th>
              <Th minW="100px">Action</Th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, i) => (
              <TrAlt key={app.id} even={i % 2 !== 0}>
                <Td>{app.id}</Td>
                <Td>{app.pet}</Td>
                <Td>{app.species}</Td>
                <Td>{app.date}</Td>
                <Td extra={statusClass(app.status)}>{app.status}</Td>
                <Td><button className={tinyBtn}>View</button></Td>
              </TrAlt>
            ))}
          </tbody>
        </table>
      </div>

      {/* Saved pets table */}
      <h2 className="text-2xl max-sm:text-xl font-bold mt-8 mb-2 text-primary">
        Saved Pets
      </h2>
      <div className="w-full overflow-x-auto mt-5">
        <table className="min-w-[500px] max-w-[860px] border-collapse rounded-[10px] overflow-hidden text-sm shadow-sm bg-card">
          <thead className="bg-brand-primary">
            <tr>
              <Th minW="120px">Pet Name</Th>
              <Th minW="100px">Breed</Th>
              <Th minW="80px">Age</Th>
              <Th minW="100px">Location</Th>
              <Th minW="100px">Action</Th>
            </tr>
          </thead>
          <tbody>
            {saved.map((pet, i) => (
              <TrAlt key={pet.name} even={i % 2 !== 0}>
                <Td>{pet.name}</Td>
                <Td>{pet.breed}</Td>
                <Td>{pet.age}</Td>
                <Td>{pet.location}</Td>
                <Td><button className={tinyBtn}>Adopt</button></Td>
              </TrAlt>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
