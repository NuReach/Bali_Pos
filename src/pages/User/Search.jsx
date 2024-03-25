import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Cart from '../Components/Cart'
import { useDispatch, useSelector } from 'react-redux';
import { addToCartReducer, filterMenu } from '../../functionSlice';
import Sidebar from '../Components/Sidebar';
import LoadingSkeleton from '../Components/LoadingSkeleton';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories, fetchProducts, searchProduct } from '../../api';
import { useParams } from 'react-router-dom';



export default function Search() {
  const dispatch = useDispatch();

  const cart = useSelector((state)=>state.function.cart);

  const [key,setKey] = useState("");

  const filter = useSelector((state)=>state.function.filterMenuKey);

  const {search} = useParams();

  
  const { isLoading : categoriesFetchingStatus, isError : categoriesFetchingError, data : categories } = useQuery(
    { queryKey: ['categories'],queryFn: ()=> fetchCategories() }
  )

 const { isLoading : searchResultFetchingStatus, isError : searchResultFetchingError, data : products } = useQuery(
    { queryKey: ['searchResult',{search}],queryFn: ()=> searchProduct(search) }
  )
  
  console.log(products);


  const addToCart = (e,item,stock)=>{
    e.preventDefault();
    if (stock == 0) {
      alert("Out of stock")
    }else{
      dispatch(addToCartReducer({item}));
    }
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
                      <div  onClick={(e)=>addToCart(e,item,item.stock)} key={i} className={ cart.find((x)=>x.item.id == item.id) ? 'p-2 border-2 flex flex-col border-yellow-700  rounded-lg w-32 h-56 gap-1 cursor-pointer' : 'p-2 border-2 flex flex-col  rounded-lg w-32 h-56 gap-1 cursor-pointer'}>
                        <img src={item.image} className='w-full h-24 rounded-lg object-cover' alt="" />
                        <div>
                          <p className='font-medium text-sm line-clamp-2 h-11'>{item.name}</p>
                          <p className='font-medium text-xs text-gray-400 truncate '>{item.category}</p>
                          <p className={ item.stock < 10 ? 'text-xs text-red-600 font-bold truncate ' : 'font-medium text-xs text-gray-400 truncate ' }>Stock : {item.stock}</p>
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
