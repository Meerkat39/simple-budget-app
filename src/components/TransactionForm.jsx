import { useEffect, useState } from "react";
import {
  useCategory,
  useDispatchTransaction,
} from "../context/useTransactionHooks";
import InputField from "./InputField";
import RadioGroup from "./RadioGroup";
import SelectField from "./SelectField";

const TransactionForm = () => {
  const [type, setType] = useState("収入");
  const [amount, setAmount] = useState();
  const categories = useCategory();
  const [category, setCategory] = useState(categories.収入[0]);
  const [description, setDescription] = useState();

  const dispatch = useDispatchTransaction();

  useEffect(() => {
    const currentCategoryList = categories[type];
    if (!currentCategoryList.includes(category)) {
      setCategory(currentCategoryList.length > 0 ? currentCategoryList[0] : "");
    }
  }, [categories, type, category]);

  const handleSubmit = () => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      alert("有効な金額を入力してください。");
      return;
    }

    const date = new Date().toISOString().slice(0, 10);
    dispatch({
      type: "ADD_TRANSACTION",
      payload: {
        type,
        amount: parseFloat(amount),
        category,
        date,
        description: description || "",
      },
    });

    const currentCategoryList = categories[type];
    setAmount("");
    setCategory(currentCategoryList.length > 0 ? currentCategoryList[0] : "");
    setDescription("");
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-4">収支を記録</h2>
      <RadioGroup value={type} onChange={(e) => setType(e.target.value)} />
      <InputField
        fieldName={"金額"}
        type={"number"}
        placeholder={1000}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <SelectField
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        type={type}
      />
      <InputField
        fieldName={"メモ"}
        type={"text"}
        placeholder={"ランチ代など"}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md w-full"
      >
        追加
      </button>
    </div>
  );
};

export default TransactionForm;
