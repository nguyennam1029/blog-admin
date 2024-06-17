"use client";

import * as React from "react";
import {
  ArrowUpCircle,
  CheckCircle,
  CheckCircle2,
  Circle,
  Clock,
  FileText,
  HelpCircle,
  LucideIcon,
  XCircle,
  XCircleIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFormContext, Controller } from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

type Status = {
  value: string;
  label: string;
  icon: LucideIcon;
};

const statuses: Status[] = [
  {
    value: "pending ",
    label: "Pending ",
    icon: Clock,
  },
  {
    value: "APP7",
    label: "Approved",
    icon: CheckCircle,
  },
  {
    value: "RJT8",
    label: "Rejected",
    icon: XCircleIcon,
  },
  {
    value: "DR5",
    label: "Draft",
    icon: FileText,
  },
];

const PostStatus = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const [open, setOpen] = React.useState(false);
  const selectedStatus =
    statuses.find((status) => status.value === value) || null;

  return (
    <FormItem>
      <FormLabel>Status</FormLabel>
      <FormControl>
        <div className="flex items-center space-x-4">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="default"
                className="w-full justify-start"
              >
                {selectedStatus ? (
                  <>
                    <selectedStatus.icon className="mr-2 h-4 w-4 shrink-0" />
                    {selectedStatus.label}
                  </>
                ) : (
                  <>+ Set status</>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" side="bottom" align="start">
              <Command>
                <CommandInput placeholder="Change status..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {statuses.map((status) => (
                      <CommandItem
                        key={status.value}
                        value={status.value}
                        onSelect={(value) => {
                          onChange(value);
                          setOpen(false);
                        }}
                      >
                        <status.icon
                          className={cn(
                            "mr-2 h-4 w-4",
                            status.value === selectedStatus?.value
                              ? "opacity-100"
                              : "opacity-40"
                          )}
                        />
                        <span>{status.label}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default PostStatus;
