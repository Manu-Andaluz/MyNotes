import { Open_Sans } from "next/font/google";
import "./globals.css";

const roboto = Open_Sans({
  weight: ["400", "300", "500", "600"],
  style: ["normal"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
