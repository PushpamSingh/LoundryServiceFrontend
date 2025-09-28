import axios from "axios"

const API=axios.create({
    baseURL:`${import.meta.env.VITE_BACKEND_URL}/api/v1/user`,
    withCredentials:true
})
const token=localStorage.getItem("accessToken") || null

class AuthService{
    async CreateUser({fullName,email,phone,password}){
        try {
            const response=await API.post("/register",{fullName,email,phone,password})
            if(response?.data){
                return this.LoginUser({email,phone,password})
            }else{
                return response?.data
            }
        } catch (error) {
            console.log("CreateUser :: Error :: ",error);
            throw new Error(error.response?.data?.message || "Registration failed");
        }
    }
    async LoginUser({email,phone,password}){
        try {
            const response=await API.post("/login",{email,phone,password})
            if(response?.data){
                const {accessToken,refreshToken}=response.data?.data
                localStorage.setItem("accessToken",accessToken)
                localStorage.setItem("refreshToken",refreshToken)
                API.defaults.headers.common['Authorization']=`Bearer ${accessToken}`
                return response?.data
            }else{
                return null
            }
        } catch (error) {
            console.log("LoginUser :: Error :: ",error);
            throw new Error(error.response?.data?.message || "Login failed");
        }
    }
    async LogoutUser(){
        try {
            const response=await API.post('/logout',{headers:{Authorization: `Bearer ${token}`}})
            if(response){
                localStorage.setItem('accessToke',null)
                localStorage.setItem('refreshToken',null)
                return response?.data
            }else{
                return null
            }
        } catch (error) {
            console.log("LogOutUser :: Error :: ",error);
            return null
            throw new Error(error.response?.data?.message || "Logout failed");
        }
    }
    async getCurrentUser(){
        try {
            const response=await API.get('/getcurrentuser',{headers:{Authorization: `Bearer ${token}`}})
            if(response?.data){
                return response?.data
            }else{
                return null
            }
        } catch (error) {
            console.log("GetCurrentUser :: Error :: ",error);
            return error.response?.data?.message
            throw new Error(error.response?.data?.message || "user Fetched failed");
        }
    }
    async ChangePassword({oldPassword,newPassword}){
        try {
            const response=await API.put('/changepassword',{oldPassword,newPassword},{headers:{Authorization: `Bearer ${token}`}})
            if(response?.data){
                return response.data
            }else{
                return null
            }
        } catch (error) {
            console.log("ChangePassword :: Error :: ",error);
            throw new Error(error.response?.data?.message || "password change failed");
        }
    }
    async UploadAvatar({Filepath}){
        const formData=new FormData()
        formData.append('avatar',Filepath)
        try {
            const response=await API.put('uploadavatar',formData,{headers:{Authorization: `Bearer ${token}`}})
            if(response?.data){
                return response?.data
            }else{
                return null
            }
        } catch (error) {
            console.log("UploadAvatar :: Error :: ",error);
            throw new Error(error.response?.data?.message || "upload avatar failed");
        }
    }
}

export const authService=new AuthService()