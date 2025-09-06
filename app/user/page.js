"use client";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaRegUser } from "react-icons/fa6";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);

  // ✅ Load cart from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  // ✅ Redirect if not logged in
  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/register");
  //   }
  // }, [status, router]);

  // ✅ Fetch user tasks once session is available
  useEffect(() => {
    if (session?.user?.email) {
      fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session.user.email }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && Array.isArray(data.tasks)) {
            setTasks(data.tasks);
          } else {
            setTasks([]);
          }
        })
        .catch(() => setTasks([]))
        .finally(() => setLoadingTasks(false));
    }
  }, [session]);

  // ✅ Handle task cancel
  const handleCancel = async (orderId) => {
    const task = tasks.find((t) => t.order_id === orderId);
    if (task?.is_completed || task?.is_approved) {
      alert("This task has been approved or completed and cannot be cancelled.");
      return;
    }

    if (!confirm("Are you sure you want to cancel this task/order?")) return;

    try {
      const res = await fetch("/api/tasks/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Order cancelled successfully.");
        setTasks((prev) =>
          prev.map((t) =>
            t.order_id === orderId ? { ...t, is_canceled: true, status: "Cancelled" } : t
          )
        );
      } else {
        alert(data.message || "Failed to cancel order.");
      }
    } catch {
      alert("Something went wrong.");
    }
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  if (status === "loading") return <p className="p-6">Loading...</p>;
  if (!session) return null; // temporary while redirect happens

  return (
    <div className="max-w-6xl mx-auto mt-[70px] p-6 space-y-10 text-gray-800">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">👤 My Profile</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white p-6 shadow-lg rounded-2xl flex flex-col sm:flex-row items-center gap-6">
        <div className="bg-blue-100 p-4 rounded-full">
          <FaRegUser className="w-10 h-10 text-blue-500" />
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-semibold">{session?.user?.name}</h2>
          <p className="text-gray-600">{session?.user?.email}</p>
        </div>
      </div>

      {/* Orders */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h3 className="text-xl font-semibold mb-4">📦 My Orders</h3>
        {loadingTasks ? (
          <p className="text-gray-500">Loading your orders...</p>
        ) : tasks.length === 0 ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          <ul className="space-y-6">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="p-4 border rounded-xl hover:shadow-md transition"
              >
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div>
                    <p className="font-medium">
                      <span className="text-gray-500">Order ID:</span> {task.order_id}
                    </p>
                    <p className="text-sm text-gray-500">
                      Date: {new Date(task.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm">
                      Total:{" "}
                      <span className="text-blue-600 font-semibold">₹{task.total}</span>
                    </p>
                    <p className="text-sm">
                      Status:{" "}
                      <span
                        className={`font-semibold ${
                          task.is_completed
                            ? "text-green-600"
                            : task.is_approved
                            ? "text-blue-600"
                            : task.is_canceled
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {task.status}
                      </span>
                    </p>
                  </div>

                  {!task.is_completed &&
                    !task.is_canceled &&
                    task.status !== "Accepted" &&
                    task.status !== "Rejected" && (
                      <button
                        onClick={() => handleCancel(task.order_id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded"
                      >
                        Cancel
                      </button>
                    )}
                </div>

                <div className="mt-3">
                  <h4 className="font-semibold text-sm mb-1">Items:</h4>
                  <ul className="grid sm:grid-cols-2 gap-2 text-sm">
                    {task.cart.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex justify-between items-center border-b py-1"
                      >
                        <span>{item.name}</span>
                        <span className="text-gray-600">₹{item.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-2 text-sm text-gray-700">
                  <p>
                    <span className="font-medium">Scheduled:</span> {task.date} |{" "}
                    {task.timeSlot}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span> {task.phone}
                  </p>
                  <p>
                    <span className="font-medium">Address:</span> {task.address}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
