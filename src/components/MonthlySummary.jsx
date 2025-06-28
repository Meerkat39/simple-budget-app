import { useEffect, useState } from "react";
import { useTransaction } from "../context/useTransactionHooks";
import CategoryBreakdown from "./CategoryBreakdown";
import MonthSelector from "./MonthSelector";
import OverallSummary from "./OverallSummary";

const MonthlySummary = () => {
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );
  const transactions = useTransaction();

  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
    categoryBreakdown: { income: {}, expense: {} },
  });

  useEffect(() => {
    const monthTransactions = transactions.filter((transaction) =>
      transaction.date.startsWith(selectedMonth)
    );

    const income = monthTransactions
      .filter((transaction) => transaction.type === "収入")
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    const expense = monthTransactions
      .filter((transaction) => transaction.type === "支出")
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    const balance = income - expense;

    const categoryBreakdown = { income: {}, expense: {} };
    monthTransactions
      .filter((transaction) => transaction.type === "収入")
      .forEach((transaction) => {
        categoryBreakdown.income[transaction.category] =
          (categoryBreakdown.income[transaction.category] || 0) +
          transaction.amount;
      });

    monthTransactions
      .filter((transaction) => transaction.type === "支出")
      .forEach((transaction) => {
        categoryBreakdown.expense[transaction.category] =
          (categoryBreakdown.expense[transaction.category] || 0) +
          transaction.amount;
      });

    setSummary({
      income,
      expense,
      balance,
      categoryBreakdown,
    });
  }, [transactions, selectedMonth]);

  return (
    <div className="flex flex-col gap-4">
      <MonthSelector
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      />
      <OverallSummary
        income={summary.income}
        expense={summary.expense}
        balance={summary.balance}
      />
      <CategoryBreakdown
        incomeBreakdown={summary.categoryBreakdown.income}
        expenseBreakdown={summary.categoryBreakdown.expense}
      />
    </div>
  );
};

export default MonthlySummary;
