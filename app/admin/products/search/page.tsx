import ProductTable from "@/components/admin/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/db";

async function searchProducts(searchTerms: string) {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: searchTerms,
            mode: "insensitive",
          },
        },
        {
          category: {
            name: {
              contains: searchTerms,
              mode: "insensitive",
            },
          },
        },
      ],
    },
    include: {
      category: true,
    },
  });
  return products;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ search: string }>;
}) {
  const { search } = await searchParams;
  const products = await searchProducts(search);

  return (
    <div>
      <Heading>Resultados de búsqueda</Heading>

      <ProductTable products={products} />
    </div>
  );
}
