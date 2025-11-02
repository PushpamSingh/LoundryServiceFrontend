export const useGetOrder=()=>{
       const {data,isLoading} = useQuery({
          queryKey:['getOrder'],
          queryFn: async()=>{
            const response=await orderService.GetOneOrder({orderSchemaId})
            return response?.data ? response.data : null
          }
        })
    return {orderData:data,orderLoading:isLoading}
}