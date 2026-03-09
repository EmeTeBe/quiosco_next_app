"use client";

import { Category } from "@/src/generated/prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

type CategoryIconProps = {
  category: Category;
};

export default function CategoryIcon({ category }: CategoryIconProps) {
  const params = useParams<{ category: string }>();

  const isActive = category.slug === params.category;

  return (
    <Link href={`/order/${category.slug}`} className="flex w-full">
      <div
        className={`flex items-center gap-2 sm:gap-3 md:gap-4 p-2 sm:p-2.5 md:p-3 w-full ring-1 ring-gray-300 rounded-lg sm:rounded-2xl md:rounded-4xl shadow-inner shadow-slate-300 transition-all duration-200 hover:shadow-md ${
          isActive
            ? "border-l-4 sm:border-l-6 md:border-l-8 border-amber-500 shadow-lg bg-amber-50/30"
            : "hover:bg-white/20"
        }`}
      >
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 shrink-0">
          <Image
            src={`/icon_${category.slug}.svg`}
            alt={`Imagen de la categoría ${category.name}`}
            fill
            className="object-contain"
          />
        </div>
        <p className="text-sm sm:text-base md:text-lg font-bold text-gray-800 truncate">
          {category.name}
        </p>
      </div>
    </Link>
  );
}
