import {
  ShoppingCart,
  Clock,
  Package,
  TrendingUp,
  LogOut,
  SlidersHorizontal,
} from "lucide-react";
import { userDashService } from "../../API/UserDash.service";
import { useQueryClient } from "@tanstack/react-query";

export function UserDash() {
  const [orderStatusCount, setOrderStatusCount] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    pickedOrders: 0,
    washedOrders: 0,
    deliveredOrders: 0,
    paymentHistory: 0,
  });
  const queryclient= useQueryClient()
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [orders, setOrders] = useState([]);
  const {data:paymentHistoryData,isLoading:paymentHistoryLoading,error:paymentHistoryError} = useQuery({
    queryKey:["paymenthistory"],
    queryFn:async()=>{
      const response=await userDashService.PaymentHistory();
      if(response?.data){
        return response?.data;
      }else{
        return null;
      }
    }
  });
  const {data:allordersData,isLoading:allordersLoading,error:allordersError} = useQuery({
    queryKey:["allorders"],
    queryFn:async()=>{
      const response=await userDashService.AllOrders();
      if(response?.data){
        return response?.data;
      }else{
        return null;
      }
    }
  });
  const {data:pendingordersData,isLoading:pendingordersLoading,error:pendingordersError} = useQuery({
    queryKey:["pendingorders"],
    queryFn:async()=>{
      const response=await userDashService.PendingOrders();
      if(response?.data){
        return response?.data;
      }else{
        return null;
      }
    }
  });
  const {data:pickedordersData,isLoading:pickedordersLoading,error:pickedordersError} = useQuery({
    queryKey:["pickedorders"],
    queryFn:async()=>{
      const response=await userDashService.PickedOrders();
      if(response?.data){
        return response?.data;
      }else{
        return null;
      }
    }
  });
  const {data:washedordersData,isLoading:washedordersLoading,error:washedordersError} = useQuery({
    queryKey:["washedorders"],
    queryFn:async()=>{
      const response=await userDashService.WashedOrders();
      if(response?.data){
        return response?.data;
      }else{
        return null;
      }
    }
  });
  const {data:deliveredordersData,isLoading:deliveredordersLoading,error:deliveredordersError} = useQuery({
    queryKey:["deliveredorders"],
    queryFn:async()=>{
      const response=await userDashService.DeliveredOrders();
      if(response?.data){
        return response?.data;
      }else{
        return null;
      }
    }
  });
  const stats = [
    {
      label: "Total orders",
      value: "3",
      icon: ShoppingCart,
      bgColor: "bg-teal-100",
      iconColor: "text-teal-500",
    },
    {
      label: "Pending orders",
      value: "3",
      icon: Clock,
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-500",
    },
    {
      label: "Picked orders",
      value: "3",
      icon: Package,
      bgColor: "bg-green-100",
      iconColor: "text-green-500",
    },
    {
      label: "Completed",
      value: "3",
      icon: TrendingUp,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-500",
    },
  ];

