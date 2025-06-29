import React from 'react'


import { Outlet } from 'react-router-dom'

import AdminHeader from '../Components/admin/AdminHeader'

export const AdminLayout = () => {
  return (
    // <div className='flex'>
     <div className="min-h-screen ml-20 w-full">
    <AdminHeader/>
        <div className='min-h-screen ml-20 '><Outlet/></div>
      {/* <Footer/> */}
      </div>
  )
}
