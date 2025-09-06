"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";


// Dummy data (you can fetch from DB later)
const categories = [
  { id: 1, name: "Waxing", image: "/waxing.jpg" },
  { id: 2, name: "Cleanup", image: "/cleanup.jpg" },
  { id: 3, name: "Manicure", image: "/manicure.jpg" },
  { id: 4, name: "Hair care", image: "/haircare.jpg" },
   { id: 3, name: "Manicure", image: "/manicure.jpg" },
  { id: 4, name: "Hair care", image: "/haircare.jpg" },
   { id: 3, name: "Manicure", image: "/manicure.jpg" },
  { id: 4, name: "Hair care", image: "/haircare.jpg" },
];
const cleaningCategories = [
  {
    id: 1,
    name: "Home Cleaning",
    image: "/images/cleaning-home.jpg",
  },
  {
    id: 2,
    name: "Office Cleaning",
    image: "/images/cleaning-office.jpg",
  },
  {
    id: 3,
    name: "Carpet Cleaning",
    image: "/images/cleaning-carpet.jpg",
  },
  {
    id: 4,
    name: "Window Cleaning",
    image: "/images/cleaning-window.jpg",
  },
];

export default function ServicesPage() {
  // const [selectedCategory, setSelectedCategory] = useState("All");
  // const [cart, setCart] = useState([]);

  // // Filtered services
  // const filteredServices =
  //   selectedCategory === "All"
  //     ? services
  //     : services.filter((s) => s.category === selectedCategory);

  // const addToCart = (service) => {
  //   setCart((prev) => [...prev, service]);
  // };

  return (
    <>
   
     <div className="relative max-w-7xl mt-[67px] mx-auto px-4 py-12">
         {/* Background Glow */}
         {/* <div className="absolute -z-10 top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/20 via-pink-400/20 to-orange-300/20 blur-3xl rounded-full opacity-70 animate-pulse"></div> */}
   
         {/* Title */}
         <div className="text-center flex-row">
   
         <h1 className="text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-[#5d7afc]  drop-shadow-lg">
            Salon for Women 
         </h1>
         
         </div>
         
         <p className="text-center text-gray-500 mt-3 text-lg">
           Pick a category & step into luxury 💖
         </p>
   
         {/* Grid */}
         <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           {categories.map((cat) => (
             <div
               // key={cat.id }
               className="group relative bg-white/30 backdrop-blur-xl rounded-3xl shadow-xl 
                          border border-white/20 overflow-hidden 
                          hover:scale-105 hover:shadow-2xl transition-all duration-500 ease-out cursor-pointer"
             >
               {/* Glow Border Effect */}
               {/* <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 opacity-0 group-hover:opacity-100 blur-lg transition duration-500"></div> */}
   
               {/* Image */}
               <div className="relative w-full h-56 overflow-hidden rounded-t-3xl">
                 <Image
                   src={cat.image}
                   alt={cat.name}
                   width={500}
                   height={400}
                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                 />
               </div>
   
               {/* Floating Badge */}
               {/* <div className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                 NEW
               </div> */}
   
               {/* Text Section */}
               <div className="p-6 text-center relative z-10">
                 <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-700 transition">
                   {cat.name}
                 </h3>
                 <p className="text-sm text-gray-500 mt-2">
                   Experience world-class {cat.name.toLowerCase()}
                 </p>
                 <Link href={"/facial"}>
                 <button
                   className="mt-4 px-5 py-2 rounded-xl bg-[#5d7afc] 
                              text-white font-medium shadow-lg hover:shadow-2xl 
                              hover:from-purple-700 hover:to-pink-600 
                              transition-all duration-300"
                 >
                   Explore →
                 </button>
                 </Link>
               </div>
             </div>
           ))}
         </div>
       </div>
        <div className="relative max-w-7xl mx-auto px-4 py-12">
         {/* Title */}
         <div className="text-center flex-row">
           <h1 className="text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-[#5d7afc] drop-shadow-lg">
             Cleaning Services
           </h1>
         </div>
   
         <p className="text-center text-gray-500 mt-3 text-lg">
           Pick a service & make your space shine ✨
         </p>
   
         {/* Grid */}
         <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           {cleaningCategories.map((cat) => (
             <div
               key={cat.id}
               className="group relative bg-white/30 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-500 ease-out cursor-pointer"
             >
               {/* Image */}
               <div className="relative w-full h-56 overflow-hidden rounded-t-3xl">
                 <Image
                   src={cat.image}
                   alt={cat.name}
                   width={500}
                   height={400}
                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                 />
               </div>
   
               {/* Text Section */}
               <div className="p-6 text-center relative z-10">
                 <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#5d7afc] transition">
                   {cat.name}
                 </h3>
                 <p className="text-sm text-gray-500 mt-2">
                   Professional {cat.name.toLowerCase()} for spotless results
                 </p>
                 <Link href={"/clean"}>
                   <button className="mt-4 px-5 py-2 rounded-xl bg-[#5d7afc] text-white font-medium shadow-lg hover:shadow-2xl transition-all duration-300">
                     Explore →
                   </button>
                 </Link>
               </div>
             </div>
           ))}
         </div>
       </div>
        </>
  );
}
