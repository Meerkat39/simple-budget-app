import { useCategory } from "../context/useTransactionHooks";

const SelectField = ({ value, onChange, type }) => {
  const categories = useCategory()[type];

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">カテゴリ</h3>
      <select
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {categories.map((opt) => {
          return (
            <option key={opt} value={opt}>
              {opt}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectField;
