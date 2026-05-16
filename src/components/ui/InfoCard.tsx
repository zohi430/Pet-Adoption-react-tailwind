interface InfoCardProps {
  children: React.ReactNode;
}

export default function InfoCard({ children }: InfoCardProps) {
  return (
    <div className="flex flex-col w-72 max-sm:w-[90%] max-sm:max-w-sm
                    bg-card border border-border-token rounded-[10px] p-4
                    text-center shadow-sm
                    transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      {children}
    </div>
  );
}
