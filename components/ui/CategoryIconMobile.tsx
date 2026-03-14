"use client";

import { Category } from "@/src/generated/prisma/client";
import Link from "next/link";
import { useParams } from "next/navigation";

type CategoryIconProps = {
  category: Category;
};

export default function CategoryIcon({ category }: CategoryIconProps) {
  const params = useParams<{ category: string }>();

  const isActive = category.slug === params.category;

  return (
    <Link href={`/order/${category.slug}`} className="flex">
      <div
        className={`flex flex-col p-1 md:p-2 items-center ring-1 ring-gray-300 rounded-full shadow-inner shadow-slate-300 transition-all duration-200 hover:shadow-md ${
          isActive
            ? "border-l-4 sm:border-l-6 md:border-l-8 border-amber-500 shadow-lg bg-amber-50/30"
            : "hover:bg-white/20"
        }`}
      >
        <p
          className={`px-2 text-xs md:text-lg font-bold text-gray-800 truncate text-wrap`}
        >
          {category.name}
        </p>
      </div>
    </Link>
  );
}
