import { useState } from "react";
import { useDispatchCategory } from "../context/useTransactionHooks";

const CategorySection = ({ title, type, categoryList }) => {
  const [newCategory, setNewCategory] = useState("");
  const dispatch = useDispatchCategory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newCategory.trim()) {
      alert("カテゴリ名を入力してください。");
      return;
    }

    dispatch({
      type: "ADD_CATEGORY",
      payload: { type, name: newCategory.trim() },
    });

    setNewCategory("");
  };

  const handleDelete = (categoryName) => {
    if (window.confirm(`「${categoryName}」を削除しますか？`)) {
      dispatch({
        type: "DELETE_CATEGORY",
        payload: { type, name: categoryName },
      });
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="flex gap-2 mb-4"
      >
        <input
          type="text"
          value={newCategory}
          onChange={(e) => {
            setNewCategory(e.target.value);
          }}
          placeholder="新しいカテゴリ名"
          className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md">+</button>
      </form>
      <ul className="space-y-2">
        {categoryList.map((category) => {
          return (
            <li key={category} className="flex justify-between items-center bg-gray-50 p-3 rounded-md border border-gray-200">
              {category}
              <button onClick={() => handleDelete(category)} className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded-md">削除</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategorySection;
