"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type Props = {
  id?: string
  value?: string
  placeholder?: string
  onChange?: (iso?: string) => void
  className?: string
}

function formatDate(date: Date | undefined) {
  if (!date) return ""

  return date
    .toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
    .replace(/, /, ", ")
}

function isValidDate(date: Date | undefined) {
  if (!date) return false
  return !isNaN(date.getTime())
}

export function DateSelect({ id, value, placeholder, onChange, className }: Props) {
  const [open, setOpen] = React.useState(false)
  const parsed = value ? new Date(value) : undefined
  const [date, setDate] = React.useState<Date | undefined>(parsed)
  const [month, setMonth] = React.useState<Date | undefined>(parsed)
  const [display, setDisplay] = React.useState<string>(formatDate(parsed))

  React.useEffect(() => {
    const parsed = value ? new Date(value) : undefined
    setDate(parsed)
    setMonth(parsed)
    setDisplay(formatDate(parsed))
  }, [value])

  const handleSelect = (d?: Date) => {
    setDate(d)
    setDisplay(formatDate(d))
    setOpen(false)
    if (d && isValidDate(d)) onChange?.(d.toISOString().slice(0, 10))
    else onChange?.("")
  }

  return (
    <div className={className}>
      <div className="relative">
        <Input
          id={id}
          value={display}
          placeholder={placeholder}
          className="bg-ms-gray-50 pr-10 h-[48px] border-ms-gray-50 "
          onChange={(e) => {
            const v = e.target.value
            setDisplay(v)
            const d = new Date(v)
            if (isValidDate(d)) {
              setDate(d)
              setMonth(d)
              onChange?.(d.toISOString().slice(0, 10))
            } else if (v === "") {
              setDate(undefined)
              onChange?.("")
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setOpen(true)
            }
          }}
        />

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger   asChild>
            <Button
              id={`${id}-picker`}
              variant="ghost"
              className="absolute shadow-none bg-ms-gray-50 h-[48px] border-ms-gray-50 top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <ChevronDown className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="end" alignOffset={-8} sideOffset={10}>
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(d) => handleSelect(d)}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default DateSelect
