import { Outlet } from "react-router-dom";
import { Header } from "./Headers";
import { Footer } from "./Footers";
export const Layout = () => {
  return (
      <div className="w-[100%] h-[100vh] bg-[#F9FAFB]">
      <div className="w-full mx-auto">
        <Header />
      </div>
      <div className="mx-auto  bg-[#F9FAFB]">
        <Outlet />
      </div>
      <div className="w-full mx-auto bg-[#F9FAFB]">
        <Footer />
      </div>
    </div>
  );
};
