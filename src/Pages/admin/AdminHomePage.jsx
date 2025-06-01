import React from 'react'
import Sidebar from '../../Components/admin/Sidebar'

export default function AdminHomePage() {
  return (
   <div className=" bg-gray-100">
      {/* <Sidebar /> */}
      <div className="ml-28 p-6 w-full bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-semibold mb-4">Welcome Admin</h1>
        <p className="text-gray-700">This is the admin dashboard home page.</p>
        {/* You can add cards, stats, charts etc. here */}
      </div>
    </div>
  )
}