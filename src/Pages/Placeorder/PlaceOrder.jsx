import { CalendarIcon, MinusIcon, PlusIcon } from "lucide-react";
import { usePayment } from "../../store/usePayment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { orderService } from "../../API/Order.service";
import { toast } from "sonner";

export const PlaceOrder = () => {
  const { paymentpage, handlePaymentpage } = usePayment();
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState({
    orderitem: {
      shirt: 0,
      pants: 0,
      dresses: 0,
      suits: 0,
      bedsheets: 0,
      blankets: 0,
    },
    name: "",
    phone: "",
    area: "",
    alternatephone: "",
    housenumber: "",
    city: "",
    state: "",
    pincode: "",
    nearby: "",
    instructions: "",
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const items = [
    { key: "shirt", label: "Shirts", price: 15 },
    { key: "pants", label: "Pants", price: 15 },
    { key: "dresses", label: "Dresses", price: 20 },
    { key: "suits", label: "Suits", price: 35 },
    { key: "bedsheets", label: "Bedsheets", price: 10 },
    { key: "blankets", label: "Blankets Or Quilts", price: 40 },
  ];
  const price = {
    shirt: 15,
    pants: 15,
    dresses: 20,
    suits: 35,
    bedsheets: 10,
    blankets: 40,
  };
  const queryclient = useQueryClient();
  const { mutate: CreateOrdermutation, isPending } = useMutation({
    mutationFn: async () => {
      const response = await orderService.CreateOrder(orderDetails);
      if (response?.data) {
        // console.log(response?.data);
        
        setOrderId(response?.data?.order?._id);
        return response?.data;
      } else {
        return null;
      }
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
      toast.success("order created!!", { style: { fontSize: "16px" } });
      handlePaymentpage();
    },
  });
  // console.log("orderId: ",orderId);
  // console.log("payment: ",paymentpage);
  
  const handleCreateOrder = (e) => {
    e.preventDefault();
    try {
      CreateOrdermutation();
      //  console.log("heelo done");
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    if (paymentpage && orderId) {
      navigate(`/placeorder/payment/${orderId}`);
    }
  }, [paymentpage,orderId]);

  const handlePlus = (e, key) => {
    setOrderDetails((prev) => {
      return {
        ...prev,
        orderitem: {
          ...prev.orderitem,
          [key]: prev.orderitem[key] + 1,
        },
      };
    });
    setTotalPrice(totalPrice + price[key]);
  };
  // console.log("Total: ",totalPrice);

  const handleMinus = (e, key) => {
    setOrderDetails((prev) => {
      return {
        ...prev,
        orderitem: {
          ...prev.orderitem,
          [key]: Math.max(0, prev.orderitem[key] - 1),
        },
      };
    });
    setTotalPrice(totalPrice - price[key]);
  };

  return (
    <div className="px-4 py-3 sm:mx-2">
      <form
        onSubmit={(e) => handleCreateOrder(e)}
        action="submit"
        className="w-full lg:w-[100%] p-3 mx-auto flex flex-col gap-10 ite ms-center rounded-xs"
      >
        <header>
          <p className="text-center text-3xl font-bold text-[#1F2937]">
            Create New Order
          </p>
          <p className="text-center text-lg font-semibold text-[#1f29379e]">
            Select your items and schedule pickup time.
          </p>
        </header>

        {/* Items Section */}
        <section className="bg-white w-full flex flex-col gap-10 rounded-xs py-4 max-md:px-4">
          <div className="w-full sm:w-[70%] mx-auto">
            <h2 className="font-semibold mb-3 text-2xl text-[#1F2937]">
              Select items
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {items.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between border border-[#0D9488] rounded-lg p-3 bg-white shadow-md"
                >
                  <div>
                    <p className="font-bold text-[#1F2937]">{item.label}</p>
                    <p className="text-sm font-bold text-[#1f29379e]">
                      ₹{item.price} each
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      variant="outline"
                      size="icon"
                      className=" rounded-full border border-[#1F2937] text-[#1F2937] hover:border-[#0D9488] hover:text-white hover:bg-[#0D9488] p-2 cursor-pointer"
                      onClick={(e) => handleMinus(e, item.key)}
                    >
                      <MinusIcon></MinusIcon>
                    </div>
                    <span className="font-semibold text-[#1F2937] p-2">
                      {orderDetails.orderitem[item.key]}
                    </span>
                    <div
                      variant="outline"
                      size="icon"
                      className=" rounded-full bg-[#0D9488] border border-[#0D9488] hover:text-[#1F2937] hover:bg-teal-50 p-2 cursor-pointer text-white"
                      onClick={(e) => handlePlus(e, item.key)}
                    >
                      <PlusIcon></PlusIcon>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Address section */}
        <section className="bg-white w-full flex flex-col py-2 rounded-xs max-md:px-4">
          <div className="w-full sm:w-[70%] mx-auto">
            <h2 className="font-semibold mb-3 text-2xl text-[#1F2937]">
              Customer Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-4">
                <label htmlFor="name" className="font-semibold text-[#1F2937]">
                  Name:
                </label>
                <input
                  id="name"
                  className="w-full outline-none text-[#1F2937] border border-[#0D9488] focus-visible:ring-teal-500 p-2 shadow-lg rounded-lg"
                  placeholder="your fullname..."
                  required
                  value={orderDetails.name}
                  onChange={(e) => {
                    setOrderDetails({ ...orderDetails, name: e.target.value });
                  }}
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="area" className="font-semibold text-[#1F2937]">
                  Area :
                </label>
                <input
                  id="area"
                  className="w-full outline-none text-[#1F2937] border border-[#0D9488] focus-visible:ring-teal-500 p-2 shadow-lg rounded-lg"
                  placeholder="area/colony name..."
                  required
                  value={orderDetails.area}
                  onChange={(e) => {
                    setOrderDetails({ ...orderDetails, area: e.target.value });
                  }}
                />
              </div>
              <div className="flex flex-col gap-4">
                <label
                  htmlFor="house"
                  className=" font-semibold text-[#1F2937]"
                >
                  House No.:
                </label>
                <input
                  id="house"
                  className="w-full outline-none text-[#1F2937] border border-[#0D9488] focus-visible:ring-teal-500 p-2 shadow-lg rounded-lg"
                  placeholder="House No./building name..."
                  required
                  value={orderDetails.housenumber}
                  onChange={(e) => {
                    setOrderDetails({
                      ...orderDetails,
                      housenumber: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="city" className="font-semibold text-[#1F2937]">
                  City:
                </label>
                <input
                  id="city"
                  className="w-full outline-none text-[#1F2937] border border-[#0D9488] focus-visible:ring-teal-500 p-2 shadow-lg rounded-lg"
                  placeholder="your city..."
                  required
                  value={orderDetails.city}
                  onChange={(e) => {
                    setOrderDetails({ ...orderDetails, city: e.target.value });
                  }}
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="phone" className="font-semibold text-[#1F2937]">
                  Phone :
                </label>
                <input
                  id="phone"
                  className="w-full outline-none text-[#1F2937] border border-[#0D9488] focus-visible:ring-teal-500 p-2 shadow-lg rounded-lg"
                  placeholder="your phone..."
                  required
                  value={orderDetails.phone}
                  onChange={(e) => {
                    setOrderDetails({ ...orderDetails, phone: e.target.value });
                  }}
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="state" className="font-semibold text-[#1F2937]">
                  State:
                </label>
                <input
                  id="state"
                  className="w-full outline-none text-[#1F2937] border border-[#0D9488] focus-visible:ring-teal-500 p-2 shadow-lg rounded-lg"
                  placeholder="your state.."
                  required
                  value={orderDetails.state}
                  onChange={(e) => {
                    setOrderDetails({ ...orderDetails, state: e.target.value });
                  }}
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="alt" className="font-semibold text-[#1F2937] ">
                  Alternate No.:
                </label>
                <input
                  id="alt"
                  className="w-full outline-none text-[#1F2937] border border-[#0D9488] focus-visible:ring-teal-500 p-2 shadow-lg rounded-lg"
                  placeholder="your alternative number..."
                  required
                  value={orderDetails.alternatephone}
                  onChange={(e) => {
                    setOrderDetails({
                      ...orderDetails,
                      alternatephone: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="flex flex-col gap-4">
                <label
                  htmlFor="pincode"
                  className="w-14 font-semibold text-[#1F2937]"
                >
                  Pincode:
                </label>
                <input
                  id="pincode"
                  className="w-full outline-none text-[#1F2937] border border-[#0D9488] focus-visible:ring-teal-500 p-2 shadow-lg rounded-lg"
                  placeholder="area pincode..."
                  required
                  value={orderDetails.pincode}
                  onChange={(e) => {
                    setOrderDetails({
                      ...orderDetails,
                      pincode: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="flex flex-col gap-2 sm:col-span-2">
                <label
                  htmlFor="nearby"
                  className="font-semibold text-[#1F2937]"
                >
                  Nearby:
                </label>
                <input
                  id="nearby"
                  className=" w-full outline-none text-[#1F2937] border border-[#0D9488] focus-visible:ring-teal-500 p-2 shadow-lg rounded-lg"
                  placeholder="office/mall/shop/appartment name..."
                  required
                  value={orderDetails.nearby}
                  onChange={(e) => {
                    setOrderDetails({
                      ...orderDetails,
                      nearby: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* instructions section */}
        <section className="bg-white w-full flex flex-col rounded-xs py-4 max-md:px-4">
          <div className="w-full sm:w-[70%] mx-auto">
            <h2 className="font-semibold mb-3 text-2xl text-[#1F2937]">
              Special Instructions
            </h2>
            <textarea
              rows={5}
              placeholder="Add any special instructions (e.g., delicate wash, extra starch, fabric softener...)"
              className="w-full outline-none text-[#1F2937] border border-[#0D9488] focus-visible:ring-teal-500 p-2 shadow-lg rounded-lg"
              value={orderDetails.instructions}
              onChange={(e) => {
                setOrderDetails({
                  ...orderDetails,
                  instructions: e.target.value,
                });
              }}
            />
          </div>
        </section>

        <section className="bg-white w-full flex flex-col rounded-xs py-4 max-md:px-4">
          <div className="w-full sm:w-[70%] mx-auto">
            <h2 className="font-semibold mb-3 text-2xl text-[#1F2937]">
              Order Summary
            </h2>
            <div className="space-y-2 bg-white p-4 rounded-lg border border-teal-300">
              {items.map((item) => (
                <div
                  key={item.key}
                  className="flex justify-between text-gray-700"
                >
                  <span>{item.label}</span>
                  <span>₹{item.price * orderDetails.orderitem[item.key]}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold border-t pt-2 text-teal-700">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white w-full flex flex-col rounded-xs py-4 max-md:px-4">
          <div className="w-full sm:w-[70%] mx-auto text-center">
            <button
              className="w-[50%] mx-auto p-4 bg-teal-600 hover:bg-teal-700 text-lg font-bold text-white cursor-pointer rounded-lg"
              type="submit"
            >
              {isPending ? (
                <span className="loading loading-spinner size-4"></span>
              ) : (
                "Create Order"
              )}
            </button>
          </div>
        </section>
      </form>
    </div>
  );
};
