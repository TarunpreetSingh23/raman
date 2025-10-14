"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
// Removed unused icons for desktop view for cleaner UI, keeping only if you use them elsewhere
// import { FaShoppingBag, FaUser, FaHome, FaInfoCircle, FaPhone } from "react-icons/fa";
// import { GiShoppingBag, GiHamburgerMenu } from "react-icons/gi";
// import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { FaPhoneAlt, FaChevronDown } from "react-icons/fa"; // Added FaChevronDown for dropdown indicators
import { GiHamburgerMenu, GiShoppingBag } from "react-icons/gi"; // Kept for mobile
import { IoClose } from "react-icons/io5"; // Kept for mobile sidebar

export default function Navbar() {
  const { data: session } = useSession();
  // Active state for main navigation links to highlight the current page
  const [active, setActive] = useState("Home"); 
  const [cartCount, setCartCount] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // For mobile sidebar

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

  // --- Desktop Menu Items (based on screenshot) ---
  const desktopMainLinks = [
    { name: "Home", href: "/" },
    { name: "Cleaning", href: "/clean", hasDropdown: false }, // Placeholder for dropdown
    { name: "Beauty", href: "/facial", hasDropdown: false },
    { name: "Event Decor", href: "/eventdecor", hasDropdown: false},
    { name: "About", href: "/about", hasDropdown: false },
    { name: "Contact", href: "/contact", hasDropdown: false },
    // { name: "Pricing", href: "/pricing" },
  ];

  const desktopActionLinks = [
    // { name: "Contact sales", href: "/contact-sales" },
    {  name: session ? "Profile" : "Sign in ", href: session ? "user" : "/register" }, // Adjust based on session
    // { name: "View demo", href: "/demo" },
  ];

  // --- Mobile Menu Items (from your original code) ---
  const baseMobileMenu = [
    { name: "Home", href: "/", icon: <GiHamburgerMenu /> }, // Placeholder icon for Home as per mobile button in screenshot
    { name: "Services", href: "/haute", icon: <GiHamburgerMenu /> }, // Changed from FaInfoCircle to GiHamburgerMenu for consistency, can adjust
    { name: "About", href: "/about", icon: <GiHamburgerMenu /> },
    { name: "Contact", href: "/contact", icon: <FaPhoneAlt /> },
  ];

  const authMobileItem = session
    ? { name: "Profile", href: "/user", icon: <GiHamburgerMenu /> }
    : { name: "Register", href: "/register", icon: <GiHamburgerMenu /> };

  const mobileMenuItems = [...baseMobileMenu, authMobileItem];

  const serviceCategories = [ // For mobile sidebar
    "Party Makeup",
    "Bridal Makeup",
    "Hair Care",
    "Cleaning Services",
    "Event Decor",
  ];

  return (
    <header className="w-full fixed top-0 z-50">
      {/* Desktop Navbar - Matches screenshot UI */}
      <nav className="hidden md:flex items-center justify-around gap-30 px-8 py-2 bg-gray-900 text-gray-200 shadow-lg ">
        {/* Left Section: Logo & Main Links */}
        {/* <div className="flex justify-between items-center space-x-4"> */}
          <div className="">

          <Link href="/" className="flex items-center h-15 w-50">
            <Image
               src="/images/LOGO (2).jpg" // Your original logo
            alt="Logo"
            width={170}
            height={30}
            className="rounded-xl shadow-md"
          />
          </Link>
          </div>
          {/* Logo - Adjusted to match screenshot's logo appearance (a more abstract icon/logo) */}

          {/* Main Navigation Links */}
          <div>

          <ul className="flex items-center space-x-6 text-sm font-normal">
            {desktopMainLinks.map((item) => (
              <li key={item.name} className="relative group">
                <Link
                  href={item.href}
                  onClick={() => setActive(item.name)}
                  className={`flex items-center gap-1 py-2 px-1 transition-colors duration-200
                    ${active === item.name
                      ? "text-white font-medium"
                      : "hover:text-gray-50"
                    }`}
                >
                  {item.name}
                  {item.hasDropdown && <FaChevronDown className="text-xs ml-1 transition-transform group-hover:rotate-180" />}
                </Link>
                {/* Visual indicator for active item (subtle underline) */}
                {active === item.name && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white transform scale-x-75"></span>
                )}
              </li>
            ))}
          </ul>
          </div>
            {/* <Link href="/" className="flex items-center h-15 w-50">
            <Image
               src="/images/LOGO (2).jpg" // Your original logo
            alt="Logo"
            width={170}
            height={30}
            className="rounded-xl shadow-md"
          />
          </Link> */}
        {/* </div> */}

        {/* Right Section: Action Links & Button */}
        <div className="flex items-center space-x-6 text-sm">
          {desktopActionLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="ml-4 bg-white text-gray-900 font-medium py-2 px-5 rounded-md hover:bg-gray-200 transition-colors duration-200 shadow"
          
            >
              {item.name}
            </Link>
          ))}
          {/* <Link
            href="/start-trial"
            className="ml-4 bg-white text-gray-900 font-medium py-2 px-5 rounded-md hover:bg-gray-200 transition-colors duration-200 shadow"
          >
            Sign in 
          </Link> */}
        </div>
      </nav>

      {/* Mobile Top Navbar (Your original code, largely unchanged) */}
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
            src="/images/LOGO (2).jpg" // Your original logo
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

      {/* Mobile Bottom Navbar (Your original code, largely unchanged) */}
      <nav className="md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 bg-gray-900 backdrop-blur-xl shadow-lg border border-gray-700 rounded-2xl px-6 py-3 flex justify-between items-center gap-6 w-[95%] max-w-md z-40">
        {mobileMenuItems.map((item) => (
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

      {/* Sliding Sidebar for Services (Your original code, largely unchanged) */}
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