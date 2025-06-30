import React from 'react'


import { Outlet } from 'react-router-dom'

import AdminHeader from '../Components/admin/AdminHeader'

export const AdminLayout = () => {
  return (
    // <div className='flex'>
     <div className="min-h-screen w-full">
    <AdminHeader/>
        <div className='min-h-screen  '><Outlet/></div>
      {/* <Footer/> */}
      </div>
  )
}
