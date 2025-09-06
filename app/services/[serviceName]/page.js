"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import toast from "react-hot-toast";
import { CheckCircle } from "lucide-react";

export default function ServiceDetailPage() {
  const { serviceName } = useParams();
  const decodedServiceName = decodeURIComponent(serviceName);
  const router = useRouter();
const [cart, setCart] = useState([]);
  const [services, setServices] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
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
  router.push("/checkout")
};


  // Helper to render stars
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) stars.push(<FaStar key={i} className="text-yellow-400" />);
      else if (rating >= i - 0.5) stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      else stars.push(<FaRegStar key={i} className="text-yellow-400" />);
    }
    return stars;
  };

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();
        setServices(data);

        const found = data.find(
          (s) =>
            s.title &&
            decodedServiceName &&
            s.title.toLowerCase().includes(decodedServiceName.toLowerCase())
        );

        setSelected(found);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, [serviceName]);

  if (loading) return <p className="text-center mt-20">Loading services...</p>;
  if (!selected) return <p className="text-center mt-20 text-red-500">Service not found</p>;

  // Ensure reviews array is safe
  const reviewsArray = Array.isArray(selected.reviews) ? selected.reviews : [];

  return (
    <div className="relative min-h-screen bg-gradient-to-br mt-[65px] from-[#fdfbfb] via-[#ebedee] to-[#dfe9f3] p-8">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-96 h-96 bg-[#5d7afc]/30 rounded-full blur-[150px] top-20 left-10 animate-pulse"></div>
        <div className="absolute w-80 h-80 bg-pink-400/20 rounded-full blur-[120px] bottom-10 right-20 animate-bounce"></div>
      </div>

      {/* Selected Service */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-5xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 p-10 relative z-10"
      >
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="relative w-64 h-64 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={selected.image || "/images/default.jpg"}
              alt={selected.title}
              width={400}
              height={400}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#5d7afc] to-pink-500">
              {selected.title}
            </h1>
            <p className="mt-4 text-gray-700">{selected.description}</p>
            <p className="mt-3 text-2xl font-bold text-[#5d7afc]">₹{selected.price}</p>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-2">
              {renderStars(selected.rating || 0)}
              <span className="text-gray-600 ml-2">({reviewsArray.length} Reviews)</span>
            </div>

          <button
  onClick={() => addToCart(selected)}
  className="px-4 py-2 rounded-xl bg-[#5d7afc] text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 ease-in-out text-sm"
>
  Add
</button>

          </div>
        </div>

        {/* Customer Reviews */}
        {reviewsArray.length > 0 && (
  <div className="mt-10">
    <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
    <div className="flex flex-col gap-4">
      {reviewsArray.map((rev, idx) => {
        // If review is a string
        if (typeof rev === "string") {
          return (
            <div
              key={idx}
              className="p-4 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-md shadow"
            >
              <p className="text-gray-700">{rev}</p>
            </div>
          );
        }

        // If review is an object
        if (typeof rev === "object") {
          return (
            <div
              key={idx}
              className="p-4 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-md shadow"
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold">{rev.user || "Anonymous"}</p>
                <div className="flex items-center gap-1">{renderStars(rev.rating || 0)}</div>
              </div>
              <p className="mt-2 text-gray-700">{rev.comment || "No comment"}</p>
            </div>
          );
        }

        return null;
      })}
    </div>
  </div>
)}

      </motion.div>

      {/* Other Services */}
      <div className="max-w-6xl mx-auto mt-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Explore More Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services
            .filter((s) => s.title !== selected.title)
            .map((service, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                onClick={() =>
                  router.push(`/services/${encodeURIComponent(service.title.toLowerCase())}`)
                }
                className="bg-white/60 backdrop-blur-lg p-6 rounded-3xl shadow-lg hover:shadow-xl cursor-pointer transition-transform"
              >
                <Image
                  src={service.image || "/images/default.jpg"}
                  alt={service.title}
                  width={400}
                  height={300}
                  className="w-full h-40 object-cover rounded-xl"
                />
                <h3 className="mt-4 text-xl font-semibold text-gray-900">{service.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {service.description?.slice(0, 50) || "Premium experience"}
                </p>
                <p className="mt-2 text-lg font-bold text-[#5d7afc]">₹{service.price}</p>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
}
