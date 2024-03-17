import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import { useNavigate } from 'react-router-dom'
import products from '../products';

export default function UserPage() {
  const navigate = useNavigate();
  const [data,setData] = useState(products);
  return (
    <div>
        <Navbar />
        <div className='flex'>
          <Sidebar route={"/user"} />
          <div className='flex flex-col gap-3 justify-center w-full p-9 pt-3'>
            <p className='flex font-bold text-lg'>User</p>
            <div className='flex items-center flex-wrap relative'>
            <button onClick={()=>{
              navigate("/user/create")
              }} className='rounded-full mr-3 my-1 border-2 py-1 px-8  font-medium text-xs cursor-pointer hover:scale-105 transition bg-yellow-700 text-white'>ADD</button>
              <button onClick={(e)=>clickFilter(e,"latest")} className='rounded-full mr-3 my-1 border-2 py-1 px-8 bg-white font-medium text-xs cursor-pointer hover:scale-105 transition'>Latest</button>
              <button onClick={(e)=>clickFilter(e,"name")} className='rounded-full mr-3 my-1 border-2 py-1 px-8 bg-white font-medium text-xs cursor-pointer hover:scale-105 transition'>Name</button>
            </div>
            <div className='p-6 mt-3 border rounded-lg shadow-lg '>
                <header className='font-bold text-sm flex justify-between'>
                    <p className='w-12'>ID</p>
                    <p className='lg:w-48'>Name</p>
                    <p className='lg:w-48 hidden lg:block'>Password</p>
                    <p className='w-48 flex justify-end'>State</p>
                </header>
                {
                    data.map((item,i)=>(
                        <div className='font-bold text-sm flex justify-between items-center my-6 border-b-2 pb-3'>
                            <p className='w-12'>{i+1}</p>
                            <div className='lg:w-48'>
                            <p className='font-medium text-gray-600 line-clamp-1 truncate'>{item.name}</p>                      
                            </div>
                            <p className='lg:w-48 font-medium text-gray-600 line-clamp-1  hidden lg:block'>{item.cost}</p>
                            <p className='w-48 flex gap-3 flex-wrap justify-end '>  
                              <button onClick={()=>navigate(`/user/edit/${item.id}`)} className='font-medium text-xs py-1 rounded-full px-4 text-white bg-yellow-700 w-fit  my-1'>Edit</button>
                              <button onClick={()=>{
                                  if (window.confirm("Do you really want to delete?")) {
                                      console.log(item.id);
                                    }
                              }} className='font-medium text-xs py-1 rounded-full px-4 text-white bg-red-500 w-fit  my-1'>Delete</button> 
                            </p>
                        </div>
                    ))
                }
                <div className='w-full flex justify-end'>
                    <button className='font-medium text-xs py-1 rounded-md px-4 text-white bg-black  my-1 hidden xl:block'>Next</button>
                </div>
            </div>
          </div>
        </div>
    </div>
  )
}
