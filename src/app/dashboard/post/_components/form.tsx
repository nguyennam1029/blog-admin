"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
      status_code: product?.statusData?.code || "",
      category_code: product?.categoryData?.code || "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);
  async function onSubmit(values: CreateProductBodyType) {
    console.log(values);
    setLoading(true);
    try {
      await productApiRequest.create({ ...values });
      toast({
        variant: "default",
        description: "Add New Post Successfully",
      });
      // form.reset();
      // setUploadedImageURL("");
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
    } finally {
      setLoading(false);
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
            name="category_code"
            render={({ field }) => <PostCategory {...field} />}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="status_code"
            render={({ field }) => <PostStatus {...field} />}
          />
          {/* <FormField
            control={form.control}
            name="creationDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="leading-6">Creation Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        size="default"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(new Date(field.value), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => {
                        if (date) {
                          field.onChange(date.toISOString());
                        }
                      }}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          /> */}
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
        <Button type="submit">
          {product ? "Update Product" : "Add Product"}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
