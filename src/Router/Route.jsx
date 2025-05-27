import React from 'react'

import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '../Pages/HomePage'
import { RootLayout } from '../Layout/RootLayout'
import { AboutPage } from '../Pages/AboutPage'

export const router=createBrowserRouter([
 {
        path: "/",
        element:<RootLayout/>,
        children:[
            {
                path: "Home",
                element: <HomePage/>
            },
  {
                path: "About",
                element: <AboutPage/>
            },

             

        ]},

    

])
