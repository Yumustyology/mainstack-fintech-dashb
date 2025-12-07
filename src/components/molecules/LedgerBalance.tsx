import React from "react";
import useSWR from "swr";
import { InfoIcon } from "../atoms/icons";
import { getWallet } from "@/lib/actions";
import type { WalletResponse } from "@/lib/types/api";
import { formatUSD } from "@/lib/utils";

type Item = {
  id: string;
  title: string;
  amount: string;
};

const ITEMS: Item[] = [
  { id: "ledger", title: "Ledger Balance", amount: "" },
  { id: "payout", title: "Total Payout", amount: "" },
  { id: "revenue", title: "Total Revenue", amount: "" },
  { id: "pending", title: "Pending Payout", amount: "" },
];

const fetcher = async (): Promise<WalletResponse> => {
  return getWallet();
};

const LedgerBalance: React.FC = () => {
  const { data, error } = useSWR<WalletResponse>("wallet", fetcher);

  const amounts = {
    ledger: data?.ledger_balance ?? undefined,
    payout: data?.total_payout ?? undefined,
    revenue: data?.total_revenue ?? undefined,
    pending: data?.pending_payout ?? undefined,
    balance: data?.balance ?? undefined,
  };

  return (
    <div className="space-y-6 w-[271px]">
      {ITEMS.map((it) => (
        <div key={it.id} className="w-full">
          <div className="flex justify-between w-full">
            <h2 className="text-ms-gray-400 text-sm mb-2 font-medium">
              {it.title}
            </h2>
            <div className="ml-2">
              <InfoIcon color="#888F95" className="w-5 h-5 cursor-pointer" />
            </div>
          </div>
          <h1 className="text-ms-black-300 text-4xl font-bold">
            {formatUSD(
              amounts[it.id as keyof typeof amounts] as number | undefined
            )}
          </h1>
        </div>
      ))}
      {error && (
        <div className="text-sm text-red-500">Failed to load wallet</div>
      )}
    </div>
  );
};

export default LedgerBalance;
