import { Outlet } from "react-router-dom";
import { Header } from "./Headers";
export const AuthLayout = () => {
  return (
    <div className="w-full">
      <div className="w-full">
        <Header />
      </div>
      <div className="w-2xs sm:w-2xl md:w-4xl lg:w-7xl flex flex-col justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
};
