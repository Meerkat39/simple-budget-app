import { useCategory } from "../context/useTransactionHooks";

const SelectField = ({ value, onChange, type }) => {
  const categories = useCategory()[type];

  return (
    <div>
      <h3>カテゴリ</h3>
      <select value={value} onChange={onChange}>
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
