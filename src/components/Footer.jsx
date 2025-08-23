import Link from "next/link";
import { FaTelegramPlane, FaViber } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#426353] text-white py-10 mt-12" id="footer">
      <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center md:justify-between gap-6 text-center md:text-left">

        {/* Контакти */}
        <div className="flex-1 min-w-[200px]">
          <h5 className="text-lg font-semibold mb-3 border-b border-white/30 pb-2">Контакти</h5>
          <p className="hover:text-gray-200 transition">📞 +380671664464</p>
          <p className="hover:text-gray-200 transition">✉️ ваша пошта@gmail.com</p>
        </div>

        {/* Оплата та доставка */}
        <div className="flex-1 min-w-[200px]">
          <h5 className="text-lg font-semibold mb-3 border-b border-white/30 pb-2">Оплата та доставка</h5>
          <p>Оплата при отриманні</p>
          <p>Доставка Новою Поштою</p>
        </div>

        {/* Соцмережі */}
        <div className="flex-1 min-w-[200px]">
          <h5 className="text-lg font-semibold mb-3 border-b border-white/30 pb-2">Ми у соцмережах</h5>
          <div className="flex justify-center md:justify-start gap-4 text-xl">
            <Link
              href="https://t.me/TAVAT71"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md text-[#1da1f2] text-2xl transition transform hover:scale-110 hover:shadow-lg"
              title="Telegram"
            >
              <FaTelegramPlane />
            </Link>

            <Link
              href="viber://chat?number=+380671664464"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md text-[#665cac] text-2xl transition transform hover:scale-110 hover:shadow-lg"
              title="Viber"
            >
              <FaViber />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-white/20 pt-4 text-sm text-gray-200 text-center">
        © {new Date().getFullYear()} Всі права захищені | Ваш магазин
      </div>
    </footer>

  );
}
