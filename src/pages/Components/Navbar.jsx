import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { filterMenu, searchMenu, showCartDailog, showSidebarDailog } from '../../functionSlice';
import NavbarSkeleton from './NavbarSkeleton';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { fetchCategories, fetchProducts } from '../../api';
import { useNavigate } from 'react-router-dom';



export default function Navbar() {

  const key = useSelector((state)=>state.function.filterMenuKey);

  const navigate = useNavigate();
  
  const { isLoading : productsFetchingStatus, isError : productsFetchingError, data : products } = useQuery(
    { queryKey: ['products',{key}], queryFn: ()=>fetchProducts(key) }
  )

  const { isLoading : categoriesFetchingStatus, isError : categoriesFetchingError, data : categories } = useQuery(
    { queryKey: ['categories'], queryFn: ()=> fetchCategories() }
  )
  const dispatch = useDispatch();

  const showCart = (e)=>{
    e.preventDefault();
    dispatch(showCartDailog())
  }
  const showSidebar = (e)=>{
    e.preventDefault();
    dispatch(showSidebarDailog())
  }

  const queryClient = new QueryClient();

  const handleFilterMenu = (e,filter)=>{
    e.preventDefault();
    dispatch(filterMenu({key:filter.toLowerCase()}));
    navigate("/");
  }


 
  const [search,setSearch] = useState("");


  const handleChange = (e)=>{
    e.preventDefault();
    setSearch(e.target.value);
    dispatch(searchMenu({key:e.target.value}));
  }



  const handleSearch = (e)=>{
    e.preventDefault();
    navigate(`/search/${search}`);
  }

  
  return (
    <nav className='p-3 pl-9 flex justify-between items-center border-b relative'>
        <section className='hidden md:block'>
            <img src="/logo.jpg" alt="" className='w-16 h-16' />
        </section>
        {
          categories ? 
          <div className='md:flex flex flex-wrap justify-between items-center gap-3 md:gap-9 p-3 '>
          {
            categories?.map((item,i)=>(
                <div key={i}>
                    <button onClick={(e)=>handleFilterMenu(e,item.name.toLowerCase())} className={ key?.toLowerCase() == item.name.toLowerCase() ? 'text-white bg-yellow-700 rounded-lg px-4 py-1 text-xs font-medium' : 'text-yellow-700 text-sm font-medium'}>{item.name}</button>
                </div>
            ))
          }
          </div> :
          <div>
            <NavbarSkeleton />
          </div>

        }
        <section className='sm:flex justify-center items-center gap-3 hidden  '>
            <form onSubmit={handleSearch} className='relative'>
                <svg className='absolute right-3 h-full' xmlns="http://www.w3.org/2000/svg" width="18" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5q0-1.875-1.312-3.187T9.5 5Q7.625 5 6.313 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14"/></svg>
                <input onChange={handleChange} value={search} type="text" placeholder='search foods..'  className='border-2 text-xs w-60  shadow-lg rounded-full px-3 py-2' />
            </form>
        </section>
        <section className='lg:hidden flex gap-3'>
        <svg onClick={showCart} className='text-yellow-700 font-bold cursor-pointer hover:scale-105 transition ' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M6.615 21q-.69 0-1.152-.462Q5 20.075 5 19.385V8.615q0-.69.463-1.152Q5.925 7 6.615 7H8.5v-.5q0-1.458 1.021-2.479T12 3q1.458 0 2.479 1.021T15.5 6.5V7h1.885q.69 0 1.152.463q.463.462.463 1.152v10.77q0 .69-.462 1.152q-.463.463-1.153.463zM9.5 7h5v-.5q0-1.056-.722-1.778T12 4q-1.056 0-1.778.722T9.5 6.5zm5.5 4q.213 0 .357-.143q.143-.144.143-.357V8h-1v2.5q0 .213.143.357q.144.143.357.143m-6 0q.213 0 .357-.143q.143-.144.143-.357V8h-1v2.5q0 .213.143.357Q8.787 11 9 11"/></svg>
        <svg onClick={showSidebar} className='text-yellow-700 font-bold cursor-pointer hover:scale-105 transition ' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 6h18M3 12h18M3 18h18"/></svg>
        </section>  
    </nav>
  )
}
