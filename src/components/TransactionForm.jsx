import { useState } from "react";
import { useDispatchTransaction } from "../context/useTransactionHooks";
import InputField from "./InputField";
import RadioGroup from "./RadioGroup";
import SelectField from "./SelectField";

const TransactionForm = () => {
  const [type, setType] = useState("収入");
  const [amount, setAmount] = useState();
  const [category, setCategory] = useState("食費");
  const [description, setDescription] = useState();

  const dispatch = useDispatchTransaction();

  const handleSubmit = () => {
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
    setAmount("");
    setCategory("食費");
    setDescription("");
  };
  /*
    type: "expense", // "income" または "expense"
    amount: 1500, // 金額
    category: "食費", // カテゴリ
    date: "2025-06-27", // 日付
    description: "ランチ", // メモ
  */

  return (
    <div>
      <h2>収支を記録</h2>
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
      <button onClick={handleSubmit}>追加</button>
    </div>
  );
};

export default TransactionForm;
