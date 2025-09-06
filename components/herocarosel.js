"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Hero() {
  const [active, setActive] = useState(0);

  // Rotate spotlight every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[90vh] flex items-center mt-[65px] justify-center bg-gradient-to-l from-[#c4deff] via-gray-100 to-[#c4deff] overflow-hidden">
      {/* Soft glowing background orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-indigo-200 to-gray-300 rounded-full blur-3xl opacity-40 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-r from-gray-400 to-indigo-300 rounded-full blur-3xl opacity-30 animate-spin-slow" />

      <div className="relative z-10 flex flex-col-reverse md:flex-row items-center gap-12 px-8 md:px-20">
        {/* LEFT: Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center md:text-left"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
            <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 bg-clip-text text-transparent drop-shadow-sm">
              Home Services,{" "}
            </span>
            <span className="bg-gradient-to-r from-gray-500 via-gray-950 to-gray-700 bg-clip-text text-transparent ">
              One TAP Away
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-lg mx-auto md:mx-0">
            Book trusted <span className="font-semibold text-gray-800">professionals</span> for cleaning, repair, and more — right at your doorstep.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-10">
            <Link
              href="haute"
              className="flex items-center gap-2 px-7 py-3 rounded-full bg-gray-900 text-white font-medium shadow-lg hover:shadow-xl hover:scale-105 transition"
            >
              Hire Now
            </Link>
            <Link
              href="haute"
              className="flex items-center gap-2 px-7 py-3 rounded-full bg-white/70 backdrop-blur-md border border-gray-300 text-gray-700 font-medium shadow hover:bg-white transition"
            >
              Explore Services
            </Link>
          </div>
        </motion.div>

        {/* RIGHT: Character Images with spotlight effect */}
       {/* RIGHT: Character Images with spotlight effect */}
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  className="flex-1 flex justify-center relative"
>
  <div className="relative w-full flex items-center justify-center">
    {["/images/clean2.png", "/images/elec2.png", "/images/clean3.png"].map(
      (src, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: active === i ? 1 : 0,
            scale: active === i ? 1 : 0.96,
          }}
          transition={{ duration: 0.8 }}
          className="absolute"
        >
          <Image
            src={src}
            alt="Service"
            width={540}
            height={540}
            className="drop-shadow-2xl rounded-2xl"
          />
        </motion.div>
      )
    )}
  </div>
</motion.div>

      </div>

      {/* Subtle bottom gradient overlay */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-gray-200 via-gray-100 to-transparent" />

      {/* Animations */}
      <style jsx global>{`
        .animate-spin-slow {
          animation: spin 25s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}
