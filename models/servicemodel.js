import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    // New unique ID based on business logic (CL/ED/WU + ID)
    serviceId: {
      type: String,
      required: true,
      unique: true,
    },
    
    // Aligns with the 'category' field in your JSON (e.g., "Cleaning", "Woman Services - Treatment")
    category: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    // Retained from your data structure, representing the service's base rating
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    // --- REMOVED: reviews, workers, and averageRating as they were not in the imported data structure ---
  },
  { timestamps: true }
);

const Service =
  mongoose.models.Service || mongoose.model("Service", serviceSchema);

export default Service;