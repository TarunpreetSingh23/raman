"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { CheckCircle } from "lucide-react";

export default function CleaningPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [services, setServices] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ["All", "Home", "Office", "Special"];

  // fetch cleaning services from DB
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services/cleaning");
        const data = await res.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();

    // load cart from localStorage
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const filteredServices =
  selectedCategory === "All"
    ? services
    : services.filter((s) =>
        s.title.toLowerCase().includes(selectedCategory.toLowerCase())
      );

      // you can add a `subCategory` field in DB (Home, Office, Special)

 const addToCart = (newItem) => {
  let existingCart = JSON.parse(localStorage.getItem("cart")) || [];

  if (existingCart.length > 0) {
    const existingCategory = existingCart[0].category;

    if (existingCategory !== newItem.category) {
      // Show confirmation before replacing
      const confirmReplace = window.confirm(
        "Your cart already contains services from a different category. Do you want to replace it?"
      );

      if (confirmReplace) {
        // Replace cart with new category
        existingCart = [newItem];
        localStorage.setItem("cart", JSON.stringify(existingCart));
        setCart(existingCart);
        alert("Cart has been replaced with the new category service.");
      } else {
        // Do nothing
        return;
      }
    } else {
      // Same category → just add item
      existingCart.push(newItem);
      localStorage.setItem("cart", JSON.stringify(existingCart));
      setCart(existingCart);
       toast.success(
  <div className="flex items-center gap-3">
    <CheckCircle className="text-white w-5 h-5" />
    <span className="text-white font-medium">Item added to cart ✅</span>
  </div>,
  {
    style: {
      background: "linear-gradient(to right, #4ade80, #16a34a)", // green gradient
      color: "#fff",
      borderRadius: "12px",
      padding: "12px 18px",
      boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
    },
    icon: null, // we added our own icon
    duration: 3000,
  }
);
    }
  } else {
    // Empty cart → add directly
    existingCart.push(newItem);
    localStorage.setItem("cart", JSON.stringify(existingCart));
    setCart(existingCart);
    toast.success(
  <div className="flex items-center gap-3">
    <CheckCircle className="text-white w-5 h-5" />
    <span className="text-white font-medium">Item added to cart ✅</span>
  </div>,
  {
    style: {
      background: "linear-gradient(to right, #4ade80, #16a34a)", // green gradient
      color: "#fff",
      borderRadius: "12px",
      padding: "12px 18px",
      boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
    },
    icon: null, // we added our own icon
    duration: 3000,
  }
);
  }
};


  const removeItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    if (newCart.length === 0) localStorage.removeItem("coupon");
  };

  if (loading) {
    return <p className="text-center mt-20 text-gray-600">Loading services...</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen mt-[65px] p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Sidebar */}
      <div className="lg:col-span-3 bg-gray-200 p-4 rounded-xl shadow">
        <h2 className="font-bold text-lg mb-4 text-gray-900">Select Cleaning Type</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-1 gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex flex-col items-center p-2 sm:p-3 border rounded-lg text-sm transition ${
                selectedCategory === cat
                  ? "bg-[#5d7afc] text-white border-[#5d7afc]"
                  : "hover:bg-gray-300 text-gray-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services List */}
      <div className="lg:col-span-6 space-y-6 max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#5d7afc] scrollbar-track-gray-300 rounded-lg p-2">
        <div className="bg-gray-200 p-4 md:p-6 rounded-xl mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">{selectedCategory} Cleaning</h1>
          <p className="text-gray-700 text-sm md:text-base">
            Choose from our top-rated {selectedCategory === "All" ? "cleaning services" : selectedCategory.toLowerCase()} experts
          </p>
        </div>

        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <div
              key={service._id}
              className="group relative border border-transparent bg-white/70 backdrop-blur-md rounded-2xl p-4 md:p-5 shadow-md hover:shadow-2xl transition-all hover:-translate-y-1 hover:border-[#5d7afc] duration-300 flex gap-4"
            >
              {/* Image */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-xl overflow-hidden shadow-md">
                <img
                  src={service.image || "/cleaning-placeholder.png"}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                  <h3 className="font-bold text-gray-900 group-hover:text-[#5d7afc] text-base sm:text-lg">{service.title}</h3>
                  <span className="text-xs px-2 py-1 mt-1 sm:mt-0 rounded-full bg-[#5d7afc]/20 text-[#5d7afc] font-medium self-start">
                    {service.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mt-1">{service.description}</p>

                <div className="flex flex-col sm:flex-row justify-between sm:items-center mt-3 gap-2">
                  <div>
                    <span className="text-lg font-bold text-green-600">₹{service.price}</span>
                  </div>
                  <button
                    onClick={() => addToCart(service)}
                    className="px-4 py-2 rounded-xl bg-[#5d7afc] text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 ease-in-out text-sm"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No cleaning services found in this category.</p>
        )}
      </div>

      {/* Cart Sidebar */}
      <div className="lg:col-span-3 space-y-6">
        <div className="p-5 bg-gray-200 rounded-2xl shadow-md border border-gray-300">
          <h3 className="text-lg font-bold text-gray-900 border-b pb-2">🛒 Your Cart</h3>
          {cart.length === 0 ? (
            <p className="text-gray-600 mt-3 italic">No items yet</p>
          ) : (
            <ul className="mt-3 space-y-3">
              {cart.map((item, i) => (
                <li key={i} className="flex justify-between items-center p-2 bg-white rounded-lg hover:bg-gray-100 transition text-sm">
                  <div>
                    <span className="block font-medium text-gray-900">{item.title}</span>
                    <span className="text-xs font-semibold text-[#5d7afc]">₹{item.price}</span>
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
              <button className="mt-4 w-full py-2 bg-[#5d7afc] text-white rounded-xl font-medium shadow hover:shadow-lg transition-all duration-300 text-sm">
                Checkout
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
