import { OrderWithProducts } from "@/src/types";

export default function LatestOrderList({
  order,
}: {
  order: OrderWithProducts;
}) {
  return (
    <div className="bg-white shadow p-5 space-y-2 rounded-lg">
      <p className="text-xl font-bold text-slate-600">Cliente: {order.name}</p>
      <ul
        role="list"
        className="divide-y divide-slate-300 border-t border-gray-300 text-sm font-medium text-slate-400"
      >
        {order.orderProducts.map((product) => (
          <li key={product.id} className="flex py-2 text-lg">
            <p>
              <span>
                ({product.quantity}) {""}{" "}
              </span>
              {product.product.name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
