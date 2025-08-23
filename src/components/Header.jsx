"use client";

import { LuMilk } from "react-icons/lu";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex justify-between items-center p-6 shadow-md relative">
      {/* Лого */}
      <Link href="/" className="flex items-center gap-2">
        <LuMilk className="text-[#3a7cc4] text-[30px]" />
        <span className="font-bold text-lg">MilkShop</span>
      </Link>

      {/* Меню для великих екранів */}
      <ul className="hidden md:flex gap-[40px] font-bold">
        {[
          { name: "Про нас", href: "/about" },
          { name: "Продукція", href: "/products" },
          { name: "Контакти", href: "/contacts" },
        ].map((item, idx) => (
          <li
            key={idx}
            className="relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-[#3a7cc4] after:transition-all hover:after:w-full"
          >
            <Link href={item.href}>{item.name}</Link>
          </li>
        ))}
      </ul>

      {/* Бургер для мобільних */}
      <div
        className="md:hidden flex flex-col gap-1 cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="w-6 h-[3px] bg-[#3a7cc4] rounded"></span>
        <span className="w-6 h-[3px] bg-[#3a7cc4] rounded"></span>
        <span className="w-6 h-[3px] bg-[#3a7cc4] rounded"></span>
      </div>

      {/* Мобільне меню */}
      {menuOpen && (
        <ul className="absolute top-[70px] left-0 w-full bg-white shadow-md flex flex-col items-center gap-6 py-6 font-bold md:hidden">
          {[
            { name: "Про нас", href: "/about" },
            { name: "Продукція", href: "/products" },
            { name: "Контакти", href: "/contacts" },
          ].map((item, idx) => (
            <li
              key={idx}
              className="relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-[#3a7cc4] after:transition-all hover:after:w-full"
              onClick={() => setMenuOpen(false)}
            >
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
