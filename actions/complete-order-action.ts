"use server";

import { prisma } from "@/src/db";
import { revalidatePath } from "next/cache";

export async function completeOrder(formData: FormData) {
  const orderId = formData.get("order_id");
  try {
    await prisma.order.update({
      where: {
        id: +orderId!,
      },
      data: {
        status: true,
        orderReadyAt: new Date(Date.now()),
      },
    });

    revalidatePath("/admin/orders");
  } catch (error) {
    console.log(error);
  }
}
