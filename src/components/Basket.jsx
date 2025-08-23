"use client";

import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaMinus } from "react-icons/fa";
import OrderForm from "./OrderForm";

export default function Basket({ cart, setCart, cartReady = false }) {
  const [showOrderForm, setShowOrderForm] = useState(false);

  const handleAdd = (productId) => {
    if (!cartReady) return;
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleMinus = (productId) => {
    if (!cartReady) return;
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // ЛОАДЕР поки cartReady === false
  if (!cartReady) {
    return (
      <section>
        <h5 className="text-xl font-bold mb-4 text-[#466a59] tracking-wide drop-shadow-md relative 
          after:content-[''] after:block after:w-10 after:h-[3px] after:bg-[#466a59] after:mt-1 after:rounded-full">
          Кошик
        </h5>

        <div className="max-h-[400px] overflow-y-auto pr-2">
          <div className="space-y-3 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-white rounded-xl shadow">
                <div className="w-[70px] h-[70px] bg-gray-200 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                </div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full" />
                  <div className="w-8 h-8 bg-gray-200 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 p-3 bg-[#f0f0f0] rounded-xl text-right text-lg font-bold text-[#466a59]">
          Перевірка кошика...
        </div>

        <div className="bg-gray-300 mx-auto mt-6 px-6 py-3 rounded-[20px] text-white w-max text-[14px] font-semibold tracking-wide shadow-md">
          Завантаження…
        </div>
      </section>
    );
  }

  // ОСНОВНИЙ рендер
  return (
    <section>
      <h5 className="text-xl font-bold mb-4 text-[#466a59] tracking-wide drop-shadow-md relative 
          after:content-[''] after:block after:w-10 after:h-[3px] after:bg-[#466a59] after:mt-1 after:rounded-full">
        Кошик
      </h5>

      <div className="max-h-[400px] overflow-y-auto pr-2">
        {cart.length === 0 ? (
          <p className="text-gray-500">Кошик порожній</p>
        ) : (
          <>
            <ul className="flex flex-col gap-4">
              {cart.map((product) => (
                <li
                  key={product.id}
                  className="flex justify-between items-center p-3 bg-white rounded-xl shadow gap-4"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-[70px] h-[70px] object-contain rounded-lg"
                  />
                  <div className="flex-1 flex flex-col justify-center ml-3">
                    <p className="font-semibold">{product.name}</p>
                    <div className="flex flex-col items-start text-gray-700 text-sm gap-1">
                      <span className="font-semibold">
                        {(product.price * product.quantity).toLocaleString()} грн
                      </span>
                      <span className="font-medium">{product.quantity} шт</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <IoMdAdd
                      onClick={() => handleAdd(product.id)}
                      className="text-[20px] rounded-full border p-1 border-[#adaea7] cursor-pointer transition duration-200 hover:bg-[#466a59] hover:text-white hover:border-[#466a59] hover:scale-110"
                      title="Додати"
                    />
                    <FaMinus
                      onClick={() => handleMinus(product.id)}
                      className="text-[20px] rounded-full border p-1 border-[#adaea7] cursor-pointer transition duration-200 hover:bg-[#b64545] hover:text-white hover:border-[#b64545] hover:scale-110"
                      title="Зменшити"
                    />
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-4 p-3 bg-[#f0f0f0] rounded-xl text-right text-lg font-bold text-[#466a59]">
              Загальна вартість: {totalPrice.toLocaleString()} грн
            </div>
          </>
        )}
      </div>

      <div
        onClick={() => setShowOrderForm(true)}
        className="bg-[#466a59] mx-auto mt-6 px-6 py-3 rounded-[20px] text-white w-max cursor-pointer text-[14px] font-semibold tracking-wide shadow-md transition duration-300 ease-in-out hover:bg-[#385548] hover:scale-105 hover:shadow-lg hover:text-gray-100"
      >
        Оформити замовлення
      </div>

      {showOrderForm && <OrderForm cart={cart} onClose={() => setShowOrderForm(false)} />}
    </section>
  );
}
