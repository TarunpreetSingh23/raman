"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import toast from "react-hot-toast";
import { CheckCircle, X } from "lucide-react";
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

export default function ServiceDetailPage() {
  const { serviceName } = useParams();
  const decodedServiceName = decodeURIComponent(serviceName || "");
  const router = useRouter();

  const [cart, setCart] = useState([]);
  const [services, setServices] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);

  // ⭐ Add to cart logic
  const addToCart = (newItem) => {
    let existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    if (existingCart.length > 0) {
      const existingCategory = existingCart[0].category;
      if (existingCategory !== newItem.category) {
        const confirmReplace = window.confirm(
          "Your cart already contains services from another category. Replace it?"
        );
        if (!confirmReplace) return;
        existingCart = [newItem];
      } else {
        existingCart.push(newItem);
      }
    } else {
      existingCart.push(newItem);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    setCart(existingCart);

    toast.success(
      <div className="flex items-center gap-2">
        <CheckCircle className="w-5 h-5 text-white" />
        <span className="text-white font-medium">Added to cart</span>
      </div>,
      {
        style: {
          background: "linear-gradient(to right, #4ade80, #16a34a)",
          borderRadius: "12px",
          padding: "10px 16px",
        },
        duration: 2500,
      }
    );

    router.push("/checkout");
  };

  // ⭐ Render stars
  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => {
      if (rating >= i + 1) return <FaStar key={i} className="text-yellow-400" />;
      if (rating >= i + 0.5) return <FaStarHalfAlt key={i} className="text-yellow-400" />;
      return <FaRegStar key={i} className="text-yellow-400" />;
    });

  // ⭐ Fetch services
  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();
        const list = Array.isArray(data) ? data : data.services || [];
        setServices(list);

        const normalize = (str) => str?.toLowerCase().replace(/[\s-]+/g, "") || "";
        const found = list.find((s) => normalize(s.title) === normalize(decodedServiceName));
        setSelected(found);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, [serviceName]);
    useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 400);
      return () => clearTimeout(timer);
    }, []);
  
    if (loading) return <PageLoader />;

  // if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!selected) return <p className="text-center mt-20 text-red-500">Service not found</p>;

  const reviewsArray = Array.isArray(selected.reviews) ? selected.reviews : [];

  return (
    <div className="mt-[65px] pb-16">
      {/* Top Banner */}
      <div className="relative w-full h-56 sm:h-72 md:h-80">
        <Image
          src={selected.image || "/images/default.jpg"}
          alt={selected.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      {/* Service Info */}
      <div className="max-w-3xl mx-auto -mt-12 relative z-10 bg-white rounded-2xl shadow-md p-5">
        <h1 className="text-xl sm:text-2xl font-bold">{selected.title}</h1>
        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
          {renderStars(selected.rating || 0)}
          <span>({reviewsArray.length} reviews)</span>
        </div>

        <p className="mt-3 text-gray-700 text-sm">{selected.description}</p>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-lg font-bold text-blue-600">₹{selected.price}</p>
          <button
            onClick={() => setShowDrawer(true)}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium shadow hover:shadow-md transition"
          >
            View
          </button>
        </div>
      </div>

      {/* You may also like */}
      <div className="max-w-6xl mx-auto mt-10 px-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">You may also like</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {services
            .filter((s) => s.title !== selected.title)
            .map((service, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.04 }}
                onClick={() =>
                  router.push(`/services/${encodeURIComponent(service.title.toLowerCase())}`)
                }
                className="bg-white rounded-lg shadow p-3 cursor-pointer hover:shadow-lg transition"
              >
                <Image
                  src={service.image || "/images/default.jpg"}
                  alt={service.title}
                  width={200}
                  height={140}
                  className="w-full h-28 object-cover rounded-md"
                />
                <h3 className="mt-2 text-sm font-semibold text-gray-900 line-clamp-1">
                  {service.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {service.description?.slice(0, 50) || "Premium service"}
                </p>
                <p className="mt-1 text-sm font-bold text-blue-600">₹{service.price}</p>
              </motion.div>
            ))}
        </div>
      </div>

      {/* Drawer (Bottom Sheet) */}
      <AnimatePresence>
        {showDrawer && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDrawer(false)}
            />

            {/* Sliding Card */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-xl max-h-[80vh] overflow-y-auto"
            >
              {/* Header with Close */}
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-bold">{selected.title}</h2>
                <button onClick={() => setShowDrawer(false)} className="text-gray-600 hover:text-black">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <Image
                  src={selected.image || "/images/default.jpg"}
                  alt={selected.title}
                  width={500}
                  height={300}
                  className="w-full h-40 object-cover rounded-lg"
                />

                <p className="mt-3 text-gray-700">{selected.description}</p>
                <p className="mt-2 text-lg font-bold text-blue-600">₹{selected.price}</p>

                {/* Rating */}
                <div className="mt-3 flex items-center gap-2">
                  {renderStars(selected.rating || 0)}
                  <span className="text-gray-600 text-sm">
                    ({reviewsArray.length} Reviews)
                  </span>
                </div>

                {/* Reviews */}
                {reviewsArray.length > 0 && (
                  <div className="mt-5">
                    <h3 className="text-md font-bold mb-2">Customer Reviews</h3>
                    <div className="flex flex-col gap-3">
                      {reviewsArray.map((rev, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-lg border border-gray-200 bg-gray-50"
                        >
                          {typeof rev === "string" ? (
                            <p className="text-sm text-gray-700">{rev}</p>
                          ) : (
                            <>
                              <div className="flex justify-between items-center">
                                <p className="font-semibold text-sm">
                                  {rev.user || "Anonymous"}
                                </p>
                                <div className="flex items-center gap-1">
                                  {renderStars(rev.rating || 0)}
                                </div>
                              </div>
                              <p className="mt-1 text-sm text-gray-700">
                                {rev.comment || "No comment"}
                              </p>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t bg-white">
                <button
                  onClick={() => addToCart(selected)}
                  className="w-full py-3 rounded-lg bg-blue-600 text-white font-medium shadow hover:shadow-lg transition"
                >
                  Add & Checkout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
