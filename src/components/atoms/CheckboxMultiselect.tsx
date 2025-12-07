import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

type Option = {
  value: string;
  label: string;
  disable?: boolean;
};

type Props = {
  options?: Option[];
  value?: Option[];
  onChange?: (selected: Option[]) => void;
  placeholder?: string;
  className?: string;
  emptyIndicator?: string;
};

const CheckboxMultiselect: React.FC<Props> = ({
  options = [],
  value = [],
  onChange,
  placeholder = "Select options...",
  className,
  emptyIndicator = "No results found",
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option[]>(value);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const isEqual =
      selected.length === value.length &&
      selected.every((s, i) => s.value === value[i]?.value);

    if (!isEqual) {
      Promise.resolve().then(() => setSelected(value));
    }
  }, [value, selected]);

  const [contentWidth, setContentWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!open) return;
    const measure = () => setContentWidth(triggerRef.current?.offsetWidth);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [open]);

  const toggle = (option: Option) => {
    if (option.disable) return;
    const exists = selected.some((s) => s.value === option.value);
    const next = exists ? selected.filter((s) => s.value !== option.value) : [...selected, option];
    setSelected(next);
    onChange?.(next);
  };

  const displayValue = selected.length ? selected.map((s) => s.label).join(", ") : placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          ref={triggerRef}
          type="button"
          className={cn(
            "border-input focus-visible:border-ring focus-visible:ring-ring/50 flex h-10 w-full items-center justify-between rounded-md border bg-transparent px-3 py-2 text-sm transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
        >
          <span className={cn("truncate text-left", !selected.length && "text-muted-foreground")}>{displayValue}</span>
          <ChevronDown className={cn("ml-2 h-4 w-4 shrink-0 opacity-50 transition-transform", open && "rotate-180")} />
        </button>
      </PopoverTrigger>

      <PopoverContent align="start" className="p-1" style={contentWidth ? { width: contentWidth } : undefined}>
        <div role="listbox" aria-multiselectable className="max-h-[220px] overflow-auto">
          {options.length === 0 && (
            <div className="py-6 text-center text-sm">{emptyIndicator}</div>
          )}

          {options.map((option) => {
            const isSelected = selected.some((s) => s.value === option.value);
            return (
              <div
                key={option.value}
                role="option"
                aria-selected={isSelected}
                tabIndex={option.disable ? -1 : 0}
                onClick={() => toggle(option)}
                onKeyDown={(e) => {
                  if (option.disable) return;
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggle(option);
                  }
                }}
                className={cn(
                  "flex items-center gap-2 cursor-pointer rounded-sm px-2 py-2 text-sm",
                  option.disable ? "opacity-50 cursor-not-allowed" : "hover:bg-accent"
                )}
              >
                <Checkbox checked={isSelected} onCheckedChange={() => toggle(option)} />
                <span className="flex-1">{option.label}</span>
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CheckboxMultiselect;
