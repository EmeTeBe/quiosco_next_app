"use client";

import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

interface SidebarWrapperProps {
  children: React.ReactNode;
}

export function SidebarWrapper({ children }: SidebarWrapperProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botón hamburguesa para pantallas < 1200px */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/80 backdrop-blur-md hover:bg-white/90 shadow-lg transition-all"
        aria-label="Abrir menú"
      >
        <Bars3Icon className="w-6 h-6 text-gray-800" />
      </button>

      {/* Overlay translúcido con blur */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar animado con deslizado suave */}
      <div
        className={`fixed left-0 top-0 h-full w-64 z-50 lg:hidden transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <aside className="w-full h-full bg-white/95 backdrop-blur-2xl shadow-2xl overflow-y-auto flex flex-col">
          <div className="sticky top-0 bg-white/95 backdrop-blur-2xl p-4 border-b border-gray-200">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg bg-amber-50 hover:bg-amber-100 transition-all"
              aria-label="Cerrar menú"
            >
              <XMarkIcon className="w-6 h-6 text-gray-800" />
            </button>
          </div>
          <nav className="flex-1 mt-4 space-y-3 px-4 pb-4">{children}</nav>
        </aside>
      </div>

      {/* Sidebar desktop (visible en sm+, se achica responsivamente) */}
      <aside className="hidden sm:flex w-full h-full bg-white/30 backdrop-blur-2xl flex-col z-40 pt-6">
        <nav className="space-y-2 sm:space-y-2.5 md:space-y-3 px-2 sm:px-3 md:px-5 overflow-y-auto pb-6">
          {children}
        </nav>
      </aside>
    </>
  );
}
