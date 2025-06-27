// context/useTransactionHooks.js
import { useContext } from "react";
import {
  TransactionContext,
  TransactionDispatchContext,
} from "./TransactionContext";

export const useTransaction = () => useContext(TransactionContext);
export const useDispatchTransaction = () =>
  useContext(TransactionDispatchContext);
