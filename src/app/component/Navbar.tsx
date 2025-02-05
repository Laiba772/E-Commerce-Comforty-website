
'use client';
import { IoAlertCircleOutline } from "react-icons/io5";

import React, { useState } from 'react';
import Image from 'next/image';
import { CiShoppingCart } from 'react-icons/ci';
import Link from 'next/link';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaHeart } from 'react-icons/fa';
import { useCart } from '../context/cartContext';
import { useWishlist } from '../context/wishlistContext';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { cart } = useCart();
  const { wishlist } = useWishlist();

  // Calculate total items in the cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Wishlist item count
  const wishlistItemCount = wishlist.length;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <header className="shadow bg-indigo-950">
      {/* Top Line */}
      <div className="bg-indigo-950 text-white text-sm">
        <div className="container opacity-70 mx-auto flex justify-between items-center px-4 py-2">
          <span>✓ Free Shipping On All Orders Over $50</span>
          <div className="flex items-center gap-2 xl:gap-6">
            <select
              name="language"
              id="languauge"
              className="bg-[#272343] text-white w-[47px] border-none outline-none cursor-pointer hover:underline"
            >
              <option className="text-white">
                Eng
              </option>
              <option className="text-white">
                Urdu
              </option>
              <option className="text-white">
                Franch
              </option>
              <option className="text-white">
                Arabic
              </option>
              <option className="text-white">
                Spanich
              </option> <option className="text-white">
                Hindhi
              </option>
            </select>

            <Link
              href="/FAQ"
              className="hover:underline text-white"
            >
              FAQs
            </Link>

            <div className="flex items-center gap-[6px] hover:underline cursor-pointer">
              <span>
                <IoAlertCircleOutline className="size-4" />
              </span>

              <span className="text-white">
                Need Help
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Line: Logo, Cart, Wishlist, and Account */}
      <div className="bg-gray-100">
        <div className="container mx-auto flex justify-between items-center px-4 py-4">
          {/* Logo */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex space-x-2 justify-center sm:justify-start">
              <Image src="/Logo Icon.png" alt="logo" width={40} height={40} />
              <span className="text-xl font-bold">Comforty</span>
            </div>
          </div>

          {/* Cart Section */}
          <Link href="/Cart">
            <div className="flex items-center px-3 py-1">
              <CiShoppingCart className="h-10 w-10 text-indigo-900" /> {/* Increased height and width */}
              <span className="text-black text-sm font-semibold rounded-full w-6 h-6 flex items-center justify-center">
                {cartItemCount}
              </span>
            </div>
          </Link>

          {/* Wishlist Section */}
          <Link href="/Wishlist">
            <div className="flex items-center px-3 py-1">
              <FaHeart className="text-red-500 h-8 w-10" /> {/* Increased size */}
              <span className="text-black text-sm font-semibold rounded-full w-6 h-6 flex items-center justify-center">
                {wishlistItemCount}
              </span>
            </div>
          </Link>


          {/* Account Section */}
          <div className="relative">
            <SignedOut>
              <div className="flex space-x-4">
                <SignInButton>
                  <button className="text-indigo-900 hover:underline">Sign In</button>
                </SignInButton>
              </div>
            </SignedOut>
            <SignedIn>
              <div className="flex space-x-4">
                <p className="text-indigo-900">Welcome, User</p>
                <UserButton />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>

      {/* Bottom Line: Navigation Menu */}
      <nav className="bg-white border-t border-b-2 border-gray-300">
        <div className="container mx-auto w-full h-[74px] flex justify-between items-center px-4 py-4">
          {/* Menu Items */}
          <ul className="hidden sm:flex space-x-8 text-gray-700">
            <li>
              <Link href="/Home" className="text-teal-900 hover:text-teal-500 hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/Shop" className="text-teal-900 hover:text-teal-500 hover:underline">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/Product" className="text-teal-900 hover:text-teal-500 hover:underline">
                Product
              </Link>
            </li>
            <li>
              <Link href="/Pages" className="text-teal-900 hover:text-teal-500 hover:underline">
                Pages
              </Link>
            </li>
            <li>
              <Link href="/AboutUs" className="text-teal-900 hover:text-teal-500 hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/order" className="text-teal-900 hover:text-teal-500 hover:underline">
                Order
              </Link>
            </li>
          </ul>
          <div className="mr-4 hover:underline hidden sm:block">
            <Link href="/Contact" className="text-teal-900 hover:text-teal-500 ">
                  ContactUs: (181) 678987653
            </Link>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="sm:hidden flex items-center">
            <button onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? (
                <HiX className="h-6 w-6 text-teal-500" />
              ) : (
                <HiMenu className="h-6 w-6 text-teal-500" />
              )}
            </button>
          </div>{/* Mobile Hamburger Menu */}
          <div className="sm:hidden flex items-center">
            <button onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? (
                <HiX className="h-6 w-6 text-teal-500" />
              ) : (
                <HiMenu className="h-6 w-6 text-teal-500" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}

      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50 z-10"
            onClick={toggleMobileMenu}
          ></div>

          {/* Menu */}
          <div className="fixed top-0 left-0 w-full h-full bg-white z-20 transform transition-all duration-300 ease-in-out">
            <div className="flex justify-end p-4">
              <button onClick={toggleMobileMenu}>
                <HiX className="h-6 w-6 text-teal-500" />
              </button>
            </div>
            <ul className="flex flex-col items-center space-y-6 text-gray-700 text-lg font-semibold">
              <li>
                <Link href="/Home" className="text-teal-500 hover:text-teal-950">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/Shop" className="text-teal-500 hover:text-teal-950">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/Product" className="text-teal-500 hover:text-teal-950">
                  Product
                </Link>
              </li>
              <li>
                <Link href="/Pages" className="text-teal-500 hover:text-teal-950">
                  Pages
                </Link>
              </li>
              <li>
                <Link href="/AboutUs" className="text-teal-500 hover:text-teal-950">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/order" className="text-teal-500 hover:text-teal-950">
                  Order
                </Link>
              </li>
              <li>
                <Link href="/Contact" className="text-teal-500 hover:text-teal-950">
                  ContactUs: (181) 678987653
                </Link>
              </li>
            </ul>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
