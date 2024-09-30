import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string().optional(),
  image: z.string().nullable(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters long",
  }),
  revenue: z.coerce.number().positive({
    message: "Revenue must be a positive number",
  }),
  price: z.coerce.number().positive({
    message: "Price must be a positive number",
  }),
});

export const DeleteProductSchema = z.object({
  id: z.string(),
});
