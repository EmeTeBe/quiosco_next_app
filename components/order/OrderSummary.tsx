"use client";

import { useStore } from "@/src/store";
import ProductDetails from "./ProductDetails";
import { useMemo } from "react";
import { formatCurrency } from "@/src/utils";
import { createOrder } from "@/actions/create-order-action";
import { OrderSchema } from "@/src/schema";
import { toast } from "react-toastify";

export default function OrderSummary() {
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
    toast.success("Pedido Realizado correctamente");
  };

  return (
    <aside className="md:h-screen md:overflow-y-scroll md:w-64 lg:w-94 p-5">
      <h1 className="text-4xl font-black text-slate-800 text-center">
        Mi Pedido
      </h1>
      {order.length === 0 ? (
        <p className="text-center my-10">El pedido está vacío</p>
      ) : (
        <div className="mt-5">
          {order.map((item) => (
            <ProductDetails key={item.id} item={item} />
          ))}

          <p className="text-xl mt-15 text-center uppercase ">
            total a pagar:{" "}
            <span className="font-bold">{formatCurrency(total)}</span>{" "}
          </p>
          <form action={handleCreateOrder} className="w-full mt-10 text-center">
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
      )}
    </aside>
  );
}
