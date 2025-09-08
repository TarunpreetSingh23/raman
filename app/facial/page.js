"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
function PageLoader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 z-50">
      {/* Logo */}
      <Image
        src="/images/LOGO (2).jpg" // 🔹 replace with your uploaded logo
        alt="Logo"
        width={180}
        height={60}
        className="mb-6"
      />
      {/* Progress Line */}
      <div className="w-36 h-1 absolute top-[433px] left-[124px] bg-gray-700 rounded overflow-hidden">
        <div className="h-full bg-[#3ab4ff] animate-loaderLine"></div>
      </div>
    </div>
  );
}

// ✅ Keyframes for line animation (add this in globals.css)
{/* 
@keyframes loaderLine {
  0% { width: 0; }
  100% { width: 100%; }
}
.animate-loaderLine {
  animation: loaderLine 2s ease-in-out forwards;
}
*/}

export default function FacialPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [services, setServices] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch facial services from DB

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services/facial");
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
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <PageLoader />;
  const filteredServices =
    selectedCategory === "All"
      ? services
      : services.filter((s) =>
          s.title.toLowerCase().includes(selectedCategory.toLowerCase())
        );

  const addToCart = (newItem) => {
    let existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    if (existingCart.length > 0) {
      const existingCategory = existingCart[0].category;

      if (existingCategory !== newItem.category) {
        const confirmReplace = window.confirm(
          "Your cart already contains services from a different category. Do you want to replace it?"
        );

        if (confirmReplace) {
          existingCart = [newItem];
          localStorage.setItem("cart", JSON.stringify(existingCart));
          setCart(existingCart);
          toast.success("Cart replaced with new category service");
        } else {
          return;
        }
      } else {
        existingCart.push(newItem);
        localStorage.setItem("cart", JSON.stringify(existingCart));
        setCart(existingCart);
        successToast();
      }
    } else {
      existingCart.push(newItem);
      localStorage.setItem("cart", JSON.stringify(existingCart));
      setCart(existingCart);
      successToast();
    }
  };

  const successToast = () => {
    toast.success(
      <div className="flex items-center gap-3">
        <CheckCircle className="text-white w-5 h-5" />
        <span className="text-white font-medium">Item added to cart ✅</span>
      </div>,
      {
        style: {
          background: "linear-gradient(to right, #4ade80, #16a34a)",
          color: "#fff",
          borderRadius: "12px",
          padding: "12px 18px",
          boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
        },
        icon: null,
        duration: 3000,
      }
    );
  };

  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-600">Loading facial services...</p>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen mt-[70px] p-4 md:p-6">
      {/* Title */}
      <h1 className="text-3xl m-2 p-3 sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r bg-gray-900">
        Facial Services
      </h1>

      {/* Category grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-8">
        {["All", "Waxing", "Facial", "Cleanup", "Pedicure", "Hair"].map(
          (cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border transition ${
                selectedCategory === cat
                  ? "bg-[#5d7afc] text-white border-[#5d7afc]"
                  : "bg-white text-gray-800 hover:bg-gray-100"
              }`}
            >
              {/* Placeholder icon - replace with category images */}
              <div className="w-12 h-12 rounded-full bg-gray-200 mb-2"></div>
              <span className="text-sm font-medium">{cat}</span>
            </button>
          )
        )}
      </div>

      {/* Services list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
             <Link
        key={service._id}
        href={`/services/${service.title
          ?.toLowerCase()
          .replace(/\s+/g, "-")}`}
      >

     
            <div
              key={service._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <div className="relative w-full h-44">
                <img
                  src={service.image || "/cleaning-placeholder.png"}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                {service.discount && (
                  <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                    {service.discount}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col justify-between h-full">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {typeof service.description === "string"
                    ? service.description
                    : Array.isArray(service.description)
                    ? service.description.join(", ")
                    : ""}
                </p>

                {/* Price & Rating */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-green-600">
                      ₹{service.price}
                    </span>
                    {service.originalPrice && (
                      <span className="line-through text-gray-400 text-sm">
                        ₹{service.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    ⭐{" "}
                    {typeof service.rating === "number"
                      ? service.rating.toFixed(1)
                      : service.rating?.average || "4.8"}
                  </div>
                </div>

                {/* Add button */}
                {/* <button
                  onClick={() => addToCart(service)}
                  className="mt-3 px-4 py-2 rounded-xl bg-[#5d7afc] text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 ease-in-out text-sm"
                >
                  Add to Cart
                </button> */}
              </div>
            </div>
             </Link>
          ))
        ) : (
          <p className="text-gray-500">
            No facial services found in this category.
          </p>
        )}
      </div>
    </div>
  );
}
