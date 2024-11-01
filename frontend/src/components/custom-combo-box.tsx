"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Icons } from "./ui/icons"

interface CustomComboBoxProps {
  data: {label: string, value: string}[]
  loading?: boolean
  label: string,
  value: string,
  setValue: (value: string) => void
}

export function CustomComboBox({data, loading, label, value, setValue}: CustomComboBoxProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[240px] justify-between"
        >
          {value
            ? data.find((framework) => framework.value === value)?.label ?? value
            : label}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-0">
        <Command>
          <CommandInput placeholder={`${label} giriniz`} onValueChange={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                  }} />
          <CommandList>
            {loading && (
              <span className="flex items-center justify-center m-4">
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              </span>
            )}
            {!loading && <CommandEmpty>Sonuç bulunamadı.</CommandEmpty>}
            
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.label}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
