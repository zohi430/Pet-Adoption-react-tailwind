interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormField({
  id, label, type = 'text', placeholder, value, onChange,
}: FormFieldProps) {
  return (
    <div className="mb-3.5">
      <label htmlFor={id} className="block font-semibold text-sm mb-1 text-secondary">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 rounded-[6px] text-sm border
                   transition-all duration-300 box-border"
      />
    </div>
  );
}
