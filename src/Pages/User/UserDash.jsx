import {
  ShoppingCart,
  Clock,
  Package,
  TrendingUp,
  LogOut,
  SlidersHorizontal,
} from "lucide-react";
import { userDashService } from "../../API/UserDash.service";
// import { authService } from "../../API/Auth.service"; // <-- added (you had used authService but didn't import)
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthuser } from "../../Hooks/useAuthuser";
import { useState } from "react";
import { authService } from "../../API/User.service";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
// import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

// import { toast } from "sonner"; // <-- added because you call toast

export function UserDash() {
  const [open, setOpen] = useState(false)
  const [orderStatusCount, setOrderStatusCount] = useState({
    totalOrders: 0,
    pending: 0,
    picked: 0,
    washed: 0,
    delivered: 0,
  });

  const queryclient = useQueryClient();
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [orders, setOrders] = useState([]);
  const { userData } = useAuthuser();

  const {
    data: paymentHistoryData,
    isLoading: paymentHistoryLoading,
    error: paymentHistoryError,
  } = useQuery({
    queryKey: ["userpaymenthistory"],
    queryFn: async () => {
      const response = await userDashService.PaymentHistory();
      if (response?.data) {
        return response?.data;
      } else {
        return null;
      }
    },
  });

  const {
    data: allordersData,
    isLoading: allordersLoading,
    error: allordersError,
  } = useQuery({
    queryKey: ["userallorders"],
    queryFn: async () => {
      const response = await userDashService.AllOrders();
      if (response?.data) {
        // keep storing in local state so UI stays the same
        setOrders((prev)=>{
          return (response?.data || []).filter(order=>order?.status!=="canceled");
        });
        return response?.data;
      } else {
        return null;
      }
    },
  });

  const stats = [
    {
      label: "Total orders",
      value: orderStatusCount?.totalOrders || 0,
      icon: ShoppingCart,
      bgColor: "bg-teal-100",
      iconColor: "text-teal-500",
    },
    {
      label: "Pending orders",
      value: orderStatusCount?.pending || 0,
      icon: Clock,
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-500",
    },
    {
      label: "Picked orders",
      value: orderStatusCount?.picked || 0,
      icon: Package,
      bgColor: "bg-green-100",
      iconColor: "text-green-500",
    },
    {
      label: "Completed",
      value: orderStatusCount?.delivered || 0,
      icon: TrendingUp,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-500",
    },
  ];

  // fetch total order status count and update local state
  useQuery({
    queryKey: ["usertotalorderstatuscount"],
    queryFn: async () => {
      const response = await userDashService.TotalorderStatusCount();
      if (response?.data) {
        setOrderStatusCount(response?.data);
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

  // logout mutation — changed isPending -> isLoading (react-query uses isLoading)
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
    onError: (error) => {
      toast.error(`Logout Mutation failed:${error.message}`);
      queryclient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">
              {userData?.fullName}'s Dashboard
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
                  src={`${userData?.avatar}`}
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
                // reset to all orders returned by the query
                setOrders((prev)=>{
                  return (allordersData || []).filter((order)=>order?.status!=="canceled")
                });
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
              Error loading orders: {allordersError?.message}
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
                              order?.paymentmethod === "Pending"
                                ? "text-red-600"
                                : order?.paymentmethod === "COD"
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
                      <p className="text-xs font-bold text-gray-800">
                        {order?.pickupTime}
                      </p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-2">
                      <p className="text-xs text-gray-500 mb-1">
                        Delivery Date
                      </p>
                      <p className="text-xs font-bold text-gray-800">
                        {order?.deliveryTime}
                      </p>
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
                    {order?.status === "pending" && (
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-full transition-colors"
                        onClick={()=>{setOpen(true)}}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                    {/* <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" /> */}
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                      Deactivate account
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to deactivate your account? All of your data will be permanently removed.
                        This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Deactivate
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
    </div>
  );
}
