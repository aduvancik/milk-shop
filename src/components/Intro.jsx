import { motion } from "framer-motion";

export default function Intro() {
  return (
    <section className="flex flex-col md:flex-row justify-between items-center px-6 md:px-10 py-10 gap-6 md:gap-10">
      {/* Текст */}
      <motion.h1
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-[40px] sm:text-[50px] md:text-[60px] lg:text-[80px] font-bold text-center md:text-left leading-snug"
      >
        Свіжа молочка <br />
        продукція прямо<br />
        з ферми
      </motion.h1>

      {/* Картинка */}
      <motion.img
        src="/img/milk.png"
        alt="milk production"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px]"
      />
    </section>
  );
}
