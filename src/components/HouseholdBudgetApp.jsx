import CategoryManagementPanel from "./CategoryManagementPanel";
import MonthlySummary from "./MonthlySummary";
import TransactionForm from "./TransactionForm";
import TransactionHistory from "./TransactionHistory";

const HouseholdBudgetApp = () => {
  return (
    <>
      <CategoryManagementPanel />
      <TransactionForm />
      <MonthlySummary />
      <TransactionHistory />
    </>
  );
};

export default HouseholdBudgetApp;
