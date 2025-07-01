import React from 'react'

import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '../Pages/HomePage'
import { RootLayout } from '../Layout/RootLayout'
import { AboutPage } from '../Pages/AboutPage'
import { ContactPage } from '../Pages/ContactPage'

import CheckoutPage from '../Pages/ChekoutPage'
import { AdminLayout } from '../Layout/AdminLayout'
import AdminHomePage from '../Pages/admin/AdminHomePage'

import CreatePackageForm from '../Pages/admin/Package'
import Bookings from '../Pages/admin/Bookings'
import ContactInfo from '../Pages/admin/ContactInfo'
import ContactInfoAdmin from '../Pages/admin/ContactInfo'
import { AdminLogin } from '../Pages/admin/AdminLogin'

import { PackagesPage } from '../Pages/PackagesPage'
import AddressPage from '../Pages/AddressPage'
import ConformationPage from '../Pages/ConformationPage'
import AdminBookingPackages from '../Pages/admin/AdminBookingPackages'
import AdminBookingDetails from '../Pages/admin/AdminBookingDetails'
import AdminBusPassengers from '../Pages/admin/AdminBusPassengers'
import AllPackages from '../Pages/admin/AllPackages'
import { AdminExpense } from '../Pages/admin/AdminExpense'
import ToursPage from '../Pages/ToursPage'
import EditPackage from '../Pages/admin/EditPackage'
import { AdminAuth } from './protectedRoutes/AdminAuth'


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
                             path: "checkout/:id",
                             element: <CheckoutPage/>
                         },
                          {
                             path: "address/:id",
                             element: <AddressPage/>
                         },
                         {
                             path: "package",
                             element: <PackagesPage/>
                         },  
                          {
                             path: "tours",
                             element: <ToursPage/>
                         },  



           
        ]},

 {
        path: "/",
        // element:<RootLayout/>,
        children:[
          {
                             path: "confirm/:id",
                             element: <ConformationPage/>
                         }, 


           
        ]},





     {
        path: "/admin",
        element:<AdminAuth><AdminLayout/></AdminAuth>,
        children:[
             
            {
                path: "home",
                element: <AdminHomePage/>
            },
{
                path: "package",
                element: < CreatePackageForm/>
            },
            {
                path: "editpackage/:id",
                element:<EditPackage/>
            },
             {
                path: "bookings/:id",
                element: < Bookings/>
            }, 
            {
                path: "booking/:id",
                element: < AdminBookingDetails/>
            },  
              {
                path: "allPackages",
                element: <  AdminBookingPackages/>
            }, 
           
            {
                path: "contact",
                element: < ContactInfoAdmin/>
            },   
             {
                path: "PackagesList",
                element: < AllPackages/>
            },   
             {
                path: "passengers/:id",
                element: < AdminBusPassengers/>
            },          
{
                path: "AdminExpense",
                element: < AdminExpense/>
            },  

           
        ]},

         {
        path: "/admin",
        // element:<AdminLayout/>,
        children:[
              {
                path: "login",
                element: <AdminLogin/>
            },
         

           
        ]},

])
