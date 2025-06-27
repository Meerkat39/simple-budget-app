const OPTIONS_MAP = {
  収入: ["給料", "副業", "その他収入"],
  支出: ["食費", "交通費", "娯楽費", "光熱費", "その他支出"],
};

const SelectField = ({ value, onChange, type }) => {
  const OPTIONS = OPTIONS_MAP[type] || [];

  return (
    <div>
      <h3>カテゴリ</h3>
      <select value={value} onChange={onChange}>
        {OPTIONS.map((opt) => {
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
