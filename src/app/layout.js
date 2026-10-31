import "./globals.css";

export const metadata = {
  title: "Forever Yours, Borsha ❤️ | A Surprise from Parvej",
  description: "A special romantic website dedicated to the most beautiful person in the world, Borsha, crafted with all the love by Parvej.",
  openGraph: {
    title: "Forever Yours, Borsha ❤️ | Parvej & Borsha",
    description: "A magical romantic surprise created just for Borsha.",
    images: ["/roses.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body>{children}</body>
    </html>
  );
}
