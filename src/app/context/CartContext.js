"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Створюємо контекст
const CartContext = createContext();

// Провайдер
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartReady, setCartReady] = useState(false);

  // Завантажуємо корзину з localStorage при першому рендері
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (err) {
      console.error("Помилка при зчитуванні корзини:", err);
    } finally {
      setCartReady(true);
    }
  }, []);

  // Синхронізуємо корзину з localStorage при зміні
  useEffect(() => {
    if (cartReady) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, cartReady]);

  return (
    <CartContext.Provider value={{ cart, setCart, cartReady }}>
      {children}
    </CartContext.Provider>
  );
}

// Хук для зручності
export function useCart() {
  return useContext(CartContext);
}
