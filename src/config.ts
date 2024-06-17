import { z } from 'zod';

const configSchema = z.object({
  NEXT_PUBLIC_API_ENDPOINT: z.string(),
  NEXT_PUBLIC_API_ENDPOINT_SERVER: z.string(),
  // NEXT_PUBLIC_LIMIT_PRODUCT: z.number()
})

const configProject = configSchema.safeParse({
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  NEXT_PUBLIC_API_ENDPOINT_SERVER: process.env.NEXT_PUBLIC_API_ENDPOINT_SERVER,
  // NEXT_PUBLIC_LIMIT_PRODUCT: process.env.NEXT_PUBLIC_LIMIT_PRODUCT,
})
if (!configProject.success) {
  console.error(configProject.error.issues)
  throw new Error('Các giá trị khai báo trong file .env không hợp lệ')
}

const envConfig = configProject.data
export default envConfig