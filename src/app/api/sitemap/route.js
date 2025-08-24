import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function GET() {
  const baseUrl = "https://milk-shop-two.vercel.app";

  // ✅ Отримуємо всі товари
  const snapshot = await getDocs(collection(db, "products"));
  const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  // ✅ Створюємо XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Головна сторінка
  xml += `  <url>\n    <loc>${baseUrl}/</loc>\n    <priority>1.0</priority>\n  </url>\n`;

  // Кошик
  xml += `  <url>\n    <loc>${baseUrl}/cart</loc>\n    <priority>0.8</priority>\n  </url>\n`;

  // Товари
  products.forEach(product => {
    xml += `  <url>\n    <loc>${baseUrl}/product/${product.id}</loc>\n    <priority>0.9</priority>\n  </url>\n`;
  });

  xml += `</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
