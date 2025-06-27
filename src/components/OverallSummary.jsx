import SummaryCard from "./SummaryCard";

const OverallSummary = ({ income, expense, balance }) => {
  return (
    <>
      <SummaryCard label="収入" value={income} />
      <SummaryCard label="支出" value={expense} />
      <SummaryCard label="残高" value={balance} />
    </>
  );
};

export default OverallSummary;
