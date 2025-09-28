import {createBrowserRouter, Navigate, RouterProvider} from  'react-router-dom'
import { Layout } from './Layout/Layout'
import { Home } from './Pages/Home'
import { UserDash } from './Pages/UserDash'
import { PlaceOrder } from './Pages/PlaceOrder'
import { TrackOrder } from './Pages/TrackOrder'
import { About } from './Pages/About'
import { AuthLayout } from './Layout/AuthLayout'
import { Login } from './Pages/Login'
import { Signup } from './Pages/Signup'
import { AdminDash } from './Pages/AdminDash'
import {useAuthuser} from "./Hooks/useAuthuser"
import { Onboard } from './Pages/Onboard'
function App() {
  // const {userData,userError,userLoading} =useAuthuser()
  const role='admin'
  const isAuthenticated=Boolean(false)
  // const isOnboarded=userData.onboarded || false
  const isOnboarded=true

  const router=createBrowserRouter([
          {
            path:'/',
            element:<Layout/>,
            children:[
              {
                path:'/',
                element:<Home/>
              },
              {
                path:'/about',
                element:(
                  isAuthenticated ? (
                    isOnboarded?(
                      <About/>
                    ) : <Navigate to={'/onboarding'}/>
                  ) : <Navigate to={'/'}/>
                )
              },
              {
                path:'/userdashboard',
                element:(
                  isAuthenticated ? (
                    isOnboarded && role==="user"? (
                      <UserDash/>
                    ): <Navigate to={'/onboarding'}/>
                  ): <Navigate to={'/'}/>
                )
              },
              {
                path:'/admindashboard',
                element:(
                  isAuthenticated ? (
                    isOnboarded && role==="admin" ? (
                      <AdminDash/>
                    ) : <Navigate to={'/onboarding'}/>
                  ):<Navigate to={'/'}/>
                )
              },
              {
                path:'/placeorder',
                element:(
                  isAuthenticated ? (
                    isOnboarded && role==="user"? (
                      <PlaceOrder/>
                    ) : <Navigate to={'/onboarding'}/>
                  ):<Navigate to={'/'}/>
                )
              },
              {
                path:'/trackorder',
                element:(
                  isAuthenticated ? (
                    isOnboarded && role==="user" ? (
                      <TrackOrder/>
                    ) : <Navigate to={'/onboarding'}/>
                  ):<Navigate to={'/'}/>
                )
              }
            ]
          },
          {
            path:'/',
            element:<AuthLayout/>,
            children:[
              {
                path:'/login',
                element:(
                  isAuthenticated ? (
                    !isOnboarded ? (
                      <Navigate to={'/onboarding'}/>
                    ) : <Navigate to={'/'}/>
                  ):<Login/>
                )
              },
              {
                path:'/signup',
                element:(
                  isAuthenticated ? (
                    !isOnboarded ? (
                      <Navigate to={'/onboarding'}/>
                    ) : <Navigate to={'/'}/>
                  ):<Signup/>
                )
              },
              {
                path:'/onboarding',
                element:(
                  isAuthenticated ? (
                    !isOnboarded ? (
                      <Onboard/>
                    ) : <Navigate to={'/'}/>
                  ):<Navigate to={'/login'}/>
                )
              }
            ]
          }
  ])
  return (
   <RouterProvider router={router}/>
  )
}

export default App
