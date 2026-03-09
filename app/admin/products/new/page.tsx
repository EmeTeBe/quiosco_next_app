import AddProductForm from "@/components/admin/AddProductForm";
import ProductForm from "@/components/admin/ProductForm";
import Heading from "@/components/ui/Heading";

export default function Page() {
  return (
    <div>
      <Heading>Nuevo Producto</Heading>
      <AddProductForm>
        <ProductForm />
      </AddProductForm>
    </div>
  );
}
