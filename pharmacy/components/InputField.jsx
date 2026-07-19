function InputField({ label, type, name, placeholder, onChange, value, Icon }) {
  return (
    <div className="flex flex-col gap-2">
      <label>{label}</label>

      <div
        className="
          flex items-center gap-3 border border-gray-300 rounded-md p-3
           focus-within:outline-2 focus-within:outline-blue-600
        "
      >
        <Icon className="w-5 h-5 text-gray-300" />
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          className="outline-none w-full"
        />
      </div>
    </div>
  );
}

export default InputField;
