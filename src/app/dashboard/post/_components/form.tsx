"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, handleErrorApi } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Tiptap from "@/app/components/Tiptap";
import ImageUpload from "@/app/components/ImageUpload";
import PostStatus from "@/app/components/PostStatus"; // Import PostStatus
import {
  CreateProductBody,
  CreateProductBodyType,
  ProductResType,
  UpdateProductBodyType,
} from "@/schemaValidations/post.schema";
import PostCategory from "@/app/components/PostCategory";
import { useEffect, useState } from "react";
import productApiRequest from "@/apiRequests/products";
import { toast } from "@/components/ui/use-toast";
type Product = ProductResType["data"];
const ProductForm = ({ product }: { product?: Product }) => {
  const [loading, setLoading] = useState(false);
  const [uploadedImageURL, setUploadedImageURL] = useState<string>(
    product?.image || ""
  );

  const form = useForm<CreateProductBodyType>({
    resolver: zodResolver(CreateProductBody),
    defaultValues: {
      title: product?.title || "",
      image: product?.image || "",
      description: product?.description || "",
      short_description: product?.short_description || "",
      status_code: product?.statusData?.value || "",
      category_code: product?.categoryData?.value || "",
      // creationDate: "",
    },
  });

  useEffect(() => {
    form.reset({
      title: product?.title || "",
      image: product?.image || "",
      description: product?.description || "",
      short_description: product?.short_description || "",
      status_code: product?.statusData?.code || "",
      category_code: product?.categoryData?.code || "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  // =================== Create ===============

  const createProduct = async (values: CreateProductBodyType) => {
    setLoading(true);
    try {
      await productApiRequest.create({ ...values });
      toast({
        variant: "default",
        description: "Add New Post Successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Fales",
      });
      console.log("🚀 ~ onSubmit ~ error:", error);
    } finally {
      setLoading(false);
    }
  };

  //  ============== Update =============
  const updateProduct = async (_values: UpdateProductBodyType) => {
    if (!product) return;
    setLoading(true);
    let values = _values;
    try {
      const result = await productApiRequest.update(product.id, values);

      toast({
        description: result.payload.mes,
      });
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
    } finally {
      setLoading(false);
    }
  };
  // async function onSubmit(values: CreateProductBodyType) {
  //   setLoading(true);
  //   try {
  //     await productApiRequest.create({ ...values });
  //     toast({
  //       variant: "default",
  //       description: "Add New Post Successfully",
  //     });
  //   } catch (error) {
  //     toast({
  //       variant: "destructive",
  //       description: "Fales",
  //     });
  //     console.log("🚀 ~ onSubmit ~ error:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }
  async function onSubmit(values: CreateProductBodyType) {
    if (loading) return;
    if (product) {
      await updateProduct(values);
    } else {
      await createProduct(values);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="short_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter a short description here.."
                    {...field}
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="status_code"
            render={({ field }) => <PostStatus {...field} />}
          />
          <FormField
            control={form.control}
            name="category_code"
            render={({ field }) => <PostCategory {...field} />}
          />
        </div>
        <ImageUpload name="image" initialImageURL={uploadedImageURL} />
        {/* <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <ImageUpload
                  name={field.name}
                  initialImageURL={uploadedImageURL}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Tiptap value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormDescription>
                This is the content of your post.
              </FormDescription>
              {form.formState.errors.description && (
                <FormMessage>
                  {form.formState.errors.description.message}
                </FormMessage>
              )}
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {product ? "Update Product" : "Add Product"}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
