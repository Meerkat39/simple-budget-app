const CategoryList = ({ label, values }) => {
  const dataEntries = Object.entries(values || {}); // values が undefined の場合も考慮
  if (dataEntries.length === 0) return null;

  return (
    <div>
      {dataEntries.map((data) => {
        return (
          <div key={data.category}>
            <h4>{label}</h4>
            {data.category} : {data.amount}
          </div>
        );
      })}
    </div>
  );
};

export default CategoryList;
