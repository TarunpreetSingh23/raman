"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaShoppingBag, FaUser, FaHome, FaInfoCircle, FaPhone } from "react-icons/fa";
import { GiShoppingBag, GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { FaPhoneAlt } from "react-icons/fa";

export default function Navbar() {
  const { data: session } = useSession();
  const [active, setActive] = useState("Home");
  const [cartCount, setCartCount] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    const updateCart = () => {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(savedCart.length);
    };

    updateCart();
    window.addEventListener("storage", updateCart);
    return () => window.removeEventListener("storage", updateCart);
  }, []);

  if (!isClient) return null;

  const baseMenu = [
    { name: "Home", href: "/", icon: <FaHome /> },
    { name: "Services", href: "/haute", icon: <FaInfoCircle /> },
    { name: "About", href: "/about", icon: <FaInfoCircle /> },
    { name: "Contact", href: "/contact", icon: <FaPhoneAlt /> },
  ];

  const authItem = session
    ? { name: "Profile", href: "/user", icon: <FaUser /> }
    : { name: "Register", href: "/register", icon: <FaUser /> };

  const menuItems = [...baseMenu, authItem];

  const serviceCategories = [
    "Party Makeup",
    "Bridal Makeup",
    "Hair Care",
    "Cleaning Services",
    "Event Decor",
  ];

  return (
    <header className="w-full fixed top-0 z-50">
      {/* Desktop Navbar */}
      <nav className="hidden md:flex items-center justify-between px-8 py-4 bg-gray-900 backdrop-blur-lg shadow-lg border-b border-gray-200 rounded-b-2xl">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/s2.jpg"
            alt="Logo"
            width={120}
            height={40}
            className="rounded-xl shadow-md"
          />
        </Link>

        {/* Menu Items */}
        <ul className="flex items-center gap-8 font-semibold text-gray-200">
          {menuItems.map((item) => (
            <li key={item.name} className="relative group">
              <Link
                href={item.href}
                onClick={() => setActive(item.name)}
                className={`transition px-3 py-2 rounded-md ${
                  active === item.name
                    ? "text-blue-400 font-bold"
                    : "hover:text-blue-300 hover:bg-gray-800"
                }`}
              >
                {item.name}
              </Link>
              <span
                className={`absolute left-0 bottom-0 h-[3px] w-0 bg-blue-400 
                  group-hover:w-full transition-all duration-300 ${
                    active === item.name ? "w-full" : ""
                  }`}
              />
            </li>
          ))}

          {/* Cart Icon */}
          <li className="relative">
            <Link
              href="/cart"
              className="flex items-center p-2 rounded-full hover:bg-gray-800 transition"
            >
              <FaShoppingBag className="text-3xl text-gray-200" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full shadow-lg animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mobile Top Navbar */}
      <div className="md:hidden fixed top-0 left-0 w-full flex justify-between items-center px-4 py-3 bg-gray-900 backdrop-blur-md shadow-md z-50">
        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          className="flex items-center gap-2 px-3 py-2 text-white rounded-full shadow-md"
        >
          <GiHamburgerMenu className="text-3xl" />
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/LOGO (2).jpg"
            alt="Logo"
            width={170}
            height={30}
            className="rounded-xl shadow-md"
          />
        </Link>

        {/* Cart */}
        <Link
          href="/cart"
          className="flex items-center gap-2 px-3 py-2 text-white rounded-full shadow-md relative"
        >
          <GiShoppingBag className="text-3xl" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full shadow-lg animate-pulse">
              {cartCount}
            </span>
          )}
        </Link>
      </div>

      {/* Mobile Bottom Navbar */}
      <nav className="md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 bg-gray-900 backdrop-blur-xl shadow-lg border border-gray-700 rounded-2xl px-6 py-3 flex justify-between items-center gap-6 w-[95%] max-w-md z-40">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setActive(item.name)}
            className={`flex flex-col items-center text-sm transition ${
              active === item.name
                ? "text-blue-400 scale-110 font-semibold"
                : "text-gray-300 hover:text-blue-300"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Sliding Sidebar for Services */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.4 }}
              className="fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 p-6 flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setMenuOpen(false)}
                className="self-end mb-6 text-gray-600 hover:text-gray-900"
              >
                <IoClose className="text-3xl" />
              </button>

              <h2 className="text-2xl font-bold mb-6 text-gray-800">Services</h2>

              <ul className="flex flex-col gap-4">
                {serviceCategories.map((cat, idx) => (
                  <li key={idx}>
                    <Link
                      href={`/services/${cat.toLowerCase().replace(/\s+/g, "-")}`}
                      className="block px-3 py-2 rounded-md text-gray-700 font-medium hover:bg-gray-100 hover:text-blue-600 transition"
                      onClick={() => setMenuOpen(false)}
                    >
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
