// context/useTransactionHooks.js
import { useContext } from "react";
import {
  CategoryContext,
  CategoryDispatchContext,
  TransactionContext,
  TransactionDispatchContext,
} from "./TransactionContext";

export const useTransaction = () => useContext(TransactionContext);
export const useDispatchTransaction = () =>
  useContext(TransactionDispatchContext);
export const useCategory = () => useContext(CategoryContext);
export const useDispatchCategory = () => useContext(CategoryDispatchContext);
