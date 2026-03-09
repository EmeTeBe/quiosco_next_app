import ProducstPagination from "@/components/admin/ProducstPagination";
import ProductSearchForm from "@/components/admin/ProductSearchForm";
import ProductTable from "@/components/admin/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/db";
import Link from "next/link";
import { redirect } from "next/navigation";

async function productCount() {
  return await prisma.product.count();
}

async function getProducts(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize;

  const products = await prisma.product.findMany({
    take: pageSize,
    skip: skip,
    include: {
      category: true,
    },
  });
  return products;
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const page = +(await searchParams).page || 1;
  const pageSize = 12;

  if (page < 0) redirect("/admin/products");

  const productsData = getProducts(page, pageSize);
  const totalProductsData = productCount();
  const [products, totalProducts] = await Promise.all([
    productsData,
    totalProductsData,
  ]);
  const totalPages = Math.ceil(totalProducts / pageSize);

  if (page > totalPages) redirect("/admin/products");

  return (
    <div>
      <Heading>Administrar Productos</Heading>

      <div className="mt-10 flex flex-col lg:flex-row lg:justify-between gap-10">
        <Link
          href={"/admin/products/new"}
          className="bg-amber-300 w-full lg:w-auto text-lg px-10 py-2 text-center font-bold cursor-pointer rounded-bl-lg rounded-tr-lg shadow shadow-slate-400 hover:shadow-inner"
        >
          Crear Productos
        </Link>

        <ProductSearchForm />
      </div>

      <ProductTable products={products} />

      <ProducstPagination page={page} totalPages={totalPages} />
    </div>
  );
}
