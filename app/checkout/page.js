"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { addDays, format } from "date-fns";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

const UserMap = dynamic(() => import("@/components/UseMap"), { ssr: false });

export default function Checkout() {
  const router = useRouter();
  const { data: session } = useSession();
  const [cart, setCart] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [showCartDrawer, setShowCartDrawer] = useState(false);

  // Customer Info
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Address
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");

  // Scheduling
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  const [errors, setErrors] = useState({});

  // Next 5 days
  const next5Days = Array.from({ length: 5 }, (_, i) => addDays(new Date(), i));

  // Slots
  const slots = [
    "09:00 - 10:00",
    "10:30 - 11:30",
    "12:00 - 13:00",
    "13:30 - 14:30",
    "15:00 - 16:00",
    "16:30 - 17:30",
  ];

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (address) {
      const pinMatch = address.match(/\b\d{6}\b/);
      if (pinMatch) setPincode(pinMatch[0]);
    }
  }, [address]);

  const subtotal = cart.reduce((sum, item) => sum + (item.price || 0), 0);
  const discount = subtotal * 0.1;
  const total = subtotal - discount;

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(phone))
      newErrors.phone = "Enter a valid 10-digit phone";
    if (!address.trim()) newErrors.address = "Address is required";
    if (!date) newErrors.date = "Please select a date";
    if (!timeSlot) newErrors.timeSlot = "Please select a time slot";
    if (!pincode.trim()) newErrors.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(pincode))
      newErrors.pincode = "Enter a valid 6-digit pincode";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = async () => {
    if (!validate()) return;
    if (!cart.length) return alert("Cart is empty");
    if (!session) {
      alert("Login Required");
      router.push("/register");
    }

    const formattedCart = cart.map((item) => ({
      name: item.title || item.serviceName,
      price: item.price || item.cost || 0,
      quantity: item.quantity || 1,
      category:
        item.category || item.Category || item.serviceCategory || "general",
    }));

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart: formattedCart,
          subtotal,
          discount,
          total,
          customerName: name,
          email: session?.user?.email,
          phone,
          address,
          pincode,
          date,
          timeSlot,
          paymentMethod: "Pay After Service",
          status: "pending",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create order");

      alert(`✅ Order Placed Successfully! Order ID: ${data.orderId}`);
      localStorage.removeItem("cart");
      setCart([]);
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Failed to place order: " + err.message);
    }
  };

  return (
    <div className="min-h-screen mt-[65px] bg-gray-100 py-10 px-4 md:px-20">
 <div
        className="fixed bottom-20 right-6 w-14 h-14 sm:w-16 sm:h-16 bg-[#2c55bb] text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer z-50 hover:bg-orange-600"
        onClick={()=>setShowCartDrawer(true)}
      >
        🛒
        {cart.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cart.length}
          </span>
        )}
      </div>


      <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-12">
        Checkout
      </h1>
      
      <div className="max-w-5xl mx-auto">
        {/* Customer Details */}
        
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Customer Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-gray-700 mb-2 font-medium">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`p-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 outline-none transition ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="John Doe"
              />
              {errors.name && (
                <span className="text-red-500 text-sm mt-1">{errors.name}</span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 mb-2 font-medium">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`p-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 outline-none transition ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="9876543210"
              />
              {errors.phone && (
                <span className="text-red-500 text-sm mt-1">{errors.phone}</span>
              )}
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Delivery Address
          </h2>
          <div className="flex flex-col gap-4">
            <textarea
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Complete Address"
              className={`p-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 outline-none transition ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.address && (
              <span className="text-red-500 text-sm">{errors.address}</span>
            )}

            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Pincode"
              className={`p-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 outline-none transition ${
                errors.pincode ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.pincode && (
              <span className="text-red-500 text-sm">{errors.pincode}</span>
            )}

            <button
              type="button"
              onClick={() => setShowMap(true)}
              className="py-3 bg-[#5d7afc] text-white rounded-lg font-semibold shadow transition"
            >
              Use My Location
            </button>

            {showMap && (
              <div className="mt-4 h-64 rounded-xl overflow-hidden shadow-inner">
                <UserMap setAddress={setAddress} />
              </div>
            )}
          </div>
        </div>

        {/* Schedule Service */}
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Schedule Service
          </h2>

          <div className="mb-4">
            <p className="text-gray-700 font-medium mb-2">Select Date</p>
            <div className="flex gap-3 flex-wrap">
              {next5Days.map((d, idx) => {
                const formatted = format(d, "yyyy-MM-dd");
                const label = format(d, "EEE, MMM d");
                return (
                  <button
                    key={idx}
                    onClick={() => setDate(formatted)}
                    className={`px-4 py-2 rounded-lg border font-medium transition ${
                      date === formatted
                        ? "bg-[#5d7afc] text-white border-[#5d7afc]"
                        : "bg-white border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            {errors.date && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.date}
              </span>
            )}
          </div>

          {/* Slots */}
          {slots
            .filter((slot) => {
              if (date !== format(new Date(), "yyyy-MM-dd")) return true;
              const now = new Date();
              const [_, end] = slot.split(" - ");
              const [endHour, endMinute] = end.split(":").map(Number);
              const slotEnd = new Date();
              slotEnd.setHours(endHour, endMinute, 0, 0);
              return slotEnd > now;
            })
            .map((slot, i) => (
              <button
                key={i}
                onClick={() => setTimeSlot(slot)}
                className={`px-4 py-2 rounded-lg m-0.5 border font-medium transition ${
                  timeSlot === slot
                    ? "bg-[#5d7afc] text-white border-indigo-600"
                    : "bg-white border-gray-300 hover:bg-gray-100"
                }`}
              >
                {slot}
              </button>
            ))}
          {errors.timeSlot && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.timeSlot}
            </span>
          )}
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          className="w-full py-4 bg-[#5d7afc] text-white text-lg font-semibold rounded-2xl shadow transition"
        >
          Confirm & Place Order
        </button>
      </div>

      {/* Floating Cart Button */}
 



      {/* Drawer */}
      <AnimatePresence>
        {showCartDrawer && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCartDrawer(false)}
            />

            {/* Drawer Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 w-80 h-full bg-white shadow-2xl z-50 flex flex-col"
            >
              <div className="p-4 flex justify-between items-center border-b">
                <h2 className="text-xl font-bold">Order Summary</h2>
                <button onClick={() => setShowCartDrawer(false)}>✕</button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center mt-10">
                    Your cart is empty
                  </p>
                ) : (
                  <ul className="space-y-4">
                    {cart.map((item, i) => (
                      <li
                        key={i}
                        className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                      >
                        <div>
                          <p className="font-semibold">{item.title}</p>
                          <p className="text-sm text-gray-500">
                            ₹{item.price}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            const updatedCart = cart.filter(
                              (_, idx) => idx !== i
                            );
                            setCart(updatedCart);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify(updatedCart)
                            );
                          }}
                          className="text-red-500 text-sm"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-4 border-t space-y-2">
                  <div className="flex justify-between font-medium">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discount (10%)</span>
                    <span>-₹{discount}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>

                  {/* <button
                    onClick={handleConfirm}
                    className="w-full bg-[#5d7afc] text-white py-3 rounded-lg font-semibold mt-4"
                  >
                    Confirm & Place Order
                  </button> */}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
