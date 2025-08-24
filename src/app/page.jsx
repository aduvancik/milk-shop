"use client";

import Head from "next/head";
import Basket from "../components/Basket";
import Intro from "../components/Intro";
import Products from "../components/Products";
import WhyUs from "../components/WhyUs";
import { useCart } from "./context/CartContext";

export default function Home() {
  const { cart, setCart, cartReady } = useCart();

  return (
    <>
      <Head>
        <title>Milk Shop — Купити молочні продукти онлайн</title>
        <meta
          name="description"
          content="Купуйте свіжі молочні продукти онлайн: молоко, кефір, йогурти та сир. Швидка доставка по Україні."
        />
        <meta
          name="keywords"
          content="молочні продукти, молоко, кефір, йогурт, сир, купити онлайн, доставка"
        />
        <link rel="canonical" href="https://milk-shop-two.vercel.app/" />

        {/* Open Graph для соцмереж */}
        <meta property="og:title" content="Сир панок — Купити молочні продукти онлайн" />
        <meta
          property="og:description"
          content="Свіжі молочні продукти: молоко, кефір, йогурти та сир з доставкою по Україні."
        />
        <meta property="og:image" content="https://milk-shop-two.vercel.app/og-image.png" />
        <meta property="og:url" content="https://milk-shop-two.vercel.app/" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Milk Shop — Купити молочні продукти онлайн" />
        <meta
          name="twitter:description"
          content="Свіжі молочні продукти: молоко, кефір, йогурти та сир з доставкою по Україні."
        />
        <meta name="twitter:image" content="https://milk-shop-two.vercel.app/og-image.png" />

        {/* JSON-LD для головної сторінки */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              "name": "Milk Shop",
              "url": "https://milk-shop-two.vercel.app/",
              "logo": "https://milk-shop-two.vercel.app/logo.png",
              "description": "Купуйте свіжі молочні продукти онлайн з доставкою по Україні.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Київ",
                "addressCountry": "UA"
              },
              "telephone": "+380XXXXXXXXX",
            }),
          }}
        />
      </Head>

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
    </>
  );
}
