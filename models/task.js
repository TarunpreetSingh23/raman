import mongoose from "mongoose";
// import Worker from "./workermodel.js"; // 👈 make sure you have a worker 
import Worker from "@/models/Worker";

const TaskSchema = new mongoose.Schema({
  order_id: {
    type: String,
    unique: true,
  },
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true },

  cart: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, default: 1 },
      category: { type: String, required: true },
    },
  ],

  subtotal: { type: Number, required: true },
  discount: { type: Number, required: true },
  total: { type: Number, required: true },
  paymentMethod: { type: String, default: "Pay After Service" },
  date: { type: String, required: true },
  timeSlot: { type: String, required: true },

  // 🔑 Worker responses
  assignedWorkers: [
    {
      workerId: { type: String, required: true },
      status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
      },
    },
  ],

  // 🔑 Order states
  is_approved: { type: Boolean, default: false },
  is_rejected: { type: Boolean, default: false },
  is_completed: { type: Boolean, default: false },
  is_canceled: { type: Boolean, default: false },

  status: { type: String, default: "Waiting for approval" },
  createdAt: { type: Date, default: Date.now },
});

// 🔥 Generate order_id + assign workers before saving
TaskSchema.pre("save", async function (next) {
  if (!this.order_id) {
    let prefix="OR";
     const category = this.cart?.[0]?.category?.toLowerCase()?.trim();

   console.log(category);
         if (category?.includes("woman")) prefix = "MU";
    else if (category?.includes("event")) prefix = "ED";
    else if (category?.includes("Clean")) prefix = "CL";

    

    this.order_id = `${prefix}${Math.floor(1000 + Math.random() * 9000)}`;

    // ✅ Auto-assign workers whose IDs start with same prefix
    const workers = await Worker.find({ workerId: new RegExp(`^${prefix}`) });

    this.assignedWorkers = workers.map((w) => ({
      workerId: w.workerId,
      status: "pending",
    }));
  }

  next();
});

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
