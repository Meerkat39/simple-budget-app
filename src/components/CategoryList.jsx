const CategoryList = ({ label, values }) => {
  const categoryEntries = Object.entries(values || {});
  if (categoryEntries.length === 0) return null;

  return (
    <div>
      <h4>{label}</h4>
      {categoryEntries.map(([category, amount]) => {
        return (
          <div key={category}>
            {category} : {amount}
          </div>
        );
      })}
    </div>
  );
};

export default CategoryList;
