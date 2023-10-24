import { Cmdk } from "@/components/cmdk";
import { NavBar } from "@/components/nav-bar";
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
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers
          session={session}
          themeProps={{ attribute: "class", defaultTheme: "dark" }}
        >
          <Cmdk />
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
