"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react"; // ❌ гарна іконка
import OrderForm from "@/components/OrderForm";

export default function CartPage() {
  const { cart, setCart, cartReady } = useCart();
  const [showOrderForm, setShowOrderForm] = useState(false);

  if (!cartReady) {
    return <p className="text-center mt-10">Завантаження...</p>;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-[#466a59] mb-6 text-center">
        Ваш кошик
      </h1>

      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500 mb-4">Ваш кошик порожній</p>
          <Link
            href="/"
            className="bg-[#466a59] text-white px-6 py-2 rounded-lg hover:bg-[#385548] transition"
          >
            Перейти до товарів
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map((item, idx) => (
            <Link
              href={`/product/${item.id}`}
              key={idx}
              className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md border"
            >
              {/* Зображення товару */}
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 relative rounded-lg overflow-hidden border">
                  <Image
                    src={item.image || "/placeholder.png"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="font-bold text-lg">{item.name}</h2>
                  <p className="text-gray-600">Кількість: {item.quantity}</p>
                  <p className="text-gray-800 font-semibold">
                    {item.price * item.quantity} грн
                  </p>
                </div>
              </div>

              {/* Кнопка видалення */}
              <button
                onClick={(e) => {
                  e.preventDefault();   // блокуємо default поведінку кнопки
                  e.stopPropagation();  // зупиняємо спрацьовування Link
                  setCart(cart.filter((_, index) => index !== idx));
                }}
                className="text-red-500 hover:bg-red-100 rounded-full p-2 transition"
              >
                <X size={20} />
              </button>
            </Link>
          ))}


          {/* Підсумок */}
          <div className="mt-6 bg-[#f5f9f7] p-6 rounded-xl shadow-inner">
            <h2 className="text-xl font-bold">Всього: {total} грн</h2>
            <button
              onClick={() => setShowOrderForm(true)}
              className="mt-4 w-full bg-[#466a59] text-white py-3 rounded-lg font-bold hover:bg-[#385548] transition"
            >
              Оформити замовлення
            </button>
          </div>
        </div>
      )}

      {/* Модалка форми */}
      {showOrderForm && (
        <OrderForm cart={cart} onClose={() => setShowOrderForm(false)} />
      )}
    </div>
  );
}
