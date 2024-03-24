import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import Perfomance from '../Components/Perfomance'
import products from '../products';
import { db } from '../../firebase';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { countCategory, countOrder, countProduct, countTodayIncome, countTodayOrder, getLeastStockProduct, totalIncome } from '../../api';
import LoadingSkeleton from '../Components/LoadingSkeleton';
import { useNavigate } from 'react-router-dom';



export default function DashboardPage() {
  const [data,setData] = useState(products.slice(0,5));
  const [exportData,setExportData] = useState(0);
  const navigate = useNavigate();

  const { isLoading: productsFetchingStatus, isError: productsFetchingError, data: productCount } =  useQuery(
    { queryKey: ['productCount'], queryFn: countProduct }
  );
  const { isLoading: categoriesFetchingStatus, isError: categoriesFetchingError, data: categoryCount } =  useQuery(
    { queryKey: ['categoryCount'], queryFn: countCategory }
  );
  const { isLoading: ordersFetchingStatus, isError: ordersFetchingError, data: orderCount } =  useQuery(
    { queryKey: ['orderCount'], queryFn: countOrder }
  );
  const { isLoading: todayOrdersFetchingStatus, isError: todayOrdersFetchingError, data: orderTodayCount } = useQuery(
    { queryKey: ['orderTodayCount'], queryFn: countTodayOrder }
  ) ;

  const { isLoading: todayIncomeFetchingStatus, isError: todayIncomeFetchingError, data: todayIncome } = useQuery(
    { queryKey: ['todayIncome'], queryFn: countTodayIncome }
  ) ;

  const { isLoading: totalIncomeFetchingStatus, isError: totalIncomeFetchingError, data: total } = useQuery(
    { queryKey: ['total'], queryFn: totalIncome }
  ) ;

  
  const { isLoading: leastStockProductsLoading, isError: leastStockProductsFetching, data: leastStockProducts } = useQuery(
    { queryKey: ['leastStockProducts'], queryFn: getLeastStockProduct }
  ) ;


  console.log(leastStockProducts);

  const exportTodayIncome = async (e)=>{
    e.preventDefault();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = today.getTime();

    const now = Date.now();

    try {
      toast.loading("Please wait for a moment")
      const querySnapshot = await getDocs(collection(db, "cart"),where('createdAt','<=',now));
      const data = querySnapshot.docs.map(doc => ({
        ...doc.data()
      }));
      setExportData(data);
      toast.success("Exported Succesffully");
      printToPDF();
      console.log(data);
    } catch (error) {
      toast.error("Cannot run the process")
      console.log(console.error());
    }finally{
      toast.dismiss();
    }

  }
  
  return (
    <div>
        <Navbar />
        <div className='flex'>
        	  <Sidebar route={"/dashboard"} />
            <div className='w-full p-6 px-16 '>
                <div>
                  <p className='font-bold text-3xl '>Overview</p>
                </div>
                <div className='mt-3 flex flex-col justify-center gap-9' >
                  <div className='gap-3  flex flex-wrap justify-between'>
                    <div className='p-6 rounded-lg border shadow-lg flex flex-col gap-3 sm:w-72 w-full '>
                      <section className='flex gap-3 items-center'>
                        <div className='w-9 h-9 bg-yellow-500 rounded-lg'>
                        </div>
                        <p className='font-bold text-sm'>TOTAL INCOME</p>
                        <div className='w-10   h-1 bg-yellow-500 ml-9'>
                        </div>
                      </section>
                      <section>
                        <p className='text-2xl font-bold'>USD ${ total ? total?.toFixed(2) : "..."}</p>
                      </section>
                      {/* <section>
                        <p className='text-xs text-gray-500'>Sale 23 Products</p>
                      </section> */}
                    </div>
                    <div className='p-6 rounded-lg border shadow-lg flex flex-col gap-3 sm:w-72 w-full'>
                      <section className='flex gap-3 items-center'>
                        <div className='w-9 h-9 bg-green-500 rounded-lg'>
                        </div>
                        <p className='font-bold text-sm'>Today Income</p>
                        <div className='w-12 h-1 bg-green-500 ml-9'>
                        </div>
                      </section>
                      <section>
                        <p className='text-2xl font-bold'>USD ${todayIncome ? todayIncome?.toFixed(2) : "..."}</p>
                      </section>
                      <section onClick={exportTodayIncome}>
                          <p className='text-xs font-bold text-gray-500 hover:text-gray-700 transition cursor-pointer'>Generate Data</p>
                      </section>
                    </div>
                    <div className='p-6 rounded-lg border shadow-lg flex flex-col gap-3 sm:w-72 w-full'>
                      <section className='flex gap-3 items-center'>
                        <div className='w-9 h-9 bg-blue-500 rounded-lg'>
                        </div>
                        <p className='font-bold text-sm'> Total Sales</p>
                        <div className='w-12 h-1 bg-blue-500 ml-9'>
                        </div>
                      </section>
                      <section>
                        <p className='text-2xl font-bold'>{orderCount ? orderCount : "..."} Sales</p>
                      </section>
                      <section>
                        <p className='text-xs text-gray-500 font-bold'>Today {orderTodayCount ? orderCount : "..."} Sales </p>
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
                        <p className='text-2xl font-bold'>{productCount ? productCount : "..."} Prodcuts</p>
                      </section>
                      <section>
                        <p className='text-xs text-gray-500 font-bold'>Total Category {categoryCount ? productCount : "..."} </p>
                      </section>
                    </div>
                  </div>
                  <div className='flex flex-wrap xl:flex-nowrap justify-between gap-3 w-full'>
                    <div className='w-full'>
                      <Perfomance />
                    </div>
                    <div className='p-6 border rounded-lg shadow-lg w-full '>
                      <p className='font-bold text-lg mb-3'>Item In Stock</p>
                        <header className='font-bold text-sm flex justify-between'>
                            <p className='w-12'>ID</p>
                            <div className=' w-24 lg:w-48'>
                              <p className=''>Name</p>  
                            </div>
                            <p className='lg:w-24 text-center'>In Stock</p>
                            <p className='lg:w-24 text-end'>State</p>
                        </header>
                        {
                          leastStockProducts ?
                            leastStockProducts.map((item,i)=>(
                                <div key={i} className='font-bold text-sm flex justify-between items-center my-5 border-t-2 pt-3'>
                                    <p className='w-12'>{i+1}</p>
                                    <div className=' w-24 lg:w-48'>
                                    <p className='font-medium text-gray-600 line-clamp-1 truncate'>{item.name}</p>                      
                                    </div>
                                    <p className='lg:w-24 font-medium text-gray-600 line-clamp-1 text-center'>{item.stock}</p>
                                    <div className='lg:w-24 flex justify-end'>
                                    <button onClick={()=>navigate(`/product/edit/${item.id}`)} className='font-medium text-xs py-1 rounded-full px-4 text-white bg-yellow-700 w-fit  my-1'>Edit</button>
                                    </div>
                                </div>
                            )) :
                            <div className='h-full w-full flex justify-center items-center'>
                               <LoadingSkeleton />
                            </div>
                        }
                    </div>  
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}
