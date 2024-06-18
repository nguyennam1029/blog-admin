import productApiRequest from "@/apiRequests/products";
import ProductForm from "../../_components/form";
import { ProductResType } from "@/schemaValidations/post.schema";
type Product = ProductResType["data"];

export default async function page({ params }: { params: { id: string } }) {
  let product: Product | null = null;
  try {
    const { payload } = await productApiRequest.getDetail(Number(params.id));
    const products = payload?.data as unknown as Product[];
    product = products.length > 0 ? products[0] : null;
  } catch (error) {}

  return (
    <div>
      <h1 className="text-2xl font-medium mb-6">Edit Post</h1>
      {!product && <div>Not Found</div>}
      {product && <ProductForm product={product} />}
    </div>
  );
}
