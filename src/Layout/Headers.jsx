import { Book, ClipboardClock, Cross, CrossIcon, Ham, Hamburger, Home, LogIn, Plus, ShoppingCart, TextAlignJustify, User, User2 } from "lucide-react";
import {useAuthuser} from "./../Hooks/useAuthuser"
import { Link, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
export const Header=()=>{
    const {userData} = useAuthuser();
    const [mobileView,setMobileView]=useState(false)
    const authStatus=Boolean(userData)
    const role=userData?.role || null

    const navItem=[
        {
            name:"Home",
            icon:<Home className="text-white md:size-6 size-4"/>,
            slug:"/",
            active:true
        },
        {
            name:"About",
            icon:<Book className="text-white md:size-6 size-4"/>,
            slug:"/about",
            active:authStatus
        },
        {
            name:"PlaceOrder",
            icon:<ShoppingCart className="text-white md:size-6 size-4"/>,
            slug:"/placeorder",
            active:authStatus && role==="user"
        },
        {
            name:"TrackOrder",
            icon:<ClipboardClock className="text-white md:size-6 size-4"/>,
            slug:"/trackorder",
            active:authStatus
        },
        {
            name:"Login",
            icon:<LogIn className="text-white md:size-6 size-4"/>,
            slug:"/login",
            active:!authStatus
        },
        {
            name:"SignUp",
            icon:<User className="text-white md:size-6 size-4"/>,
            slug:"/signup",
            active:!authStatus 
        }
       
    ]
    const location=useLocation()
    // console.log("Location: ",location.pathname);
    
    return (
        <div className="bg-[#F9FAFB] px-4 py-3 sm:mx-2">
            <div className="md:w-full lg:w-[100%] bg-[#111827] p-3 mx-auto flex justify-between items-center rounded-xs relative">
            <div className="flex gap-1 items-center">
                    <img src="/clean-clothes.png" alt="" className="mb-1 md:w-[30px] w-[20px]"/>
                    <h1 className="text-white font-[600] md:text-xl">SparkleClean</h1>
            </div>
            <nav className="sm:flex sm:flex-row sm:gap-8 sm:items-center max-sm:hidden">
                {
                    navItem.map((curr)=>{
                        return (
                            curr?.active ? (
                                <Link to={curr.slug} key={curr.name} className={`text-white max-md:text-xs cursor-pointer rounded-xs ${location.pathname===curr.slug ? "bg-[#0D9488] p-2" : null}`}>
                                    <button className="flex gap-1 items-cente cursor-pointer">
                                        {curr?.icon}
                                        <span>{curr.name}</span>
                                    </button>
                                </Link>
                            ):null
                        )
                    })
                }
                {
                    authStatus && (
                        <Link to={userData?.role === 'user' ? "/userdashboard":"/admindashboard"} className="text-white border rounded-full p-1">
                        <button className="flex gap-1 items-center">
                            <User2 className="text-white md:size-6 size-3"/>
                        </button>
                    </Link>
                    )
                }

            </nav>
            
           <div className="flex gap-7 items-center sm:hidden">
           <TextAlignJustify className="text-white cursor-pointer sm:hidden" onClick={()=>setMobileView(!mobileView)}/>
            {
            authStatus && (
                        <Link to={userData?.role === 'user' ? "/userdashboard":"/admindashboard"} className="text-white border rounded-full p-1 sm:hidden" onClick={()=>setMobileView(false)}>
                        <button className="flex gap-1 items-center">
                            <User2 className="text-white size-6"/>
                        </button>
                        
                    </Link>
                    
                    )
}
           </div>
                
                {/* Mobile view NavBar */}
           {
            mobileView && (
                <nav className="flex flex-col gap-10 items-center justify-center px-4 py-4 absolute left-0 right-0 top-14 bg-[#111827] sm:hidden z-10">
                {
                    navItem.map((curr)=>{
                        return ( 
                            curr?.active ? (
                                <Link to={curr.slug} key={curr.name} className="text-white border-b w-full cursor-pointer" onClick={()=>setMobileView(!mobileView)}>
                                    <button className="flex gap-1 items-center cursor-pointer w-full justify-center">
                                        {curr?.icon}
                                        <span>{curr.name}</span>
                                    </button>
                                </Link>
                            ):null
                        )
                    })
                }
                {
                    authStatus && (
                        <div className="flex gap-3 items-end">
                        <Link to={userData?.role === 'user' ? "/userdashboard":"/admindashboard"} className="text-white border rounded-full p-1" onClick={()=>setMobileView(!mobileView)}>
                        <button className="flex gap-1 items-center">
                            <User2 className="text-white size-6"/>
                        </button>
                        
                    </Link>
                    <p className="text-success">•Active</p>
                    </div>
                    )
                }

            </nav>
            )
           }
            </div>
        </div>
    )
}