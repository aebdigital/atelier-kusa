"use client";

import { useState } from "react";
import Link from "next/link";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 z-50 flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
          <img src="/logo.jpg" alt="Atelier Kusa Logo" className="w-10 h-auto" />
          <span className="text-lg font-bold tracking-widest uppercase">
            Ateliér Kusá
          </span>
        </Link>

        <button
          onClick={toggleMenu}
          className="w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-black transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-black transition-all duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-black transition-all duration-300 ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      {/* Mobile Slide-out Menu */}
      <aside
        className={`md:hidden fixed top-16 right-0 h-[calc(100vh-4rem)] w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="p-8">
          <ul className="space-y-6 text-sm font-medium uppercase tracking-wide">
            <li>
              <Link
                href="/"
                className="hover:text-gray-500 transition-colors block"
                onClick={closeMenu}
              >
                Domov
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="hover:text-gray-500 transition-colors block"
                onClick={closeMenu}
              >
                Projekty
              </Link>
            </li>
            <li>
              <Link
                href="/kontakt"
                className="hover:text-gray-500 transition-colors block"
                onClick={closeMenu}
              >
                Kontakt
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-white p-8 flex-col border-r border-gray-100 z-50">
        <div className="mb-12">
          <Link href="/" className="block">
            <img src="/logo.jpg" alt="Atelier Kusa Logo" className="w-16 h-auto mb-4" />
            <span className="text-xl font-bold tracking-widest uppercase block">
              Ateliér Kusá
            </span>
          </Link>
        </div>

        <nav className="flex-1">
          <ul className="space-y-4 text-sm font-medium uppercase tracking-wide">
            <li>
              <Link href="/" className="hover:text-gray-500 transition-colors">
                Domov
              </Link>
            </li>
            <li>
              <Link href="/projects" className="hover:text-gray-500 transition-colors">
                Projekty
              </Link>
            </li>
            <li>
              <Link href="/kontakt" className="hover:text-gray-500 transition-colors">
                Kontakt
              </Link>
            </li>
          </ul>
        </nav>

        <div className="text-xs text-gray-400 mt-auto">
          <p>&copy; {new Date().getFullYear()} Ateliér Kusá</p>
        </div>
      </aside>
    </>
  );
}
