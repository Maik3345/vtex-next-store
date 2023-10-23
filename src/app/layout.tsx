import { NavBar } from "@/components";
import { Cmdk } from "@/components/cmdk";
import { fontSans } from "@/config/fonts";
import { clsx } from "@nextui-org/shared-utils";
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Buy the best products in Vtex Next Store",
  description: "Found the best products in Vtex Next Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col" id="app-container">
            <NavBar />
            {children}
          </div>

          <Cmdk />
        </Providers>
      </body>
    </html>
  );
}
