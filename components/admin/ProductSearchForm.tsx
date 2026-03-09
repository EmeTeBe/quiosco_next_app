"use client";

import { SearchSchema } from "@/src/schema";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ProductSearchForm() {
  const router = useRouter();
  const handleSearchForm = (formData: FormData) => {
    const data = {
      search: formData.get("search"),
    };
    const result = SearchSchema.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }
    router.push(`/admin/products/search?search=${result.data.search}`);
  };

  return (
    <form action={handleSearchForm} className="flex text-center gap-5">
      <input
        type="text"
        placeholder="Buscar Productos..."
        className="bg-white px-2 placeholder-slate-400 w-full shadow outline-slate-300"
        name="search"
      />
      <input
        type="submit"
        className="text-slate-900 cursor-pointer px-2 shadow shadow-slate-500 hover:shadow-inner rounded-lg lg:my-1"
        value={"Buscar"}
      />
    </form>
  );
}
