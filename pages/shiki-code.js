"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Services",
    href: "/services",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        !menuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div
        ref={menuRef}
        className="relative"
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight"
          >
            Logo
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-700 transition hover:text-black"
              >
                {link.name}
              </Link>
            ))}

            <button className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-90">
              Login
            </button>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center rounded-lg p-2 md:hidden"
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            isOpen
              ? "max-h-96 border-t"
              : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-4 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-gray-700 transition hover:text-black"
              >
                {link.name}
              </Link>
            ))}

            <button className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-90">
              Login
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}