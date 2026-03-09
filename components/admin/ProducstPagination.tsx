"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

type ProducstPaginationProps = {
  page: number;
  totalPages: number;
};

export default function ProducstPagination({
  page,
  totalPages,
}: ProducstPaginationProps) {
  const router = useRouter();
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPage = e.target.value;
    router.push(`/admin/products?page=${selectedPage}`);
  };

  return (
    <nav className="flex justify-center py-5 gap-2">
      {page > 1 && (
        <Link
          href={`/admin/products?page=${page - 1}`}
          className="bg-slate-300 px-2 rounded-md shadow shadow-slate-600 hover:shadow-inner focus:z-20 focus:outline-offset-0"
        >
          &laquo;
        </Link>
      )}
      <select
        name="currentPage"
        id="currentPage"
        value={page}
        onChange={handlePageChange}
        className="bg-slate-300 rounded-md shadow shadow-slate-600 hover:shadow-inner focus:outline-none focus:ring-0 cursor-pointer"
      >
        {pages.map((currentPage) => (
          <option key={currentPage} value={currentPage}>
            {currentPage} / {totalPages}
          </option>
        ))}
      </select>

      {page < totalPages && (
        <Link
          href={`/admin/products?page=${page + 1}`}
          className="bg-slate-300 px-2 rounded-md shadow shadow-slate-600 hover:shadow-inner focus:z-20 focus:outline-offset-0"
        >
          &raquo;
        </Link>
      )}
    </nav>
  );
}
