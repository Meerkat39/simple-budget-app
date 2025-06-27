import "./App.css";
import HouseholdBudgetApp from "./components/HouseholdBudgetApp";
import { TransactionProvider } from "./context/TransactionProvider";

function App() {
  return (
    <>
      <TransactionProvider>
        <HouseholdBudgetApp />
      </TransactionProvider>
    </>
  );
}

export default App;
