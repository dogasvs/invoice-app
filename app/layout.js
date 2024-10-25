import { League_Spartan } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const font = League_Spartan({
  subsets: ["latin"]
})

export const metadata = {
  title: 'Invoice App',
  description: 'Invoice App reCAPTCHA',
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
       <Head>
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>
      </Head>
      <body className={`${font.className}`}>
        {children}
      </body>
    </html>
  );
}
