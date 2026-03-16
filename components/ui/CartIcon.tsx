"use client";

import { useStore } from "@/src/store";
import { XMarkIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

type CartIconProps = {
  onClick: () => void;
  isOpen: boolean;
};

export default function CartIcon({ onClick, isOpen }: CartIconProps) {
  const order = useStore((state) => state.order);
  const itemCount = order.reduce((total, item) => total + item.quantity, 0);

  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 right-6 z-50 flex items-center justify-center size-12 md:size-15 rounded-full shadow-lg cursor-pointer transition-all duration-300 ${
        isOpen
          ? "bg-red-500 hover:bg-red-600 rotate-90"
          : "bg-amber-400 hover:bg-amber-500"
      }`}
    >
      {isOpen ? (
        <XMarkIcon className="size-7 md:size-10" />
      ) : (
        <div className="relative">
          <ShoppingCartIcon className="size-7 md:size-10" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </div>
      )}
    </button>
  );
}
