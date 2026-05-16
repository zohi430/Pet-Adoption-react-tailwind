interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}

export default function SelectField({
  id, label, value, onChange, children,
}: SelectFieldProps) {
  return (
    <div className="mb-3.5">
      <label htmlFor={id} className="block font-semibold text-sm mb-1 text-secondary">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 rounded-[6px] text-sm border
                   cursor-pointer appearance-none transition-all duration-300"
      >
        {children}
      </select>
    </div>
  );
}
