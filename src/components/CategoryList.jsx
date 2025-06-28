const CategoryList = ({ label, values }) => {
  const categoryEntries = Object.entries(values || {});
  if (categoryEntries.length === 0) return null;

  return (
    <div className={`p-2 rounded-lg ${label === "収入" ? "bg-green-50" : "bg-red-50"}`}>
      <h4 className={`text-lg font-semibold mb-2 ${label === "収入" ? "text-green-700" : "text-red-700"}`}>{label}</h4>
      {categoryEntries.map(([category, amount]) => {
        return (
          <div key={category} className={`flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0 ${label === "収入" ? "text-green-600" : "text-red-600"}`}>
            <span>{category}</span>
            <span>{amount.toLocaleString()}円</span>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryList;
