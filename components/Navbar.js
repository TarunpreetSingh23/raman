"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { useSession, signIn, signOut, getSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [openMenu, setOpenMenu] = useState(false);
  const [active, setActive] = useState("Home");
  const [cartCount, setCartCount] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Ensure we only render after client mount to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Track cart count dynamically
  useEffect(() => {
    const updateCart = () => {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(savedCart.length);
    };

    updateCart();
    window.addEventListener("storage", updateCart);

    return () => {
      window.removeEventListener("storage", updateCart);
    };
  }, []);

  if (!isClient) return null; // wait for client-side render

  // Base menu items
  const baseMenu = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/haute" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];


  // Conditional item: show Profile if logged in, Register if 
  console.log("session: ",session);
  const authItem = session
    ? { name: "Profile", href: "/user" }
    : { name: "Register", href: "/register" };
    

  const menuItems = [...baseMenu, authItem];


  return (
    <header className="w-full fixed top-0 z-50">
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 bg-white/60 backdrop-blur-lg shadow-lg border border-white/30 rounded-b-2xl">
        {/* Logo */}
        <Link
          href="/"
          className="px-4 py-2 bg-[#0d1a26] text-white font-extrabold text-xl md:text-2xl rounded-xl shadow-lg hover:scale-105 transition"
        >
          Sparky
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 font-semibold text-gray-800">
          {menuItems.map((item) => (
            <li key={item.name} className="relative group">
              <Link
                href={item.href}
                onClick={() => setActive(item.name)}
                className={`transition px-3 py-2 ${
                  active === item.name ? "text-gray-700 font-bold" : "hover:text-gray-900"
                }`}
              >
                {item.name}
              </Link>
              <span
                className={`absolute left-0 bottom-0 h-[3px] w-0 bg-gray-900 
                  group-hover:w-full transition-all duration-300 ${
                    active === item.name ? "w-full" : ""
                  }`}
              />
            </li>
          ))}

          {/* Cart */}
          <li className="relative">
            <Link href="/cart" className="flex items-center">
              <FaShoppingBag className="text-gray-900 text-2xl hover:scale-110 transition" />
              {cartCount > 0 && (
                <span className="ml-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full shadow-lg animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl text-gray-800"
          onClick={() => setOpenMenu(true)}
        >
          <GiHamburgerMenu />
        </button>
      </nav>

      {/* Mobile Menu */}
      {openMenu && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex">
          <div className="w-72 max-w-[80%] h-full bg-white/95 shadow-lg p-6 animate-slideIn relative">
            <button
              className="absolute top-4 right-4 text-2xl text-gray-700"
              onClick={() => setOpenMenu(false)}
            >
              <IoMdClose />
            </button>

            <ul className="flex flex-col gap-6 font-medium text-gray-800 mt-10">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    setActive(item.name);
                    setOpenMenu(false);
                  }}
                  className="hover:text-[#5d7afc] transition"
                >
                  {item.name}
                </Link>
              ))}

              <Link
                href="/cart"
                onClick={() => setOpenMenu(false)}
                className="flex items-center gap-2 hover:text-[#5d7afc] transition"
              >
                <FaShoppingBag className="text-gray-900 text-lg" /> Cart{" "}
                {cartCount > 0 && (
                  <span className="ml-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full shadow-lg animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Link>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
