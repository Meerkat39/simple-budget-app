import { useCategory } from "../context/useTransactionHooks";
import CategorySection from "./CategorySection";

const CategoryManagementPanel = () => {
  const categories = useCategory();

  return (
    <div>
      <h2>カテゴリ管理</h2>
      <CategorySection title="収入カテゴリ" type="収入" categoryList={categories.収入} />
      <CategorySection title="支出カテゴリ" type="支出" categoryList={categories.支出} />
    </div>
  );
};

export default CategoryManagementPanel;
