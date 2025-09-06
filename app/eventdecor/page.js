"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

// 🎉 Dummy Event Decor Services (replace with DB later)
const eventServices = [
  { id: 1, category: "Weddings", name: "Royal Wedding Décor", desc: "Luxurious floral & lighting setup", price: 49999, oldPrice: 59999 },
  { id: 2, category: "Weddings", name: "Beachside Wedding Décor", desc: "Elegant seaside experience", price: 69999, oldPrice: 79999 },
  { id: 3, category: "Birthdays", name: "Kids Birthday Theme", desc: "Cartoon & balloon decorations", price: 9999, oldPrice: 12999 },
  { id: 4, category: "Birthdays", name: "Luxury Birthday Décor", desc: "Premium indoor/outdoor setup", price: 14999, oldPrice: 17999 },
  { id: 5, category: "Corporate", name: "Conference Setup", desc: "Professional stage & branding", price: 24999, oldPrice: 29999 },
  { id: 6, category: "Corporate", name: "Annual Party Décor", desc: "Fun + classy décor for corporates", price: 34999, oldPrice: 39999 },
  { id: 7, category: "Parties", name: "Bachelor Party Setup", desc: "Trendy & cool decoration themes", price: 15999, oldPrice: 18999 },
];

const categories = ["All", "Weddings", "Birthdays", "Corporate", "Parties"];

export default function EventDecorPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);

  // Remove from cart
  const removeItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));

    if (newCart.length === 0) {
      localStorage.removeItem("coupon");
    }
  };

  // Load cart from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);

  // Filter services by category
  const filteredServices =
    selectedCategory === "All"
      ? eventServices
      : eventServices.filter((s) => s.category === selectedCategory);

  // Add to cart
  const addToCart = (product) => {
    const updated = [...cart, product];
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 md:p-6 mt-[65px]">
      {/* Sidebar (Categories) */}
      <div className="lg:col-span-3 bg-white p-4 rounded-xl shadow">
        <h2 className="font-bold text-lg mb-4">Select Event Type</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-1 gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex flex-col items-center p-2 sm:p-3 border rounded-lg text-sm transition ${
                selectedCategory === cat
                  ? "bg-purple-600 text-white"
                  : "hover:bg-purple-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services List */}
      <div
        className="lg:col-span-6 space-y-6 max-h-[80vh] overflow-y-auto 
                   scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-100 
                   hover:scrollbar-thumb-purple-700 rounded-lg p-2"
      >
        <div className="bg-purple-100 p-4 md:p-6 rounded-xl mb-6">
          <h1 className="text-xl md:text-2xl font-bold">{selectedCategory} Event Décor</h1>
          <p className="text-gray-600 text-sm md:text-base">
            Choose from our top-rated{" "}
            {selectedCategory === "All" ? "event décor packages" : selectedCategory.toLowerCase()} experts
          </p>
        </div>

        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <div
              key={service.id}
              className="group relative border border-transparent bg-white/70 
                         backdrop-blur-md rounded-2xl p-4 md:p-5 shadow-md 
                         hover:shadow-2xl transition-all hover:-translate-y-1 
                         hover:border-purple-300 duration-300 flex gap-4"
            >
              {/* Image */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-xl overflow-hidden shadow-md">
                <img
                  src={service.image || "/decor-placeholder.png"}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                  <h3 className="font-bold text-gray-800 group-hover:text-purple-700 text-base sm:text-lg">
                    {service.name}
                  </h3>
                  <span className="text-xs px-2 py-1 mt-1 sm:mt-0 rounded-full bg-purple-100 text-purple-700 font-medium self-start">
                    {service.category}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mt-1">{service.desc}</p>

                <div className="flex flex-col sm:flex-row justify-between sm:items-center mt-3 gap-2">
                  <div>
                    <span className="text-lg font-bold text-green-600">₹{service.price}</span>
                    <span className="line-through text-gray-400 text-sm ml-2">₹{service.oldPrice}</span>
                  </div>
                  <button
                    onClick={() => addToCart(service)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 
                               text-white font-medium shadow-md hover:shadow-lg 
                               hover:from-purple-700 hover:to-pink-600 
                               transition-all duration-300 ease-in-out text-sm"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No services found in this category.</p>
        )}
      </div>

      {/* Cart Sidebar */}
      <div className="lg:col-span-3 space-y-6">
        <div className="p-5 bg-white rounded-2xl shadow-md border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 border-b pb-2">🛒 Your Cart</h3>
          {cart.length === 0 ? (
            <p className="text-gray-500 mt-3 italic">No items yet</p>
          ) : (
            <ul className="mt-3 space-y-3">
              {cart.map((item, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center p-2 bg-purple-50 rounded-lg hover:bg-purple-100 transition text-sm"
                >
                  <div>
                    <span className="block font-medium text-gray-700">{item.name}</span>
                    <span className="text-xs font-semibold text-purple-700">₹{item.price}</span>
                  </div>
                  <button
                    onClick={() => removeItem(i)}
                    className="ml-3 text-xs px-3 py-1 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}

          {cart.length > 0 && (
            <Link href="/checkout">
              <button className="mt-4 w-full py-2 bg-gradient-to-r from-purple-600 to-pink-500 
                                 text-white rounded-xl font-medium shadow hover:from-purple-700 hover:to-pink-600 
                                 transition-all duration-300 text-sm">
                Checkout
              </button>
            </Link>
          )}
        </div>

        {/* Offers */}
        <div className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl shadow-md border border-purple-100 text-sm sm:text-base">
          <p className="text-purple-700 font-semibold">🎁 Save 15% on Event Décor</p>
          <button className="mt-2 font-medium text-purple-600 underline hover:text-purple-800">
            View Offers
          </button>
        </div>

        {/* Promise */}
        <div className="p-5 bg-white rounded-2xl shadow-md border border-gray-100 text-sm sm:text-base">
          <h4 className="text-lg font-bold text-gray-800">🌟 Why Choose Us</h4>
          <ul className="mt-3 space-y-2 text-gray-600">
            <li className="flex items-center gap-2">
              <span className="text-green-500">✔</span> 4.8+ Rated Event Planners
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✔</span> Luxury Custom Décor
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✔</span> Affordable Packages
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
