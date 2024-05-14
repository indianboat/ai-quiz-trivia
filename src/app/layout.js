import PrelineScript from "./components/PrelineScript/PrelineScript";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import { Toaster } from "sonner";
import Footer from "./components/Footer/Footer";

const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

export const metadata = {
  title: "AI Quiz Trivia",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Navbar />
        {children}
        <Footer/>
        <PrelineScript />
        <Toaster duration={4000} position="top-center" richColors theme="dark" />
      </body>
    </html>
  );
}
