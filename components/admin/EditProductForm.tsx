"use client";

import { updateProduct } from "@/actions/update-product-action";
import { ProductSchema } from "@/src/schema";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function EditProductForm({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const handleSubmit = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      price: formData.get("price"),
      categoryId: formData.get("categoryId"),
      image: formData.get("image"),
    };
    const result = ProductSchema.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }
    const response = await updateProduct(result.data, +id!);
    if (response?.errors) {
      response.errors.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }
    toast.success("Producto Actualizado correctamente");
    router.push("/admin/products");
  };

  return (
    <div className="bg-white mt-10 lg:mt-8 p-5 rounded-md shadow shadow-slate-500 max-w-3xl mx-auto">
      <form action={handleSubmit} className="space-y-4">
        {children}

        <input
          type="submit"
          className="text-amber-300 text-shadow-2xs w-full mt-5 p-3 uppercase font-bold shadow shadow-slate-500 hover:shadow-inner transition-all cursor-pointer"
          value={"Guardar Cambios"}
        />
      </form>
    </div>
  );
}
