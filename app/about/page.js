"use client";

import { motion } from "framer-motion";
import { FaUsers, FaStar, FaRocket, FaHandshake } from "react-icons/fa";

export default function AboutPage() {
  const timeline = [
    {
      year: "2020",
      title: "The Spark",
      desc: "Our journey began with a simple vision — to make trusted home services quick and reliable.",
      icon: <FaRocket />,
    },
    {
      year: "2021",
      title: "Growing Trust",
      desc: "Thousands of happy customers started relying on us for everyday services.",
      icon: <FaUsers />,
    },
    {
      year: "2022",
      title: "Recognition",
      desc: "We achieved top ratings and became a household name in service excellence.",
      icon: <FaStar />,
    },
    {
      year: "2023",
      title: "Future Forward",
      desc: "Expanding into new cities, building partnerships, and aiming for global trust.",
      icon: <FaHandshake />,
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-100 via-blue-200 to-blue-400 text-gray-900 overflow-hidden">
      {/* Floating shapes */}
      <motion.div
        className="absolute top-20 left-20 w-72 h-72 bg-blue-300/40 rounded-full blur-3xl"
        animate={{ y: [0, 40, 0], x: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
        animate={{ y: [0, -40, 0], x: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Hero Section */}
      <section className="relative text-center py-24 z-10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400"
        >
          About Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-gray-700"
        >
          We are not just a service platform. We are a movement — simplifying lives, one trusted service at a time.
        </motion.p>
      </section>

      {/* Timeline */}
      <section className="relative max-w-5xl mx-auto px-6 py-16 z-10">
        <div className="grid gap-12">
          {timeline.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative flex items-start gap-6 bg-white/80 backdrop-blur-lg border border-blue-200 shadow-lg rounded-2xl p-6"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 text-white text-xl shadow-md">
                {item.icon}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-blue-500">{item.year}</h3>
                <h4 className="text-xl font-bold mt-1 text-gray-900">{item.title}</h4>
                <p className="text-gray-700 mt-2">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Vision Section */}
      <section className="relative text-center py-20 px-6 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md border border-blue-200 rounded-3xl shadow-xl p-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
            Our Vision
          </h2>
          <p className="mt-6 text-gray-700 text-lg leading-relaxed">
            To create a world where people never worry about daily services — because help is always just one tap away.
          </p>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6 text-center z-10">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-4 text-lg font-bold rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-blue-400 text-white hover:shadow-xl transition"
        >
          Join Our Journey 🚀
        </motion.button>
      </section>
    </div>
  );
}
