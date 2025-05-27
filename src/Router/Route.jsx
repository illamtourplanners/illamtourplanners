import React from 'react'

import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '../Pages/HomePage'
import { RootLayout } from '../Layout/RootLayout'

export const router=createBrowserRouter([
 {
        path: "/",
        element:<RootLayout/>,
        children:[
            {
                path: "Home",
                element: <HomePage/>
            },


        ]},

    

])
