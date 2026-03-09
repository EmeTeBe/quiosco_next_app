"use client";

import { useRouter } from "next/navigation";

export default function GoBackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="bg-amber-300 w-full lg:w-auto text-lg px-10 py-2 text-center font-bold cursor-pointer rounded-bl-lg rounded-tr-lg shadow shadow-slate-400 hover:shadow-inner"
    >
      Volver
    </button>
  );
}
