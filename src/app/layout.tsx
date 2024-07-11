import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ weight: ["300", "400", "500", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Genkitchen",
  description: "Genkit experiments by Michael Bleigh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="bumblebee" lang="en">
      <body className={poppins.className}>
        <div className="pb-12">{children}</div>
        <footer className="fixed bottom-0 left-0 right-0 bg-black h-12 flex items-center justify-center px-4 text-white">
          <div>
            <a href="/" className="font-bold">
              Genkitchen
            </a>
            , a collection of{" "}
            <a href="https://github.com/firebase/genkit" target="_blank" className="underline">
              Genkit
            </a>{" "}
            samples by{" "}
            <a href="https://twitter.com/mbleigh" className="font-bold" target="_blank">
              @mbleigh
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
