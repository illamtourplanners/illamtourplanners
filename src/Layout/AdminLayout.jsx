import React from 'react'


import { Outlet } from 'react-router-dom'
import Sidebar from '../Components/admin/Sidebar'

export const AdminLayout = () => {
  return (
    <div className='flex'>
    <Sidebar />
        <div className='min-h-screen ml-20 w-full'><Outlet/></div>
      {/* <Footer/> */}
      </div>
  )
}
