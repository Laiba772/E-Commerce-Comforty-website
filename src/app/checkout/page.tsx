"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getCartItems } from "@/app/action/actions";
import Link from "next/link";
import { Product } from "../../../types/product";
import { urlFor } from "@/sanity/lib/image";
import { CgChevronRight } from "react-icons/cg";
import Swal from "sweetalert2";

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
    email: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    address: false,
    city: false,
    zipCode: false,
    phone: false,
    email: false,
  });

  useEffect(() => {
    const fetchedCartItems = getCartItems();
    // Ensure fetchedCartItems is an array
    if (Array.isArray(fetchedCartItems)) {
      setCartItems(fetchedCartItems);
    } else {
      setCartItems([]); // fallback to an empty array if the data is invalid
    }
    const appliedDiscount = localStorage.getItem("appliedDiscount");
    if (appliedDiscount) {
      setDiscount(Number(appliedDiscount));
    }
  }, []);


  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.inventory,
    0
  );
  const total = Math.max(subtotal - discount, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors = {
      firstName: !formValues.firstName,
      lastName: !formValues.lastName,
      address: !formValues.address,
      city: !formValues.city,
      zipCode: !formValues.zipCode,
      phone: !formValues.phone,
      email: !formValues.email,
    };
    setFormErrors(errors);
    return Object.values(errors).every((error) => !error);
  };

  const handlePlaceOrder = () => {
    if (validateForm()) {
      // Simulate order placement
      Swal.fire({
        title: "Order Placed!",
        text: "Your order has been successfully placed.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        setCartItems([]);
        localStorage.removeItem("appliedDiscount");
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "Please fill in all the fields.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="mt-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 py-4">
            <Link
              href="/Cart"
              className="text-[#666666] hover:text-black transition text-sm"
            >
              Cart
            </Link>
            <CgChevronRight className="w-4 h-4 text-[#666666]" />
            <span className="text-sm">Checkout</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white border rounded-lg p-6 space-y-4 shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 py-3 border-b"
                >
                  <div className="w-16 h-16 rounded overflow-hidden">
                    {item.image && (
                      <Image
                        src={urlFor(item.image).url()}
                        alt={item.title}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.inventory}
                    </p>
                  </div>
                  <p className="text-lg font-medium">
                    ${item.price * item.inventory}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Your cart is empty.</p>
            )}
            <div className="text-right pt-4">
              <p className="text-lg">
                Subtotal: <span className="font-medium">${subtotal}</span>
              </p>
              <p className="text-lg">
                Discount: <span className="font-medium">-${discount}</span>
              </p>
              <p className="text-2xl font-semibold">
                Total: ${total.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Billing Form */}
          <div className="bg-white border rounded-lg p-6 space-y-6 shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">Billing Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                <input
                  id="firstName"
                  placeholder="Enter your first name"
                  value={formValues.firstName}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
                {formErrors.firstName && (
                  <p className="text-sm text-red-500">
                    First name is required.
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                <input
                  id="lastName"
                  placeholder="Enter your last name"
                  value={formValues.lastName}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
                {formErrors.lastName && (
                  <p className="text-sm text-red-500">
                    Last name is required.
                  </p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="address" className="text-sm font-medium">Address</label>
              <input
                id="address"
                placeholder="Enter your address"
                value={formValues.address}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />
              {formErrors.address && (
                <p className="text-sm text-red-500">Address is required.</p>
              )}
            </div>
            <div>
              <label htmlFor="city" className="text-sm font-medium">City</label>
              <input
                id="city"
                placeholder="Enter your city"
                value={formValues.city}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />
              {formErrors.city && (
                <p className="text-sm text-red-500">City is required.</p>
              )}
            </div>
            <div>
              <label htmlFor="zipCode" className="text-sm font-medium">Zip Code</label>
              <input
                id="zipCode"
                placeholder="Enter your zip code"
                value={formValues.zipCode}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />
              {formErrors.zipCode && (
                <p className="text-sm text-red-500">Zip Code is required.</p>
              )}
            </div>
            <div>
              <label htmlFor="phone" className="text-sm font-medium">Phone</label>
              <input
                id="phone"
                placeholder="Enter your phone number"
                value={formValues.phone}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />
              {formErrors.phone && (
                <p className="text-sm text-red-500">Phone is required.</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input
                id="email"
                placeholder="Enter your email address"
                value={formValues.email}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />
              {formErrors.email && (
                <p className="text-sm text-red-500">Email is required.</p>
              )}
            </div>
            <button
              className="w-full h-12 bg-blue-500 hover:bg-blue-700 text-white rounded-md"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
