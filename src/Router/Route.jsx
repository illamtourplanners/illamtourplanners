import React from 'react'

import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '../Pages/HomePage'
import { RootLayout } from '../Layout/RootLayout'
import { AboutPage } from '../Pages/AboutPage'
import { ContactPage } from '../Pages/ContactPage'
import Packages from '../Pages/Packages'
import CheckoutPage from '../Pages/ChekoutPage'
import { AdminLayout } from '../Layout/AdminLayout'
import AdminHomePage from '../Pages/admin/AdminHomePage'
import { Package } from 'lucide-react'
import CreatePackageForm from '../Pages/admin/Package'
import Bookings from '../Pages/admin/Bookings'
import ContactInfo from '../Pages/admin/ContactInfo'
import ContactInfoAdmin from '../Pages/admin/ContactInfo'
import { AdminLogin } from '../Pages/admin/AdminLogin'

export const router=createBrowserRouter([
 {
        path: "/",
        element:<RootLayout/>,
        children:[
            {
                path: "/",
                element: <HomePage/>
            },
  {
                path: "About",
                element: <AboutPage/>
            },
 {
                path: "contact",
                element: <ContactPage/>
            },
             {
                             path: "packages",
                             element: <Packages/>
                         },
                          {
                             path: "checkout",
                             element: <CheckoutPage/>
                         },
                          



           
        ]},

     {
        path: "/admin",
        element:<AdminLayout/>,
        children:[
              {
                path: "login",
                element: <AdminLogin/>
            },
            {
                path: "home",
                element: <AdminHomePage/>
            },
{
                path: "package",
                element: < CreatePackageForm/>
            },
             {
                path: "bookings",
                element: < Bookings/>
            },  
            {
                path: "contact",
                element: < ContactInfoAdmin/>
            },            



           
        ]},

])
