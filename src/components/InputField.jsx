const InputField = ({ fieldName, type, placeholder, value, onChange }) => {
  return (
    <div>
      <h3>{fieldName}</h3>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
