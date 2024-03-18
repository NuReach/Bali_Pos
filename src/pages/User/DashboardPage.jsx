import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import Perfomance from '../Components/Perfomance'
import products from '../products';

export default function DashboardPage() {
  const [data,setData] = useState(products.slice(0,5));
  return (
    <div>
        <Navbar />
        <div className='flex'>
        	  <Sidebar route={"/dashboard"} />
            <div className='w-full p-9 px-16 mt-3'>
                <div>
                  <p className='font-bold text-3xl '>Overview</p>
                </div>
                <div className='mt-3 flex flex-col justify-center gap-9' >
                  <div className='gap-3  flex flex-wrap justify-between'>
                    <div className='p-6 rounded-lg border shadow-lg flex flex-col gap-3 sm:w-72 w-full '>
                      <section className='flex gap-3 items-center'>
                        <div className='w-9 h-9 bg-yellow-500 rounded-lg'>
                        </div>
                        <p className='font-bold text-sm'>Today Income</p>
                        <div className='w-12 h-1 bg-yellow-500 ml-9'>
                        </div>
                      </section>
                      <section>
                        <p className='text-2xl font-bold'>USD $1236.99</p>
                      </section>
                      <section>
                        <p className='text-xs text-gray-500'>Sale 23 Products</p>
                      </section>
                    </div>
                    <div className='p-6 rounded-lg border shadow-lg flex flex-col gap-3 sm:w-72 w-full'>
                      <section className='flex gap-3 items-center'>
                        <div className='w-9 h-9 bg-green-500 rounded-lg'>
                        </div>
                        <p className='font-bold text-sm'>Total Income</p>
                        <div className='w-12 h-1 bg-green-500 ml-9'>
                        </div>
                      </section>
                      <section>
                        <p className='text-2xl font-bold'>USD $1236.99</p>
                      </section>
                      <section>
                        <p className='text-xs text-gray-500'>Last week USD $850.99 </p>
                      </section>
                    </div>
                    <div className='p-6 rounded-lg border shadow-lg flex flex-col gap-3 sm:w-72 w-full'>
                      <section className='flex gap-3 items-center'>
                        <div className='w-9 h-9 bg-blue-500 rounded-lg'>
                        </div>
                        <p className='font-bold text-sm'>Total Quantity</p>
                        <div className='w-12 h-1 bg-blue-500 ml-9'>
                        </div>
                      </section>
                      <section>
                        <p className='text-2xl font-bold'>369 Sales</p>
                      </section>
                      <section>
                        <p className='text-xs text-gray-500'>Last week 233 Sales </p>
                      </section>
                    </div>
                    <div className='p-6 rounded-lg border shadow-lg flex flex-col gap-3 sm:w-72 w-full'>
                      <section className='flex gap-3 items-center'>
                        <div className='w-9 h-9 bg-orange-400 rounded-lg'>
                        </div>
                        <p className='font-bold text-sm'>Total Product</p>
                        <div className='w-12 h-1 bg-orange-400 ml-9'>
                        </div>
                      </section>
                      <section>
                        <p className='text-2xl font-bold'>80 Prodcuts</p>
                      </section>
                      <section>
                        <p className='text-xs text-gray-500'>Total Category 8 </p>
                      </section>
                    </div>
                  </div>
                  <div className='flex flex-wrap xl:flex-nowrap justify-between gap-3 w-full'>
                    <div className='w-full'>
                      <Perfomance />
                    </div>
                    <div className='p-6 border rounded-lg shadow-lg w-full h-96'>
                      <p className='font-bold text-lg mb-3'>Top Sale Items</p>
                        <header className='font-bold text-sm flex justify-between'>
                            <p className='w-12'>ID</p>
                            <div className='w-48'>
                              <p className='w-48'>Name</p>  
                            </div>
                            <p className='lg:w-48'>Quantiy</p>
                        </header>
                        {
                            data.map((item,i)=>(
                                <div className='font-bold text-sm flex justify-between items-center my-5 border-t-2 pt-3'>
                                    <p className='w-12'>{i+1}</p>
                                    <div className='w-48'>
                                    <p className='font-medium text-gray-600 line-clamp-1 truncate'>{item.name}</p>                      
                                    </div>
                                    <p className='lg:w-48 font-medium text-gray-600 line-clamp-1 '>{item.cost}</p>
                                </div>
                            ))
                        }
                    </div>  
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}
