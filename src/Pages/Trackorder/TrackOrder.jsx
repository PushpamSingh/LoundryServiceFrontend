import { Search } from "lucide-react";
import { orderService } from "../../API/Order.service";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { usePayment } from "../../store/usePayment";
import { useAuthuser } from "../../Hooks/useAuthuser";
import { adminDashService } from "../../API/Admindash.service";
// import { is } from "zod/v4/locales";

export const TrackOrder = () => {
  const {paymentpage,handlePaymentpage}=usePayment()
  const {userData}=useAuthuser()
  const [orderId, setOrderId] = useState({
    orderId: "",
  });
  const navigate = useNavigate();
  const [triggerSearch, setTriggerSearch] = useState(false);
     const {
    data: orderData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trackedorder"],
    queryFn: async () => {
      let response;
      if(userData?.role==="admin"){
        response = await adminDashService.trackOrderById( orderId );
      }else{
         response = await orderService.TrackOrder( orderId );
      }
      if (response?.data) {
        return response?.data;
      } else {
        return null;
      }
    },
    enabled: triggerSearch && !!orderId,
    retry: false,
  });
const handletrackorder=()=>{
    setTriggerSearch(true)
}
  // console.log("orderData :: ", orderId);
  return (
    <div className="px-2 sm:px-4 py-3 sm:py-6">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 sm:gap-8 lg:gap-10">
        {/* Search Section */}
        <div className="bg-[#0D9488] w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex justify-center items-center rounded-full mx-auto">
          <img
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
            src="/searchlogo.png"
            alt="search logo"
          />
        </div>

        <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5 text-center px-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#1F2937]">
            Track Your Order
          </h1>
          <p className="text-[#1f29379e] font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            Enter your order ID to check the status
          </p>
        </div>
        {error && (
          <div className="text-red-500 text-sm font-medium text-center">
            {error.message}
          </div>
        )}
        {/* Input Section */}
        <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto px-4 relative">
          <div className="flex md:flex-row flex-col bg-white rounded-2xl border-2 border-[#0D9488] overflow-hidden">
            <div className="flex-1">
              <label className="text-[#0D9488] absolute -top-2 left-10 bg-white px-2 text-sm font-medium">
                Order ID
              </label>
              <input
                type="text"
                name="orderid"
                placeholder="e.g. ORD-001 or 9876543210"
                required
                value={orderId.orderId}
                onChange={(e) => {
                  setOrderId({...orderId,orderId:e.target.value})
                  setTriggerSearch(false)
              }}
                className="text-[#1F2937] w-full outline-none px-4 pt-5 pb-3 text-base border-0 focus:ring-0 bg-transparent"
              />
            </div>
            <button className="bg-[#0D9488] hover:bg-[#0f766e] transition-colors duration-200 flex items-center justify-center gap-2 px-6 py-3 text-white font-medium text-base"
            onClick={()=>handletrackorder()}
            >
              {isLoading ? (
                <span className="loading loading-spinner size-6"></span>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>Track Order</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Order Details Card */}
        <div className="w-full px-4">
          <div className="bg-white w-full max-w-5xl mx-auto rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-teal-600 text-white rounded-lg p-4 sm:p-6 mb-6 gap-3 sm:gap-0">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold">
                  Order{" "}
                  <span className="font-bold">{orderData?.order?.orderId}</span>
                </h2>
                <p className="text-sm sm:text-base opacity-90">
                  Placed on {orderData?.order?.createdAt}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-white/20 px-3 py-1 rounded-md text-xs sm:text-sm font-medium">
                  {orderData?.order?.status}
                </span>
              </div>
            </div>

            {/* Main Content */}
            {isLoading ? (
              <div className="flex justify-center items-center py-10">
                <span className="loading loading-spinner size-8"></span>
              </div>
            ) : orderData ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Customer Info */}
                <div className="text-[#1F2937] space-y-4">
                  <h3 className="font-bold text-lg sm:text-xl mb-4 text-[#1F2937] border-b border-gray-200 pb-2">
                    Customer Information
                  </h3>
                  <div className="space-y-2">
                    <p className="flex flex-col sm:flex-row sm:gap-2">
                      <span className="font-semibold text-sm sm:text-base">
                        Name:
                      </span>
                      <span className="text-sm sm:text-base">
                        {orderData?.order?.name}
                      </span>
                    </p>
                    <p className="flex flex-col sm:flex-row sm:gap-2">
                      <span className="font-semibold text-sm sm:text-base">
                        Phone:
                      </span>
                      <span className="text-sm sm:text-base">
                        +91 {orderData?.order?.phone}
                      </span>
                    </p>
                    <p className="flex flex-col sm:flex-row sm:gap-2">
                      <span className="font-semibold text-sm sm:text-base">
                        Address:
                      </span>
                      <span className="text-sm sm:text-base">
                        {orderData?.order?.housenumber} {orderData?.order?.area}
                        , {orderData?.order?.city}, {orderData?.order?.state}{" "}
                        {orderData?.order?.pincode}, {orderData?.order?.nearby}
                      </span>
                    </p>
                  </div>

                  {/* Order Progress */}
                  <h3 className="font-bold text-lg sm:text-xl mt-6 mb-4 text-[#1F2937] border-b border-gray-200 pb-2">
                    Order Progress
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        stage: "Picked Up",
                        done: orderData?.order?.status === "picked" || orderData?.order?.status === "washed" || orderData?.order?.status === "delivered",
                        desc: "Items collected from your location",
                      },
                      {
                        stage: "Washed",
                        done: orderData?.order?.status === "washed" || orderData?.order?.status === "delivered",
                        desc: "Items received and ready to be washed",
                      },
                      {
                        stage: "Packed",
                        done: orderData?.order?.status === "washed" || orderData?.order?.status === "delivered",
                        desc: "Items washed, ready to deliver",
                      },
                      {
                        stage: "Delivered",
                        done: orderData?.order?.status === "delivered",
                        desc: "Items delivered at your location",
                      },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div
                          className={`w-6 h-6 sm:w-7 sm:h-7 flex justify-center items-center border-2 rounded-full text-xs sm:text-sm flex-shrink-0 mt-0.5 ${
                            item.done
                              ? "border-teal-600 bg-teal-600 text-white"
                              : "border-gray-300"
                          }`}
                        >
                          {item.done && "✔"}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800 text-sm sm:text-base">
                            {item.stage}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-500 mt-1">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Details */}
                <div className="text-[#1F2937] space-y-4">
                  <h3 className="font-bold text-lg sm:text-xl mb-4 text-[#1F2937] border-b border-gray-200 pb-2">
                    Order Details
                  </h3>
                  <div className="space-y-2">
                    <p className="flex flex-col sm:flex-row sm:gap-2">
                      <span className="font-semibold text-sm sm:text-base">
                        Items:
                      </span>
                      <span className="text-sm sm:text-base">
                        {/* {orderData?.orderitemDetails?.totalitem} */}
                        {Object.entries(orderData?.orderitemDetails?.totalitem || {})
                              .filter(([k, v]) => v > 0)
                              .map(([k, v]) => `${k}: ${v}`)
                              .join(", ")}
                      </span>
                    </p>
                    <p className="flex flex-col sm:flex-row sm:gap-2">
                      <span className="font-semibold text-sm sm:text-base">
                        Quantity:
                      </span>
                      <span className="text-sm sm:text-base">
                        {orderData?.totalitemcount}
                      </span>
                    </p>
                    <p className="flex flex-col sm:flex-row sm:gap-2">
                      <span className="font-semibold text-sm sm:text-base">
                        Total:
                      </span>
                      <span className="text-sm sm:text-base">
                        ₹{orderData?.orderitemDetails?.totalprice}
                      </span>
                    </p>
                    <p className="flex flex-row items-center sm:flex-row sm:gap-2">
                      <span className="font-semibold text-sm sm:text-base">
                        Payment:
                      </span>
                      {orderData?.order?.paymentmethod === "COD" ? (
                        <div className="flex gap-2 items-center justify-center">
                          <span className="text-sm sm:text-base">
                            Cash on Delivery 💵
                          </span>
                          <button
                            className="btn btn-accent px-3 rounded-xl cursor-pointer"
                            onClick={() =>{
                              handlePaymentpage()
                              navigate(`/placeorder/payment/${orderData?.order?._id}`)
                            }}
                          >
                            Pay
                          </button>
                        </div>
                      ) : (
                        <span className="text-green-600 font-semibold text-sm sm:text-base">
                          Completed ✅
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Schedule */}
                  <h3 className="font-bold text-lg sm:text-xl mt-6 mb-4 text-gray-800 border-b border-gray-200 pb-2">
                    Schedule
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-blue-50 border border-blue-200 px-3 sm:px-4 py-3 rounded-lg">
                      <p className="font-semibold text-blue-700 text-sm sm:text-base">
                        Pickup Date
                      </p>
                      <p className="text-gray-800 text-sm sm:text-base mt-1">
                        {orderData?.order?.pickupTime}
                      </p>
                    </div>
                    <div className="bg-green-50 border border-green-200 px-3 sm:px-4 py-3 rounded-lg">
                      <p className="font-semibold text-green-700 text-sm sm:text-base">
                        Delivery Date
                      </p>
                      <p className="text-gray-800 text-sm sm:text-base mt-1">
                        {orderData?.order?.deliveryTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-600 py-10">
                No order found with the provided Order ID.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
