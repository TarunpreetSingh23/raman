"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Hero() {
  // --- Slide Data ---
  const slides = [
    // {
    //   title: "Cleaning Services",
    //   subtitle: "Professional, reliable and spotless cleaning for your home.",
    //   image: "/images/vee1.jpeg",
    //   // ** New: Added dynamic background image **
    //   bgImage: "/images/Untitiled design.png", // REPLACE with your actual background path
    //   gradient: "from-blue-400 to-cyan-500",
    //   buttons: [{ text: "Book Cleaning", href: "/clean" }],
    // },
    {
      title: "Event Decor",
      subtitle: "Turn your occasions into breathtaking memories with expert decor.",
      image: "/images/event.png",
      // ** New: Added dynamic background image **
      bgImage: "/images/wd.jpg", // REPLACE with your actual background path
      gradient: "from-purple-500 to-pink-500",
      buttons: [{ text: "Book Decor", href: "/eventdecor" }],
    },
    {
      title: "Beauty Services",
      subtitle: "Pamper yourself with on-demand salon and spa treatments.",
      image: "/images/vee2.jpeg",
      // ** New: Added dynamic background image **
      bgImage: "/images/vee3.jpg", // REPLACE with your actual background path
      gradient: "from-rose-400 to-pink-500",
      buttons: [{ text: "Book Beauty", href: "/facial" }],
    },
  ];

  // --- State ---
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const timeoutRef = useRef(null);

  // --- Slide Handlers ---
  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };
  
  const handleDotClick = (index) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
  }

  // --- Auto Slide ---
  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [current]);

  const startAutoSlide = () => {
    stopAutoSlide();
    timeoutRef.current = setTimeout(() => {
        setDirection(1); 
        handleNext();
    }, 3500); 
  };

  const stopAutoSlide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const slide = slides[current];

  // --- Motion Variants ---
  // Background variants for a smooth fade
  const backgroundVariants = {
    enter: { opacity: 0, scale: 1.05 },
    center: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.6 } },
  };

  // Text and Image variants remain the same for slide effect (omitted for brevity)
  const textVariants = {
    enter: (direction) => ({ x: direction > 0 ? -100 : 100, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction) => ({ x: direction > 0 ? 100 : -100, opacity: 0, zIndex: 0 }),
  };

  const imageVariants = {
    enter: (direction) => ({ x: direction > 0 ? 100 : -100, scale: 0.9, opacity: 0 }),
    center: { zIndex: 1, x: 0, scale: 1, opacity: 1 },
    exit: (direction) => ({ x: direction > 0 ? -100 : 100, scale: 0.9, opacity: 0, zIndex: 0 }),
  };


  return (
    <section 
      // Removed static background style
      className="relative w-full min-h-[80vh] mt-[76px] flex items-center justify-center overflow-hidden bg-gray-900 px-4 sm:px-8 py-16"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
        {/*
          New: Dynamic Background Layer
          This motion.div handles the full-screen background image transition.
        */}
        <AnimatePresence initial={false} mode="wait">
            <motion.div
                key={slide.bgImage}
                variants={backgroundVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 w-full h-full"
            >
                {/* Background Image */}
                <Image
                    src={slide.bgImage}
                    alt={`${slide.title} background`}
                    layout="fill"
                    objectFit="cover"
                    priority={true} // Priority loading for LCP element
                    className="brightness-[.8] saturate-[.8]" // Darkens and slightly desaturates the image for better text contrast
                />
            </motion.div>
        </AnimatePresence>

      {/* Glowing background - Moved inside Main Content area for better layering */}
      {/* <div className="absolute -top-40 -left-40 w-196 h-196 bg-gradient-to-br from-indigo-800 to-transparent rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute -bottom-40 -right-40 w-126 h-126 bg-gradient-to-tl from-pink-600 to-transparent rounded-full blur-3xl opacity-20 animate-spin-slow" /> */}

      {/* Main Content */}
      {/* <div className="relative z-10 flex flex-col-reverse md:flex-row items-center gap-12 w-full max-w-7xl pt-16 pb-24">
      
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6 }}
            className="flex-1 text-center md:text-left md:pr-12"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight text-white mb-6">
              {slide.title.split(" ")[0]}{" "}
              <span
                className={`text-transparent bg-clip-text bg-gradient-to-r ${slide.gradient}`}
              >
                {slide.title.split(" ").slice(1).join(" ")}
              </span>
            </h1>
            <p className="mt-4 text-lg text-gray-300 max-w-lg mx-auto md:mx-0">
              {slide.subtitle}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-10">
              {slide.buttons.map((btn, i) => (
                <Link
                  key={i}
                  href={btn.href}
                  className={`px-8 py-4 rounded-full ${
                    i === 0
                      ? "bg-white text-gray-900 hover:bg-gray-200"
                      : "bg-transparent border border-white text-white hover:border-gray-300 hover:text-gray-300"
                  } font-medium shadow-lg transition-all duration-300`}
                >
                  {btn.text}
                </Link>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6 }}
            className="flex-1 flex justify-center relative w-full h-[300px] md:h-[400px] mt-12 md:mt-0"
          >
            <Image
              src={slide.image}
              alt={slide.title}
              layout="fill"
              objectFit="contain"
              className="absolute z-10 w-full drop-shadow-2xl"
            />
          </motion.div>
        </AnimatePresence>
      </div> */}

      {/* Controls */}
      <div className="absolute bottom-8 left-0 w-full flex justify-center items-center gap-6 z-20">
        <button
          onClick={handlePrev}
          className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
          aria-label="Previous slide"
        >
          <FaChevronLeft className="text-white text-lg" />
        </button>

        {/* Indicators */}
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === current ? "bg-white scale-110" : "bg-gray-500"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
          aria-label="Next slide"
        >
          <FaChevronRight className="text-white text-lg" />
        </button>
      </div>

      {/* Animation styles */}
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
