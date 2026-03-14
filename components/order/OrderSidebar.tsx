import { prisma } from "@/src/db";
import CategoryIconMobile from "../ui/CategoryIconMobile";

async function getCategories() {
  return await prisma.category.findMany();
}

export default async function OrderSidebar() {
  const categories = await getCategories();

  return (
    <>
      {/* <aside className="hidden xl:block md:w-72 md:h-screen">
        <Logo />
        <nav className="space-y-3 p-5 overflow-y-auto">
          {categories.map((category) => (
            <CategoryIcon key={category.id} category={category} />
          ))}
        </nav>
      </aside> */}

      <nav className="sticky top-0 z-10 overflow-x-scroll md:overflow-hidden bg-gray-100 w-full">
        <div className="flex space-x-1 p-2 items-center justify-start md:justify-center">
          {categories.map((category) => (
            <CategoryIconMobile key={category.id} category={category} />
          ))}
        </div>
      </nav>
    </>
  );
}
