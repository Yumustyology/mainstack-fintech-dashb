import useHeaderOffset from "@/lib/hooks/useHeaderOffset";
import WalletBalance from "../molecules/WalletBalance";
import TransactionChart from "./TransactionChart";
import LedgerBalance from "../molecules/LedgerBalance";
import TransactionsList from "../molecules/TransactionsList";

const DashboardContent = () => {
  const headerOffset = useHeaderOffset();

  const marginTop = `calc(${headerOffset} + 56px)`;

  return (
    <div className="sm:ml-20 min-h-screen mr-36" style={{ marginTop }}>
      <div className="flex gap-[124px] w-full mb-24">
        <div className="flex-grow">
          <WalletBalance />
          <TransactionChart />
        </div>
        <LedgerBalance />
      </div>
      <TransactionsList />
    </div>
  );
};

export default DashboardContent;
