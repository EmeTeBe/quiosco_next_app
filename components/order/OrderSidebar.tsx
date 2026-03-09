import { prisma } from "@/src/db";
import CategoryIcon from "../ui/CategoryIcon";
import Logo from "../ui/Logo";

async function getCategories() {
  return await prisma.category.findMany();
}

export default async function OrderSidebar() {
  const categories = await getCategories();

  return (
    <aside className="md:w-72 md:h-screen">
      <Logo />
      <nav className="space-y-3 p-5 overflow-y-auto">
        {categories.map((category) => (
          <CategoryIcon key={category.id} category={category} />
        ))}
      </nav>
    </aside>
  );
}
