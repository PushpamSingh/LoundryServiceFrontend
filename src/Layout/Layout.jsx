import { Outlet } from "react-router-dom";
import { Header } from "./Headers";
import { Footer } from "./Footers";
export const Layout = () => {
  return (
    <div className="w-full">
      <div className="w-full m-auto">
        <Header />
      </div>
      <div className="w-2xs sm:w-2xl md:w-4xl lg:w-7xl flex flex-col justify-center items-center">
        <Outlet />
      </div>
      <div className="w-full m-auto">
        <Footer />
      </div>
    </div>
  );
};
