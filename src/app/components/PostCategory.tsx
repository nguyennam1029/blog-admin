"use client";

import * as React from "react";
import { BookOpen, Cpu, Heart, LucideIcon, Music } from "lucide-react";

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

import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

type Category = {
  value: string;
  label: string;
  icon: LucideIcon;
};

const categories: Category[] = [
  {
    value: "TE2",
    label: "Technology",
    icon: Cpu,
  },
  {
    value: "DILI4",
    label: "Digital Lifestyle",
    icon: Heart,
  },
  {
    value: "ED2",
    label: "Education",
    icon: BookOpen,
  },
  {
    value: "MU2",
    label: "Entertainment",
    icon: Music,
  },
];
const PostCategory = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const [open, setOpen] = React.useState(false);
  const selectedCategory =
    categories.find((category) => category.value === value) || null;

  return (
    <FormItem>
      <FormLabel>Category</FormLabel>
      <FormControl>
        <div className="flex items-center space-x-4">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="default"
                className="w-full justify-start"
              >
                {selectedCategory ? (
                  <>
                    <selectedCategory.icon className="mr-2 h-4 w-4 shrink-0" />

                    {selectedCategory.label}
                  </>
                ) : (
                  <>+ Set category</>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" side="bottom" align="start">
              <Command>
                <CommandInput placeholder="Change category..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {categories.map((category) => (
                      <CommandItem
                        key={category.value}
                        value={category.value}
                        onSelect={(value) => {
                          onChange(value);
                          setOpen(false);
                        }}
                      >
                        <category.icon
                          className={cn(
                            "mr-2 h-4 w-4",
                            category.value === selectedCategory?.value
                              ? "opacity-100"
                              : "opacity-40"
                          )}
                        />
                        <span>{category.label}</span>
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
export default PostCategory;
