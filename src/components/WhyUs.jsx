export default function WhyUs() {
  return (
    <section>
      <h5 className="
        text-xl 
        font-bold 
        mb-4 
        text-[#466a59] 
        tracking-wide 
        drop-shadow-md 
        relative 
        after:content-[''] 
        after:block 
        after:w-10 
        after:h-[3px] 
        after:bg-[#466a59] 
        after:mt-1 
        after:rounded-full
      ">Чому ми?</h5>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 opacity-0 animate-fadeIn">
          <img src="/img/good.png" alt="Натуральні продукти" className="w-[50px] rounded-full border-[1px]" />
          <p className="text-gray-700 font-medium text-base">Натуральні продукти</p>
        </div>
        <div className="flex items-center gap-2 opacity-0 animate-fadeIn delay-150">
          <img src="/img/dostavka.png" alt="Швидка доставка" className="w-[50px] rounded-full border-[1px]" />
          <p className="text-gray-700 font-medium text-base">Швидка доставка</p>
        </div>
        <div className="flex items-center gap-2 opacity-0 animate-fadeIn delay-300">
          <img src="/img/good1.png" alt="Висока якість" className="w-[50px] rounded-full border-[1px]" />
          <p className="text-gray-700 font-medium text-base">Висока якість</p>
        </div>
      </div>

      {/* Tailwind кастом анімація */}
      <style>{`
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.5s ease forwards;
  }
  .delay-150 { animation-delay: 0.15s; }
  .delay-300 { animation-delay: 0.3s; }
`}</style>

    </section>
  );
}
