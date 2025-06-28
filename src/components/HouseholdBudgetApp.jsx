import { useState } from "react";
import AppHeader from "./AppHeader";
import CategoryManagementPanel from "./CategoryManagementPanel";
import Modal from "./Modal";
import MonthlySummary from "./MonthlySummary";
import TransactionForm from "./TransactionForm";
import TransactionHistory from "./TransactionHistory";

const HouseholdBudgetApp = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const handleCategoryManageClick = () => {
    setIsPanelOpen(true);
  };
  const handleClosePanel = () => {
    setIsPanelOpen(false);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col gap-4 bg-gray-100 shadow-lg rounded-lg">
      <AppHeader onCategoryManageClick={handleCategoryManageClick} />
      {isPanelOpen && (
        <Modal onClose={handleClosePanel}>
          <CategoryManagementPanel />
        </Modal>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <TransactionForm />
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <MonthlySummary />
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <TransactionHistory />
        </div>
      </div>
    </div>
  );
};

export default HouseholdBudgetApp;
