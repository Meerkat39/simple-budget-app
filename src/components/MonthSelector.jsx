const MonthSelector = ({ value, onChange }) => {
  return (
    <div>
      <h2>月別集計</h2>
      <input type="month" value={value} onChange={onChange} />
    </div>
  );
};

export default MonthSelector;
