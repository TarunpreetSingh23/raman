'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

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
      setMessage('Coupon Applied!');
    } else {
      setDiscount(0);
      localStorage.removeItem('coupon');
      setMessage('Invalid Coupon');
    }
    setTimeout(() => setMessage(''), 3000);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + DELIVERY_CHARGE - subtotal * discount;

  return (
    <div className="min-h-screen mt-[65px] bg-gray-100 py-10 px-4 md:px-20">
      <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-10">🛒 Your Cart</h1>

      {message && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white font-semibold transition-opacity duration-300 ${message === 'Invalid Coupon' ? 'bg-red-500' : 'bg-[#5d7afc]'}`}>
          {message}
        </div>
      )}

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">Your cart is empty.</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-6">
            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center bg-white shadow-lg rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-300">
                <img
                  src={item.image || '/placeholder.png'}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-l-2xl"
                />
                <div className="flex-1 p-4">
                  <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.description || 'No description'}</p>
                  {item.size && (
                    <p className="text-sm text-gray-500 mt-1">
                      Size: <span className="font-semibold text-gray-800">{item.size}</span>
                    </p>
                  )}
                  <p className="text-md text-[#5d7afc] font-bold mt-1">${item.price.toFixed(2)}</p>
                </div>
                <button
                  className="px-4 text-sm font-semibold text-red-600 hover:text-red-800"
                  onClick={() => removeItem(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold mb-4 text-gray-900">Order Summary</h2>
              <div className="flex justify-between mb-2 text-gray-700">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2 text-gray-700">
                <span>Tax (18%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2 text-gray-700">
                <span>Delivery</span>
                <span>${DELIVERY_CHARGE.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between mb-2 text-green-600 font-semibold">
                  <span>Coupon Discount</span>
                  <span>− ${(subtotal * discount).toFixed(2)}</span>
                </div>
              )}
              <hr className="my-4 border-gray-300" />
              <div className="flex justify-between font-bold text-lg text-gray-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <input
                type="text"
                placeholder="Apply Coupon"
                className="w-full px-4 py-2 border rounded-xl bg-gray-100 border-gray-300 text-gray-900 focus:border-[#5d7afc] focus:ring-2 focus:ring-[#5d7afc]/30 outline-none"
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
          </div>
        </div>
      )}
    </div>
  );
}
