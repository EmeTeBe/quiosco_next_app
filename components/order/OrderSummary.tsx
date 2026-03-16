"use client";

import { useStore } from "@/src/store";
import ProductDetails from "./ProductDetails";
import { useMemo } from "react";
import { formatCurrency } from "@/src/utils";
import { createOrder } from "@/actions/create-order-action";
import { OrderSchema } from "@/src/schema";
import { toast } from "react-toastify";

type OrderSummaryProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function OrderSummary({ isOpen, onClose }: OrderSummaryProps) {
  const { order, clearOrder } = useStore();
  const total = useMemo(
    () => order.reduce((total, item) => total + item.quantity * item.price, 0),
    [order],
  );

  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      total,
      order,
    };

    const result = OrderSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }
    const response = await createOrder(data);
    if (response?.errors) {
      response.errors.forEach((issue) => {
        toast.error(issue.message);
      });
    }
    clearOrder();
    onClose();
    toast.success("Pedido Realizado correctamente");
  };

  if (!isOpen) return null;
  return (
    <aside className="fixed top-0 right-0 h-screen w-94 bg-white shadow-2xl z-40 p-5 overflow-hidden overflow-y-auto animate-slide-in">
      <div className="flex h-full flex-col">
        <h1 className="text-4xl mt-5 font-black text-slate-800 text-center">
          Mi Pedido
        </h1>
        {order.length === 0 ? (
          <p className="text-center my-10">El pedido está vacío</p>
        ) : (
          <>
            <div className="flex-1 min-h-0 overflow-y-auto mt-5 shadow shadow-slate-900">
              <div>
                {order.map((item) => (
                  <ProductDetails key={item.id} item={item} />
                ))}
              </div>
            </div>
            <div className="shrink-0">
              <p className="text-xl mt-10 text-center uppercase">
                total a pagar:{" "}
                <span className="font-bold">{formatCurrency(total)}</span>{" "}
              </p>
              <form
                action={handleCreateOrder}
                className="w-full mt-4 text-center"
              >
                <input
                  type="text"
                  placeholder="Tu Nombre..."
                  className="bg-white border border-slate-300 p-2 w-full outline-slate-300 mb-4"
                  name="name"
                />
                <input
                  type="submit"
                  className="w-full ring-1 ring-slate-300 p-2 text-center font-bold rounded-lg shadow shadow-slate-400 bg-white text-slate-800 uppercase cursor-pointer hover:scale-95 hover:shadow-inner transition-all"
                  value={"Confirmar Pedido"}
                />
              </form>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
