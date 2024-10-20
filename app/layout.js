import { League_Spartan } from "next/font/google";
import "./globals.css";

const font = League_Spartan({
  subsets: ["latin"]
})


export const metadata = {
  title: "Invoices",
  description: "invoices ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${font.className}`}>
        {children}
      </body>
    </html>
  );
}
