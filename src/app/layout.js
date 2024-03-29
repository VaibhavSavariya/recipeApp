import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/navbar/page";
import { Toaster } from "react-hot-toast";
import QueryProvider from "./utils/QueryProvide";
import NextThemeProvider from "./utils/NextThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Recipe App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextThemeProvider>
          <QueryProvider>
            <Toaster />
            <Navbar />
            {children}
          </QueryProvider>
        </NextThemeProvider>
      </body>
    </html>
  );
}
