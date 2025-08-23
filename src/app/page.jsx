"use client";

import { useState, useEffect } from "react";
import Basket from "../components/Basket";
import Intro from "../components/Intro";
import Products from "../components/Products";
import WhyUs from "../components/WhyUs";

export default function Home() {
  const [cart, setCart] = useState([]);        // сам кошик
  const [cartReady, setCartReady] = useState(false); // прапорець готовності

  // 1) читаємо з localStorage один раз на клієнті
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(saved);
    setCartReady(true);
  }, []);

  // 2) записуємо у localStorage ТІЛЬКИ коли cart вже готовий
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!cartReady) return; // важливо: не перезаписати зразу порожнім масивом
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, cartReady]);

  return (
    <main className="p-6">
      <Intro />
      <div className="flex">
        <div className="pr-6 border-r border-gray-300 w-2/3">
          <Products cart={cart} setCart={setCart} />
        </div>

        <div className="flex flex-col gap-5 pl-6">
          <Basket cart={cart} setCart={setCart} cartReady={cartReady} />
          <WhyUs />
        </div>
      </div>
    </main>
  );
}
