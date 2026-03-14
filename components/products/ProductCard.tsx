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
    <div className="flex flex-col ring-1 p-2 ring-slate-300 bg-white rounded-2xl shadow-inner shadow-slate-600 overflow-hidden">
      <div className="text-center text-nowrap p-2 md:p-2">
        <h3 className="text-sm sm:text-base md:text-lg font-bold line-clamp-2">
          {product.name}
        </h3>
      </div>
      <div className="flex">
        <div className="relative overflow-hidden pr-1">
          <Image
            alt={`Imagen de ${product.image}`}
            src={imagePath}
            width={140}
            height={100}
            className="rounded-2xl ring-1 ring-slate-300 shadow-inner shadow-slate-500 h-full object-cover"
          />
        </div>

        <div className="flex flex-col flex-1 p-2 text-sm w-full shadow shadow-slate-400 rounded-r-2xl justify-between">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut quasi
            et voluptates quia ipsum.
          </p>

          <div>
            <p className="font-bold text-lg sm:text-xl md:text-2xl text-amber-500">
              {formatCurrency(product.price)}
            </p>
            <AddProductButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
