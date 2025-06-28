import {
  useDispatchTransaction,
  useTransaction,
} from "../context/useTransactionHooks";

const TransactionHistory = () => {
  const transactions = useTransaction();
  const dispatch = useDispatchTransaction();
  const handleSubmit = (id) => {
    if (window.confirm("この取引を削除しますか？")) {
      dispatch({ type: "DELETE_TRANSACTION", payload: id });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-4">取引履歴</h2>
      {transactions.map((transaction) => {
        return (
          <div
            key={transaction.id}
            className={`
              flex justify-between items-center p-3 rounded-md border border-gray-200
              ${transaction.type === "収入" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}
            `}
          >
            <span className="font-medium flex-grow mr-2">
              {transaction.date}: {transaction.type}:{transaction.amount.toLocaleString()}円 ({transaction.category}) - {transaction.description}
            </span>
            <button
              onClick={() => {
                handleSubmit(transaction.id);
              }}
              className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded-md flex-shrink-0"
            >
              削除
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default TransactionHistory;
