import CategoryList from "./CategoryList";

const CategoryBreakdown = ({incomeBreakdown,expenseBreakdown}) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl font-bold mb-4">カテゴリ別内訳</h3>
      <CategoryList label="収入" values={incomeBreakdown}/>
      <CategoryList label="支出" values={expenseBreakdown}/>
    </div>
  );
};

export default CategoryBreakdown;
