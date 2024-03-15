import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import Slidebar from '../Components/Slidebar'
import Cart from '../Components/Cart'
import products from '../products';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartReducer } from '../../functionSlice';

export default function Home() {
  const [data,setData] = useState(products);
  const value = useSelector((state)=>state.function.value);
  const dispatch = useDispatch();
  console.log(value);
  const addToCart = (e,item)=>{
    e.preventDefault();
    dispatch(addToCartReducer({item}));
  }
  return (
    <div>
        <Navbar />
        <div className='flex justify-between'>
          <Slidebar />
          <div className='w-full p-3 gap-6 flex flex-wrap justify-center h-fit'>
            {
              data.map((item,i)=>(
                <div onClick={(e)=>addToCart(e,item)} key={i} className='p-3 border-2 flex border-yellow-700 rounded-lg w-72 h-24 gap-6 cursor-pointer'>
                  <img src={item.image} className='w-20 h-full rounded-lg object-cover' alt="" />
                  <div>
                    <p className='font-medium text-sm truncate'>{item.name}</p>
                    <p className='font-medium text-sm text-yellow-700 truncate'>USD ${item.price}</p>
                    <p className='font-medium text-xs text-gray-400 truncate'>Stock : {item.stock}</p>
                    
                  </div>
                </div>
              ))
            }
          </div>
          <Cart />
        </div>
    </div>
  )
}
