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
      <div className="border rounded-2xl shadow-md hover:shadow-lg overflow-hidden transition flex flex-col relative w-full md:min-w-[200px] max-w-[250px]">
        <Link href={`/product/${product.id}`} className="block">
          <img
            src={product.image || "/img/placeholder.png"}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4 flex flex-col gap-2">
            <h2 className="font-semibold text-base sm:text-lg md:text-xl">{product.name}</h2>
            <div className="flex justify-between items-center">

              <p className="text-red-600 font-bold sm:text-base text-xl sm:text-[10px] md:text-[13px] lg:text-[16px]">{product.price} грн / {product.unit}</p>
              <button
                onClick={handleCartClick}
                className={`w-min bottom-2 right-2 rounded-full border-2 p-2 transition ${inCart ? "bg-green-500 border-green-500" : "border-gray-200 hover:bg-red-50"
                  }`}
              >
                <CiShoppingBasket
                  className={`${inCart ? "text-white" : "text-red-600"
                    } text-xl sm:text-1xl md:text-1xl lg:text-2xl transition-all cursor-pointer`}
                />

              </button>
            </div>
          </div>
        </Link>
      </div>


      {message && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg text-white font-semibold z-50 bg-green-500">
          {message}
        </div>
      )}
    </>
  );
}
