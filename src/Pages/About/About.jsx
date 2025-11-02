import { Clock, Mail, Phone, ShieldCheck, Truck, User } from "lucide-react";

export const About = () => {
  return (
    <div className="px-4 py-3 sm:mx-2">
      <div className="w-full lg:w-[100%] p-3 mx-auto flex flex-col gap-24 mb-4 items-center rounded-xs">
      <section className="w-full text-center flex flex-col gap-10 bg-white shadow-md">
      <div className="bg-white shadow-md rounded-xl p-6 md:p-10 text-center">
          <h2 className="text-5xl font-bold mb-4 text-[#1F2937]">About Us</h2>
          <p className="text-[#1f29379e] font-bold  md:text-2xl">
            We make laundry convenient, reliable, and affordable 
          </p>
          <p className="text-[#1f29379e] font-bold mb-8 md:text-2xl">
            with our professional services
          </p>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="shadow-md hover:scale-[1.04] transition-all duration-300 cursor-default">
              <div className="p-6 text-center">
                <Truck className="mx-auto w-10 h-10 text-yellow-500 mb-4" />
                <h3 className="font-bold text-lg text-[#1F2937]">Free Pickup & Delivery</h3>
                <p className="text-[#1f29379e] text-md font-semibold">
                  Convenient pickup and  delivery service right to your door at no extra charge
                </p>
              </div>
            </div>
            <div className="shadow-sm hover:scale-[1.04] transition-all duration-300 cursor-default">
              <div className="p-6 text-center ">
                <Clock className="mx-auto w-10 h-10 text-teal-500 mb-4" />
                <h3 className="font-bold text-lg text-[#1F2937]">24x7 Hour Service</h3>
                <p className="text-[#1f29379e] text-md font-semibold">
                  Fast turn around time with same-day pickup and next-day delivery available
                </p>
              </div>
            </div>
            <div className="shadow-sm hover:scale-[1.04] transition-all duration-300 cursor-default">
              <div className="p-6 text-center">
                <ShieldCheck className="mx-auto w-10 h-10 text-black mb-4" />
                <h3 className="font-bold text-lg text-[#1F2937]">100% Satisfaction</h3>
                <p className="text-[#1f29379e] text-md font-semibold">
                  Quality guarantee with eco-friendly cleaning product and professional care
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full text-center flex flex-col gap-10">
      <div className="max-w-8xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold mb-2 text-[#1F2937]">How it works</h2>
          <p className="text-[#1f29379e] font-semibold text-lg mb-10">Simple steps to get your laundry done professionally</p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Schedule Pickup", desc: "Choose your preferred pickup time and we'll come to you" },
              { step: "2", title: "We Clean", desc: "Professional cleaning with eco-friendly products and care" },
              { step: "3", title: "Quality Check", desc: "Every item is inspected to ensure perfect results" },
              { step: "4", title: "Delivery", desc: "Fresh, clean clothes delivery back to your door" }
            ].map((item, idx) => (
              <div key={idx} className="text-center w-[300px]">
                <div className="w-12 h-12 mx-auto rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold mb-3">
                  {item.step}
                </div>
                <h3 className="font-bold text-[#1F2937] text-xl">{item.title}</h3>
                <p className="text-[#1f29379e] text-sm font-semibold">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full mr-3 flex text-center justify-center">
      <div className="md:flex justify-center hidden">
            <img className="w-[50%]" src="/servicelogo.png" alt="" />
          </div>
            <div className="w-full">
          <form className="bg-white w-full sm:w-[80%] flex flex-col gap-5 rounded-xl shadow-md px-3 py-2">
            <div className="text-[#1F2937] md:text-2xl font-bold">
              <h1>Quick Contact</h1>
            </div>
            <div className="flex flex-col w-full items-start">
              <label
                htmlFor="name"
                className="text-[#1F2937] md:text-xl font-bold"
              >
                Name
              </label>
              <div className="flex gap-1 justify-center items-center border-2 border-[#0D9488] w-full px-2 py-1.5 rounded-lg">
                <User className="text-[#1F2937] md:size-9" />
                <input
                  type="text"
                  name="name"
                  placeholder="your name...."
                  className="w-full outline-none text-[#1F2937] md:px-2 md:py-1.5 p-1"
                />
              </div>
            </div>
            <div className="flex flex-col w-full items-start mx-auto">
              <label
                htmlFor="phone"
                className="text-[#1F2937] md:text-xl font-bold"
              >
                Phone
              </label>
              <div className="flex gap-1 justify-center items-center border-2 border-[#0D9488] w-full px-2 py-1.5 rounded-lg">
                <Phone className="text-[#1F2937] md:size-9" />
                <input
                  type="text"
                  name="phone"
                  placeholder="your phone...."
                  className="w-full outline-none text-[#1F2937] p-1 md:px-2 md:py-1.5"
                />
              </div>
            </div>
            <div className="flex flex-col w-full items-start mx-auto">
              <label
                htmlFor="message"
                className="text-[#1F2937] md:text-xl font-bold"
              >
                Message
              </label>
              <div className="flex gap-1 border-2 border-[#0D9488] w-full px-2 py-1.5 rounded-lg">
                <Mail className="text-[#1F2937] md:size-9" />
                <textarea
                  type="text"
                  name="message"
                  cols={25}
                  placeholder="your message...."
                  className="w-full outline-none text-[#1F2937] p-1 md:px-2 md:py-1.5"
                />
              </div>
            </div>
            <button className="text-white bg-[#0D9488] p-2 py-3 cursor-pointer rounded-lg w-full mx-auto">Submit</button>
          </form>
          </div>
      </section>
      </div>
    </div>
  );
};
