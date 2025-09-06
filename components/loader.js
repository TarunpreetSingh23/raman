"use client";
import React from "react";
import { FaSpinner } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white z-[9999] flex items-center justify-center">
      <FaSpinner className="animate-spin text-orange-500 text-4xl" />
    </div>
  );
};

export default Loader;
