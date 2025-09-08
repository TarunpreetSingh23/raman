"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  { id: 1, name: "Waxing", image: "/waxing.jpg" },
  { id: 2, name: "Cleanup", image: "/cleanup.jpg" },
  { id: 3, name: "Manicure", image: "/manicure.jpg" },
  { id: 4, name: "Hair care", image: "/haircare.jpg" },
];

const cleaningCategories = [
  { id: 1, name: "Home Cleaning", image: "/images/cleaning-home.jpg" },
  { id: 2, name: "Office Cleaning", image: "/images/cleaning-office.jpg" },
  { id: 3, name: "Carpet Cleaning", image: "/images/cleaning-carpet.jpg" },
  { id: 4, name: "Window Cleaning", image: "/images/cleaning-window.jpg" },
];

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const renderCard = (cat, gradient) => (
    <div className="group relative bg-white/20 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer">
      <div className="relative w-full h-48 sm:h-56 overflow-hidden">
        <Image
          src={cat.image}
          alt={cat.name}
          width={500}
          height={400}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        {/* Overlay with buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        >
          <Link
            href={`/services/${cat.name.toLowerCase()}`}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-lg hover:scale-110 hover:shadow-pink-500/50 transition-all"
          >
            View
          </Link>
          <Link
            href={`/explore/${cat.name.toLowerCase()}`}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg hover:scale-110 hover:shadow-blue-500/50 transition-all"
          >
            Explore
          </Link>
        </motion.div>
      </div>
      <div className="p-6 text-center">
        <h3
          className={`text-lg sm:text-xl font-bold text-gray-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:${gradient} transition`}
        >
          {cat.name}
        </h3>
        <p className="text-sm sm:text-base text-gray-500 mt-2">
          {cat.name.includes("Cleaning")
            ? `Professional ${cat.name.toLowerCase()} for spotless results`
            : `Experience world-class ${cat.name.toLowerCase()}`}
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Hero Carousel */}
      <div className="mt-[65px] mb-4">
        <HeroCarousel />
      </div>

      {/* Salon Categories */}
  {/* Salon Categories */}
<section className="relative mx-auto px-4 py-12">
  <div className="text-center">
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 drop-shadow-lg">
      Salon for Women
    </h1>
    <p className="text-gray-500 mt-3 text-base sm:text-lg">
      Pick a category & step into luxury 💖
    </p>
  </div>

  <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {categories.map((cat) => (
      <motion.div
        key={cat.id}
        whileHover={{ scale: 1.05, rotate: 1 }}
        whileTap={{ scale: 0.98 }}
        className="relative group rounded-3xl p-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient-x shadow-2xl"
      >
        {/* Inner card */}
        <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden h-72 flex flex-col justify-between shadow-inner">
          {/* Floating particles */}
          <div className="absolute inset-0">
            <span className="absolute w-2 h-2 bg-pink-400 rounded-full top-6 left-10 animate-ping"></span>
            <span className="absolute w-1.5 h-1.5 bg-purple-400 rounded-full bottom-8 right-6 animate-pulse"></span>
            <span className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full top-1/2 left-1/2 animate-bounce"></span>
          </div>

          {/* Image */}
          <div className="relative w-full h-44">
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              className="object-cover rounded-t-3xl group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center gap-4">
              <button className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl text-white font-semibold text-sm border border-white/30 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300">
                View
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl text-white font-semibold text-sm hover:scale-110 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
                Explore
              </button>
            </div>
          </div>

          {/* Text */}
          <div className="p-4 text-center relative z-10">
            <h3 className="text-lg sm:text-xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              {cat.name}
            </h3>
            <p className="text-sm text-gray-200 mt-2">
              Experience world-class {cat.name.toLowerCase()}
            </p>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
</section>

{/* Cleaning Categories */}
<section className="relative mx-auto px-4 py-12">
  <div className="text-center">
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 drop-shadow-lg">
      Cleaning Services
    </h1>
    <p className="text-gray-500 mt-3 text-base sm:text-lg">
      Pick a service & make your space shine ✨
    </p>
  </div>

  <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {cleaningCategories.map((cat) => (
      <motion.div
        key={cat.id}
        whileHover={{ scale: 1.05, rotate: -1 }}
        whileTap={{ scale: 0.98 }}
        className="relative group rounded-3xl p-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 animate-gradient-x shadow-2xl"
      >
        {/* Inner card */}
        <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden h-72 flex flex-col justify-between shadow-inner">
          {/* Floating particles */}
          <div className="absolute inset-0">
            <span className="absolute w-2 h-2 bg-blue-400 rounded-full top-6 left-10 animate-ping"></span>
            <span className="absolute w-1.5 h-1.5 bg-indigo-400 rounded-full bottom-8 right-6 animate-pulse"></span>
            <span className="absolute w-1.5 h-1.5 bg-purple-400 rounded-full top-1/2 left-1/2 animate-bounce"></span>
          </div>

          {/* Image */}
          <div className="relative w-full h-44">
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              className="object-cover rounded-t-3xl group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center gap-4">
              <button className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl text-white font-semibold text-sm border border-white/30 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300">
                View
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white font-semibold text-sm hover:scale-110 hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300">
                Explore
              </button>
            </div>
          </div>

          {/* Text */}
          <div className="p-4 text-center relative z-10">
            <h3 className="text-lg sm:text-xl font-extrabold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
              {cat.name}
            </h3>
            <p className="text-sm text-gray-200 mt-2">
              Professional {cat.name.toLowerCase()} for spotless results
            </p>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
</section>

      {/* Goals Section */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute w-72 h-72 bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-full blur-3xl -top-20 -left-20 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/20 to-indigo-600/20 rounded-full blur-3xl bottom-0 right-0 animate-pulse"></div>

        <div className="max-w-3xl mx-auto px-6 lg:px-12 relative z-10">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-16">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600">
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
                <div className="relative w-20 sm:w-24 h-20 sm:h-24 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl sm:text-2xl font-bold">{i + 1}</span>
                </div>

                <div className="flex-1 p-6 sm:p-10 rounded-2xl bg-white/80 backdrop-blur-md border border-gray-200 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-500">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
                    {goal.title}
                  </h3>
                  <p className="text-gray-900 leading-relaxed text-sm sm:text-base">{goal.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Newsletter */}
      <section className="relative py-16 bg-gradient-to-r from-gray-100 via-white to-gray-100 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-40 h-40 bg-pink-500/20 rounded-full blur-3xl top-10 left-20 animate-pulse"></div>
          <div className="absolute w-56 h-56 bg-blue-400/20 rounded-full blur-3xl bottom-20 right-32 animate-pulse"></div>
          <div className="absolute w-28 h-28 bg-purple-500/30 rounded-full blur-2xl top-1/3 left-1/2 animate-bounce"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-center mb-12 sm:mb-16 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 drop-shadow-sm">
            Let’s Connect
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-white/90 backdrop-blur-md p-6 sm:p-10 rounded-3xl shadow-lg border border-gray-200"
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">Get in Touch</h3>
              <form className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    required
                    className="w-full p-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/40 outline-none"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    required
                    className="w-full p-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/40 outline-none"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="w-full p-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/40 outline-none"
                />
                <textarea
                  name="message"
                  placeholder="Your Message..."
                  rows={4}
                  required
                  className="w-full p-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/40 outline-none"
                />
                <button className="mt-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 rounded-xl hover:scale-105 transition-transform shadow-md">
                  Submit
                </button>
              </form>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="bg-gray-900 p-6 sm:p-10 rounded-3xl shadow-lg border border-gray-700"
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">Subscribe to Our Newsletter</h3>
              <form className="flex flex-col gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="w-full p-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/40 outline-none"
                />
                <div className="flex items-center gap-2 text-gray-300 text-sm">
                  <input type="checkbox" name="subscribed" defaultChecked className="w-4 h-4 accent-pink-500" />
                  <span>Yes, subscribe me to your newsletter.</span>
                </div>
                <button className="mt-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 rounded-xl hover:scale-105 transition-transform shadow-md">
                  Join
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
} 