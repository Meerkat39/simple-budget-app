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
      payload: { type, name: newCategory },
    });

    setNewCategory("");
  };

  const handleDelete = (categoryName) => {
    dispatch({
      type: "DELETE_CATEGORY",
      payload: { type, name: categoryName },
    });
  };

  return (
    <div>
      <h3>{title}</h3>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          type="text"
          value={newCategory}
          onChange={(e) => {
            setNewCategory(e.target.value);
          }}
          placeholder="新しいカテゴリ名"
        />
        <button type="submit">+</button>
      </form>
      <ul>
        {categoryList.map((category) => {
          return (
            <li key={category}>
              {category}
              <button onClick={() => handleDelete(category)}>削除</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategorySection;
