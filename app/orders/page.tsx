"use client";

import LatestOrderList from "@/components/order/LatestOrderList";
import Logo from "@/components/ui/Logo";
import { OrderWithProducts } from "@/src/types";
import useSWR from "swr";

export default function OrdersPage() {
  const url = "/orders/api";
  const fetcher = () =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data);
  const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 30000,
    revalidateOnFocus: false,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center h-screen justify-center gap-2">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-blue-600"></div>
        <p className="text-gray-600">Cargando...</p>
      </div>
    );
  }
  if (data)
    return (
      <div>
        <h1 className="text-center mt-15 text-5xl font-black">
          Ordenes Listas
        </h1>
        <Logo />

        {data.length ? (
          <div className="grid grid-cols-2 gap-5 max-w-5xl mx-auto mt-10">
            {data.map((order) => (
              <LatestOrderList key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <p className="text-center my-10">No hay ordenes listas</p>
        )}
      </div>
    );
}
