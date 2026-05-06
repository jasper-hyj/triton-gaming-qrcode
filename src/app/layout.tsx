import "../styles/globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata: Metadata = {
  title: "Triton Gaming QR Studio",
  description: "Create branded QR codes with Triton Gaming logo presets or a custom icon.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth bg-slate-950 text-slate-100">
      <body className={`${nunito.className} min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}
