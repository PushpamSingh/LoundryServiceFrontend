import {useQuery} from '@tanstack/react-query'
import {authService} from './../API/User.service'
export const useAuthuser=()=>{
    const {data:userData,isLoading,error,refetch}=useQuery({
        queryKey:['authUser'],
        queryFn:async()=>{
            const response=await authService.getCurrentUser();
            return response?.data ? response.data : null
        },
        retry:false
    })

    return {userData,userLoading:isLoading,userError:error,userRefetch:refetch}
}