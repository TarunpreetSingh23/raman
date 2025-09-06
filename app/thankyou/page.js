"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function ThankYou() {
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [cancelled, setCancelled] = useState(false);
  const { data: session, status } = useSession();
 // const [saved, setsaved] = useState(false)
const saved = useRef(false);

  useEffect(() => {
    if (status === "loading") return; // Wait until session is ready
    if(saved.current){
      return;
    }
    saved.current=true
    const savedOrder = localStorage.getItem("orderDetails");
    const alreadySaved = localStorage.getItem("orderSaved");

    if (!savedOrder) {
      console.log("❌ No saved order found in localStorage");
      return;
    }

    const parsedOrder = JSON.parse(savedOrder);
    setOrder(parsedOrder); // Set order to display on page

    const fullOrder = {
      ...parsedOrder,
      email: session?.user?.email?.toLowerCase() || "guest@example.com",
    };

    console.log("🧾 Order to be saved:", fullOrder);

    if (fullOrder.products?.length > 0) {
      fetch("/api/save-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullOrder),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(" Save response:", data);
          if (data.success) {
            localStorage.setItem("orderSaved", "true");
           // setsaved(true)
          } else {
            console.error(" Save failed:", data.error);
          }
        })
        .catch((err) => console.error(" Network error:", err));
    }
  }, [session,status]);

  const handleCancel = () => {
    localStorage.removeItem("orderDetails");
    localStorage.removeItem("orderSaved");
    setCancelled(true);
  };

  if (!order && !cancelled) return <p className="mt-10 text-center">Loading...</p>;

  if (cancelled) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-red-600">Order Cancelled</h1>
        <p className="text-lg mt-2 mb-6">Your order has been cancelled successfully.</p>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          onClick={() => router.push("/")}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-[75px] px-4 md:px-20 py-10 bg-white">
      <h1 className="text-3xl font-bold mb-4 text-green-600">Thank you for your order!</h1>
      <p className="text-lg mb-6">Here are your order details:</p>

      <div className="space-y-2 text-gray-800">
        <p><strong>Name:</strong> {order.name}</p>
        <p><strong>Phone:</strong> {order.phone}</p>
        <p><strong>Address:</strong> {order.address}</p>
        <p><strong>Payment Method:</strong> {order.paymentMethod === "card" ? "Card" : "Cash on Delivery"}</p>
        {order.paymentMethod === "card" && order.cardNumber && (
          <p><strong>Card:</strong> **** **** **** {order.cardNumber.slice(-4)}</p>
        )}
      </div>

      <hr className="my-6" />

      <h2 className="text-2xl font-semibold mb-4">Items Ordered</h2>
      <ul className="mb-4">
        {order.products?.map((item, index) => (
          <li key={index} className="flex justify-between border-b py-1">
            <span>{item.name}</span>
            <span>${item.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <div className="space-y-2 text-gray-800 text-lg">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>${order.subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax:</span>
          <span>${order.tax}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery:</span>
          <span>${order.delivery}</span>
        </div>
        {parseFloat(order.discount) > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount:</span>
            <span>– ${order.discount}</span>
          </div>
        )}
        <hr />
        <div className="flex justify-between font-bold text-xl">
          <span>Total:</span>
          <span>${order.total}</span>
        </div>
      </div>

      <div className="flex justify-center items-center gap-5">
        <button
          onClick={() => router.push("/")}
          className="w-[17%] mt-8 bg-gray-700 hover:bg-gray-900 text-white py-2 rounded"
        >
          Back to home
        </button>
        <button
          onClick={handleCancel}
          className="w-[17%] mt-8 bg-red-600 hover:bg-red-700 text-white py-2 rounded"
        >
          Cancel Order
        </button>
      </div>
    </div>
  );
}
