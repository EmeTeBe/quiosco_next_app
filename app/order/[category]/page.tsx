import ProductCard from "@/components/products/ProductCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/db";

async function getProductsByCategory(category: string) {
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category,
      },
    },
  });
  return products;
}

export default async function OrderPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const products = await getProductsByCategory(category);

  return (
    <div>
      <Heading>Elige tu pedido</Heading>
      <div className="mb-5 mt-2 h-px bg-gray-300" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 items-start p-1">
        {products.map((product) => (
            <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
