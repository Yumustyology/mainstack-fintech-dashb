import React from "react";
import type { Transaction } from "@/lib/types/api";
import { IncomingIcon, OutgoingIcon } from "@/components/atoms/icons";
import { cn, formatUSD, fromSnake, formatDate } from "@/lib/utils";

type Props = {
  txn: Transaction;
};

const TransactionItem: React.FC<Props> = ({ txn }) => {
  return (
    <div className="flex font-degular items-start h-12  justify-between">
      <div className="flex items-start gap-3.5">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            txn.type === "withdrawal" ? "bg-[#F9E3E0]" : "bg-[#E3FCF2]"
          }`}
          aria-hidden
          title={txn.type}
        >
          {txn.type === "withdrawal" ? <OutgoingIcon /> : <IncomingIcon />}
        </div>
        <div>
          <h2 className="text-base text-ms-gray-300 font-medium">
            {txn.metadata?.product_name ??
              txn.metadata?.name ??
              "Cash withdrawal"}
          </h2>
          <div className="text-sm font-medium">
            {txn.metadata?.type ? (
              <span className="text-ms-gray-400">{fromSnake(txn.metadata?.type)}</span>
            ) : (
              (() => {
                const status = txn.status ?? ''
                const key = status.toLowerCase()
                const statusClass =
                  key === 'pending'
                    ? 'text-ms-yellow-400'
                    : key === 'successful'
                    ? 'text-ms-jade-400'
                    : 'text-ms-gray-400'
                const label = status ? status[0].toUpperCase() + status.slice(1) : ''
                return <span className={cn(`font-medium`, statusClass)}>{label}</span>
              })()
            )}
          </div>
        </div>
      </div>

      <div className="text-right">
        <h2 className="font-bold text-base text-ms-black-300">
          {formatUSD(txn.amount)}
        </h2>
        <p className="text-sm font-medium text-ms-gray-400">{formatDate(txn.date)}</p>
      </div>
    </div>
  );
};

export default TransactionItem;
