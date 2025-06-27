const RadioGroup = ({ value, onChange }) => {
  const RADIO_COLLECTION = ["収入", "支出"];

  return (
    <>
      <h3>種類</h3>
      {RADIO_COLLECTION.map((type) => {
        return (
          <label key={type}>
            <input
              type="radio"
              value={type}
              checked={value === type}
              onChange={onChange}
            />
            {type}
          </label>
        );
      })}
    </>
  );
};

export default RadioGroup;
