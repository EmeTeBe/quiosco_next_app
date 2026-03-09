import Heading from "@/components/ui/Heading";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col text-center">
      <Heading>Producto no encontrado</Heading>
      <Link
        href={"/admin/products"}
        className="mt-10 text-amber-300 font-bold text-xl text-center cursor-pointer hover:underline hover:scale-110"
      >
        Ir a Productos
      </Link>
    </div>
  );
}
