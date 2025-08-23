"use client";

import { useState, useEffect, use } from "react";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ProductPage({ params }) {
  const { id } = use(params); // 👈 розпаковуємо Promise

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setProduct({ id: docSnap.id, ...docSnap.data() });
        else setProduct(null);
      } catch (err) {
        console.error(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    setCart(prev => [...prev, { ...product, quantity: 1 }]);
    setMessage("Товар додано в корзину");
    setTimeout(() => setMessage(""), 3000);
  };

  if (loading) return <p className="p-6">Завантаження...</p>;
  if (!product) return <p className="p-6 text-red-600 font-semibold">Товар не знайдено</p>;

  return (
    <main className="p-4 md:p-6 max-w-5xl mx-auto">
      {message && <div className="bg-green-100 text-green-800 p-2 rounded mb-4">{message}</div>}
      <img src={product.image} alt={product.name} className="w-full max-w-md rounded-2xl shadow-lg mb-4" />
      <h1 className="text-3xl font-bold text-[#466a59] mb-2">{product.name}</h1>
      <p className="text-gray-700 mb-2">{product.description}</p>
      <p className="text-red-600 font-bold text-2xl">{product.price} грн</p>
      <button
        onClick={handleAddToCart}
        className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-600 transition"
      >
        Додати в корзину
      </button>
    </main>
  );
}
