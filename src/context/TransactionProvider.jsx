// context/TransactionProvider.jsx
import { useReducer } from "react";
import {
  TransactionContext,
  TransactionDispatchContext,
} from "./TransactionContext";

const transactionList = [
  {
    id: 1,
    type: "収入",
    amount: 1500,
    category: "給料",
    date: "2025-06-27",
    description: "ランチ",
  },
  {
    id: 2,
    type: "支出",
    amount: 1500,
    category: "食費",
    date: "2025-06-27",
    description: "ランチ",
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

export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, transactionList);

  return (
    <TransactionContext.Provider value={state}>
      <TransactionDispatchContext.Provider value={dispatch}>
        {children}
      </TransactionDispatchContext.Provider>
    </TransactionContext.Provider>
  );
};
