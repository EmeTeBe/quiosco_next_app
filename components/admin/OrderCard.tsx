import { completeOrder } from "@/actions/complete-order-action";
import { OrderWithProducts } from "@/src/types";
import { formatCurrency } from "@/src/utils";

type OrderCardProps = {
  order: OrderWithProducts;
};

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <section
      aria-labelledby="summary-heading"
      className="rounded-lg bg-gray-50 px-4 py-3 sm:p-6 shadow lg:p-8 space-y-4"
    >
      <p className="text-2xl font-medium text-gray-900">
        Cliente: {order.name}
      </p>
      <p className="text-lg font-medium text-gray-900">Productos Ordenados:</p>
      <dl className="space-y-2">
        {order.orderProducts.map((product) => (
          <div
            key={product.productId}
            className="flex items-center gap-2 border-t border-gray-200 pt-2"
          >
            <dt className="flex items-center text-sm text-slate-600">
              <span className="font-black items-center">
                ({product.quantity}){" "}
              </span>
            </dt>
            <dd className="text-md font-medium text-slate-800">
              {product.product.name}
            </dd>
          </div>
        ))}
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt className="text-base font-medium text-gray-900">
            Total a Pagar:
          </dt>
          <dd className="text-base font-medium text-gray-900">
            {formatCurrency(order.total)}
          </dd>
        </div>
      </dl>

      <form action={completeOrder}>
        <input type="hidden" value={order.id} name="order_id" />
        <input
          type="submit"
          className="text-slate-800 w-full mt-2 p-3 uppercase font-bold cursor-pointer ring-1 ring-slate-400 rounded-lg shadow shadow-slate-500 hover:shadow-inner"
          value="Completada"
        />
      </form>
    </section>
  );
}
