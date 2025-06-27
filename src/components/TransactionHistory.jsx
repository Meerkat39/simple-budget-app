import {
  useDispatchTransaction,
  useTransaction,
} from "../context/useTransactionHooks";

const TransactionHistory = () => {
  const transactions = useTransaction();
  const dispatch = useDispatchTransaction();
  const handleSubmit = (id) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
  };

  return (
    <div>
      <h2>取引履歴</h2>
      {transactions.map((transaction) => {
        return (
          <p key={transaction.id}>
            {transaction.description}:{transaction.amount}
            <button
              onClick={() => {
                handleSubmit(transaction.id);
              }}
            >
              削除
            </button>
          </p>
        );
      })}
    </div>
  );
};

export default TransactionHistory;
