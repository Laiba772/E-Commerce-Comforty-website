"use client"
import React, { useEffect, useState } from 'react';
import { useCart } from '../context/cartContext';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url'; // Import the image URL builder
import { CiShoppingCart } from 'react-icons/ci';

// Create a Sanity client instance
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-01-01',
  useCdn: true, // Enable CDN for faster response
});

// Create an image URL builder
const builder = imageUrlBuilder(client);

// Function to generate image URLs
const urlFor = (source: any) => builder.image(source).width(400).url(); // Use the builder to generate the image URL

const Hero = () => {
  const { addToCart } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [ourProducts, setOurProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [searchQuery, setSearchQuery] = useState<string>(''); // Search query state
  const [message, setMessage] = useState<string>(''); // State for the message

  // Fetch products and categories from Sanity
  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        // Fetch categories
        const categoriesQuery = '*[_type == "categories"]';
        const categoriesData = await client.fetch(categoriesQuery);
        setCategories(categoriesData);

        // Fetch products with additional fields (description, inventory, etc.)
        const productsQuery = '*[_type == "products"]{_id, title, price, priceWithoutDiscount, image, category->, description, inventory, badge, tags}';
        const productsData = await client.fetch(productsQuery);

        setFeaturedProducts(productsData.slice(0, 5));
        setOurProducts(productsData.slice(3, 11));
      } catch (error) {
        console.error('Error fetching data from Sanity:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndCategories();
  }, []);

  // Filter products based on search query
  const filteredFeaturedProducts = featuredProducts.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredOurProducts = ourProducts.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle Add to Cart and show message
  const handleAddToCart = (product: { id: string; name: string; price: number; image: string; priceWithoutDiscount: number; description: string; inventory: number; badge: string; tags: string[] }) => {
    addToCart({ ...product, quantity: 1 });
    setMessage(`${product.name} has been added to the cart!`);

    // Hide message after 3 seconds
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white px-4 sm:px-8 md:px-10 shadow-lg">
      {/* Display message */}
      {message && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-md shadow-lg">
          {message}
        </div>
      )}
      {/* Hero Section */}
      <div className="relative bg-gray-200 text-black py-20 px-6 sm:px-10 md:px-12 rounded-lg">
        <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8">
          {/* Left Side - Text Content */}
          <div className="flex flex-col items-start space-y-4 max-w-xl">
            <p className='lg:text-[14px] uppercase lg:leading-[14px] text-xs tracking-wide'>
              Welcome to Chariy
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Best Furniture Collection for your interior.
            </h1>
            <div className="mt-6">
              <a
                href="/shop"
                className="flex items-center bg-[#029FAE] text-white py-2 px-6 rounded-full font-semibold hover:bg-teal-600 transition"
              >
                Shop Now
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Side - Product Image */}
          <div className="flex-shrink-0">
            <img
              src="/Product Image.png"
              alt="Product"
              className="w-full sm:w-[400px] h-full rounded-lg"
            />
          </div>
        </div>
      </div>
      {/* Company Logo Section */}
      <div className="flex justify-center mt-8">
        <img
          src="/CompanyLogo.png"
          alt="Company Logo"
          className="h-16 sm:h-24 rounded-full w-auto"
        />
      </div>
      {/* Search Input */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded-lg px-4 py-2 w-1/2 sm:w-1/3 lg:w-1/4 focus:outline-none focus:ring-2 focus:ring-[#029FAE]"
        />
      </div>

      {/* Featured Products Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredFeaturedProducts.map((product) => (
            <div key={product._id} className="bg-gray-100 p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
              <img
                src={urlFor(product.image)} // Generate image URL using the Sanity image builder
                alt={product.title}
                className="w-full h-50 object-cover rounded-lg mb-4 transition-transform duration-300 group-hover:scale-105"
              />
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-gray-600">${product.price}</p>
              <button
                onClick={() => handleAddToCart({
                  id: product._id,
                  name: product.title,
                  price: product.price,
                  image: urlFor(product.image), // Generate image URL
                  priceWithoutDiscount: product.priceWithoutDiscount,
                  description: product.description,
                  inventory: product.inventory,
                  badge: product.badge,
                  tags: product.tags,
                })}
                className="bg-[#029FAE] text-white py-2 px-4 rounded-full flex items-center transition-transform duration-300 hover:bg-teal-600"
              >
                <CiShoppingCart />
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Top Categories Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">Top Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category._id} className="relative group">
              <img
                src={urlFor(category.image)} // Generate image URL using the Sanity image builder
                alt={category.title}
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-75 text-white text-center py-2">
                <h3 className="font-semibold">{category.title}</h3>
                <p className="text-sm">11</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explore Section */}
      <div className="mt-16 flex flex-wrap items-start">
        {/* First Section: Image with Vertical Text */}
        <div className="w-full md:w-1/2 relative pr-4">
          {/* Left Image */}
          <img
            src="/custom-image-left.png"
            alt="Custom Left"
            className="w-full h-auto rounded-lg"
          />
          {/* Vertical Text */}
          <p className="absolute inset-y-4 left-[-40px] flex items-center transform -rotate-90 text-gray-600 font-bold text-lg whitespace-nowrap">
            Explore new and popular styles
          </p>
        </div>

        {/* Right Section: Collage */}
        <div className="w-full md:w-1/2 grid grid-cols-2 gap-4 pl-4">
          {['collage1', 'collage2', 'collage3', 'collage4'].map((image, index) => (
            <img
              key={index}
              src={`/product${index + 5}.png`}
              alt={`Product ${index + 5}`}
              className="w-full h-auto object-cover rounded-lg transition-transform duration-300 hover:scale-105"
            />
          ))}
        </div>
      </div>

      {/* Our Products Section */}
      <div className="mt-16 mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredOurProducts.map((product) => (
            <div key={product._id} className="bg-gray-100 p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
              <img
                src={urlFor(product.image)} // Generate image URL using the Sanity image builder
                alt={product.title}
                className="w-full h-50 object-cover rounded-lg mb-4 transition-transform duration-300 group-hover:scale-105"
              />
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-gray-600">${product.price}</p>
              <button
                onClick={() => handleAddToCart({
                  id: product._id,
                  name: product.title,
                  price: product.price,
                  image: urlFor(product.image), // Generate image URL
                  priceWithoutDiscount: product.priceWithoutDiscount,
                  description: product.description,
                  inventory: product.inventory,
                  badge: product.badge,
                  tags: product.tags,
                })}
                className="bg-[#029FAE] text-white py-2 px-4 rounded-full flex items-center transition-transform duration-300 hover:bg-teal-600"
              >
                <CiShoppingCart />
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
