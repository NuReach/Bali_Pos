import React, { useState } from 'react'

export default function Navbar() {
  const [category,setCategory] = useState(["All Items","Coffee","Non-Coffee","Beverage","Snacks"]);
  const route = "All Items";
  return (
    <nav className='p-3 pl-9 flex justify-between items-center border-b'>
        <section>
            <img src="/logo.jpg" alt="" className='w-16 h-16' />
        </section>
        <div className='lg:flex justify-between items-center gap-9 p-3 hidden  '>
            {
                category.map((item,i)=>(
                    <div key={i}>
                        <button className={ route == item ? 'text-white bg-yellow-700 rounded-lg px-4 py-1 text-xs font-medium' : 'text-yellow-700 text-sm font-medium'}>{item}</button>
                    </div>
                ))
            }
        </div>
        
        <section className='md:flex justify-center items-center gap-3  '>
            <div className='relative'>
                <svg className='absolute right-3 h-full' xmlns="http://www.w3.org/2000/svg" width="18" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5q0-1.875-1.312-3.187T9.5 5Q7.625 5 6.313 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14"/></svg>
                <input type="text" placeholder='search foods..'  className='border-2 text-xs w-60  shadow-lg rounded-full px-3 py-2' />
            </div>
        </section>
    </nav>
  )
}
