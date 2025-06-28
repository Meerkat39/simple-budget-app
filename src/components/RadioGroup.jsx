const RadioGroup = ({ value, onChange }) => {
  const RADIO_COLLECTION = ["収入", "支出"];

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">種類</h3>
      <div className="flex gap-4">
        {RADIO_COLLECTION.map((typeOption) => {
          return (
            <label
              key={typeOption}
              className={`
              flex-1 text-center py-2 px-4 rounded-md cursor-pointer
              transition-colors duration-200
              ${
                value === typeOption
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }
            `}
            >
              <input
                type="radio"
                value={typeOption}
                checked={value === typeOption}
                onChange={onChange}
                className="sr-only"
              />
              {typeOption}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default RadioGroup;
