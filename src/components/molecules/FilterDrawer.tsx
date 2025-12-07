import React, { useState, useMemo } from "react";
import type { Transaction } from "@/lib/types/api";
import { CaretDown, CloseIcon } from "@/components/atoms/icons";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import IconButton from "../atoms/buttons/IconButton";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import DateSelect from "../atoms/DateSelect";
import useSWR from "swr";
import { getTransactions } from "@/lib/actions";
import {
  deriveTypeOptions,
  deriveStatusOptions,
  FALLBACK_TYPE_OPTIONS,
  FALLBACK_STATUS_OPTIONS,
} from "@/lib/utils";
import { presets } from "@/lib/datePresets";

type TxType = Transaction["type"];

import {
  setTransactionsFilter,
  resetTransactionsFilter,
} from "@/lib/entities/transactions.entity";
import CheckboxMultiselect from "../atoms/CheckboxMultiselect";

type Props = {
  className?: string;
};

const FilterDrawer: React.FC<Props> = ({ className }) => {
  const [open, setOpen] = useState(false);
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [activePreset, setActivePreset] = useState<
    "today" | "last7" | "month" | "last3" | null
  >(null);
  const [type, setType] = useState<TxType | "all">("all");
  const [status, setStatus] = useState<string>("all");
  const [selectedStatusValues, setSelectedStatusValues] = useState<
    { value: string; label: string }[]
  >([]);
  const [selectedValues, setSelectedValues] = useState<
    { value: string; label: string }[]
  >([]);

  const { data: txData } = useSWR<Transaction[]>("transactions", () =>
    getTransactions()
  );

  const typeOptions = useMemo(
    () => deriveTypeOptions(txData, FALLBACK_TYPE_OPTIONS),
    [txData]
  );

  const statusOptions = useMemo(
    () => deriveStatusOptions(txData, FALLBACK_STATUS_OPTIONS),
    [txData]
  );

  const canApply = Boolean(
    from ||
      to ||
      type !== "all" ||
      status !== "all" ||
      selectedValues.length > 0 ||
      selectedStatusValues.length > 0
  );

  const filterCount = useMemo(() => {
    let count = 0
    if (from) count += 1
    if (to) count += 1
    if (activePreset) count += 1
    // selectedValues / selectedStatusValues should count individually
    count += selectedValues.length
    count += selectedStatusValues.length
    // Only count type/status if multiselects are not being used for them
    if (selectedValues.length === 0 && type !== 'all') count += 1
    if (selectedStatusValues.length === 0 && status !== 'all') count += 1
    return count
  }, [from, to, activePreset, selectedValues, selectedStatusValues, type, status])

  const handleDateChange = (value: string | null, isFrom: boolean) => {
    const newValue = value || "";

    if (isFrom) {
      setFrom(newValue);
    } else {
      setTo(newValue);
    }

    if (activePreset) {
      setActivePreset(null);
    }
  };

  const clearAll = (close = false) => {
    setFrom("");
    setTo("");
    setType("all");
    setStatus("all");
    setSelectedValues([]);
    setSelectedStatusValues([]);
    setActivePreset(null);
    resetTransactionsFilter();
    if (close) setOpen(false);
  };

  return (
    <Drawer side="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <IconButton
          className="rounded-full bg-ms-gray-50 flex text-ms-black-300 text-base font-semibold hover:bg-ms-gray-50 shadow-none h-12 py-3 min-w-[107px] items-center gap-1 relative"
          icon={<CaretDown />}
        >
          <span className="flex items-center gap-2">
            <span>Filter</span>
            {filterCount > 0 && (
              <span className="inline-flex items-center justify-center bg-ms-black-300 text-white text-xs font-semibold rounded-full h-5 min-w-[20px] px-1">
                {filterCount}
              </span>
            )}
          </span>
        </IconButton>
      </DrawerTrigger>

      <DrawerContent className="bg-transparent font-degular h-screen border-none mr-4 w-auto">
        <div className="relative w-full h-full flex items-center justify-end">
          <div
            className={cn(
              "w-[456px] bg-white rounded-lg shadow-lg pointer-events-auto flex flex-col h-[95vh]",
              className
            )}
          >
            <DrawerHeader className="px-6 py-5 flex items-center justify-between">
              <DrawerTitle
                className={cn(
                  "font-degular text-2xl text-ms-black-300 font-bold"
                )}
              >
                Filter
              </DrawerTitle>
              <DrawerClose asChild>
                <button
                  type="button"
                  onClick={() => clearAll(true)}
                  className="rounded-full p-1"
                  aria-label="Cancel and clear filters"
                >
                  <CloseIcon />
                </button>
              </DrawerClose>
            </DrawerHeader>

            <div className="p-4 space-y-4 overflow-auto flex-1">
              <div className="flex items-center gap-3">
                {presets.map((p) => (
                  <Button
                    key={p.key}
                    variant="outline"
                    className={cn(
                      "border border-ms-gray-50 h-9 rounded-full shadow-none text-sm font-semibold font-degular",
                      activePreset === p.key && "!bg-ms-black-300 !text-white"
                    )}
                    onClick={() => {
                      const [f, t] = p.range();
                      setFrom(f);
                      setTo(t);
                      setActivePreset(p.key);
                    }}
                    aria-pressed={activePreset === p.key}
                  >
                    {p.label}
                  </Button>
                ))}
              </div>

              <div className="mb-6">
                <h2 className="text-base font-semibold text-ms-black-300 mb-3 mt-7">
                  Date Range
                </h2>
                <div className="flex gap-2">
                  <DateSelect
                    value={from}
                    onChange={(v) => handleDateChange(v ?? null, true)}
                    placeholder="From"
                    className="flex-1 shadow-none "
                  />
                  <DateSelect
                    value={to}
                    onChange={(v) => handleDateChange(v ?? null, false)}
                    placeholder="To"
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-base font-semibold text-ms-black-300 mb-3 mt-7">
                  Transaction Type
                </h2>
                <CheckboxMultiselect
                  className="bg-ms-gray-50 border h-[48px] border-ms-gray-50"
                  options={typeOptions}
                  value={selectedValues}
                  onChange={setSelectedValues}
                  placeholder="Select transaction types..."
                  emptyIndicator="No results found"
                />
              </div>

              <div className="mb-6">
                <h2 className="text-base font-semibold text-ms-black-300 mb-3 mt-7">
                  Transaction Status
                </h2>
                <CheckboxMultiselect
                  className="bg-ms-gray-50 border h-[48px] border-ms-gray-50"
                  options={statusOptions}
                  value={selectedStatusValues}
                  onChange={setSelectedStatusValues}
                  placeholder="Select statuses..."
                  emptyIndicator="No statuses found"
                />
              </div>
            </div>

            <DrawerFooter>
              <div className="flex items-center gap-3 justify-between">
                <Button
                  variant="outline"
                  className="py-3 rounded-full shadow-none text-base text-ms-black-300 font-semibold font-degular w-full h-[48px] bg-transparent border border-ms-gray-50"
                  onClick={() => clearAll(false)}
                >
                  Clear
                </Button>
                <Button
                  type="button"
                  disabled={!canApply}
                  onClick={() => {
                    if (!canApply) return;
                    setTransactionsFilter({
                      preset: activePreset || undefined,
                      from: from || null,
                      to: to || null,
                      type:
                        selectedValues.length > 0
                          ? selectedValues.map((s) => s.value).join(",")
                          : type,
                      status:
                        selectedStatusValues.length > 0
                          ? selectedStatusValues.map((s) => s.value).join(",")
                          : status,
                    });
                    setOpen(false);
                  }}
                  className={cn(
                    "py-3 rounded-full shadow-none text-base text-white bg-ms-black-300 font-semibold font-degular w-full h-[48px] border border-ms-gray-50",
                    !canApply && "opacity-50 cursor-not-allowed"
                  )}
                >
                  Apply
                </Button>
              </div>
            </DrawerFooter>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FilterDrawer;
