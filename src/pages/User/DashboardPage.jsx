import React from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'

export default function DashboardPage() {
  return (
    <div>
        <Navbar />
        <Sidebar route={"/dashboard"} />
    </div>
  )
}
