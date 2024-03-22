import React, {  } from 'react'
import Navbar from '../Components/Navbar'
import Cart from '../Components/Cart'
import { useDispatch, useSelector } from 'react-redux';
import { addToCartReducer } from '../../functionSlice';
import Sidebar from '../Components/Sidebar';
import LoadingSkeleton from '../Components/LoadingSkeleton';
import { useQuery } from '@tanstack/react-query';



export default function Home() {
  const dispatch = useDispatch();

  const cart = useSelector((state)=>state.function.cart);

  const key = useSelector((state)=>state.function.filterMenuKey);


  const { isLoading : productsFetchingStatus, isError : productsFetchingError, data : products } = useQuery(
    { queryKey: ['products',{key}] }
  )

  const { isLoading : categoriesFetchingStatus, isError : categoriesFetchingError, data : categories } = useQuery(
    { queryKey: ['categories']}
  )

  const addToCart = (e,item)=>{
    e.preventDefault();
    dispatch(addToCartReducer({item}));
  }

  
  return (
    <div>
        <Navbar  />
        <div className='flex justify-between'>
          <Sidebar route={"/"} />
          <div className='w-full'>
  
              <div className='w-full p-3 gap-6 flex flex-wrap justify-center h-fit'>
                {
                  products ?
                    products.map((item,i)=>(
                      <div  onClick={(e)=>addToCart(e,item)} key={i} className={ cart.find((x)=>x.item.id == item.id) ? 'p-3 border-2 flex border-yellow-700  rounded-lg w-72 h-24 gap-6 cursor-pointer' : 'p-3 border-2 flex  rounded-lg w-72 h-24 gap-6 cursor-pointer'}>
                        <img src={item.image} className='w-20 h-full rounded-lg object-cover' alt="" />
                        <div>
                          <p className='font-medium text-sm truncate'>{item.name}</p>
                          <p className='font-medium text-xs text-gray-400 truncate w-32'>{item.category}</p>
                          <p className='font-medium text-sm text-yellow-700 truncate'>USD ${item.price}</p>
                        
                        </div>
                      </div>
                    )) :
                    <div className='w-full h-screen flex justify-center items-center'>
                      <LoadingSkeleton />
                    </div>
                }
              </div>
          
          </div>
          <Cart />
        </div>
    </div>
  )
}
