import EditProductForm from "@/components/admin/EditProductForm";
import ProductForm from "@/components/admin/ProductForm";
import GoBackButton from "@/components/ui/GoBackButton";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/db";
import { notFound } from "next/navigation";

async function getProductById(id: number) {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  if (!product) {
    notFound();
  }
  return product;
}

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(+id);

  return (
    <div>
      <Heading>
        Editar Producto:{" "}
        <span className="bg-amber-300 underline">{product.name}</span>
      </Heading>
      <div className="mt-4">
        <GoBackButton />
      </div>
      <EditProductForm>
        <ProductForm product={product} />
      </EditProductForm>
    </div>
  );
}
