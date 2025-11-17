import {
  Anvil,
  BedDouble,
  Mail,
  Phone,
  Shirt,
  User,
  WashingMachine,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate=useNavigate()
  const services = [
    {
      icon: <Shirt className="w-4 h-4 md:w-8 md:h-8 text-teal-600" />,
      title: "Wash & Fold",
      description:
        "Basic wash and fold service with gentle detergent, proper drying, and neatly folded clothes ready to wear or store.",
      item: "1 Item",
      price: "₹15",
    },
    {
      icon: <WashingMachine className="w-4 h-4 md:w-8 md:h-8 text-teal-600" />,
      title: "Dry Cleaning",
      description:
        "Professional dry cleaning service with fabric-friendly solutions, gentle care for delicate clothes,  fresh finish.",
      item: "1 Item",
      price: "₹20",
    },
    {
      icon: <Anvil className="w-4 h-4 md:w-8 md:h-8 text-teal-600" />,
      title: "Ironing",
      description:
        "Professional ironing service ensuring wrinkle-free, and well-pressed clothes with fabric-safe techniques.",
      item: "1 Item",
      price: "₹10",
    },
    {
      icon: <BedDouble className="w-4 h-4 md:w-8 md:h-8 text-teal-600" />,
      title: "Bedding",
      description:
        "Fresh and hygienic cleaning for comforters,  and bed sheets, ensuring softness and long-lasting freshness.",
      item: "1 Item",
      price: "₹25",
    },
  ];
  return (
    <div className="px-4 py-3 sm:mx-2">
      <div className="w-full lg:w-[100%] p-3 mx-auto flex flex-col gap-10 items-center rounded-xs">
        {/* SparkleClean Section */}
        <section className="bg-white w-full text-center flex flex-col gap-10 rounded-xs py-4 max-md:px-4">
          <div className="w-full text-2xl text-[#1F2937] sm:text-3xl md:text-5xl lg:text-6xl font-extrabold md:w-[90%] lg:w-[55%] mx-auto md:leading-20 lg:leading-24">
            <h1>Welcome to SparkleClean Laundry</h1>
          </div>
          <div className="text-[#777373] md:text-2xl lg:text-3xl font-bold md:w-[90%] lg:w-[60%] mx-auto">
            <p>Fast, fresh, and affordable laundry service at your doorstep.</p>
          </div>
          <div className="w-full lg:w-[50%] flex mx-auto justify-between gap-2 md:gap-40">
            <button className="w-full border-2 text-xs md:text-3xl text-white font-bold bg-[#0D9488] px-2 py-2 md:px-3 md:py-3.5 flex justify-between items-center rounded-xl cursor-pointer"
            onClick={()=>navigate('/placeorder')}
            >
              <span>PlaceOrder</span>
              <img src="/next.png" alt="" className="w-4 md:w-12" />
            </button>
            <button className="w-full border-2 text-xs md:text-3xl text-[#0D9488] font-bold border-[#0D9488] px-2 py-2 md:px-3 md:py-3.5 flex justify-between items-center rounded-xl cursor-pointer"
            onClick={()=>navigate('/trackorder')}
            >
              <span>TrackOrder</span>
              <img src="./track (1).png" alt="" className="w-4 md:w-12" />
            </button>
          </div>
        </section>

        {/* services section */}
        <section className="w-full text-center flex flex-col gap-10">
          <h1 className="text-[#1F2937] text-2xl md:text-4xl font-bold">
            Our Services
          </h1>
          <div className="grid grid-cols-2 w-full md:w-[90%] mx-auto gap-3 md:gap-10 place-items-center">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex flex-col justify-evenly lg:w-[400px] lg:h-[250px] text-center shadow-md rounded-xl p-3 bg-white hover:scale-[1.04] transition-all duration-300 cursor-default"
              >
                <header className="flex flex-row justify-between pb-2">
                  <div className="flex justify-center">{service.icon}</div>
                  <p className="text-[12px] lg:text-2xl font-bold text-[#0D9488]">
                    {service.title}
                  </p>
                </header>
                <main>
                  <div>
                    <h1 className="text-gray-600 text-[8px] md:text-x lg:text-lg font-bold mb-3">
                      {service.description}
                    </h1>
                  </div>
                </main>
                <footer className="">
                  <div className="flex justify-between pt-2 text-xs md:text-lg font-bold  text-teal-700">
                    <span>{service.item}</span>
                    <span>{service.price}</span>
                  </div>
                </footer>
              </div>
            ))}
          </div>
        </section>

        {/* Contact section */}
        <section className="w-full text-center justify-center flex mr-3">
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
