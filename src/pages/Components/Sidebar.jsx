import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar({route}) {
  const [pages,setPages] = useState([
    {
        title : "Menu",
        link : "/",
        icon : '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M22 13c0 1.11-.89 2-2 2H4a2 2 0 1 1 0-4h9l2.5 2l2.5-2h2a2 2 0 0 1 2 2M12 3C3 3 3 9 3 9h18s0-6-9-6M3 18c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3v-1H3z"/></svg>',
    },
    {
        title : "Product",
        link : "/product",
        icon : '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="4"><path d="M44 14L24 4L4 14v20l20 10l20-10z"/><path stroke-linecap="round" d="m4 14l20 10m0 20V24m20-10L24 24M34 9L14 19"/></g></svg>',
    },
    {
        title : "Dashboard",
        link : "/dashboard",
        icon : '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h6v18zm8 0v-9h8v7q0 .825-.587 1.413T19 21zm0-11V3h6q.825 0 1.413.588T21 5v5z"/></svg>',
    },
    {
        title : "History",
        link : "/history",
        icon : '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 10.85L6.075 7.425L5 8.05V9.1l7 4.05l7-4.05V8.05l-1.075-.625zm-1 10.875L4 17.7q-.475-.275-.737-.725t-.263-1v-7.95q0-.55.263-1T4 6.3l7-4.025Q11.475 2 12 2t1 .275L20 6.3q.475.275.738.725t.262 1v4.65q-.675-.325-1.437-.5T18 12q-2.9 0-4.95 2.05T11 19q0 .8.163 1.538t.487 1.412q-.175-.05-.337-.087T11 21.725M18 24q-2.075 0-3.537-1.463T13 19q0-2.075 1.463-3.537T18 14q2.075 0 3.538 1.463T23 19q0 2.075-1.463 3.538T18 24m.5-5.2V16h-1v3.2l2.15 2.15l.7-.7z"/></svg>',
    },
    {
        title : "User",
        link : "/user",
        icon : '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 13q1.45 0 2.475-1.025T15.5 9.5q0-1.45-1.025-2.475T12 6q-1.45 0-2.475 1.025T8.5 9.5q0 1.45 1.025 2.475T12 13m-7 8q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14v-1.15q-1.35-1.325-3.137-2.087T12 15q-2.075 0-3.863.763T5 17.85z"/></svg>',
    }
  ])
  return (
    <div className='lg:flex flex-col gap-6 w-36 hidden border-r min-h-screen shadow-lg'>
        <section className='flex flex-col gap-6 p-6'>
            {
                pages.map((item,i)=>(
                    <Link to={item.link} key={i} className={route == item.link ? ' bg-yellow-700 text-white p-3 w-24 flex flex-col gap-1 rounded-lg justify-center items-center' : '  text-gray-700 p-3 w-24 flex flex-col gap-1 rounded-lg justify-center items-center'}>
                    <div dangerouslySetInnerHTML={{ __html: item.icon }} />
                    <p className='text-xs font-medium'>{item.title}</p>
                    </Link>
                ))
            }
        </section>
    </div>
  )
}
