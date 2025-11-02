export const Footer = () => {
  return (
    <div className="bg-[#F9FAFB] px-4 py-3 sm:mx-2">
      <div className="md:w-full lg:w-[100%] bg-[#1A1A2E] mx-auto flex flex-col relative">
        {/* Purple top border */}
        <div className="h-1 bg-[#8A2BE2] w-full"></div>
        
        {/* Main content */}
        <div className="p-6 sm:p-4  pr-8 w-[90%] mx-auto">
          <div className="flex flex-col justify-between sm:pr-6 sm:flex-row lg:flex-row w-full gap-8 lg:gap-6 ml-8">
            {/* SparkleClean Section */}
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <img
                  src="/clean-clothes.png"
                  alt="SparkleClean Logo"
                  className="w-6 h-6 md:w-8 md:h-8"
                />
                <h1 className="text-white font-bold text-lg md:text-xl">SparkleClean</h1>
              </div>
              <p className="text-[#E0E0E0] text-sm leading-relaxed max-w-xs">
                Professional laundry service with pickup and delivery. Quality care for your clothes and garments.
              </p>
            </div>

            {/* Services Section */}
            <div className="flex flex-col gap-4">
              <h2 className="text-white font-bold text-lg">Services</h2>
              <ul className="flex flex-col gap-2">
                <li className="text-[#E0E0E0] text-sm">Wash & Fold</li>
                <li className="text-[#E0E0E0] text-sm">Dry Cleaning</li>
                <li className="text-[#E0E0E0] text-sm">Ironing</li>
                <li className="text-[#E0E0E0] text-sm">Bedding</li>
              </ul>
            </div>

            {/* Contact Section */}
            <div className="flex flex-col gap-4">
              <h2 className="text-white font-bold text-lg">Contact</h2>
              <ul className="flex flex-col gap-2">
                <li className="text-[#E0E0E0] text-sm">+91 9304790916</li>
                <li className="text-[#E0E0E0] text-sm">pushpamsingh204@gmail.com</li>
                <li className="text-[#E0E0E0] text-sm">123 Service St, Ranchi</li>
                <li className="text-[#E0E0E0] text-sm">Jharkhand</li>
              </ul>
            </div>

            {/* Hours Section */}
            <div className="flex flex-col gap-4 sm:mr-5">
              <h2 className="text-white font-bold text-lg">Hours</h2>
              <ul className="flex flex-col gap-2">
                <li className="text-[#E0E0E0] text-sm">Mon-Fri: 7AM-8PM</li>
                <li className="text-[#E0E0E0] text-sm">Sat: 8AM-6PM</li>
                <li className="text-[#E0E0E0] text-sm">Sun: 9AM-5PM</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-[#444444] w-full py-4 px-6 sm:px-4">
          <p className="text-[#E0E0E0] text-sm text-center">
            © 2025 SparkleClean. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
