"use client";

import { Product } from "@/src/generated/prisma/client";
import { useStore } from "@/src/store";

type AddProductButtonProps = {
  product: Product;
};

export default function AddProductButton({ product }: AddProductButtonProps) {
  const { addToOrder } = useStore();
  return (
    <button
      type="button"
      className=" text-slate-600 w-full text-sm mt-3 py-1 shadow shadow-slate-500 ring-1 ring-slate-400 uppercase font-medium cursor-pointer rounded-2xl hover:shadow-inner transition-all"
      onClick={() => addToOrder(product)}
    >
      agregar
    </button>
  );
}
