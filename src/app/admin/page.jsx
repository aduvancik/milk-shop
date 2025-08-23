"use client";

import { useState, useEffect } from "react";
import { storage, db, auth } from "../../firebase";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

export default function Admin() {
  const [user, setUser] = useState(null);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState({
    image: null,
    name: "",
    description: "",
    price: "",
    unit: "шт",
  });
  const [editingProductId, setEditingProductId] = useState(null);
  const [modal, setModal] = useState({ show: false, message: "", type: "success" });

  // Авторизація
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) fetchProducts();
    });
    return () => unsubscribe();
  }, []);

  // Модальні повідомлення
  useEffect(() => {
    if (modal.show) {
      const timer = setTimeout(() => setModal({ ...modal, show: false }), 3000);
      return () => clearTimeout(timer);
    }
  }, [modal]);

  // Логін
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
      setModal({ show: true, message: "Вхід успішний!", type: "success" });
    } catch (err) {
      console.error(err);
      setModal({ show: true, message: "Невірний email або пароль.", type: "error" });
    }
  };

  // Логут
  const handleLogout = async () => {
    await signOut(auth);
    setModal({ show: true, message: "Ви вийшли з системи.", type: "success" });
    setProducts([]);
  };

  // Поля логіну
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Поля продукту
  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setProductData({ ...productData, image: e.target.files[0] });
  };

  // Підвантаження продуктів
  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const items = [];
    querySnapshot.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
    setProducts(items);
  };

  // Видалення продукту
  const handleDelete = async (product) => {
    if (product.image && product.image.includes("https://")) {
      try {
        const filePath = decodeURIComponent(product.image.split("/o/")[1].split("?")[0]);
        const imageRef = ref(storage, filePath);
        await deleteObject(imageRef);
      } catch (err) {
        console.error("Помилка видалення картинки:", err);
      }
    }
    await deleteDoc(doc(db, "products", product.id));
    setModal({ show: true, message: "Продукт видалено.", type: "success" });
    fetchProducts();
  };

  // Редагування продукту
  const handleEdit = (product) => {
    setEditingProductId(product.id);
    setProductData({
      image: product.image || null,
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      unit: product.unit || "шт",
    });
  };

  // Додавання / оновлення
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productData.name) {
      setModal({ show: true, message: "Заповніть обов'язкові поля!", type: "error" });
      return;
    }

    try {
      let imageURL = productData.image;

      // Якщо вибрано нову картинку (File)
      if (productData.image instanceof File) {
        const fileName = productData.image.name.replace(/\s/g, "_");
        const storageRef = ref(storage, `products/${fileName}`);
        await uploadBytes(storageRef, productData.image);
        imageURL = await getDownloadURL(storageRef);
      }

      const productPayload = { ...productData, image: imageURL };

      if (editingProductId) {
        await updateDoc(doc(db, "products", editingProductId), productPayload);
        setModal({ show: true, message: "Продукт оновлено!", type: "success" });
      } else {
        await addDoc(collection(db, "products"), productPayload);
        setModal({ show: true, message: "Продукт успішно додано!", type: "success" });
      }

      // Скидання форми
      setProductData({ image: null, name: "", description: "", price: "", unit: "шт" });
      setEditingProductId(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
      setModal({ show: true, message: "Сталася помилка.", type: "error" });
    }
  };

  // === UI ===
  if (!user) {
    return (
      <main className="p-6 max-w-md mx-auto mt-20">
        <h1 className="text-3xl font-bold mb-6 text-center">Вхід для адміністратора</h1>
        {modal.show && (
          <div className={`fixed top-5 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg text-white font-semibold z-50
            ${modal.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
            {modal.message}
          </div>
        )}
        <form onSubmit={handleLogin} className="flex flex-col gap-4 bg-white p-6 rounded-2xl shadow-md">
          <input type="email" name="email" placeholder="Email" value={loginData.email} onChange={handleLoginChange} className="border rounded-lg p-2" />
          <input type="password" name="password" placeholder="Пароль" value={loginData.password} onChange={handleLoginChange} className="border rounded-lg p-2" />
          <button type="submit" className="bg-[#466a59] text-white py-2 px-4 rounded-lg hover:bg-[#385548] transition">Увійти</button>
        </form>
      </main>
    );
  }

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Адмін-панель</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition">Вийти</button>
      </div>

      {modal.show && (
        <div className={`fixed top-5 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg text-white font-semibold z-50
            ${modal.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {modal.message}
        </div>
      )}

      {/* Форма додавання / редагування */}
      <section className="bg-white shadow-md rounded-2xl p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4 text-[#466a59]">
          {editingProductId ? "✏️ Редагувати продукт" : "➕ Додати продукт"}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="font-medium mb-1">Картинка</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="border rounded-lg p-2" />
            {productData.image && (
              <img
                src={productData.image instanceof File ? URL.createObjectURL(productData.image) : productData.image}
                alt="preview"
                className="mt-2 w-24 h-24 object-cover rounded-lg"
              />
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-medium mb-1">Назва</label>
            <input type="text" name="name" value={productData.name} onChange={handleChange} placeholder="Введіть назву" className="border rounded-lg p-2" />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="font-medium mb-1">Опис</label>
            <textarea name="description" value={productData.description} onChange={handleChange} placeholder="Короткий опис товару" className="border rounded-lg p-2" />
          </div>

          <div className="flex flex-col">
            <label className="font-medium mb-1">Ціна</label>
            <input type="number" name="price" value={productData.price} onChange={handleChange} placeholder="0" className="border rounded-lg p-2" />
          </div>

          <div className="flex flex-col">
            <label className="font-medium mb-1">Одиниця виміру</label>
            <select name="unit" value={productData.unit} onChange={handleChange} className="border rounded-lg p-2">
              <option value="шт">шт</option>
              <option value="кг">кг</option>
              <option value="г">г</option>
              <option value="л">л</option>
              <option value="мл">мл</option>
            </select>
          </div>

          <button type="submit" className="bg-[#466a59] text-white py-2 px-4 rounded-lg hover:bg-[#385548] transition mt-4 md:col-span-2">
            {editingProductId ? "Зберегти зміни" : "Додати продукт"}
          </button>
        </form>
      </section>

      {/* Список продуктів */}
      <section className="bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-[#466a59]">📦 Список продуктів</h2>
        {products.length === 0 && <p>Продукти відсутні</p>}
        <ul className="space-y-4">
          {products.map((product) => (
            <li key={product.id} className="flex justify-between items-center border p-3 rounded-lg">
              <div className="flex items-center gap-4">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p>{product.description}</p>
                  <p>{product.price} {product.unit}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(product)} className="bg-yellow-400 text-white py-1 px-3 rounded-lg hover:bg-yellow-500 transition">Редагувати</button>
                <button onClick={() => handleDelete(product)} className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition">Видалити</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
