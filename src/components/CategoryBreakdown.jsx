import CategoryList from "./CategoryList";

const CategoryBreakdown = ({incomeBreakdown,expenseBreakdown}) => {
  return (
    <div>
      <h3>カテゴリ別内訳</h3>
      <CategoryList label="収入" values={incomeBreakdown}/>
      <CategoryList label="支出" values={expenseBreakdown}/>
    </div>
  );
};

export default CategoryBreakdown;
