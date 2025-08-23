"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Products({ cart, setCart }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const [searchTerm, setSearchTerm] = useState("");
  const [sortByPrice, setSortByPrice] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  // Завантаження продуктів з Firebase
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(items);
        setFilteredProducts(items);
      } catch (err) {
        console.error("Помилка завантаження продуктів:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Фільтрування, пошук і сортування
  useEffect(() => {
    let updated = [...products];

    if (searchTerm) {
      updated = updated.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory) {
      updated = updated.filter(p => p.category === filterCategory);
    }

    if (priceRange.min !== "" || priceRange.max !== "") {
      updated = updated.filter(p => {
        const price = parseFloat(p.price) || 0;
        return (
          (priceRange.min === "" || price >= parseFloat(priceRange.min)) &&
          (priceRange.max === "" || price <= parseFloat(priceRange.max))
        );
      });
    }

    if (sortByPrice === "asc") {
      updated.sort((a, b) => a.price - b.price);
    } else if (sortByPrice === "desc") {
      updated.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updated);
    setCurrentPage(1);
  }, [searchTerm, sortByPrice, filterCategory, priceRange, products]);

  // Пагінація
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (!mounted) return null;

  return (
    <div className="p-4" id="products">
      {/* Заголовок та фільтри */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h5 className="text-xl font-bold mb-4 text-[#466a59] tracking-wide drop-shadow-md relative
          after:content-[''] after:block after:w-10 after:h-[3px] after:bg-[#466a59] after:mt-1 after:rounded-full">
          Товари
        </h5>

        <div className="flex flex-wrap gap-3 items-center sm:flex-row flex-col sm:items-center items-stretch">
          {/* Пошук */}
          <input
            type="text"
            placeholder="Пошук за назвою..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="border rounded-lg p-2 w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-[#466a59]"
          />

          {/* Мін/Макс */}
          <div className="flex gap-2 items-center w-full sm:w-auto">
            <input
              type="number"
              placeholder="мін."
              value={priceRange.min}
              onChange={e => setPriceRange({ ...priceRange, min: e.target.value })}
              className="flex-1 sm:flex-none w-full sm:w-20 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#466a59]"
            />
            <span>-</span>
            <input
              type="number"
              placeholder="макс."
              value={priceRange.max}
              onChange={e => setPriceRange({ ...priceRange, max: e.target.value })}
              className="flex-1 sm:flex-none w-full sm:w-20 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#466a59]"
            />
          </div>

          {/* Сортування */}
          <select
            value={sortByPrice}
            onChange={e => setSortByPrice(e.target.value)}
            className="border rounded-lg p-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-[#466a59]"
          >
            <option value="">Сортувати за ціною</option>
            <option value="asc">За зростанням</option>
            <option value="desc">За спаданням</option>
          </select>
        </div>
      </div>

      {/* Сітка продуктів або скелетони */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,280px))] gap-4 justify-center place-items-center mx-auto">
        {loading
          ? Array.from({ length: productsPerPage }).map((_, i) => (
            <div
              key={i}
              className="border rounded-2xl shadow-md hover:shadow-lg overflow-hidden transition flex flex-col relative w-full max-w-[280px]"
            >
              <div className="w-full h-48 sm:h-52 md:h-56 lg:h-60 bg-gray-200"></div>
              <div className="p-4 space-y-2">
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))
          : currentProducts.map(product => (
            <div key={product.id} className="w-full max-w-[280px]">
              <ProductCard
                product={product}
                cart={cart}
                setCart={setCart}
              />
            </div>
          ))
        }
      </div>




      {/* Пагінація */}
      <div className="flex justify-center mt-6 gap-2 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-lg border transition-colors duration-200
            ${currentPage === i + 1
                ? "bg-[#385548] text-white"
                : "bg-white hover:bg-gray-100"
              }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
