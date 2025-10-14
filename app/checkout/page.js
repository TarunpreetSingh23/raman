"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { addDays, format } from "date-fns";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Phone, MapPin, Calendar, Clock, ShoppingCart, X, Trash2, Tag, DollarSign, Wallet } from "lucide-react"; // 🚨 Imported new icons

const UserMap = dynamic(() => import("@/components/UseMap"), { ssr: false });

// Helper component for styled inputs
const InputField = ({ label, type = "text", value, onChange, error, placeholder, icon: Icon }) => (
    <div className="flex flex-col">
        <label className="text-gray-700 mb-2 font-medium flex items-center gap-2">
            {Icon && <Icon className="w-4 h-4 text-gray-500" />} {label}
        </label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            className={`p-3 rounded-xl border-2 transition-all duration-300 shadow-inner
                focus:ring-4 focus:ring-[#5d7afc]/30 focus:border-[#5d7afc] outline-none 
                ${error ? "border-red-500" : "border-gray-200 focus:border-[#5d7afc]"}`}
            placeholder={placeholder}
        />
        {error && (
            <span className="text-red-500 text-sm mt-1">{error}</span>
        )}
    </div>
);

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
            // Updated regex to handle optional spaces around the pincode
            const pinMatch = address.match(/\b\d{6}\b/); 
            if (pinMatch) setPincode(pinMatch[0]);
        }
    }, [address]);

    const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1) || 0), 0);
    const discount = subtotal * 0.1;
    const total = subtotal - discount;

    const validate = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = "Full Name is required";
        if (!phone.trim()) newErrors.phone = "Phone is required";
        else if (!/^\d{10}$/.test(phone))
            newErrors.phone = "Must be a valid 10-digit number";
        if (!address.trim()) newErrors.address = "Complete Address is required";
        if (!date) newErrors.date = "A service date is required";
        if (!timeSlot) newErrors.timeSlot = "A time slot is required";
        if (!pincode.trim()) newErrors.pincode = "Pincode is required";
        else if (!/^\d{6}$/.test(pincode))
            newErrors.pincode = "Must be a valid 6-digit pincode";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

   const handleConfirm = async () => {
  if (!validate()) return;
  if (!cart.length) return alert("Cart is empty");
  if (!session) {
    alert("Login Required");
    router.push("/register");
    return;
  }

  const formattedCart = cart.map((item) => ({
    name: item.title || item.serviceName,
    price: item.price || item.cost || 0,
    quantity: item.quantity || 1,
    category:
      item.category || item.Category || item.serviceCategory || "general",
  }));

  try {
    // 1️⃣ Create order in your backend
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

    // 2️⃣ Send confirmation email
    try {
      const emailRes = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: session?.user?.email,
          orderDetails: formattedCart,
          total,
        }),
      });

      const emailData = await emailRes.json();

      if (!emailData.success) {
        console.warn("⚠️ Email failed:", emailData.error);
        alert("Order placed, but email failed to send.");
      } else {
        console.log("✅ Email sent successfully!");
      }
    } catch (emailErr) {
      console.error("Email sending error:", emailErr);
      alert("Order placed, but failed to send confirmation email.");
    }

    // 3️⃣ Show success and clear cart
    alert(`✅ Order Placed Successfully! Order ID: ${data.orderId}`);
    localStorage.removeItem("cart");
    setCart([]);
    router.push("/");
  } catch (err) {
    console.error(err);
    alert("Failed to place order: " + (err.message || "An unknown error occurred."));
  }
};

    const handleRemoveItem = (indexToRemove) => {
        const updatedCart = cart.filter((_, idx) => idx !== indexToRemove);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const isSlotDisabled = (slot) => {
        if (date !== format(new Date(), "yyyy-MM-dd")) return false;
        
        const now = new Date();
        const [_, end] = slot.split(" - ");
        const [endHour, endMinute] = end.split(":").map(Number);
        const slotEnd = new Date();
        slotEnd.setHours(endHour, endMinute, 0, 0);
        
        // Add a 30-minute buffer to disable slots that are too close
        const cutoffTime = new Date(now.getTime() + 30 * 60000); 

        return slotEnd <= cutoffTime;
    };

    return (
        <div className="min-h-screen mt-[65px] bg-gray-50 font-sans">
            
            {/* Page Header */}
            <div className="bg-white shadow-sm py-8 mb-10">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 tracking-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2c55bb] to-[#5d7afc]">
                        Secure Checkout
                    </span>
                </h1>
            </div>

            <div className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                
                {/* 1. Checkout Form (Left/Main Column) */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Customer Details */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                        className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <User className="w-6 h-6 text-[#5d7afc]" /> Customer Details
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField 
                                label="Full Name" value={name} onChange={(e) => setName(e.target.value)} 
                                error={errors.name} placeholder="John Doe" icon={User}
                            />
                            <InputField 
                                label="Phone Number" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} 
                                error={errors.phone} placeholder="9876543210" icon={Phone}
                            />
                        </div>
                    </motion.div>

                    {/* Delivery Address */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <MapPin className="w-6 h-6 text-[#5d7afc]" /> Delivery Address
                        </h2>
                        <div className="flex flex-col gap-4">
                            <textarea
                                rows={3}
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="House No, Street, Landmark, City, State"
                                className={`p-3 rounded-xl border-2 shadow-inner focus:ring-4 focus:ring-[#5d7afc]/30 focus:border-[#5d7afc] outline-none transition-all duration-300 ${
                                    errors.address ? "border-red-500" : "border-gray-200"
                                }`}
                            />
                            {errors.address && (
                                <span className="text-red-500 text-sm">{errors.address}</span>
                            )}

                            <InputField 
                                label="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} 
                                error={errors.pincode} placeholder="6-Digit Pincode" icon={MapPin}
                            />
                            
                            <button
                                type="button"
                                onClick={() => setShowMap(!showMap)}
                                className={`py-3 mt-2 font-semibold rounded-xl shadow-md transition-all duration-300 flex items-center justify-center gap-2
                                    ${showMap ? "bg-gray-400 text-white" : "bg-[#5d7afc] text-white hover:bg-[#2c55bb]"}`}
                            >
                                <MapPin className="w-5 h-5" /> {showMap ? "Hide Map" : "Use My Location"}
                            </button>

                            {showMap && (
                                <motion.div initial={{ height: 0 }} animate={{ height: "16rem" }} exit={{ height: 0 }} transition={{ duration: 0.4 }}
                                    className="mt-4 h-64 rounded-2xl overflow-hidden shadow-inner border border-gray-300">
                                    <UserMap setAddress={setAddress} />
                                </motion.div>
                            )}
                        </div>
                    </motion.div>

                    {/* Schedule Service */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <Calendar className="w-6 h-6 text-[#5d7afc]" /> Schedule Service
                        </h2>

                        <div className="mb-6">
                            <p className="text-gray-700 font-medium mb-3 flex items-center gap-2"><Calendar className="w-4 h-4" /> Select Date</p>
                            <div className="flex gap-3 overflow-x-auto pb-2">
                                {next5Days.map((d, idx) => {
                                    const formatted = format(d, "yyyy-MM-dd");
                                    const label = idx === 0 ? "Today" : format(d, "EEE, MMM d");
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => setDate(formatted)}
                                            className={`flex-shrink-0 px-4 py-3 rounded-xl border-2 font-semibold transition-all duration-200 shadow-sm
                                                ${date === formatted
                                                    ? "bg-[#5d7afc] text-white border-[#5d7afc] shadow-md"
                                                    : "bg-white border-gray-300 hover:bg-gray-100 text-gray-700"
                                                }`}
                                        >
                                            {label}
                                        </button>
                                    );
                                })}
                            </div>
                            {errors.date && (
                                <span className="text-red-500 text-sm mt-2 block">{errors.date}</span>
                            )}
                        </div>

                        {date && (
                            <div>
                                <p className="text-gray-700 font-medium mb-3 flex items-center gap-2"><Clock className="w-4 h-4" /> Select Time Slot</p>
                                <div className="flex flex-wrap gap-2">
                                    {slots.map((slot, i) => {
                                        const isDisabled = isSlotDisabled(slot);
                                        return (
                                            <button
                                                key={i}
                                                onClick={() => !isDisabled && setTimeSlot(slot)}
                                                disabled={isDisabled}
                                                className={`px-4 py-2 rounded-xl border font-medium transition-all duration-200 shadow-sm
                                                    ${timeSlot === slot && !isDisabled
                                                        ? "bg-green-500 text-white border-green-600 shadow-md"
                                                        : isDisabled 
                                                        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through"
                                                        : "bg-white border-gray-300 hover:bg-gray-100 text-gray-800"
                                                    }`}
                                            >
                                                {slot}
                                            </button>
                                        );
                                    })}
                                </div>
                                {errors.timeSlot && (
                                    <span className="text-red-500 text-sm mt-2 block">{errors.timeSlot}</span>
                                )}
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* 2. Order Summary & Total (Right/Sidebar Column) */}
                <div className="lg:col-span-1">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.3 }}
                        className="sticky top-24 bg-white rounded-3xl shadow-2xl p-6 border border-gray-100">
                        
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-dashed flex items-center gap-2">
                            <ShoppingCart className="w-6 h-6 text-[#5d7afc]" /> Order Summary
                        </h2>

                        {/* Price Details */}
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between font-medium text-gray-700">
                                <span>Subtotal ({cart.length} items)</span>
                                <span>₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-green-600 font-semibold">
                                <span className="flex items-center gap-1"><Tag className="w-4 h-4" /> Discount (10%)</span>
                                <span>-₹{discount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-xl pt-3 border-t-2 border-gray-100">
                                <span>Total Payable</span>
                                <span className="text-[#5d7afc]">₹{total.toFixed(2)}</span>
                            </div>
                            
                            <div className="pt-2 text-center">
                                <span className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-sm font-semibold">
                                    <Wallet className="w-4 h-4" /> Pay After Service
                                </span>
                            </div>
                        </div>

                        {/* Confirm Button */}
                        <button
                            onClick={handleConfirm}
                            disabled={!cart.length}
                            className={`w-full py-4 text-white text-lg font-extrabold rounded-2xl shadow-xl transition-all duration-300 
                                ${cart.length 
                                    ? "bg-green-600 hover:bg-green-700 active:scale-[0.98] focus:ring-4 focus:ring-green-300"
                                    : "bg-gray-400 cursor-not-allowed"
                                }`}
                        >
                            {cart.length ? "Confirm & Place Order" : "Cart is Empty"}
                        </button>
                        
                        {/* Mobile Cart Button Hint */}
                        <p className="text-center text-gray-500 text-sm mt-4 lg:hidden">
                            Tap the 🛒 button to view cart items.
                        </p>
                    </motion.div>
                </div>
            </div>


            {/* Floating Cart Button (Remains simple but styled) */}
            <div
                className="fixed bottom-6 right-6 w-16 h-16 bg-[#5d7afc] text-white rounded-full flex items-center justify-center shadow-2xl cursor-pointer z-50 hover:bg-[#2c55bb] transition-all duration-300 lg:hidden"
                onClick={()=>setShowCartDrawer(true)}
            >
                <ShoppingCart className="w-7 h-7" />
                {cart.length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white transform translate-x-1 -translate-y-1">
                        {cart.length}
                    </span>
                )}
            </div>


            {/* Cart Drawer (Order Summary/Details on Mobile) */}
            <AnimatePresence>
                {showCartDrawer && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            className="fixed inset-0 bg-black/50 z-40"
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
                            className="fixed top-0 right-0 w-full max-w-sm h-full bg-white shadow-2xl z-50 flex flex-col"
                        >
                            <div className="p-5 flex justify-between items-center border-b shadow-sm">
                                <h2 className="text-xl font-extrabold text-[#5d7afc] flex items-center gap-2">
                                    <ShoppingCart className="w-5 h-5" /> Your Order ({cart.length} Items)
                                </h2>
                                <button onClick={() => setShowCartDrawer(false)} className="p-1 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {cart.length === 0 ? (
                                    <p className="text-gray-500 text-center mt-10 p-4 border border-dashed rounded-lg">
                                        Your cart is empty. Start adding services!
                                    </p>
                                ) : (
                                    <ul className="space-y-3">
                                        {cart.map((item, i) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="flex justify-between items-start bg-gray-50 p-4 rounded-xl border border-gray-100 transition-all hover:bg-white"
                                            >
                                                <div>
                                                    <p className="font-semibold text-gray-900 line-clamp-1">{item.title}</p>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        Qty: {item.quantity || 1} • ₹{item.price * (item.quantity || 1)}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => handleRemoveItem(i)}
                                                    className="text-red-500 hover:text-red-700 transition"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </motion.li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {cart.length > 0 && (
                                <div className="p-5 border-t shadow-inner space-y-3">
                                    <div className="flex justify-between font-medium text-gray-700">
                                        <span>Subtotal</span>
                                        <span>₹{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-green-600">
                                        <span>Discount (10%)</span>
                                        <span>-₹{discount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between font-extrabold text-xl pt-3 border-t">
                                        <span>TOTAL</span>
                                        <span className="text-[#5d7afc]">₹{total.toFixed(2)}</span>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}