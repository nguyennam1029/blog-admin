import { z } from "zod";

// export const NewPostBody = z.object({
//   title: z.string().min(1, "Title is required"),
//   image: z.string().url().optional(),
//   content: z.string().min(1, "Content is required"),
//   status: z.string().min(1, "Status is required"),
//    creationDate: z.string().min(1, "Creation Date is required"),
// });

// export type NewPostBodyType = z.infer<typeof NewPostBody>;
export const CategoriesSchema = z.object({
  id: z.number(),
  code: z.string(),
  value: z.string(),
});

export const CreateProductBody = z.object({
  title: z.string().min(1, "Title is required"),
  image: z.string().url().optional(),
  description: z.string().min(1, "Content is required"),
  short_description: z.string().min(1, "Content is required"),
  status_code: z.string().min(1, "Status is required"),
  category_code: z.string().min(1, "Category is required"),
  //  creationDate: z.string().min(1, "Creation Date is required"),
});

export type CreateProductBodyType = z.TypeOf<typeof CreateProductBody>;

export const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  short_description: z.string(),
  description: z.string(),
  status: z.string(),
  image: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  categoryData: CategoriesSchema,
  authorData: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
  }),
  statusData: z.object({
    id: z.number(),
    code: z.string(),
    value: z.string(),
  }),
});

export const ProductRes = z.object({
  err: z.number(),
  mes: z.string(),
  data: ProductSchema,
});

export type ProductResType = z.TypeOf<typeof ProductRes>;

export const ProductListRes = z.object({
  err: z.number(),
  mes: z.string(),
  count: z.number(),
  data: z.array(ProductSchema),
});

export type ProductListResType = z.TypeOf<typeof ProductListRes>;

export const UpdateProductBody = CreateProductBody;
export type UpdateProductBodyType = CreateProductBodyType;
export const ProductParams = z.object({
  id: z.coerce.number(),
});
export type ProductParamsType = z.TypeOf<typeof ProductParams>;

export const MessageRes = z
  .object({
    err: z.number(),
    message: z.string(),
  })
  .strict();

export type MessageResType = z.TypeOf<typeof MessageRes>;
