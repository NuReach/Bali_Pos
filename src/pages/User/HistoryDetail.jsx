import React from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'

export default function HistoryDetail() {
  return (
    <div>
        <Navbar />
        <div className='flex'>
            <Sidebar route={"/history"} />
            
        </div>
    </div>
  )
}
