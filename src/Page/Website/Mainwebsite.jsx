import React from 'react'
import Header from '../../component/Website/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../../component/Website/Footer'

export default function Mainwebsite() {
  return (
    <div>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}
