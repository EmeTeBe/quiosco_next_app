"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type AdminRouteProps = {
  link: {
    url: string;
    text: string;
    blank: boolean;
  };
};

export default function AdminRoute({ link }: AdminRouteProps) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(link.url);

  return (
    <Link
      href={link.url}
      target={link.blank ? "_blank" : ""}
      className={`font-bold text-lg p-3 last-of-type:border-b ${isActive ? "border-l-18 border-amber-400" : "border-gray-200  border-t"}`}
    >
      {link.text}
    </Link>
  );
}
