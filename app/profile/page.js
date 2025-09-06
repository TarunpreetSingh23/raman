'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const router=useRouter();
  const {data:session}=useSession();

  const DELIVERY_CHARGE = 40;
  const TAX_RATE = 0.18;

  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) {
      setCartItems(JSON.parse(saved));
    }
  }, []);
 const handleclick=()=>{
  if(!session){
    router.push("/login");

  }
  else{
    router.push("/checkout");
  }
 }
  const removeItem = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const applyCoupon = () => {
    if (coupon === 'SAVE10') {
      setDiscount(0.1);
    } else {
      setDiscount(0);
      alert('Invalid Coupon');
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + DELIVERY_CHARGE - subtotal * discount;

  return (
    <div className="min-h-screen mt-[65px] bg-[#f3f4f6] py-10 px-4 md:px-20">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">Your cart is empty.</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center bg-white shadow-md rounded-lg overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-cover"
                />
                <div className="flex-1 p-4">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-md text-green-700 font-bold mt-1">${item.price.toFixed(2)}</p>
                </div>
                <button
                  className="text-red-600 px-4 text-sm font-semibold hover:text-red-800"
                  onClick={() => removeItem(index)}
                >
                   Remove
                </button>
              </div>
            ))}
          </div>

         
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax (18%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Delivery Charges</span>
              <span>${DELIVERY_CHARGE.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between mb-2 text-green-600 font-semibold">
                <span>Coupon Discount</span>
                <span>− ${ (subtotal * discount).toFixed(2) }</span>
              </div>
            )}

            <hr className="my-4" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="mt-6">
              <input
                type="text"
                placeholder="Apply Coupon (SAVE10)"
                className="w-full px-4 py-2 border rounded mb-3"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button
                onClick={applyCoupon}
                className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-900"
              >
                Apply Coupon
              </button>
            </div>

           
           <button onClick={()=>{handleclick()}} className="mt-6 w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-900">
              Proceed to Checkout
            </button>
          
          </div>
        </div>
      )}
    </div>
  );
}
