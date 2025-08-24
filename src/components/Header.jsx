"use client";

import { GiCheeseWedge } from "react-icons/gi"; // іконка сиру
import { CiShoppingBasket } from "react-icons/ci";
import { useState } from "react";
import { useCart } from "../app/context/CartContext";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { setIsCartOpen } = useCart();

  // Функція скролу до секції
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false); // закриваємо мобільне меню
    }
  };

  const menuItems = [
    { name: "Продукція", id: "products" },
    { name: "Контакти", id: "footer" },
  ];

  return (
    <header className="flex justify-between items-center p-6 shadow-md relative" role="banner">
      {/* Лого */}
      <Link
        href="/"
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="На головну"
      >
        <div className="bg-yellow-200 p-2 rounded-full shadow-sm">
          <GiCheeseWedge className="text-yellow-600 text-2xl" />
        </div>
        <span className="font-extrabold text-xl text-gray-800 tracking-wide">Сир Панок</span>
      </Link>

      {/* Меню для великих екранів */}
      <nav role="navigation" aria-label="Основне меню">
        <ul className="hidden md:flex gap-[40px] font-bold">
          {menuItems.map((item, idx) => (
            <li
              key={idx}
              className="relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-[#3a7cc4] after:transition-all hover:after:w-full"
              onClick={() => scrollToSection(item.id)}
              role="menuitem"
            >
              {item.name}
            </li>
          ))}
        </ul>
      </nav>

      {/* Кнопка корзини */}
      <Link
        href="/cart"
        className="lg:hidden text-[#3a7cc4] text-3xl"
        aria-label="Кошик"
      >
        <CiShoppingBasket />
      </Link>

      {/* Бургер для мобільних */}
      <div
        className="md:hidden flex flex-col gap-1 cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter") setMenuOpen(!menuOpen) }}
      >
        <span className="w-6 h-[3px] bg-[#3a7cc4] rounded"></span>
        <span className="w-6 h-[3px] bg-[#3a7cc4] rounded"></span>
        <span className="w-6 h-[3px] bg-[#3a7cc4] rounded"></span>
      </div>

      {/* Мобільне меню */}
      {menuOpen && (
        <ul
          id="mobile-menu"
          className="absolute top-[70px] left-0 w-full bg-white shadow-md flex flex-col items-center gap-6 py-6 font-bold md:hidden list-none"
          role="menu"
          aria-label="Мобільне меню"
        >
          {menuItems.map((item, idx) => (
            <li
              key={idx}
              className="relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-[#3a7cc4] after:transition-all hover:after:w-full"
              onClick={() => scrollToSection(item.id)}
              role="menuitem"
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
