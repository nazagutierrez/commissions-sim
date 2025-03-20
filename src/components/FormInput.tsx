export const FormInput = ({label, name, type, placeholder, text}: { label: string, name: string, type: string, placeholder: string, text: string }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-main-white mb-1">
        {label}
      </label>
      <input
        min={0}
        max={100000000}
        required
        name={name}
        type={type}
        className="w-full px-3 py-2 bg-bg-secondary border border-bg-secondary rounded-md text-main-white focus:outline-none focus:border-b-primary transition-colors"
        placeholder={placeholder}
      />
      <p className="mt-1 text-xs text-main-gray">{text}</p>
    </div>
  );
};
