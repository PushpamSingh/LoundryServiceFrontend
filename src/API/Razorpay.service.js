import axios from "axios";

const API = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1/payment`,
    withCredentials: true
})
const token = localStorage.getItem("accessToken") || null

class RazorpayService{
    async CreateRazorpayOrder({orderschemaid}){
       try {
         const response = await API.post('/createrzporder',{order_id:orderschemaid},{headers:{Authorization: `Bearer ${token}`}})
         if(response?.data){
             return response.data;
         }else{
             return null
         }
       } catch (error) {
            // console.log("CreateRazorpay :: Error :: ",error);
            throw new Error(error.response?.data?.message || "payment failed");
       }
    }
    async VerifyRazorpay(Verifyresponse){
        try {
            const response = await API.post('/verifyrazorpay',Verifyresponse,{headers:{Authorization: `Bearer ${token}`}})
            if(response?.data){
                return response.data;
            }else{
                return null
            }
        } catch (error) {
            //  console.log("VerifyRazorpay :: Error :: ",error);
            throw new Error(error.response?.data?.message || "payment failed");
        }
    }
}

export const razorpayService=new RazorpayService()