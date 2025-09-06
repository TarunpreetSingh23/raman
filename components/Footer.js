"use client";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#f5f5f5] overflow-hidden">
      {/* Floating Orbs Background */}
      {/* <div className="absolute inset-0">
        <div className="absolute w-64 h-64 bg-pink-500/20 rounded-full blur-3xl top-10 left-20 animate-pulse"></div>
        <div className="absolute w-40 h-40 bg-indigo-400/20 rounded-full blur-2xl bottom-20 right-20 animate-bounce"></div>
        <div className="absolute w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl top-1/2 left-1/2 animate-pulse"></div>
      </div> */}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 relative z-10">
        {/* Brand + Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="px-4 py-2 bg-gradient-to-b from-blue-500 via-blue-500 to-blue-500  rounded-xl text-white font-bold text-lg">
            Sparky
          </span>
          <p className="mt-4 text-xl md:text-3xl font-light text-gray-800 text-bold">
            Quick.Trusted
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 border-t border-gray-600 pt-10">
          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl font-bold mb-4 text-gray-700">Contact</h3>
            <ul className="space-y-3 text-gray-800">
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-pink-400" />
                info@mysite.com
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-yellow-400" />
                +1 (123) 456-7890
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={18} className="text-indigo-400" />
                500 Terry Francine St, San Francisco, CA
              </li>
            </ul>
          </motion.div>

          {/* Navigation Section */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl font-bold mb-4 text-gray-800">Navigation</h3>
            <ul className="grid grid-cols-2 gap-3 text-gray-800">
              <li><a href="#" className="hover:text-pink-400 transition">Games</a></li>
              <li><a href="#" className="hover:text-pink-400 transition">Careers</a></li>
              <li><a href="#" className="hover:text-pink-400 transition">About</a></li>
              <li><a href="#" className="hover:text-pink-400 transition">Contact</a></li>
              <li><a href="#" className="hover:text-pink-400 transition">Accessibility</a></li>
              <li><a href="#" className="hover:text-pink-400 transition">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-pink-400 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-pink-400 transition">Refund Policy</a></li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-800 text-sm">
          © {new Date().getFullYear()} Tripo Games. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
