const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");

admin.initializeApp();

const TELEGRAM_BOT_TOKEN = "твій_токен_бота";
const TELEGRAM_CHAT_ID = "-1003064760165"; // твій чат

exports.sendOrderToTelegram = functions.https.onRequest(async (req, res) => {
  // Додаємо CORS
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).send("");
  }

  if (req.method !== "POST") {
    return res.status(405).send({ error: "Метод не дозволений" });
  }

  try {
    const data = req.body;

    const message = `
Нове замовлення:
Ім'я: ${data.fullName}
Телефон: ${data.phone}
Email: ${data.email}
Область: ${data.region}
Місто: ${data.city}
Адреса: ${data.address}
Доставка: ${data.deliveryType} відділення ${data.branchNumber}
Оплата: ${data.paymentMethod}
Кошик: ${data.cart.map(item => `${item.name} (${item.quantity} шт)`).join(", ")}
    `;

    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message }),
    });

    const json = await response.json();
    if (!json.ok) throw new Error(JSON.stringify(json));

    res.status(200).send({ success: true });
  } catch (err) {
    console.error("Telegram error:", err);
    res.status(500).send({ success: false, error: err.message });
  }
});
