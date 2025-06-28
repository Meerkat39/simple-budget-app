const SummaryCard = ({ label, value }) => {
  return (
    <div className={`p-4 rounded-lg shadow flex justify-between items-center ${label === "収入" ? "bg-green-100 text-green-800" : label === "支出" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}`}>
      <span className="text-lg font-semibold">{label}</span>
      <span className="text-2xl font-bold">{value.toLocaleString()}円</span>
    </div>
  );
};

export default SummaryCard;
