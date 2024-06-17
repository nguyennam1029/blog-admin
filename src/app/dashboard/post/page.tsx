import productApiRequest from "@/apiRequests/products";
import { CustomSelect } from "@/app/components/CustomSelect";
import { FilterBar } from "@/app/components/FilterBar";
import PaginationBlog from "@/app/components/pagination";
import { ProductCard } from "@/app/components/ProductCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { File, ListFilter, PlusCircle, Star, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface SearchParams {
  title?: string;
  category?: string;
  author?: string;
  status?: string;
  page?: number;
}
const caculatePagesCount = (pageSize: number, totalCount: number) => {
  return totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize);
};

export default async function page({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const title = searchParams?.title || "";
  const limit = process.env.NEXT_PUBLIC_LIMIT_PRODUCT || 5;
  const currentPage = searchParams?.page ?? 1;
  const category = searchParams?.category || "";
  const author = searchParams?.author || "";
  const status = searchParams?.status || "";
  const { payload } = await productApiRequest.getList(
    limit,
    currentPage,
    title,
    category,
    status
  );

  const productList = payload?.data;
  const totalItem = payload?.count;
  const totalPages = caculatePagesCount(limit as number, totalItem);

  return (
    <div className="">
      <h1 className="text-xl text-slate-900 font-medium mb-5">Posts</h1>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <FilterBar />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Active
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <Link
              href="/dashboard/post/addNewPost"
              className="sr-only sm:not-sr-only sm:whitespace-nowrap"
            >
              Add Product
            </Link>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-4 mt-5 gap-5">
        {productList &&
          productList.map((item) => <ProductCard key={item.id} item={item} />)}
      </div>

      <PaginationBlog totalPages={totalPages} />
    </div>
  );
}
