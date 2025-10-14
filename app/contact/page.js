"use client";

import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ContactSection() {
  const { data: session } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", message: "" });
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess("Message sent successfully 🎉");
        setForm({ firstName: "", lastName: "", email: "", message: "" });
        router.push("/");
      } else setSuccess("Something went wrong ❌");
    } catch {
      setSuccess("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-28 bg-gradient-to-br from-[#002366] via-gray-900 to-black text-white overflow-hidden">
      {/* 🌌 Floating Glow Orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-80 h-80 bg-[#5d7afc]/20 rounded-full blur-3xl top-0 left-10 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl bottom-20 right-10 animate-pulse"></div>
        <div className="absolute w-56 h-56 bg-blue-500/20 rounded-full blur-2xl top-1/2 left-1/3 animate-bounce"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold text-center mb-16 bg-gradient-to-r from-blue-300 via-white to-blue-300 bg-clip-text text-transparent drop-shadow-sm"
        >
          Let’s Connect
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-3xl shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
          >
            <h3 className="text-2xl font-semibold mb-6 text-blue-100">Send a Message</h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  required
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40 outline-none"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  required
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40 outline-none"
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40 outline-none"
              />
              <textarea
                name="message"
                placeholder="Your Message..."
                rows={4}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40 outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={loading}
                className="mt-2 bg-gradient-to-r from-blue-500 to-[#5d7afc] text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
              >
                {loading ? "Sending..." : "Send Message"}
              </motion.button>
            </form>

            {success && (
              <p className="mt-4 text-center text-sm text-blue-200 font-medium">{success}</p>
            )}
          </motion.div>

          {/* Newsletter / Info */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="bg-gradient-to-br from-gray-800 via-[#002366] to-gray-900 p-10 rounded-3xl shadow-2xl border border-white/10"
          >
            <h3 className="text-2xl font-semibold mb-4 text-white">
              Stay Updated with Sparky
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Get exclusive updates, service discounts, and expert tips directly in your inbox.
            </p>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const email = e.target.email.value;
                try {
                  const res = await fetch("/api/newsletter", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                  });
                  const data = await res.json();
                  if (data.success) {
                    alert("Subscribed successfully 🎉");
                    e.target.reset();
                  } else alert("Something went wrong ❌");
                } catch {
                  alert("Server error ❌");
                }
              }}
              className="flex flex-col gap-4"
            >
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40 outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#5d7afc] to-blue-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all"
              >
                Join Newsletter
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}