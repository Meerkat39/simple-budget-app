// context/TransactionProvider.jsx
import { useReducer } from "react";
import {
  CategoryContext,
  CategoryDispatchContext,
  TransactionContext,
  TransactionDispatchContext,
} from "./TransactionContext";

const transactionList = [
  {
    id: 1,
    type: "収入",
    amount: 100000,
    category: "給料",
    date: "2025-06-30",
    description: "6月分給与",
  },
  {
    id: 2,
    type: "支出",
    amount: 5000,
    category: "食費",
    date: "2025-07-01",
    description: "スーパーでの買い物",
  },
  {
    id: 3,
    type: "支出",
    amount: 12000,
    category: "交通費",
    date: "2025-07-02",
    description: "定期券代",
  },
  {
    id: 4,
    type: "収入",
    amount: 20000,
    category: "副業",
    date: "2025-07-03",
    description: "フリーランス案件報酬",
  },
];

const transactionReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return [...state, { ...action.payload, id: Date.now() }];
    case "DELETE_TRANSACTION":
      return state.filter((transaction) => transaction.id !== action.payload);
    default:
      return state;
  }
};

const initialCategories = {
  収入: ["給料", "副業", "その他収入"],
  支出: ["食費", "交通費", "娯楽費", "光熱費", "その他支出"],
};

const categoryReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CATEGORY": {
      const { type, name } = action.payload;
      return {
        ...state,
        [type]: [...state[type], name],
      };
    }
    case "DELETE_CATEGORY": {
      const { type, name } = action.payload;
      return {
        ...state,
        [type]: state[type].filter((category) => category !== name),
      };
    }
    default:
      return state;
  }
};

export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, transactionList);
  const [categoryState, categoryDispatch] = useReducer(
    categoryReducer,
    initialCategories
  );

  return (
    <CategoryContext.Provider value={categoryState}>
      <CategoryDispatchContext.Provider value={categoryDispatch}>
        <TransactionContext.Provider value={state}>
          <TransactionDispatchContext.Provider value={dispatch}>
            {children}
          </TransactionDispatchContext.Provider>
        </TransactionContext.Provider>
      </CategoryDispatchContext.Provider>
    </CategoryContext.Provider>
  );
};
