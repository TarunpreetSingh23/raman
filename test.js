// seed.js
import mongoose from "mongoose";
// import Service from "./models/servicemodel.js"; // adjust path if needed
import Service from "./models/servicemodel.js";
// import { connects } from "./dbconfig/dbconfig.js";
import { connects } from "./dbconfig/dbconfig.js";


const seedServices = [
  {
    category: "Repair",
    title: "AC Repair",
    description: "Fast & reliable AC repair service with certified technicians.",
    price: 1499,
  },
  {
    category: "Electrical",
    title: "Electrical Work",
    description: "Safe installations & electrical repairs for home and office.",
    price: 999,
  },
  {
    category: "Cleaning",
    title: "Home Cleaning",
    description: "Deep home cleaning with eco-friendly products.",
    price: 1999,
  },
  {
    category: "Decor",
    title: "Wedding Decor",
    description: "Elegant & modern wedding decoration services.",
    price: 25000,
  },
  {
    category: "Makeup",
    title: "Bridal Makeup",
    description: "Premium bridal makeup for a radiant look on your big day.",
    price: 15000,
  },
];

async function seedDB() {
  await connects();
  await Service.deleteMany(); // clear old data (optional)
  await Service.insertMany(seedServices);
  console.log("✅ Sample services inserted");
  mongoose.connection.close();
}

seedDB();
