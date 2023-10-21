import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { NavBar } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Compra en línea en Vtex Next Store",
  description: "Encuentra los mejores productos en Vtex Next Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <main className="dark text-foreground bg-background h-full">
            <NavBar />

            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
