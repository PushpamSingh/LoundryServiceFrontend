import axios from "axios";

const API = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1/order`,
    withCredentials: true
})
const token = localStorage.getItem("accessToken") || null

class OrderService {
    async CreateOrder({ orderitem, name, phone, area, alternatephone, housenumber,
        city, state, pincode, nearby, instructions }) {
        try {
            const response = await API.post('/createorder', {
                orderitem, name, phone, area, alternatephone, housenumber,
                city, state, pincode, nearby, instructions
            }, { headers: { Authorization: `Bearer ${token}` } })
            if (response?.data) {
                return response?.data
            } else {
                return null
            }
        } catch (error) {
            console.log("CreateOrder :: Error :: ", error);
            throw new Error(error.response?.data?.message || "create order failed");
        }
    }
    async ConfirmOrder({ orderId, paymentmethod }) {
        try {
            const response = await API.put(`/confirmorder/${orderId}`, { paymentmethod }, { headers: { Authorization: `Bearer ${token}` } })
            if (response?.data) {
                return response?.data
            } else {
                return null
            }
        } catch (error) {
            console.log("CreateOrder :: Error :: ", error);
            throw new Error(error.response?.data?.message || "create order failed");
        }
    }
    async TrackOrder({ orderId }) {
        try {
            const response = await API.get('/trackorder', { orderId }, { headers: { Authorization: `Bearer ${token}` } })
            if (response?.data) {
                return response?.data
            } else {
                return null
            }
        } catch (error) {
            console.log("TrackOrder :: Error :: ", error);
            throw new Error(error.response?.data?.message || "track order failed");
        }
    }
    async CanceleOrder({ orderId, cancellationReason, orderSchemaId }) {
        try {
            const response = await API.delete(`/canceleorder/${orderSchemaId}`, { orderId, cancellationReason }, { headers: { Authorization: `Bearer ${token}` } })
            if (response?.data) {
                return response?.data
            } else {
                return null
            }
        } catch (error) {
            console.log("CanceleOrder :: Error :: ", error);
            throw new Error(error.response?.data?.message || "cancele order failed");
        }
    }
    async Updatepickuptime({ orderId, pickupTime, orderSchemaId }) {
        try {
            const response = await API.put(`/updatepickuptime/${orderSchemaId}`, { orderId, pickupTime }, { headers: { Authorization: `Bearer ${token}` } })
            if (response?.data) {
                return response?.data
            } else {
                return null
            }
        } catch (error) {
            console.log("Updatepickuptime :: Error :: ", error);
            throw new Error(error.response?.data?.message || "pickup time update failed");
        }
    }
    async Updatedeliverytime({ orderId, deliveryTime, orderSchemaId }) {
        try {
            const response = await API.put(`/updatedeliverytime/${orderSchemaId}`, { orderId, deliveryTime }, { headers: { Authorization: `Bearer ${token}` } })
            if (response?.data) {
                return response?.data
            } else {
                return null
            }
        } catch (error) {
            console.log("Updatedeliverytime :: Error :: ", error);
            throw new Error(error.response?.data?.message || "delivery time update failed");
        }
    }
    async Updatestatus({ orderId, status, orderSchemaId }) {
        try {
            const response = await API.put(`/updatestatus/${orderSchemaId}`, { orderId, status }, { headers: { Authorization: `Bearer ${token}` } })
            if (response?.data) {
                return response?.data
            } else {
                return null
            }
        } catch (error) {
            console.log("Updatestatus :: Error :: ", error);
            throw new Error(error.response?.data?.message || "status update failed");
        }
    }
    async GetOneOrder({ orderSchemaId }) {
        try {
            const response = await API.get(`/getoneorder/${orderSchemaId}`, { headers: { Authorization: `Bearer ${token}` } })
            if (response?.data) {
                return response?.data
            } else {
                return null
            }
        } catch (error) {
            console.log("GetOneOrder :: Error :: ", error);
            throw new Error(error.response?.data?.message || "get one order failed");
        }
    }
}
export const orderService = new OrderService()