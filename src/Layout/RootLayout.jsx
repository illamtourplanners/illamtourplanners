import React from 'react'

import { Header } from '../Components/CommonLayout/Header'
import { Footer } from '../Components/CommonLayout/Footer'
import { Outlet } from 'react-router-dom'

export const RootLayout = () => {
  return (
    <div >
    <Header/>
        <div className='min-h-screen'><Outlet/></div>
      <Footer/>
      </div>
  )
}
