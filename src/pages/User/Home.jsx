import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Cart from '../Components/Cart'
import { useDispatch, useSelector } from 'react-redux';
import { addToCartReducer, filterMenu } from '../../functionSlice';
import Sidebar from '../Components/Sidebar';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import LoadingSkeleton from '../Components/LoadingSkeleton';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function Home() {
  const [data,setData] = useState();
  const [filterData,setFilterData] = useState();
  const dispatch = useDispatch();
  const cart = useSelector((state)=>state.function.cart);
  
  const [categories,setCategories]= useState([]);

  const addToCart = (e,item)=>{
    e.preventDefault();
    console.log(item);
    dispatch(addToCartReducer({item}));
  }
 

  //filter
  const key = useSelector((state)=>state.function.filterMenuKey);
  useEffect(()=>{
    if (key == "all") {
     setFilterData(data);
    }else{
     setFilterData(data.filter((item)=>item.category.toLowerCase()==key.toLowerCase()));
    }
  },[key])


  //search
  const searchKey = useSelector((state)=>state.function.searchKey);
  console.log(searchKey);
  useEffect(()=>{
    if (searchKey == "") {
     setFilterData(data);
    }else{
     setFilterData(data.filter((item)=>item.name.toLowerCase().includes(searchKey.toLowerCase())));
    }
  },[searchKey])
  

  const handleFilterMenu = (e,filter)=>{
    e.preventDefault();
    dispatch(filterMenu({key:filter.toLowerCase()}));
  }
  
  //fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const categoriesData = querySnapshot.docs.map(doc => ({
        ...doc.data()
      }));
      setCategories(categoriesData);
    }
    fetchCategories();
  }, []);

  


  //fetch Product
  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productData = querySnapshot.docs.map(doc => ({
        ...doc.data()
      }));
      setData(productData);
    }
    fetchProducts();
  }, []);

  console.log(data);

  return (
    <div>
        <Navbar  />
        <div className='flex justify-between'>
          <Sidebar route={"/"} />
          <div className='w-full'>
            <div className='lg:hidden items-center gap-6 border-b-2 p-3 justify-center flex flex-wrap  '>
            {
              categories ? 
              <div className='lg:flex justify-between items-center gap-9 p-3 hidden  '>
                  <div>
                      <button onClick={(e)=>handleFilterMenu(e,"all")} className={ key.toLowerCase() == "all" ? 'text-white bg-yellow-700 rounded-lg px-4 py-1 text-xs font-medium' : 'text-yellow-700 text-sm font-medium'}>ALL</button>
                  </div>
                  {
                      categories?.map((item,i)=>(
                          <div key={i}>
                              <button onClick={(e)=>handleFilterMenu(e,item.name.toLowerCase())} className={ key.toLowerCase() == item.name.toLowerCase() ? 'text-white bg-yellow-700 rounded-lg px-4 py-1 text-xs font-medium' : 'text-yellow-700 text-sm font-medium'}>{item.name}</button>
                          </div>
                      ))
                  }
              </div> :
              <div>
                <NavbarSkeleton />
              </div>

            }
            </div>
            {
              filterData ?
                <div className='w-full p-3 gap-6 flex flex-wrap justify-center h-fit'>
                {
                  filterData ?
                    filterData.map((item,i)=>(
                      <div onClick={(e)=>addToCart(e,item)} key={i} className={ cart.find((x)=>x.item.id == item.id) ? 'p-3 border-2 flex border-yellow-700  rounded-lg w-72 h-24 gap-6 cursor-pointer' : 'p-3 border-2 flex  rounded-lg w-72 h-24 gap-6 cursor-pointer'}>
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
              :
              <div className='w-full p-3 gap-6 flex flex-wrap justify-center h-fit'>
                {
                  data ?
                    data.map((item,i)=>(
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
            }
          </div>
          <Cart />
        </div>
    </div>
  )
}
