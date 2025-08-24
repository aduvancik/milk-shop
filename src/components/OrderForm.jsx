'use client';

import { useState } from "react";
// import { db } from "@/firebase";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { sendTelegramMessage } from "@/utils/sendTelegramMessage";

export default function OrderForm({ cart, onClose }) {
  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "",
    region: "", city: "", address: "",
    deliveryType: "ukrPost", branchNumber: "",
    paymentMethod: "cash"
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const regions = ["Вінницька", "Волинська", "Дніпропетровська", "Донецька",
    "Житомирська", "Закарпатська", "Запорізька", "Івано-Франківська",
    "Київська", "Кіровоградська"];

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // const orderPayload = { ...formData, cart, createdAt: serverTimestamp() };
      // await addDoc(collection(db, "orders"), orderPayload);

      let paymentText = formData.paymentMethod === "cash" ? "Готівка при отриманні" : "Карткою";

      let message = `<b>Нове замовлення</b>\n\nПІБ: ${formData.fullName}\nТелефон: ${formData.phone}\nEmail: ${formData.email}\n`;
      message += `Область: ${formData.region}\nМісто: ${formData.city}\nАдреса: ${formData.address}\n`;
      message += `Доставка: ${formData.deliveryType}\n`;
      message += `Відділення: ${formData.branchNumber}\n`;
      message += `Оплата: ${paymentText}\n\nТовари:\n`;
      cart.forEach(item => message += `• ${item.name} x ${item.quantity}\n`);

      const telegramResponse = await sendTelegramMessage(message);

      if (!telegramResponse.ok) alert("Помилка надсилання Telegram повідомлення: " + telegramResponse.error);

      setSuccessMessage("Замовлення успішно оформлено!");
      setTimeout(() => { setSuccessMessage(""); onClose(); }, 5000);

    } catch (err) {
      console.error(err);
      alert("Сталася помилка, спробуйте ще раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-2xl w-full max-w-lg relative shadow-lg">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold">&times;</button>
        <h2 className="text-2xl font-bold mb-4 text-[#466a59]">Оформлення замовлення</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="ПІБ" className="border rounded-lg p-2 w-full" required />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border rounded-lg p-2 w-full" required />
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Телефон" className="border rounded-lg p-2 w-full" required />
          <select name="region" value={formData.region} onChange={handleChange} className="border rounded-lg p-2 w-full" required>
            <option value="">Область</option>
            {regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Місто / село" className="border rounded-lg p-2 w-full" required />
          <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Вулиця, будинок, квартира" className="border rounded-lg p-2 w-full" required />
          <select name="deliveryType" value={formData.deliveryType} onChange={handleChange} className="border rounded-lg p-2 w-full">
            <option value="ukrPost">УкрПошта</option>
            <option value="novaPost">Нова Пошта</option>
          </select>

          <input type="number" name="branchNumber" value={formData.branchNumber} onChange={handleChange} placeholder="Номер відділення" className="border rounded-lg p-2 w-full" required />

          <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="border rounded-lg p-2 w-full">
            <option value="cash">Готівка при отриманні</option>
            <option value="card">Оплата карткою</option>
          </select>

          <button type="submit" disabled={loading} className="bg-[#466a59] text-white py-2 px-4 rounded-lg hover:bg-[#385548] transition w-full flex justify-center items-center">
            {loading ? <span className="animate-pulse">Відправка...</span> : "Підтвердити замовлення"}
          </button>

          {successMessage && <p className="text-green-600 font-semibold mt-2 text-center">{successMessage}</p>}
        </form>
      </div>
    </div>
  );
}
