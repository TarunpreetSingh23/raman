import { connects } from "@/dbconfig/dbconfig";
import Task from "@/models/task";
import Worker from "@/models/Worker";

export async function POST(req) {
  try {
    await connects();

    const {
      customerName,
      email,
      phone,
      address,
      pincode,
      cart,
      subtotal,
      discount,
      total,
      date,
      timeSlot,
      paymentMethod,
    } = await req.json();

    if (
      !customerName ||
      !email ||
      !phone ||
      !address ||
      !date ||
      !timeSlot ||
      !cart?.length
    ) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400 }
      );
    }

    // ✅ detect category prefix
    const category = cart[0].category?.toLowerCase();
    let prefix = "OR";
    if (category === "makeup") prefix = "MU";
    else if (category === "decor") prefix = "ED";
    else if (category === "cleaning") prefix = "CL";

    // ✅ find workers dynamically in DB
    const workers = await Worker.find({ workerId: new RegExp(`^${prefix}`) });

    // ✅ build assignedWorkers array
    const assignedWorkers = workers.map((w) => ({
      workerId: w.workerId,
      status: "pending",
    }));

    // ✅ create task with assigned workers
    const task = await Task.create({
      customerName,
      email,
      phone,
      address,
      pincode,
      cart,
      subtotal,
      discount,
      total,
      date,
      timeSlot,
      paymentMethod: paymentMethod || "Pay After Service",
      assignedWorkers,
    });

    return new Response(
      JSON.stringify({ success: true, orderId: task.order_id, task }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Error creating task:", err);
    return new Response(
      JSON.stringify({ success: false, message: "Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
