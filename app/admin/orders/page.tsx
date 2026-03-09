// import useSWR from "swr";
import OrderCard from "@/components/admin/OrderCard";
import Heading from "@/components/ui/Heading";
// import { OrderWithProducts } from "@/src/types";
import { prisma } from "@/src/db";
import { revalidatePath } from "next/cache";

async function getPendingOrders() {
  const orders = await prisma.order.findMany({
    where: {
      status: false,
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });
  return orders;
}

export default async function OrdersPage() {
  const data = await getPendingOrders();
  // const url = "/admin/orders/api";
  // const fetcher = () =>
  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((data) => data);
  // const { data, error, isLoading,  } = useSWR<OrderWithProducts[]>(
  //   url,
  //   fetcher,
  // );

  // if (isLoading) {
  //   return (
  //     <div className="flex flex-col items-center h-screen justify-center gap-2">
  //       <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-blue-600"></div>
  //       <p className="text-gray-600">Cargando...</p>
  //     </div>
  //   );
  // }
  // if (data)

  const refreshOrders = async () => {
    "use server";
    revalidatePath("/admin/orders");
  };

  return (
    <div>
      <Heading>Administrar Ordenes</Heading>

      <form action={refreshOrders}>
        <input
          type="submit"
          value={"Actualizar Ordenes"}
          className="bg-amber-300 w-full lg:w-auto text-lg mt-5 px-10 py-2 text-center font-bold cursor-pointer rounded-bl-lg rounded-tr-lg shadow shadow-slate-400 hover:shadow-inner"
        />
      </form>

      {data.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-10">
          {data.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <p className="text-center mt-10">No hay ordenes pendientes</p>
      )}
    </div>
  );
}
