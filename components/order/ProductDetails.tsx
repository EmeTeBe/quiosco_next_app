import { useStore } from "@/src/store";
import { OrderItem } from "@/src/types";
import { formatCurrency } from "@/src/utils";
import { XCircleIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useMemo } from "react";

type ProductDetailsProps = {
  item: OrderItem;
};

const MAX_ITEMS = 5;

export default function ProductDetails({ item }: ProductDetailsProps) {
  const { increaseQuantity, decreaseQuantity, removeItem } = useStore();
  const disableDecreaseButton = useMemo(() => item.quantity === 1, [item]);
  const disableIncreaseButton = useMemo(
    () => item.quantity === MAX_ITEMS,
    [item],
  );

  return (
    <div className="shadow p-4 bg-white border-t border-gray-200 ">
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <p className="text-xl">{item.name} </p>

          <button type="button" onClick={() => removeItem(item.id)}>
            <XCircleIcon className="text-red-600 h-8 w-8 cursor-pointer" />
          </button>
        </div>
        <p className="text-xl text-amber-500 font-black">
          {formatCurrency(item.price)}
        </p>
        <div className="flex gap-2 px- py-1 bg-gray-100 w-fit rounded-lg">
          <button
            type="button"
            onClick={() => decreaseQuantity(item.id)}
            disabled={disableDecreaseButton}
            className="disabled:opacity-20 disabled:cursor-auto px-2 shadow shadow-slate-400 rounded-lg cursor-pointer hover:shadow-inner"
          >
            <MinusIcon className="h-6 w-6" />
          </button>

          <p className="text-lg font-black ">{item.quantity}</p>

          <button
            type="button"
            onClick={() => increaseQuantity(item.id)}
            disabled={disableIncreaseButton}
            className="disabled:opacity-20 disabled:cursor-auto px-2 shadow shadow-slate-400 rounded-lg cursor-pointer hover:shadow-inner"
          >
            <PlusIcon className="h-6 w-6" />
          </button>
        </div>
        <p className="text-xl font-black text-gray-700">
          Subtotal: {""}
          <span className="font-normal">{formatCurrency(item.subtotal)}</span>
        </p>
      </div>
    </div>
  );
}
