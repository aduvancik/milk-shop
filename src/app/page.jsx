"use client";

import Basket from "../components/Basket";
import Intro from "../components/Intro";
import Products from "../components/Products";
import WhyUs from "../components/WhyUs";
import { useCart } from "./context/CartContext";

export default function Home() {
  const { cart, setCart, cartReady } = useCart();

  return (
    <main className="p-4 lg:p-6">
      <Intro />

      {/* На малих екранах */}
      <div className="lg:hidden block">
        {/* <Basket cart={cart} setCart={setCart} cartReady={cartReady} /> */}
        {/* <WhyUs /> ✅ тепер під кошиком */}
      </div>

      {/* На великих екранах */}
      <div className="flex flex-col lg:flex-row">
        <div className="pr-6 border-gray-300 lg:w-4/5 lg:border-r">
          <Products cart={cart} setCart={setCart} />
        </div>

        <div className="flex flex-col gap-5 pl-6">
          <div className="hidden lg:block">
            <Basket cart={cart} setCart={setCart} cartReady={cartReady} />
          </div>
          <WhyUs />
        </div>
      </div>
    </main>
  );
}
