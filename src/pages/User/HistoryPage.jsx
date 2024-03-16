import React from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'

export default function HistoryPage() {
  return (
    <div>
        <Navbar />
        <Sidebar route={"/history"} />
    </div>
  )
}
