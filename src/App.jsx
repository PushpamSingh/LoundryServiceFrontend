import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Layout } from "./Layout/Layout";
import { Home } from "./Pages/Home/Home";
import { UserDash } from "./Pages/User/UserDash";
import { PlaceOrder } from "./Pages/Placeorder/PlaceOrder";
import { TrackOrder } from "./Pages/Trackorder/TrackOrder";
import { About } from "./Pages/About/About";
import { AuthLayout } from "./Layout/AuthLayout";
import { Login } from "./Pages/Login/Login";
import { Signup } from "./Pages/Signup/Signup";
import { AdminDash } from "./Pages/Admin/AdminDash";
import { useAuthuser } from "./Hooks/useAuthuser";
import { Onboard } from "./Pages/Onboard/Onboard";
import { Payment } from "./Pages/PaymentPage/Payment";
import { usePayment } from "./store/usePayment";
import { Toaster } from "sonner";
// import { useEffect } from "react";
// import { is } from "zod/v4/locales";
function App() {
  const { userData, userError, userLoading } = useAuthuser();
  const role = userData?.role || null;
  const isAuthenticated = Boolean(userData);
  // const isOnboarded=userData.onboarded || false
  const isOnboarded = userData?.onboarded || false;
  const { paymentpage } = usePayment();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "about",
          element: isAuthenticated ? (
            isOnboarded ? (
              <About />
            ) : (
              <Navigate to={"/onboarding"} />
            )
          ) : (
            <Navigate to={"/"} />
          ),
          // element:<About/>
        },
        {
          path: "userdashboard",
          element: isAuthenticated ? (
            isOnboarded && role === "user" ? (
              <UserDash />
            ) : (
              <Navigate to={"/onboarding"} />
            )
          ) : (
            <Navigate to={"/"} />
          ),
          // element:<UserDash/>
        },
        {
          path: "admindashboard",
          element: isAuthenticated ? (
            isOnboarded && role === "admin" ? (
              <AdminDash />
            ) : (
              <Navigate to={"/onboarding"} />
            )
          ) : (
            <Navigate to={"/"} />
          ),
          // element:<AdminDash/>
        },
        {
          path: "placeorder",
          element: isAuthenticated ? (
            isOnboarded && role === "user" ? (
              <PlaceOrder />
            ) : (
              <Navigate to={"/onboarding"} />
            )
          ) : (
            <Navigate to={"/"} />
          ),
          // element:<PlaceOrder/>
        },
        {
          path: "placeorder/payment/:id",
          element:
            isAuthenticated && paymentpage ? (
              isOnboarded && role === "user" ? (
                <Payment />
              ) : (
                <Navigate to={"/onboarding"} />
              )
            ) : (
              <Navigate to={"/"} />
            ),
          // element:<PlaceOrder/>
        },
        {
          path: "trackorder",
          element: isAuthenticated ? (
            isOnboarded ? (
              <TrackOrder />
            ) : (
              <Navigate to={"/onboarding"} />
            )
          ) : (
            <Navigate to={"/"} />
          ),
          // element:<TrackOrder/>
        },
      ],
    },
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          element: isAuthenticated ? (
            !isOnboarded ? (
              <Navigate to={"/onboarding"} />
            ) : (
              <Navigate to={"/"} />
            )
          ) : (
            <Login />
          ),
        },
        {
          path: "signup",
          element: isAuthenticated ? (
            !isOnboarded ? (
              <Navigate to={"/onboarding"} />
            ) : (
              <Navigate to={"/"} />
            )
          ) : (
            <Signup />
          ),
        },
        {
          path: "onboarding",
          element: isAuthenticated ? (
            !isOnboarded ? (
              <Onboard />
            ) : (
              <Navigate to={"/"} />
            )
          ) : (
            <Navigate to={"/login"} />
          ),
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
