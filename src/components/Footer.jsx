
export default function Footer() {
  return (
    <footer className="bg-[#426353] text-white py-10 mt-12">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

        {/* Контакти */}
        <div>
          <h5 className="text-lg font-semibold mb-3 border-b border-white/30 pb-2">Контакти</h5>
          <p className="hover:text-gray-200 transition">📞 +380********</p>
          <p className="hover:text-gray-200 transition">✉️ ваша пошта@gmail.com</p>
        </div>

        {/* Оплата та доставка */}
        <div>
          <h5 className="text-lg font-semibold mb-3 border-b border-white/30 pb-2">Оплата та доставка</h5>
          <p>Оплата при отриманні</p>
          <p>Доставка Новою Поштою</p>
        </div>

        {/* Соцмережі */}
        <div>
          <h5 className="text-lg font-semibold mb-3 border-b border-white/30 pb-2">Ми у соцмережах</h5>
          <div className="flex justify-center md:justify-start gap-4 text-xl">
            <a href="#" className="hover:text-[#f5c842] transition">🌐</a>
            <a href="#" className="hover:text-[#f5c842] transition">📘</a>
            <a href="#" className="hover:text-[#f5c842] transition">📷</a>
          </div>
        </div>
      </div>

      {/* Нижня лінія */}
      <div className="mt-10 border-t border-white/20 pt-4 text-sm text-gray-200 text-center">
        © {new Date().getFullYear()} Всі права захищені | Ваш магазин
      </div>
    </footer>
  );
}
