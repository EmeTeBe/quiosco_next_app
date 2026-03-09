import { Product } from "@/src/generated/prisma/client";
import { formatCurrency, getImagePath } from "@/src/utils";
import Image from "next/image";
import AddProductButton from "./AddProductButton";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const imagePath = getImagePath(product.image);

  return (
    <div className="flex flex-col h-96 sm:h-80 md:h-96 lg:h-96 ring-1 ring-slate-300 bg-white rounded-2xl shadow-inner shadow-slate-600 overflow-hidden">
      <div className="relative flex-8/12 overflow-hidden p-2">
        <Image
          alt={`Imagen de ${product.image}`}
          src={imagePath}
          width={400}
          height={400}
          className="rounded-2xl ring-1 ring-slate-300 shadow-inner shadow-slate-500 w-full h-full object-cover"
        />
      </div>

      <div className="p-3 sm:p-4 md:p-5 shadow shadow-slate-400 rounded-b-2xl flex flex-col justify-between flex-1">
        <h3 className="text-sm sm:text-base md:text-lg font-bold line-clamp-2">
          {product.name}
        </h3>
        <p className="font-bold text-lg sm:text-xl md:text-2xl text-amber-500">
          {formatCurrency(product.price)}
        </p>
        <div>
          <AddProductButton product={product} />
        </div>
      </div>
    </div>
  );
}
