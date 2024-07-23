"use client";

import { useRouter } from "next/navigation";
import { CustomSelect } from "./CustomSelect";

export const FilterBar = () => {
  const router = useRouter();

  const handleFilterChange = (filterName: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value && value !== "all") {
      params.set(filterName, value);
    } else {
      params.delete(filterName);
    }
    router.push(`?${params.toString()}`);
  };

  const categoryOptions = [
    { value: "all", label: "All" },
    { value: "TE2", label: "Technology" },
    { value: "DILI4", label: "Digital Lifestyle" },
    { value: "TU2", label: "Tutorials" },
  ];

  const authorOptions = [
    { value: "all", label: "All" },

    { value: "6", label: "Admin" },
    { value: "4", label: "Jane Smith" },
    { value: "1", label: "John Dev" },
  ];

  const statusOptions = [
    { value: "all", label: "All" },
    {
      value: "APP7",
      label: "Approved",
    },
    {
      value: "PND6",
      label: "Pending",
    },

    {
      value: "DR5",
      label: "Draft",
    },
  ];

  // Other options...

  return (
    <div className="flex items-center gap-5">
      <CustomSelect
        label="Category"
        options={categoryOptions}
        onChange={(value) => handleFilterChange("category", value)}
      />
      <CustomSelect
        label="Author"
        options={authorOptions}
        onChange={(value) => handleFilterChange("author", value)}
      />
      <CustomSelect
        label="Status"
        options={statusOptions}
        onChange={(value) => handleFilterChange("status", value)}
      />

      {/* Add other filters similarly */}
    </div>
  );
};
