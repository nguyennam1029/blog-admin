"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function PaginationBlog({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // Tạo một mảng các trang từ 1 đến totalPages
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="pt-7">
      <Pagination>
        <PaginationContent>
          <PaginationPrevious href={createPageURL(currentPage - 1)} />

          {pages.map((page) => (
            // <Link key={page} href={createPageURL(page)}>
            <PaginationLink
              key={page}
              href={createPageURL(page)}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
            // </Link>
          ))}

          <PaginationNext href={createPageURL(currentPage + 1)} />
        </PaginationContent>
      </Pagination>
    </div>
  );
}
