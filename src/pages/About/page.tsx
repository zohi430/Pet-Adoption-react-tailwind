import InfoCard from '../../components/ui/InfoCard';

const impact = [
  { year: '2020', adopted: '312',   shelters: '8',  volunteers: '45'  },
  { year: '2021', adopted: '587',   shelters: '14', volunteers: '92'  },
  { year: '2022', adopted: '814',   shelters: '21', volunteers: '150' },
  { year: '2023', adopted: '964',   shelters: '28', volunteers: '210' },
  { year: '2024', adopted: '1,102', shelters: '35', volunteers: '290' },
  { year: '2025', adopted: '1,340', shelters: '42', volunteers: '380' },
];

const values = [
  { icon: '❤️', title: 'Compassion',   desc: 'Every animal deserves love and safety. We treat every pet with dignity and care throughout the adoption process.' },
  { icon: '🔍', title: 'Transparency', desc: 'We provide honest, complete information about each pet so families can make well-informed decisions.'             },
  { icon: '🤝', title: 'Community',    desc: 'We partner with local shelters, vets, and volunteers to build a strong support network for adopters.'             },
];

const team = [
  { name: 'Sarah Mitchell', role: 'Founder & CEO',      desc: 'Veterinarian with 15 years of experience and a lifelong love for animals.'      },
  { name: 'James Okafor',   role: 'Head of Adoptions',  desc: 'Coordinates pet placements and ensures every match is a perfect fit.'           },
  { name: 'Priya Sharma',   role: 'Veterinary Partner', desc: 'Oversees all health screenings and provides follow-up care guidance.'           },
  { name: 'Tom Rivera',     role: 'Community Manager',  desc: 'Manages foster networks and volunteer programs across partner shelters.'         },
];

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl max-sm:text-xl font-bold mt-8 mb-2 text-primary">
      {children}
    </h2>
  );
}

function TrAlt({ children, even }: { children: React.ReactNode; even: boolean }) {
  return (
    <tr className={`cursor-pointer transition-colors duration-200
                    hover:bg-brand-primary/10
                    ${even ? 'bg-main' : 'bg-card'}`}>
      {children}
    </tr>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return (
    <td className="px-4 py-3 border-b border-border-token text-primary
                   max-w-[280px] overflow-hidden text-ellipsis whitespace-nowrap">
      {children}
    </td>
  );
}

export default function About() {
  return (
    <section className="px-9 py-10 min-h-[calc(100vh-160px)] max-sm:px-4 max-sm:py-6">

      <h1 className="text-4xl max-sm:text-3xl font-extrabold leading-tight mb-2 text-brand-primary">
        About Us
      </h1>
      <p className="text-sm leading-relaxed my-1 text-secondary">
        We are a passionate team of animal lovers dedicated to connecting homeless pets with caring families.
        Since 2020, we have helped over 3,000 animals find their forever homes.
      </p>

      <SectionHeading>Our Mission</SectionHeading>
      <p className="text-sm leading-relaxed my-1 text-secondary">
        To eliminate animal homelessness by building a trusted, transparent, and compassionate adoption
        platform that empowers both adopters and shelters.
      </p>

      <SectionHeading>Our Values</SectionHeading>
      <div className="flex flex-wrap justify-center gap-6 my-8 max-sm:flex-col max-sm:items-center">
        {values.map(v => (
          <InfoCard key={v.title}>
            <h3 className="text-lg font-bold mb-1 text-primary">{v.icon} {v.title}</h3>
            <p className="text-sm leading-relaxed my-1 text-secondary">{v.desc}</p>
          </InfoCard>
        ))}
      </div>

      <SectionHeading>Meet the Team</SectionHeading>
      <div className="flex flex-wrap justify-center gap-6 my-8 max-sm:flex-col max-sm:items-center">
        {team.map(m => (
          <InfoCard key={m.name}>
            <h3 className="text-lg font-bold mb-1 text-primary">{m.name}</h3>
            <h4 className="text-base font-semibold mb-1 text-secondary">{m.role}</h4>
            <p className="text-sm leading-relaxed my-1 text-secondary">{m.desc}</p>
          </InfoCard>
        ))}
      </div>

      <SectionHeading>Our Impact</SectionHeading>
      <div className="w-full overflow-x-auto mt-5">
        <table className="w-full border-collapse rounded-[10px] overflow-hidden text-sm shadow-sm bg-card">
          <thead className="bg-brand-primary text-white">
            <tr>
              {['Year', 'Pets Adopted', 'Partner Shelters', 'Volunteers'].map(h => (
                <th key={h} className="px-4 py-3 text-left font-bold text-xs uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {impact.map((row, i) => (
              <TrAlt key={row.year} even={i % 2 !== 0}>
                <Td>{row.year}</Td>
                <Td>{row.adopted}</Td>
                <Td>{row.shelters}</Td>
                <Td>{row.volunteers}</Td>
              </TrAlt>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
