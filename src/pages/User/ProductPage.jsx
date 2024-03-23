import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import { useNavigate } from 'react-router-dom';
import { collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { toast } from 'sonner';
import LoadingSkeleton from '../Components/LoadingSkeleton';
import { countProduct, deleteProduct, fetchProductWithPagination } from '../../api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function ProductPage() {
  const [filter,setFilter] = useState(false);

  const [sortField,setSortField] = useState("createdAt");
  const [sortDir,setSortDir] = useState("desc")
  const [page,setPage] = useState(1);
  const [btn,setBtn] = useState(null);
  const [shot,setSnapShot] = useState(null);

  
  const [pageSize,setPageSize] = useState(7);
  
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { isLoading: productsCountStatus, isError: productsCountError, data: productCount } =  useQuery(
    { queryKey: ['productCount'] , queryFn : ()=>countProduct()}
  );
  
  
  const { isLoading : productsFetchingStatus, isError : productsFetchingError, data : productsPage } = useQuery(
    { queryKey: ['productsPage',{page}] , 
      queryFn: ()=>fetchProductWithPagination(btn,sortField,sortDir,shot,pageSize), 
      cacheTime : 0,
      staleTime : Infinity,
     }
  );


  const handleClick = (e)=>{
    e.preventDefault();
    setFilter(!filter)
  }
  const clickFilter = (e,slug)=>{
    e.preventDefault();
    alert(slug);
  }

  
  const deleteProductBtn = async (e,id)=>{
    if (window.confirm("Do you really want to delete?")) {
      await deleteProductMutation({id});
    }
  }

  const { mutateAsync : deleteProductMutation  } = useMutation({
    mutationFn : deleteProduct,
    onSuccess : ()=>{
        toast.success("Product deleted Successfully");
        queryClient.invalidateQueries(['productsPage']);
        queryClient.invalidateQueries(['products']);
    },
    onError : ()=>{
        toast.error("error")
    }
  })

  return (
    <div>
      <Navbar />
      <div className='flex'>
        <Sidebar route={"/product"} />
        <div className='flex flex-col gap-3 justify-center w-full p-9 pt-3'>
          <p className='flex font-bold text-3xl'>Product</p>
          <div className='flex items-center flex-wrap relative'>
          <button onClick={()=>{
            navigate("/product/create?page=product")
            }} className='rounded-full mr-3 my-1 border-2 py-1 px-8  font-medium text-xs cursor-pointer hover:scale-105 transition bg-yellow-700 text-white'>ADD</button>
            <button onClick={(e)=>clickFilter(e,"latest")} className='rounded-full mr-3 my-1 border-2 py-1 px-8 bg-white font-medium text-xs cursor-pointer hover:scale-105 transition'>Latest</button>
            <div className= {filter ? 'flex flex-wrap items-center' : 'hidden' }>
                <button onClick={(e)=>clickFilter(e,"name")} className='rounded-full mr-3 my-1 border-2 py-1 px-8 bg-white font-medium text-xs cursor-pointer hover:scale-105 transition'>Name</button>
                <button onClick={(e)=>clickFilter(e,"cost")} className='rounded-full mr-3 my-1 border-2 py-1 px-8 bg-white font-medium text-xs cursor-pointer hover:scale-105 transition'>Cost</button>
                <button onClick={(e)=>clickFilter(e,"price")} className='rounded-full mr-3 my-1 border-2 py-1 px-8 bg-white font-medium text-xs cursor-pointer hover:scale-105 transition'>Price</button>
                <button onClick={(e)=>clickFilter(e,"cateogry")} className='rounded-full mr-3 my-1 border-2 py-1 px-8 bg-white font-medium text-xs cursor-pointer hover:scale-105 transition'>Category</button>
                <button onClick={(e)=>clickFilter(e,"stock")} className='rounded-full mr-3 my-1 border-2 py-1 px-8 bg-white font-medium text-xs cursor-pointer hover:scale-105 transition'>Stock</button>
                <button onClick={(e)=>clickFilter(e,"descount")} className='rounded-full mr-3 my-1 border-2 py-1 px-8 bg-white font-medium text-xs cursor-pointer hover:scale-105 transition'>Discount</button>
            </div>
              <div onClick={handleClick} className='flex mr-3 my-1 items-center space-x-1 cursor-pointer hover:scale-105 transition'>
                  <svg className='font-medium' xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round"><path d="M10 8h10M4 16h10"/><circle cx="7" cy="8" r="3" transform="rotate(90 7 8)"/><circle cx="17" cy="16" r="3" transform="rotate(90 17 16)"/></g></svg>
                  <p className='font-medium text-xs'>Filter</p>
              </div>
          </div>
          <div className='p-6 mt-3 border rounded-lg shadow-lg min-h-screen '>
              <header className='font-bold text-sm flex justify-between'>
                  <p className='w-12'>ID</p>
                  <p className='lg:w-48'>Name</p>
                  <p className='w-12 hidden lg:block'>Cost</p>
                  <p className='w-12 hidden md:block'>Price</p>
                  <p className='w-36 hidden lg:block'>Category</p>
                  <p className='w-16 hidden lg:block'>Discount</p>
                  <p className='w-48 flex justify-end'>State</p>
              </header>
              {
                productsPage ? 
                <div>
                  {
                    productsPage?.length >0 ? productsPage?.map((item,i)=>(
                        <div key={i} className='font-bold text-sm flex justify-between items-center my-6 border-b-2 pb-3'>
                            <p className='w-12'>{i+1}</p>
                            <div className='lg:w-48'>
                            <p className='font-medium text-gray-600 line-clamp-1 truncate'>{item.name}</p>
                            <p className='font-normal line-clamp-1 text-xs text-gray-500 mt-3'>Stock:{item.stock}</p>
                            </div>
                            <p className='w-12 font-medium text-gray-600 line-clamp-1  hidden lg:block'>{item.cost}</p>
                            <p className='w-12 font-medium text-gray-600 line-clamp-1  hidden md:block'>{item.price}</p>
                            <p className='w-36 font-medium text-gray-600 line-clamp-1  hidden lg:block'>{item.category}</p>
                            <p className='w-16 font-medium text-gray-600 line-clamp-1  hidden lg:block'>{item.discount}%</p>
                            <p className='w-48 flex gap-3 flex-wrap justify-end '>  
                              <button onClick={()=>navigate(`/product/edit/${item.id}`)} className='font-medium text-xs py-1 rounded-full px-4 text-white bg-yellow-700 w-fit  my-1'>Edit</button>
                              <button onClick={ (e)=>deleteProductBtn(e,item.id)} className='font-medium text-xs py-1 rounded-full px-4 text-white bg-red-500 w-fit  my-1'>Delete</button> 
                            </p>
                        </div>
                    )) : 
                    <div className='w-full h-screen flex justify-center items-center text-xs'>
                      <p>No Items</p>
                    </div>
                }
                </div> :
                  <div className='flex min-h-screen justify-center items-center'>
                    <LoadingSkeleton />
                  </div>
              }
              <div className='flex gap-6 w-full justify-end items-center'>
                  {
                    productsPage &&
                    <p className='text-xs font-medium text-gray-600 line-clamp-1  hidden lg:block'>Products Total : { pageSize*page > productCount ? productCount + "/" +  productCount : pageSize * page + "/" + productCount}</p>
                  }
                  { page>1 &&  productsPage && <div className='flex justify-end'>
                      <button onClick={ async()=>{
                        setPage(prevPage => prevPage-1);
                        setBtn("back");
                        setSnapShot(productsPage[0].querySnapshot);
                        await fetchProductWithPagination("back",sortField,sortDir,productsPage[0].querySnapshot,pageSize);
                        }}  className='font-medium text-xs py-1 rounded-md px-4 text-white bg-black  my-1 hidden xl:block'>Back</button>
                  </div>}
                  { pageSize * page < productCount &&  productsPage && <div className=' flex justify-end'>
                      <button onClick={ async ()=>{
                        setPage(prevPage => prevPage+1)
                        setBtn("next");
                        setSnapShot(productsPage[0].querySnapshot);
                        await fetchProductWithPagination("next",sortField,sortDir,productsPage[0].querySnapshot,pageSize)
                        }}  className='font-medium text-xs py-1 rounded-md px-4 text-white bg-black  my-1 hidden xl:block'>Next</button>
                  </div>}
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}
