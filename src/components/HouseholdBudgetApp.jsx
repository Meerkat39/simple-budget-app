import { useState } from "react";
import CategoryManagementPanel from "./CategoryManagementPanel";
import MonthlySummary from "./MonthlySummary";
import TransactionForm from "./TransactionForm";
import TransactionHistory from "./TransactionHistory";

const HouseholdBudgetApp = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const onClick = () => {
    setIsPanelOpen((prev) => !prev);
  };

  return (
    <>
      <button onClick={onClick}>カテゴリ管理</button>
      {isPanelOpen && <CategoryManagementPanel onClick={onClick} />}
      <TransactionForm />
      <MonthlySummary />
      <TransactionHistory />
    </>
  );
};

export default HouseholdBudgetApp;
