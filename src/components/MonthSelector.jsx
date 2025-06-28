const MonthSelector = ({ value, onChange }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">月別集計</h2>
      <input
        type="month"
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default MonthSelector;
