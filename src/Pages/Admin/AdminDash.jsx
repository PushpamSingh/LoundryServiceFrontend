import {
  ShoppingCart,
  Clock,
  Package,
  TrendingUp,
  LogOut,
  SlidersHorizontal,
  IndianRupee,
  Edit,
} from "lucide-react";
import { adminDashService } from "../../API/Admindash.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { authService } from "../../API/User.service";
import { useAuthuser } from "../../Hooks/useAuthuser";
// import { set } from "mongoose";

export function AdminDash() {
  const [orderStatusCount, setOrderStatusCount] = useState({
    totalOrders: 0,
    pending: 0,
    picked: 0,
    washed: 0,
    delivered: 0,
  });
  const [ordersRevenew, setOrdersRevenew] = useState(0);
  const { userData } = useAuthuser();
  const stats = [
    {
      label: "Total orders",
      value: orderStatusCount.totalOrders || 0,
      icon: ShoppingCart,
      bgColor: "bg-teal-100",
      iconColor: "text-teal-500",
    },
    {
      label: "Pending orders",
      value: orderStatusCount.pending || 0,
      icon: Clock,
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-500",
    },
    {
      label: "Picked orders",
      value: orderStatusCount.picked || 0,
      icon: Package,
      bgColor: "bg-green-100",
      iconColor: "text-green-500",
    },
    {
      label: "Revenue",
      value: "₹" + ordersRevenew || "₹" + 0,
      icon: IndianRupee,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-500",
    },
  ];

  const [orders, setOrders] = useState([]);
  // const [statusData, setStatusData] = useState({
  //   orderId: "",
  //   newStatus: "",
  // });
  const [editSchedule, setEditSchedule] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const queryclient = useQueryClient();

  const {
    data: allordersData,
    isLoading: allordersLoading,
    error: allordersError,
  } = useQuery({
    queryKey: ["allorders"],
    queryFn: async () => {
      const response = await adminDashService.GetAllOrders();
      if (response?.data) {
        setOrders(response?.data);
        return response?.data;
      } else {
        return null;
      }
    },
  });

  const { mutate: Logoutmutation, isPending: LogoutPending } = useMutation({
    mutationFn: async () => {
      const response = await authService.LogoutUser();
      return response?.data ? response?.data : null;
    },
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/login")
      toast.success("User Logged Out");
    },
    onError: () => {
      toast.error("Logout Mutation failed");
      queryclient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });
  const {
    mutate: UpdateStatusMutation,
    isPending: statusPending,
    // error: statusError,
  } = useMutation({
    mutationFn: async ({ orderId, newStatus }) => {
      const response = await adminDashService.UpdateStatus({
        orderId,
        newStatus,
      });
      return response?.data ? response?.data : null;
    },
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["allorders"] });
      queryclient.invalidateQueries({ queryKey: ["totalorderstatuscount"] });
      queryclient.invalidateQueries({
        queryKey: ["usertotalorderstatuscount"],
      });
      queryclient.invalidateQueries({ queryKey: ["userallorders"] });
      queryclient.invalidateQueries({ queryKey: ["userpaymenthistory"] });
      queryclient.invalidateQueries({ queryKey: ["trackedorder"] });

      toast.success("Order status updated successfully");
    },
    onError: (error) => {
      toast.error(`Status Mutation failed: ${error.message}`);
    },
  });
  const handleStatusMutate = (newStatus, orderId) => {
    // const newStatus = e.target.value;
    UpdateStatusMutation({ orderId, newStatus });
  };

  const [toastId, setToastId] = useState(null);
  useEffect(() => {
    if (statusPending) {
      const toastIds = toast.loading("Saving Status....");
      setToastId(toastIds);
    } else {
      toast.dismiss(toastId);
    }
  }, [statusPending]);

  const { _ } = useQuery({
    queryKey: ["totalorderstatuscount"],
    queryFn: async () => {
      const response = await adminDashService.TotalorderStatusCountandRevenue();
      if (response?.data) {
        setOrderStatusCount(response?.data?.StatusCount);
        setOrdersRevenew(response?.data?.totalRevenue);
        return response?.data;
      } else {
        setOrderStatusCount({
          totalOrders: 0,
          pending: 0,
          picked: 0,
          washed: 0,
          delivered: 0,
        });
        return null;
      }
    },
  });
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">
              Admin Dashboard
            </h1>
            <button
              className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors"
              onClick={() => Logoutmutation()}
            >
              {LogoutPending ? (
                <span className="loading loading-spinner size-6"></span>
              ) : (
                <>
                  <LogOut size={20} />
                  <span className="font-medium">LogOut</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Profile and Stats Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Profile Avatar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 flex justify-center items-center h-full">
              <div className="w-48 h-48 rounded-full bg-gray-200 overflow-hidden shadow-xl">
                <img
                  src={`${userData.avatar}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm text-gray-500 mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.bgColor} rounded-full p-4`}>
                  <stat.icon className={`${stat.iconColor}`} size={28} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal size={20} className="text-gray-700" />
            <h2 className="text-lg font-semibold text-gray-800">
              Filter orders
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              className="px-5 py-2 bg-teal-500 text-white rounded-full font-medium hover:bg-teal-600 transition-colors"
              onClick={() => {
                setOrders(allordersData || []);
                queryclient.invalidateQueries({ queryKey: ["allorders"] });
              }}
            >
              All Orders ({orderStatusCount.totalOrders})
            </button>
            <button
              className="px-5 py-2 bg-white border-2 border-yellow-500 text-yellow-500 rounded-full font-medium hover:bg-yellow-50 transition-colors"
              onClick={() => {
                // always filter from the fresh allordersData source (avoid mutating prev and missing return)
                setOrders((prev) =>
                  (allordersData || []).filter(
                    (order) => order?.status === "pending"
                  )
                );
              }}
            >
              Pending ({orderStatusCount.pending})
            </button>
            <button
              className="px-5 py-2 bg-white border-2 border-green-500 text-green-500 rounded-full font-medium hover:bg-green-50 transition-colors"
              onClick={() => {
                setOrders((prev) =>
                  (allordersData || []).filter(
                    (order) => order?.status === "picked"
                  )
                );
              }}
            >
              Picked ({orderStatusCount.picked})
            </button>
            <button
              className="px-5 py-2 bg-white border-2 border-green-500 text-green-500 rounded-full font-medium hover:bg-green-50 transition-colors"
              onClick={() => {
                setOrders((prev) =>
                  (allordersData || []).filter(
                    (order) => order?.status === "washed"
                  )
                );
              }}
            >
              Washed ({orderStatusCount.washed})
            </button>
            <button
              className="px-5 py-2 bg-white border-2 border-blue-500 text-blue-500 rounded-full font-medium hover:bg-blue-50 transition-colors"
              onClick={() => {
                setOrders((prev) =>
                  (allordersData || []).filter(
                    (order) => order?.status === "delivered"
                  )
                );
              }}
            >
              Delivered ({orderStatusCount.delivered})
            </button>
            <button
              className="px-5 py-2 bg-white border-2 border-gray-800 text-gray-800 rounded-full font-medium hover:bg-gray-50 transition-colors"
              onClick={() => {
                // set local payment history from query result
                setPaymentHistory(paymentHistoryData || []);
                queryclient.invalidateQueries({ queryKey: ["paymenthistory"] });
              }}
            >
              Payment History
            </button>
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allordersLoading ? (
            <span className="loading loading-spinner size-6 text-center"></span>
          ) : allordersError ? (
            <p className="text-center text-3xl text-red-700">
              Error loading orders: {allordersError.message}
            </p>
          ) : orders?.length === 0 ? (
            <p className="text-3xl text-center text-gray-900">
              No orders found.
            </p>
          ) : (
            orders?.map((order, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              >
                {/* Order Header */}
                <div
                  className={`${
                    order?.status === "pending"
                      ? "bg-yellow-500"
                      : order?.status === "picked"
                      ? "bg-green-500"
                      : order?.status === "washed"
                      ? "bg-green-500"
                      : order?.status === "delivered"
                      ? "bg-blue-500"
                      : "bg-gray-500"
                  } px-4 py-3 flex justify-between items-center`}
                >
                  <div>
                    <p className="text-white text-sm font-medium">
                      Order: {order?.orderId}
                    </p>
                    <p className="text-white text-xs opacity-90">
                      Created on {order?.createdAt}
                    </p>
                  </div>
                  <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-gray-800">
                    {order?.status}
                  </span>
                </div>

                {/* Order Body */}
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* Customer Information */}
                    <div>
                      <h3 className="text-xs font-bold text-gray-800 mb-2">
                        Customer Information
                      </h3>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-gray-500">Name:</p>
                          <p className="text-xs font-medium text-gray-800">
                            {order?.name}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-gray-500">Phone:</p>
                          <p className="text-xs font-medium text-gray-800">
                            {order?.phone}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div>
                      <h3 className="text-xs font-bold text-gray-800 mb-2">
                        Order Details
                      </h3>
                      <div className="space-y-1">
                        <div className="flex justify-center gap-2">
                          <p className="text-xs text-gray-500">Items:</p>
                          <p className="text-xs font-medium text-gray-800">
                            {Object.entries(order?.items?.[0]?.totalitem || {})
                              .filter(([k, v]) => v > 0)
                              .map(([k, v]) => `${k}: ${v}`)
                              .join(", ")}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-gray-500">Payment:</p>
                          <p
                            className={`text-xs font-medium ${
                              order?.paymentmethod == "Pending"
                                ? "text-red-600"
                                : order[0]?.paymentmethod == "COD"
                                ? "text-yellow-600"
                                : "text-green-600"
                            } flex items-center gap-1`}
                          >
                            {order?.paymentmethod}
                            {order?.paymentmethod === "Online" && (
                              <span className="text-green-500">✓</span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pickup Information */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-50 rounded-lg p-2">
                      <p className="text-xs text-gray-500 mb-1">Pickup Date</p>
                      <input
                        type="date"
                        readOnly={!editSchedule}
                        value={order?.pickupTime?.split("T")[0]}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="text-xs font-bold text-gray-800"
                      />
                    </div>
                    <div className="bg-blue-50 rounded-lg p-2">
                      <p className="text-xs text-gray-500 mb-1">
                        Delivery Date
                      </p>
                      <input
                        type={!editSchedule ? "text" : "date"}
                        readOnly={!editSchedule}
                        value={order?.pickupTime?.split("T")[0]}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="text-xs font-bold text-gray-800"
                      />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-center gap-6">
                    <div className="flex justify-between items-center gap-2 px-3 py-1 border-2 border-gray-800 rounded-full w-full">
                      <span className="text-xs font-medium text-gray-800">
                        Total Amount
                      </span>
                      <span className="text-sm font-bold text-gray-800">
                        ₹{order?.items?.[0]?.totalprice}
                      </span>
                    </div>

                    <div>
                      {!editSchedule ? (
                        <button
                          className="bg-blue-900 flex items-center gap-2 px-3 py-1 rounded-lg"
                          onClick={() => setEditSchedule(true)}
                        >
                          <span className="text-xs font-bold">
                            Edit schedule
                          </span>
                          <Edit className="size-4 text-white" />
                        </button>
                      ) : (
                        <button
                          className="bg-green-900 flex items-center gap-2 px-3 py-1 rounded-lg"
                          onClick={() => setEditSchedule(false)}
                        >
                          <span className="text-xs font-bold">
                            Save schedule
                          </span>
                        </button>
                      )}
                    </div>

                    <select
                      value={order?.status}
                      className="border-2 border-[#0D9488] flex items-center gap-2 px-3 py-1 rounded-lg text-[#1F2937] outline-none"
                      onChange={(e) =>
                        handleStatusMutate(e.target.value, order?._id)
                      }
                    >
                      <option value="pending">pending</option>
                      <option value="picked">picked</option>
                      <option value="washed">washed</option>
                      <option value="delivered">delivered</option>
                    </select>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
