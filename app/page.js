"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import HeroCarousel from "@/components/herocarosel";

const goals = [
  {
    title: "Innovation",
    text: "We aim to push the boundaries of technology, creating games that are unique, immersive, and unforgettable.",
    side: "left",
  },
  {
    title: "Community",
    text: "We believe in building a strong and passionate gaming community where everyone feels included and inspired.",
    side: "right",
  },
  {
    title: "Excellence",
    text: "From design to performance, our goal is to deliver nothing short of excellence in every experience we craft.",
    side: "left",
  },
];

const categories = [
  { id: 1, name: "Party Makeup", image: "/images/m.jpeg" },
  { id: 2, name: "Bridal Makeup", image: "/images/m.jpeg" },
  { id: 3, name: "Manicure", image: "/manicure.jpg" },
  { id: 4, name: "Hair care", image: "/haircare.jpg" },
];

const service = [
  { id: 1, name: "Cleaning Services", image: "/images/m.33jpeg" },
  { id: 2, name: "Beauty & Grooming", image: "/images/m.3jpeg" },
  { id: 3, name: "Event Decor", image: "/manicure.jpg" },
];

const cleaningCategories = [
  { id: 1, name: "Home Cleaning", image: "/images/cleaning-home.jpg" },
  { id: 2, name: "Office Cleaning", image: "/images/cleaning-office.jpg" },
  { id: 3, name: "Carpet Cleaning", image: "/images/cleaning-carpet.jpg" },
  { id: 4, name: "Window Cleaning", image: "/images/cleaning-window.jpg" },
];
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

