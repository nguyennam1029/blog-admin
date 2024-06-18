"use client";

import { Button } from "@/components/ui/button";

import { ProductListResType } from "@/schemaValidations/product.schema";
import { FilePenLine } from "lucide-react";
import Link from "next/link";

export default function ProductEditButton({
  product,
}: {
  product: ProductListResType["data"][0];
}) {
  return (
    <Link href={`/dashboard/post/edit/${product.id}`}>
      <FilePenLine className="h-5 w-5 text-blue-600" />
    </Link>
  );
}
