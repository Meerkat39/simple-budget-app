const InputField = ({ fieldName, type, placeholder, value, onChange }) => {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">{fieldName}</h3>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded-md focus:outine-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default InputField;