export default function Home() {
  const { data: session } = useSession();
  const cleaningRef = useRef(null);
  // const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBeautyOptions, setShowBeautyOptions] = useState(false);

  // Fetch services (optional, currently unused)
  useEffect(() => {
    async function fetchServices() {
      setLoading(true);
      const res = await fetch("/api/services");
      const data = await res.json();
      setTimeout(() => {
        setLoading(false);
        setServices(data);
      }, 1000);
    }
    fetchServices();
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <PageLoader />;

  // Scroll to cleaning section
  const scrollToCleaning = () => {
    cleaningRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Show beauty options card
  const handleBeautyClick = () => {
    setShowBeautyOptions(true);
    // window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <>
      {/* Hero Carousel */}
      <div className="mt-[55px] mb-4">
        <HeroCarousel />
      </div>

      {/* Services Section */}
      <section className="mt-5 px-3 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {service.map((cat) => (
          <Link
            key={cat.id}
            href="#"
            onClick={() => {
              if (cat.name.includes("Cleaning")) scrollToCleaning();
              if (cat.name.includes("Beauty")) handleBeautyClick();
            }}
            className="bg-white  rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
          >
            <div className="w-full h-26 sm:h-40 relative">
              <Image src={cat.image} alt={cat.name} fill className="object-cover" />
            </div>
            <div className="p-3">
              <h3 className="text-sm sm:text-base  text-center font-semibold text-gray-800 ">
                {cat.name}
              </h3>
            </div>
          </Link>
        ))}
      </section>

      {/* Cleaning Categories */}
    {/* Cleaning Categories */}
<section ref={cleaningRef} className="relative mx-auto px-4 py-6">
  <div className="text-center mb-6">
    <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r bg-gray-900">
      Cleaning Services
    </h1>
  </div>
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
    {cleaningCategories.slice(0, 3).map((cat) => (   // ✅ show only first 3
      <Link
        key={cat.id}
        href={`/services/${cat.name.toLowerCase()}`}
        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
      >
        <div className="w-full h-32 sm:h-40 relative">
          <Image src={cat.image} alt={cat.name} fill className="object-cover" />
        </div>
        <div className="p-3">
          <h3 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-1">
            {cat.name}
          </h3>
          <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
            <span>⭐ 4.9</span>
            <span>(12K)</span>
          </div>
        </div>
      </Link>
    ))}

    {/* ✅ 4th Card: View All */}
    <Link
      href="/clean" // 🔹 link to all cleaning services
      className="bg-gradient-to-r from-[#2856c2] via-[#010c4e] to-[#081d81] rounded-xl shadow-md flex items-center justify-center text-white font-semibold text-lg hover:scale-105 transition cursor-pointer"
    >
      View All →
    </Link>
  </div>
</section>


      {/* Beauty & Grooming Categories */}
     {/* Beauty & Grooming Categories */}
<section className="relative mx-auto px-4 py-2">
  <div className="text-center mb-6">
    <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r bg-gray-900">
      Beauty & Grooming
    </h1>
  </div>
  <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
    {categories.slice(0, 3).map((cat) => (   // ✅ show only first 3
      <Link
        key={cat.id}
        href="#"
        onClick={handleBeautyClick}
        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
      >
        <div className="w-full h-32 sm:h-40 relative">
          <Image src={cat.image} alt={cat.name} fill className="object-cover" />
        </div>
        <div className="p-3">
          <h3 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-1">
            {cat.name}
          </h3>
          <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
            <span>⭐ 4.8</span>
            <span>(20K)</span>
          </div>
        </div>
      </Link>
    ))}

    {/* ✅ 4th Card: View All */}
    <Link
      href="/facial" // 🔹 link to all beauty services
      className="bg-gradient-to-r from-[#2856c2] via-[#010c4e] to-[#081d81] rounded-xl shadow-md flex items-center justify-center text-white font-semibold text-lg hover:scale-105 transition cursor-pointer"
    >
      View All →
    </Link>
  </div>
</section>


      {/* Bottom Beauty Options Card */}
      {showBeautyOptions && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-3xl bg-white rounded-3xl shadow-2xl p-6 z-50 border border-gray-200">
          <button
            onClick={() => setShowBeautyOptions(false)}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold text-xl"
          >
            ✕
          </button>
          <h3 className="text-xl font-bold mb-4 text-center">Choose Category</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-pink-100 rounded-xl flex flex-col items-center justify-center p-6 shadow hover:shadow-lg cursor-pointer transition">
              <h4 className="font-semibold text-gray-700">Men</h4>
              <p className="text-gray-500 text-sm mt-1">Grooming & Styling</p>
            </div>
            <div className="bg-purple-100 rounded-xl flex flex-col items-center justify-center p-6 shadow hover:shadow-lg cursor-pointer transition">
              <h4 className="font-semibold text-gray-700">Women</h4>
              <p className="text-gray-500 text-sm mt-1">Beauty & Makeup</p>
            </div>
          </div>
        </div>
      )}

      {/* Goals Section */}
      <section className="relative py-24 bg-gray-200 overflow-hidden">
        <div className="absolute w-72 h-72 bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-full blur-3xl -top-20 -left-20 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/20 to-indigo-600/20 rounded-full blur-3xl bottom-0 right-0 animate-pulse"></div>

        <div className="max-w-3xl mx-auto px-6 lg:px-12 relative z-10">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-16">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2856c2] via-[#010c4e] to-[#081d81]">
              Our Goals
            </span>
          </h2>

          <div className="flex flex-col gap-12 sm:gap-20">
            {goals.map((goal, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: goal.side === "left" ? -150 : 150 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`flex flex-col md:flex-row items-center gap-6 sm:gap-10 ${
                  goal.side === "right" ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="relative w-20 sm:w-24 h-20 sm:h-24 rounded-full bg-gradient-to-r from-[#2856c2] via-[#010c4e] to-[#081d81] flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl sm:text-2xl font-bold">{i + 1}</span>
                </div>

                <div className="flex-1 p-6 sm:p-10 rounded-2xl bg-white/80 backdrop-blur-md border border-gray-200 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-500">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r bg-gray-900">
                    {goal.title}
                  </h3>
                  <p className="text-gray-900 leading-relaxed text-sm sm:text-base">{goal.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
