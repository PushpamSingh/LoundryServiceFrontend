import axios from 'axios'

const API=axios.create({
    baseURL:`${import.meta.env.VITE_BACKEND_URL}/api/v1/userdash`,
    withCredentials:true
})

const token = localStorage.getItem("accessToken") || null

class UserDashService{
    async TotalorderStatusCount(){
        try {
            const response=await API.get('/totalorderstatuscount',{headers:{Authorization:`Bearer ${token}`}})
            if(response?.data){
                return response.data
            }else{
                return null
            }
        } catch (error) {
            console.log("TotalorderStatusCount :: Error :: ",error);
            throw new Error(error.response?.data?.message || "TotalorderStatusCount failed");
        }
    }
    async PendingOrders(){
        try {
            const response=await API.get('/pendingorders',{headers:{Authorization:`Bearer ${token}`}})
            if(response?.data){
                return response.data
            }else{
                return null
            }
        } catch (error) {
            console.log("PendingOrders :: Error :: ",error);
            throw new Error(error.response?.data?.message || "PendingOrders failed");
        }
    }
    async PickedOrders(){
        try {
            const response=await API.get('/pickedorders',{headers:{Authorization:`Bearer ${token}`}})
            if(response?.data){
                return response.data
            }else{
                return null
            }
        } catch (error) {
            console.log("PickedOrders :: Error :: ",error);
            throw new Error(error.response?.data?.message || "PickedOrders failed");
        }
    }
    async WashedOrders(){
        try {
            const response=await API.get('/washedorders',{headers:{Authorization:`Bearer ${token}`}})
            if(response?.data){
                return response.data
            }else{
                return null
            }
        } catch (error) {
            console.log("WashedOrders :: Error :: ",error);
            throw new Error(error.response?.data?.message || "WashedOrders failed");
        }
    }
    async DeliveredOrders(){
        try {
            const response=await API.get('/deliveredorders',{headers:{Authorization:`Bearer ${token}`}})
            if(response?.data){
                return response.data
            }else{
                return null
            }
        } catch (error) {
            console.log("DeliveredOrders :: Error :: ",error);
            throw new Error(error.response?.data?.message || "DeliveredOrders failed");
        }
    }
    async PaymentHistory(){
        try {
            const response=await API.get('/paymenthistory',{headers:{Authorization:`Bearer ${token}`}})
            if(response?.data){
                return response.data
            }else{
                return null
            }
        } catch (error) {
            console.log("Paymenthistory :: Error :: ",error);
            throw new Error(error.response?.data?.message || "Paymenthistory failed");
        }
    }
}

export const userDashService=new UserDashService()