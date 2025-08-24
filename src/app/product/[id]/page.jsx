"use client";
import { use, useState, useEffect } from "react";
import Head from "next/head";
import { db } from "@/firebase";
import { doc, getDoc, collection, getDocs, query, limit } from "firebase/firestore";
import { useCart } from "../../context/CartContext";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";

export default function ProductPage({ params }) {
  const { id } = use(params);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recommended, setRecommended] = useState([]);
  const [message, setMessage] = useState("");

  const { cart, setCart } = useCart();
  const inCart = cart.some((item) => item.id === id);

  // Завантаження продукту
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          setProduct(null);
        }
      } catch (err) {
        console.error(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  // Завантаження рекомендованих товарів
  useEffect(() => {
    if (!product) return;

    const fetchRecommended = async () => {
      try {
        const q = query(collection(db, "products"), limit(5));
        const snapshot = await getDocs(q);
        const items = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((p) => p.id !== product.id);
        setRecommended(items);
      } catch (err) {
        console.error(err);
        setRecommended([]);
      }
    };

    fetchRecommended();
  }, [product]);

  const handleCartClick = () => {
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

  if (loading) return <p className="p-6 text-center">Завантаження...</p>;
  if (!product) return <p className="p-6 text-red-600 font-semibold text-center">Товар не знайдено</p>;

  // Динамічні SEO-теги
  const title = `${product.name} — Купити онлайн | Milk Shop`;
  const description = product.description || "Свіжі молочні продукти з доставкою по Україні.";
  const url = `https://milk-shop-two.vercel.app/products/${product.id}`;
  const image = product.image || "/img/placeholder.png";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="product" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        {/* JSON-LD для продукту */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": product.name,
              "image": [image],
              "description": description,
              "sku": product.id,
              "offers": {
                "@type": "Offer",
                "url": url,
                "priceCurrency": "UAH",
                "price": product.price,
                "availability": "https://schema.org/InStock"
              }
            })
          }}
        />
      </Head>

      <main className="p-4 md:p-6 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 flex justify-center">
            <Image
              src={image}
              alt={product.name}
              width={500}
              height={500}
              className="w-full max-w-md rounded-2xl shadow-lg object-cover"
            />
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#466a59] mb-2">{product.name}</h1>
              {product.description && (
                <p className="text-gray-700 mb-4">{product.description}</p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-red-600 font-bold text-3xl">{product.price} грн</p>

              <button
                onClick={handleCartClick}
                className={`px-6 py-3 rounded-xl transition w-full md:w-auto ${inCart ? "bg-green-500 text-white hover:bg-green-600" : "bg-red-500 text-white hover:bg-red-600"
                  }`}
              >
                {inCart ? "Видалити з корзини" : "Додати в корзину"}
              </button>
            </div>

            {message && (
              <div className="bg-green-100 text-green-800 p-2 rounded mt-4">{message}</div>
            )}
          </div>
        </div>

        {recommended.length > 0 && (
          <div className="w-full mt-10">
            <h2 className="text-2xl font-bold text-[#466a59] mb-4">Інші товари</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {recommended.map((item) => (
                <ProductCard key={item.id} product={item} cart={cart} setCart={setCart} />
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
