'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaTrash } from 'react-icons/fa';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState('');
  const { data: session } = useSession();
  const router = useRouter();

  const DELIVERY_CHARGE = 40;
  const TAX_RATE = 0.18;

  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) setCartItems(JSON.parse(saved));
    const savedCoupon = localStorage.getItem('coupon');
    if (savedCoupon) {
      setCoupon(savedCoupon);
      setDiscount(0.1);
    }
  }, []);

  const handleCheckout = () => {
    if (!session) {
      alert("Login required");
      router.push("/login");
    } else {
      router.push("/checkout");
    }
  };

  const removeItem = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    if (newCart.length === 0) localStorage.removeItem('coupon');
  };

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'SAVE10') {
      setDiscount(0.1);
      localStorage.setItem('coupon', 'SAVE10');
      setMessage('✅ Coupon Applied!');
    } else {
      setDiscount(0);
      localStorage.removeItem('coupon');
      setMessage('❌ Invalid Coupon');
    }
    setTimeout(() => setMessage(''), 3000);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + DELIVERY_CHARGE - subtotal * discount;

  return (
    <div className="min-h-screen mt-[70px] bg-gray-50 py-10 px-4 md:px-16 lg:px-24">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-10">
        🛒 Your Cart
      </h1>

      {/* Message */}
      {message && (
        <div
          className={`fixed top-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg text-white font-semibold transition-all duration-300 ${
            message.includes('Invalid') ? 'bg-red-500' : 'bg-green-600'
          }`}
        >
          {message}
        </div>
      )}

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">
          Your cart is empty.{" "}
          <Link href="/" className="text-[#5d7afc] font-semibold hover:underline">
            Shop now
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-6">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <img
                  src={item.image || '/placeholder.png'}
                  alt={item.name}
                  className="w-28 h-28 md:w-32 md:h-32 object-cover rounded-l-2xl"
                />
                <div className="flex-1 p-4">
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {item.description || 'No description available'}
                  </p>
                  {item.size && (
                    <p className="text-sm text-gray-600 mt-1">
                      Size: <span className="font-medium text-gray-800">{item.size}</span>
                    </p>
                  )}
                  <p className="text-md text-[#5d7afc] font-bold mt-2">{item.price.toFixed(2)}</p>
                </div>
                <button
                  className="px-4 text-red-500 hover:text-red-700"
                  onClick={() => removeItem(index)}
                >
                  <FaTrash className="text-lg" />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          {/* <div className="bg-white rounded-3xl shadow-xl p-6 flex flex-col justify-between sticky top-[80px] h-fit">
            <div>
              <h2 className="text-xl font-bold mb-5 text-gray-900">Order Summary</h2>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (18%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>${DELIVERY_CHARGE.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Coupon Discount</span>
                    <span>− ${(subtotal * discount).toFixed(2)}</span>
                  </div>
                )}
              </div>

              <hr className="my-5 border-gray-300" />

              <div className="flex justify-between font-bold text-xl text-gray-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <input
                type="text"
                placeholder="Enter Coupon Code"
                className="w-full px-4 py-2 border rounded-xl bg-gray-100 border-gray-300 text-gray-900 focus:border-[#5d7afc] focus:ring-2 focus:ring-[#5d7afc]/40 outline-none transition"
                value={coupon}
                onChange={(e) => {
                  setCoupon(e.target.value);
                  setDiscount(0);
                  localStorage.removeItem('coupon');
                }}
              />
              <button
                onClick={applyCoupon}
                className="w-full bg-[#5d7afc] hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition-transform hover:scale-105 shadow-md"
              >
                Apply Coupon
              </button>

              <button
                onClick={handleCheckout}
                className="w-full mt-2 bg-gray-900 hover:bg-gray-700 text-white py-3 rounded-xl font-semibold transition-transform hover:scale-105 shadow-md"
              >
                Proceed to Checkout
              </button>
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
}
