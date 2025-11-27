import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Phone, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../API/User.service";
import { is } from "zod/v4/locales";
import { useState } from "react";
import { useAuthuser } from "../../Hooks/useAuthuser";

export const Signup = () => {
  const navigate = useNavigate();
  const {userRefetch}=useAuthuser()
  const [signupdata, setSignupdata] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });
  const queryclient = useQueryClient();

  const {
    mutate: Signupmutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: async () => {
      const response = await authService.CreateUser(signupdata);
      return response?.data ? response.data : null;
    },
    onSuccess: () => {
      userRefetch()
      queryclient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/");
    },
  });

  const handleSignup = (e) => {
    e.preventDefault();
    Signupmutation();
  };

  return (
    <div className="px-4 py-3 sm:mx-2">
      <div className="w-full lg:w-[100%] p-3 mx-auto flex flex-col gap-10 items-center rounded-xs">
        <div className="bg-gradient-to-br from-[#0d948981] to-[#0d948978] rounded-3xl shadow-2xl p-3 md:p-8">
          <div className="bg-[#0D9488] rounded-2xl md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Form */}
            <form className="bg-white rounded-2xl p-4 md:p-8 shadow-xl" onSubmit={handleSignup}>
              {/* Logo */}
              <div className="flex items-center gap-2 mb-8 bg-teal-600 p-2">
                <img src="./clean-clothes.png" alt="" className="w-6 h-6" />
                <span className="text-xl font-bold text-white">
                  SparkleClean
                </span>
              </div>

              {/* Welcome Text */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#1F2937] mb-1">
                  Create an Account
                </h1>
                <p className="text-sm text-[#1F2937]">
                  Join SparkleClean and start home loundary service
                </p>
                {error && (
                  <p className="text-sm text-red-600 mt-2">{error.message}</p>
                )}
              </div>
              {/* Name field */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-[#1F2937] mb-2">
                  Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    required
                    type="text"
                    name="fullName"
                    placeholder="Your Full Name"
                    value={signupdata.fullName}
                    onChange={(e) =>
                      setSignupdata({ ...signupdata, fullName: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-[#1F2937] placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-[#1F2937] mb-2">
                  Email
                </label>
                <div className="relative">
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={signupdata.email}
                    onChange={(e) =>
                      setSignupdata({ ...signupdata, email: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-[#1F2937] placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Phone field */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-[#1F2937] mb-2">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    required
                    type="text"
                    name="phone"
                    placeholder="Your Phone"
                    value={signupdata.phone}
                    onChange={(e) =>
                      setSignupdata({ ...signupdata, phone: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-[#1F2937] placeholder-gray-400"
                  />
                </div>
              </div>
              {/* Password Field */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-[#1F2937] mb-2">
                  Password
                </label>
                <div className="relative">
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <input
                    required
                    type="password"
                    name="password"
                    value={signupdata.password}
                    onChange={(e) =>
                      setSignupdata({ ...signupdata, password: e.target.value })
                    }
                    placeholder="Your Password"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="mb-6 flex items-start gap-2">
                <input
                  required
                  type="checkbox"
                  id="terms"
                  className="mt-1 w-4 h-4 text-[#0D9488] border-gray-300 rounded focus:ring-[#0D9488]"
                />
                <label htmlFor="terms" className="text-sm text-[#1F2937]">
                  I agree with{" "}
                  <a href="#" className="text-[#0D9488] underline">
                    terms & conditions
                  </a>
                </label>
              </div>

              {/* Sign In Button */}
              <button className="w-full bg-[#0D9488] hover:bg-[#0D9488] text-white font-semibold py-3 rounded-lg transition duration-200 mb-4 cursor-pointer"
              type="submit"
              >
                {
                  isPending ? (<span className="loading loading-spinner size-6"></span> ): ("Create Account")
                }
              </button>

              {/* Create Account Link */}
              <p className="text-center text-sm text-[#1F2937]">
                Already have an account?{" "}
                <Link to="/login" className="text-[#0D9488] underline">
                  Log In
                </Link>
              </p>
            </form>

            {/* Right Side - Illustration */}
            <div className="hidden lg:flex items-center justify-center">
              <img src="./Mobilelogin-bro.png" alt="" className="w-[500px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
