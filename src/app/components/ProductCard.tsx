import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProductSchema } from "@/schemaValidations/post.schema";
import { Eye, Star, FilePenLine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import DeleteProduct from "../dashboard/post/_components/deleteProduct";
import ProductEditButton from "../dashboard/post/_components/editProduct";

// Định nghĩa component ProductCard
interface ProductCardProps {
  item: z.infer<typeof ProductSchema>; // Sử dụng kiểu dữ liệu từ ProductSchema
}

export const ProductCard: React.FC<ProductCardProps> = async ({ item }) => {
  return (
    <div
      key={item.id}
      className="p-3 rounded-lg overflow-hidden shadow-lg border border-gray-100"
    >
      <Link href="">
        <Image
          src="/WorldTravel.jpg"
          alt="test"
          width={200}
          height={300}
          className="w-full h-[150px] object-cover overflow-hidden rounded-t-lg"
        ></Image>
        <h2 className="text-base text-black font-bold mt-2 mb-4">
          {item.title}
        </h2>
      </Link>

      <div className="flex items-center justify-evenly gap-5 pb-3 border-b border-b-gray-300">
        <div className="flex items-center gap-2">
          <Star className="h-3.5 w-3.5 text-yellow-500" />
          <span className="text-sm text-yellow-500 font-semibold">4.5</span>
        </div>
        <div className="flex items-center gap-2">
          <Eye className="h-3.5 w-3.5 text-gray-800" />
          <span className="text-sm text-gray-800 font-semibold">7.899</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <DeleteProduct product={item} />
          <ProductEditButton product={item} />
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <Avatar className="hidden h-10 w-10 sm:flex">
          <AvatarImage
            src="/avatar.jpg"
            alt="Avatar"
            className="object-cover"
          />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <p className="text-sm font-medium leading-none">Olivia Martin</p>
          <p className="text-sm text-muted-foreground">
            olivia.martin@email.com
          </p>
        </div>
      </div>
    </div>
  );
};
