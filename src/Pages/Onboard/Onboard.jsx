import { Shuffle, Sparkles } from "lucide-react";
import { useRef, useState } from "react";

export const Onboard=()=>{
    const [avatarUrl, setAvatarUrl] = useState('https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400');
    const [userName] = useState('Pushpam Singh');
    const fileInputRef = useRef(null);
  
    const handleAvatarChange = (event) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatarUrl(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
  
    const handleChangeAvatarClick = () => {
      fileInputRef.current?.click();
    };
    return(
        <div className="min-h-screen bg-gradient-to-br from-gray-200 via-teal-50 to-gray-300 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-gradient-to-br from-teal-100 to-teal-200 rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10">
        <div className="bg-teal-600 rounded-2xl shadow-xl p-6 sm:p-8 md:p-10">
          <div className="flex items-center gap-2 mb-6 sm:mb-8">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            <h1 className="text-white text-lg sm:text-xl font-semibold">SparkleClean</h1>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-12 shadow-lg">
            <div className="flex flex-col items-center">
              <div className="relative mb-6 sm:mb-8">
                <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full overflow-hidden bg-white shadow-2xl border-8 border-white">
                  <img
                    src={avatarUrl}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />

              <button
                onClick={handleChangeAvatarClick}
                className="w-full max-w-xs bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 sm:py-4 px-6 rounded-lg shadow-md transition-all duration-200 flex items-center justify-center gap-2 mb-4 text-sm sm:text-base"
              >
                <Shuffle className="w-4 h-4 sm:w-5 sm:h-5" />

                Change Avatar
              </button>

              <div className="w-full max-w-xs bg-gray-200 text-gray-800 font-semibold py-3 sm:py-4 px-6 rounded-lg text-center mb-4 text-sm sm:text-base">
                {userName}
              </div>

              <button className="w-full max-w-xs bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 sm:py-4 px-6 rounded-lg shadow-lg transition-all duration-200 text-sm sm:text-base">
                Complete Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}