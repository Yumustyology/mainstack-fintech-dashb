import React, { useEffect, useMemo, useCallback } from "react";
import useSWR from "swr";
import { getTransactions } from "@/lib/actions";
import type { Transaction } from "@/lib/types/api";
import TransactionShimmer from "@/components/atoms/shimmers/TransactionShimmer";
import FilterDrawer from "./FilterDrawer";
import {
  setTransactions,
  transactionsFilterEntity
} from "@/lib/entities/transactions.entity";
import { getDateRangeFromPreset } from '@/lib/datePresets';
import { exportTransactionsCsv } from '@/lib/exportCsv';
import IconButton from "../atoms/buttons/IconButton";
import TransactionItem from "./TransactionItem";
import { ExportIcon } from "../atoms/icons";
import { useEntity } from "simpler-state";

const fetcher = async (): Promise<Transaction[]> => {
  return getTransactions();
};

const TransactionsList: React.FC = () => {
  const { data, error, isLoading } = useSWR<Transaction[]>(
    "transactions",
    fetcher
  );

  const filterState = useEntity(transactionsFilterEntity);
  useEffect(() => {
    if (data) {
      setTransactions(data);
    }
  }, [data]);


  const items = useMemo(() => {
    if (!data) return [];

    return data.filter((transaction) => {
      let fromDate: Date | null = null;
      let toDate: Date | null = null;

      if (filterState.preset) {
        const presetDates = getDateRangeFromPreset(filterState.preset);
        fromDate = presetDates.from;
        toDate = presetDates.to;
      } else {
        fromDate = filterState.from ? new Date(`${filterState.from}T00:00:00`) : null;
        toDate = filterState.to ? new Date(`${filterState.to}T23:59:59`) : null;
      }

      if ((fromDate || toDate) && transaction.date) {
        const txDate = new Date(transaction.date);
        if (fromDate && txDate < fromDate) return false;
        if (toDate && txDate > toDate) return false;
      }

      if (filterState.type && filterState.type !== 'all') {
        const typeFilters = String(filterState.type)
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);
          
        const matchesType = typeFilters.some(
          (tf) => tf === transaction.type || tf === transaction.metadata?.type
        );
        
        if (!matchesType) return false;
      }

      if (filterState.status && filterState.status !== 'all') {
        const statusFilters = String(filterState.status)
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);

        if (!transaction.status) return false;
        
        const matchesStatus = statusFilters.some(
          (sf) => sf === transaction.status
        );
        
        if (!matchesStatus) return false;
      }

      return true;
    });
  }, [data, filterState]);

  const handleExport = useCallback(() => {
    exportTransactionsCsv(items)
  }, [items]);


  if (error)
    return (
      <div className="text-sm text-red-500">Failed to load transactions</div>
    );

  return (
    <div className="p-4">
      <div className="flex font-degular items-center justify-between mb-14">
        <div>
          <h3 className="text-2xl font-bold text-ms-black-300">
            {items.length} Transactions
          </h3>
          <div className="text-sm font-medium text-ms-gray-400">
            Your transactions for the last 7 days
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FilterDrawer />
          <IconButton
            className="rounded-full bg-ms-gray-50 flex text-ms-black-300 text-base font-semibold hover:bg-ms-gray-50 shadow-none h-12 py-3 min-w-[107px] items-center gap-1"
            icon={<ExportIcon />}
            onClick={handleExport}
          >
            Export list
          </IconButton>
        </div>
      </div>

      <div className="space-y-6">
        {isLoading && <TransactionShimmer rows={3} />}

        {!isLoading && items && items.length > 0 && (
          <>
            {items.map((t, i) => (
              <div key={t.payment_reference ?? `txn-${i}`}>
                <TransactionItem txn={t} />
              </div>
            ))}
          </>
        )}

        {!isLoading && (!items || items.length === 0) && (
          <div className="text-sm text-ms-gray-400">No transactions</div>
        )}
      </div>
    </div>
  );
};

export default TransactionsList;