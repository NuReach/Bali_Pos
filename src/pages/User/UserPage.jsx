import React from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'

export default function UserPage() {
  return (
    <div>
        <Navbar />
        <Sidebar route={"/user"} />
    </div>
  )
}
