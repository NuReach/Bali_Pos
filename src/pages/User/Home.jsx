import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import Cart from '../Components/Cart'
import products from '../products';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartReducer } from '../../functionSlice';
import Sidebar from '../Components/Sidebar';

export default function Home() {
  const [data,setData] = useState(products);
  const value = useSelector((state)=>state.function.value);
  const dispatch = useDispatch();
  const cart = useSelector((state)=>state.function.cart);
  const [category,setCategory] = useState(["All Items","Coffee","Non-Coffee","Beverage","Snacks"]);


  const addToCart = (e,item)=>{
    e.preventDefault();
    dispatch(addToCartReducer({item}));
  }

  const route = "All Items";
  return (
    <div>
        <Navbar  />
        <div className='flex justify-between'>
          <Sidebar route={"/"} />
          <div>
            <div className='lg:hidden items-center gap-6 border-b-2 p-3 justify-center flex flex-wrap  '>
                {
                    category.map((item,i)=>(
                        <div key={i}>
                            <button className={ route == item ? 'text-white bg-yellow-700 rounded-lg px-4 py-1 text-xs font-medium' : 'text-yellow-700 text-sm font-medium'}>{item}</button>
                        </div>
                    ))
                }
            </div>
            <div className='w-full p-3 gap-6 flex flex-wrap justify-center h-fit'>
              {
                data.map((item,i)=>(
                  <div onClick={(e)=>addToCart(e,item)} key={i} className={ cart.find((x)=>x.item.id == item.id) ? 'p-3 border-2 flex border-yellow-700  rounded-lg w-72 h-24 gap-6 cursor-pointer' : 'p-3 border-2 flex  rounded-lg w-72 h-24 gap-6 cursor-pointer'}>
                    <img src={item.image} className='w-20 h-full rounded-lg object-cover' alt="" />
                    <div>
                      <p className='font-medium text-sm truncate'>{item.name}</p>
                      <p className='font-medium text-xs text-gray-400 truncate w-32'>{item.description}</p>
                      <p className='font-medium text-sm text-yellow-700 truncate'>USD ${item.price}</p>
                      
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          <Cart />
        </div>
    </div>
  )
}
