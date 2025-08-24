import "./styles/globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CartProvider } from "./context/CartContext";

// Шрифти
const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

// Metadata (може експортуватись тільки у Server Component)
export const metadata = {
  title: "Сир панок – натуральні молочні продукти",
  description: "Купуйте свіжі молочні продукти онлайн: творог, сир, молоко та інші. Доставка по Україні.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <head>
        <meta charSet="UTF-8" />
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title}</title>

        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/favicon.png" />
        <meta property="og:url" content="https://milk-shop.vercel.app" />

        <link rel="icon" href="/img/favikon.png" />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-[#fefbf1]`}>
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
