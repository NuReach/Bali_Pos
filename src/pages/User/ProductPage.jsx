import React from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'

export default function ProductPage() {
  return (
    <div>
      <Navbar />
      <Sidebar route={"/product"} />
    </div>
  )
}