const {data:totalorderStatusCount,isLoading,error} = useQuery({
  queryKey:["totalorderstatuscount"],
  queryFn:async()=>{
    const response=await userDashService.TotalorderStatusCount();
    if(response?.data){
      setOrderStatusCount(response?.data);
      return response?.data;
    }else{
      setOrderStatusCount({
        totalOrders: 0,
        pendingOrders: 0,
        pickedOrders: 0,
        washedOrders: 0,
        deliveredOrders: 0,
        paymentHistory: 0,
      });
      return null;
    }
  }
});


  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">
              Pushpam Singh
            </h1>
            <button className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors">
              <LogOut size={20} />
              <span className="font-medium">LogOut</span>
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
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%23f3f4f6' width='200' height='200'/%3E%3Ccircle cx='100' cy='80' r='35' fill='%23ea580c'/%3E%3Cpath d='M100 120 Q80 125 70 140 L70 200 L130 200 L130 140 Q120 125 100 120' fill='%23166534'/%3E%3Cpath d='M75 75 Q70 80 70 90 L75 100 Q80 95 85 90 L80 80 Q77 75 75 75' fill='%23ea580c'/%3E%3Cpath d='M125 75 Q130 80 130 90 L125 100 Q120 95 115 90 L120 80 Q123 75 125 75' fill='%23ea580c'/%3E%3C/svg%3E"
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
            <button className="px-5 py-2 bg-teal-500 text-white rounded-full font-medium hover:bg-teal-600 transition-colors"
            onClick={()=>{
              queryclient.invalidateQueries({queryKey:['allorders']})
              setOrders(allordersData)
            }}
            >
              All Orders ({orderStatusCount.totalOrders})
            </button>
            <button className="px-5 py-2 bg-white border-2 border-yellow-500 text-yellow-500 rounded-full font-medium hover:bg-yellow-50 transition-colors"
            onClick={()=>{
              queryclient.invalidateQueries({queryKey:['pendingorders']})
              setOrders(pendingordersData)
            }}
            >
              Pending ({orderStatusCount.pendingOrders})
            </button>
            <button className="px-5 py-2 bg-white border-2 border-green-500 text-green-500 rounded-full font-medium hover:bg-green-50 transition-colors"
            onClick={()=>{
              queryclient.invalidateQueries({queryKey:['pickedorders']})
              setOrders(pickedordersData)
            }}
            >
              Picked ({orderStatusCount.pickedOrders})
            </button>
            <button className="px-5 py-2 bg-white border-2 border-green-500 text-green-500 rounded-full font-medium hover:bg-green-50 transition-colors"
            onClick={()=>{
              queryclient.invalidateQueries({queryKey:['washedorders']})
              setOrders(washedordersData)
            }}
            >
              Washed ({orderStatusCount.washedOrders})
            </button>
            <button className="px-5 py-2 bg-white border-2 border-blue-500 text-blue-500 rounded-full font-medium hover:bg-blue-50 transition-colors"
            onClick={()=>{
              queryclient.invalidateQueries({queryKey:['deliveredorders']})
              setOrders(deliveredordersData)
            }}
            >
              Delivered ({orderStatusCount.deliveredOrders})
            </button>
            <button className="px-5 py-2 bg-white border-2 border-gray-800 text-gray-800 rounded-full font-medium hover:bg-gray-50 transition-colors"
            onClick={()=>{
              queryclient.invalidateQueries({queryKey:['paymenthistory']})
              setPaymentHistory(paymentHistory)
            }}
            >
              Payment History
            </button>
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              {/* Order Header */}
              <div
                className={`${order.status==='pending' ? 'bg-yellow-500' : order.status==='picked' ? 'bg-green-500' : order.status==='washed' ? 'bg-green-500' : order.status==='delivered' ? 'bg-blue-500' : 'bg-gray-500'} px-4 py-3 flex justify-between items-center`}
              >
                <div>
                  <p className="text-white text-sm font-medium">
                    Order: {order.orderId}
                  </p>
                  <p className="text-white text-xs opacity-90">
                    Created on {order.date}
                  </p>
                </div>
                <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-gray-800">
                  {order.status}
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
                          {order.fullname}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-gray-500">Phone:</p>
                        <p className="text-xs font-medium text-gray-800">
                          {order.phone}
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
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-gray-500">Items:</p>
                        <p className="text-xs font-medium text-gray-800">
                          {order.order.items}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-gray-500">Payment:</p>
                        <p className="text-xs font-medium text-green-600 flex items-center gap-1">
                          {order.order.payment}
                          <span className="text-green-500">✓</span>
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
                      {order.order.pickupDate}
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-2">
                    <p className="text-xs text-gray-500 mb-1">Delivery Date</p>
                    <p className="text-xs font-bold text-gray-800">
                      {order.order.deliverydate}
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
                      {order.amount}
                    </span>
                  </div>
                  {order.status === "pending" && (
                    <button className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-full transition-colors">
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
