"use client";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ContactSection() {
    const {data:session}=useSession();
    const router=useRouter();
    const [services, setServices] = useState([]);
    const [loading, setloading] = useState(true);
    const [form, setForm] = useState({ firstName: "", lastName: "", email: "", message: "" });
    // const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
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
        router.push("/");
        setForm({ firstName: "", lastName: "", email: "", message: "" });
        router.push("/");
      } else {
        setSuccess("Something went wrong ❌");
      }
    } catch (error) {
      setSuccess("Server error ❌");
    } finally {
      setloading(false);
    }
  };
  return (
   <section className="relative py-28 bg-gradient-to-r from-gray-100 via-white to-gray-100 overflow-hidden">
  {/* Floating Background Shapes */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute w-40 h-40 bg-[#5d7afc]/20 rounded-full blur-3xl top-10 left-20 animate-pulse"></div>
    <div className="absolute w-56 h-56 bg-gray-400/20 rounded-full blur-3xl bottom-20 right-32 animate-pulse"></div>
    <div className="absolute w-28 h-28 bg-[#5d7afc]/30 rounded-full blur-2xl top-1/3 left-1/2 animate-bounce"></div>
  </div>

  <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
    {/* Title */}
    <h2 className="text-5xl md:text-6xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-[#5d7afc] drop-shadow-sm">
      Let’s Connect
    </h2>

    <div className="grid md:grid-cols-2 gap-10">
      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-lg border border-gray-200"
      >
        <h3 className="text-2xl font-bold mb-6 text-gray-900">Get in Touch</h3>
        <form
          className="flex flex-col gap-5"
          onSubmit={async (e) => {
            e.preventDefault();
            const firstName = e.target.firstName.value;
            const lastName = e.target.lastName.value;
            const email = e.target.email.value;
            const message = e.target.message.value;

            try {
              const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firstName, lastName, email, message }),
              });

              const data = await res.json();
              if (data.success) {
                alert("Message sent successfully 🎉");
                e.target.reset();
              } else {
                alert(data.message || "Something went wrong ❌");
              }
            } catch (err) {
              alert("Server error ❌");
            }
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              required
              className="w-full p-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#5d7afc] focus:ring-2 focus:ring-[#5d7afc]/40 outline-none"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              required
              className="w-full p-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#5d7afc] focus:ring-2 focus:ring-[#5d7afc]/40 outline-none"
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full p-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#5d7afc] focus:ring-2 focus:ring-[#5d7afc]/40 outline-none"
          />
          <textarea
            name="message"
            placeholder="Your Message..."
            rows={4}
            required
            className="w-full p-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#5d7afc] focus:ring-2 focus:ring-[#5d7afc]/40 outline-none"
          />
          <button className="mt-2 bg-gradient-to-r from-[#5d7afc] to-blue-600 text-white font-semibold py-3 rounded-xl hover:scale-105 transition-transform shadow-md">
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
        className="bg-gray-900 p-10 rounded-3xl shadow-lg border border-gray-700"
      >
        <h3 className="text-2xl font-bold mb-6 text-white">
          Subscribe to Our Newsletter
        </h3>
        <form
          className="flex flex-col gap-4"
          onSubmit={async (e) => {
            e.preventDefault();
            const email = e.target.email.value;
            const subscribed = e.target.subscribed.checked;

            try {
              const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, subscribed }),
              });

              const data = await res.json();
              if (data.success) {
                alert("Subscribed successfully 🎉");
                e.target.reset();
              } else {
                alert(data.message || "Something went wrong ❌");
              }
            } catch (err) {
              alert("Server error ❌");
            }
          }}
        >
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full p-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#5d7afc] focus:ring-2 focus:ring-[#5d7afc]/40 outline-none"
          />
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <input
              type="checkbox"
              name="subscribed"
              defaultChecked
              className="w-4 h-4 accent-[#5d7afc]"
            />
            <span>Yes, subscribe me to your newsletter.</span>
          </div>
          <button className="mt-2 bg-gradient-to-r from-[#5d7afc] to-blue-600 text-white font-semibold py-3 rounded-xl hover:scale-105 transition-transform shadow-md">
            Join
          </button>
        </form>
      </motion.div>
    </div>
  </div>
</section>
  );
}
