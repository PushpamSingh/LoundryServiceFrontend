import axios from 'axios'

const API = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1/admindash`,
    withCredentials: true
})
const token = localStorage.get('accessToken') || null
class AdminDashService {
    async TotalorderStatusCountandRevenue() {
        try {
            const response = await API.get('/totalorderstatuscountandrevenue', { headers: { Authorization: `Bearer ${token}` } })
            if (response?.data) {
                return response.data
            } else {
                return null
            }
        } catch (error) {
            console.log("TotalorderStatusCountandRevenue :: Error :: ", error);
            throw new Error(error.response?.data?.message || "TotalorderStatusCountandRevenue failed");
        }
    }
    async PendingOrders() {
        try {
            const response = await API.get('pendingorders', { headers: { Authorization: `Bearer ${token}` } })
            if (response?.data) {
                return response.data
            } else {
                return null
            }
        } catch (error) {
            console.log("PendingOrders :: Error :: ", error);
            throw new Error(error.response?.data?.message || "PendingOrders failed");
        }
    }
    async PickedOrders() {
        try {
            const response = await API.get('pickedorders', { headers: { Authorization: `Bearer ${token}` } })
            if (response?.data) {
                return response.data
            } else {
                return null
            }
        } catch (error) {
            console.log("PickedOrders :: Error :: ", error);
            throw new Error(error.response?.data?.message || "PickedOrders failed");
        }
    }
    async WashedOrders() {
        try {
            const response = await API.get('washedorders', { headers: { Authorization: `Bearer ${token}` } })
            if (response?.data) {
                return response.data
            } else {
                return null
            }
        } catch (error) {
            console.log("WashedOrders :: Error :: ", error);
            throw new Error(error.response?.data?.message || "WashedOrders failed");
        }
    }
    async DeliveredOrders() {
        try {
            const response = await API.get('deliveredorders', { headers: { Authorization: `Bearer ${token}` } })
            if (response?.data) {
                return response.data
            } else {
                return null
            }
        } catch (error) {
            console.log("DeliveredOrders :: Error :: ", error);
            throw new Error(error.response?.data?.message || "DeliveredOrders failed");
        }
    }
    async CanceledOrders() {
        try {
            const response = await API.get('canceledorders', { headers: { Authorization: `Bearer ${token}` } })
            if (response?.data) {
                return response.data
            } else {
                return null
            }
        } catch (error) {
            console.log("CanceledOrders :: Error :: ", error);
            throw new Error(error.response?.data?.message || "CanceledOrders failed");
        }
    }
    
}

export const adminDashService=new AdminDashService()