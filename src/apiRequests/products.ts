import {
  CreateProductBodyType,
  ProductListResType,
  ProductResType,
} from "@/schemaValidations/post.schema";
import http from "@/lib/http";
// import { MessageResType } from '@/schemaValidations/common.schema'

const productApiRequest = {
  //  getList: async (limit?: number | string, currentPage?: number, title?: any, category?: any, author?: any, status?: any ) => {
  //   return new Promise<ProductListResType[]>((resolve, reject) => {
  //     // Tạo một khoảng thời gian trễ 3 giây trước khi gọi API
  //     setTimeout(async () => {
  //       try {
  //         const queryParams = {
  //           limit: limit || '',
  //           page: currentPage || 1,
  //           title: title || '',
  //           category: category || '',
  //           author: author || '',
  //           status: status || '',
  //         };

  //         const filteredParams = Object.entries(queryParams)
  //           .filter(([_, value]) => value !== undefined && value !== '')
  //           .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
  //           .join('&');

  //         const response = await http.get<ProductListResType>(`/post?${filteredParams}`);

  //         resolve(response);
  //       } catch (error) {
  //         reject(error);
  //       }
  //     }, 3000); // 3 giây
  //   });
  // }
  getList: (
    limit?: number | string,
    currentPage?: number,
    title?: any,
    category?: any,
    author?: any,
    status?: any
  ) => {
    const queryParams = {
      limit: limit || "",
      page: currentPage || 1,
      title: title || "",
      category: category || "",
      author: author || "",
      status: status || "",
    };

    const filteredParams = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== "")
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");
    return http.get<ProductListResType>(`/post?${filteredParams}`, {
      cache: 'no-cache'
    });
  },
  //   getDetail: (id: number) =>
  //     http.get<ProductResType>(`/products/${id}`, {
  //       cache: 'no-store'
  //     }),
  create: (body: CreateProductBodyType) => http.post<ProductResType>("/post", body),
  //   update: (id: number, body: UpdateProductBodyType) =>
  //     http.put<ProductResType>(`/products/${id}`, body),
  //   uploadImage: (body: FormData) =>
  //     http.post<{
  //       message: string
  //       data: string
  //     }>('/media/upload', body),
  //   delete: (id: number) => http.delete<MessageResType>(`/products/${id}`)
};

export default productApiRequest;
