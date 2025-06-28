import SummaryCard from "./SummaryCard";

const OverallSummary = ({ income, expense, balance }) => {
  return (
    <div className="flex flex-col gap-2">
      <SummaryCard label="収入" value={income} />
      <SummaryCard label="支出" value={expense} />
      <SummaryCard label="残高" value={balance} />
    </div>
  );
};

export default OverallSummary;
