

import { ClerkProvider } from '@clerk/nextjs';
import { CartProvider } from './context/cartContext';
import { WishlistProvider } from './context/wishlistContext';

import './globals.css';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Comfort with Laiba Naz",
  description: "Generated by Laiba Naz",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <CartProvider>
        <WishlistProvider>
          <html lang="en">
            <body>
              <Navbar />
              {children}
              <Footer />
            </body>
          </html>
        </WishlistProvider>
      </CartProvider>
    </ClerkProvider>
  );
}
