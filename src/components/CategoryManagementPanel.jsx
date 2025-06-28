import { useCategory } from "../context/useTransactionHooks";
import CategorySection from "./CategorySection";

const CategoryManagementPanel = () => {
  const categories = useCategory();

  return (
    <div className="p-4 flex flex-col gap-6">
      <h2 className="text-2xl font-bold mb-4">カテゴリ管理</h2>
      <CategorySection title="収入カテゴリ" type="収入" categoryList={categories.収入} />
      <hr className="my-4 border-gray-300" />
      <CategorySection title="支出カテゴリ" type="支出" categoryList={categories.支出} />
    </div>
  );
};

export default CategoryManagementPanel;
