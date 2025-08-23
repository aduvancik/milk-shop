"use client";

import { useState } from "react";
import { CiShoppingBasket } from "react-icons/ci";
import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product, cart, setCart }) {
  const [message, setMessage] = useState("");
  const inCart = cart.some((item) => item.id === product.id);

  const handleCartClick = (e) => {
    e.preventDefault(); // блокуємо перехід по Link, якщо кнопка всередині
    let newCart;
    if (inCart) {
      newCart = cart.filter((item) => item.id !== product.id);
      setMessage("Продукт видалено з корзини");
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
      setMessage("Продукт додано в корзину");
    }

    setCart(newCart);
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <>
      <div className="border rounded-2xl shadow-md hover:shadow-lg overflow-hidden transition flex flex-col relative">
        <Link href={`/product/${product.id}`} className="block">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={200}
            className="w-full h-48 object-cover"
          />
          <div className="p-4 flex flex-col gap-2">
            <h2 className="font-semibold text-lg">{product.name}</h2>
            <p className="text-red-600 font-bold">{product.price} грн/шт</p>
          </div>
        </Link>

        <button
          onClick={handleCartClick}
          className={`absolute bottom-2 right-2 rounded-full border-2 p-2 transition ${
            inCart
              ? "bg-green-500 border-green-500"
              : "border-gray-200 hover:bg-red-50"
          }`}
        >
          <CiShoppingBasket
            className={`text-2xl ${inCart ? "text-white" : "text-red-600"}`}
          />
        </button>
      </div>

      {message && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg text-white font-semibold z-50 bg-green-500">
          {message}
        </div>
      )}
    </>
  );
}
