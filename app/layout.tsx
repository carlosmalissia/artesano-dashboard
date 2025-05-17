import type { Metadata } from "next";
import { Noto_Sans_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ReduxProvider } from "@/app/redux-provider"; // 👉 importamos el ReduxProvider

const noto = Noto_Sans_Display({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Artesanos-Dashboard",
  description: "Dashboard para el e-commerce de artesanos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={noto.className}>
        <ReduxProvider> {/* 👉 Redux envuelve todo */}
          <ThemeProvider
            attribute="class"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
