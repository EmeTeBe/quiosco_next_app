"use server";

import { prisma } from "@/src/db";
import { ProductSchema } from "@/src/schema";

export async function createProduct(data: unknown) {
  const result = ProductSchema.safeParse(data);

  if (!result.success) {
    return {
      errors: result.error.issues,
    };
  }

  await prisma.product.create({
    data: result.data,
  });
}
