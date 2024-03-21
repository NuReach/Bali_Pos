import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import Perfomance from '../Components/Perfomance'
import products from '../products';
import { collection, getAggregateFromServer, getCountFromServer, getDocs, query, sum, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { toast } from 'sonner';
import jsPDF from 'jspdf';


export default function DashboardPage() {
  const [data,setData] = useState(products.slice(0,5));
  const [productCount,setProductCount] = useState(0);
  const [categoryCount,setCategoryCount] = useState(0);
  const [orderCount,setOrderCount] = useState(0);
  const [orderTodayCount,setOrderTodayCount] = useState(0);
  const [total,setTotal] = useState(0);
  const [todayIncome,setTodayIncome] = useState(0);
  const [exportData,setExportData] = useState(0);

  useEffect(()=>{
    const countProduct = async ()=>{
      const coll = collection(db, "products");
      const q = query(coll);
      const snapshot = await getCountFromServer(q);
      setProductCount(snapshot.data().count)
    }
    countProduct();
  },[])


  useEffect(()=>{
    const countCategory = async ()=>{
      const coll = collection(db, "categories");
      const q = query(coll);
      const snapshot = await getCountFromServer(q);
      setCategoryCount(snapshot.data().count)
    }
    countCategory();
  },[])

  useEffect(()=>{
    const countOrder = async ()=>{
      const coll = collection(db, "cart");
      const q = query(coll);
      const snapshot = await getCountFromServer(q);
      setOrderCount(snapshot.data().count)
    }
    countOrder();
  },[])

  
  useEffect(()=>{
    const countTodayOrder = async () => {
      const coll = collection(db, "cart");
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayTimestamp = today.getTime();
  
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      const tomorrowTimestamp = tomorrow.getTime();
  
      const q = query(coll, where('createdAt',">=", todayTimestamp), where('createdAt',"<=", tomorrowTimestamp));
      const snapshot = await getCountFromServer(q);
      setOrderTodayCount(snapshot.data().count);
    }
    countTodayOrder();
  },[])
  
  useEffect(()=>{
    const countTodayIncome = async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayTimestamp = today.getTime();
      
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      const tomorrowTimestamp = tomorrow.getTime();
      
      const coll = collection(db, "cart");
      const q = query(coll,where('createdAt',">=", todayTimestamp), where('createdAt',"<=", tomorrowTimestamp));
      const snapshot = await getAggregateFromServer(q, {
        totalPrice: sum('total')
      });
      setTodayIncome(snapshot.data().totalPrice);
    }
    countTodayIncome();
  },[])


  useEffect(()=>{
    const totalIncome = async ()=>{
      const coll = collection(db, 'cart');
      const q = query(coll);
      const snapshot = await getAggregateFromServer(q, {
        totalPrice: sum('total')
      });
      setTotal(snapshot.data().totalPrice);
    }
    totalIncome();
  },[])






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
                        <p className='text-2xl font-bold'>USD ${total.toFixed(2)}</p>
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
                        <p className='text-2xl font-bold'>USD ${todayIncome?.toFixed(2)}</p>
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
                        <p className='text-2xl font-bold'>{orderCount} Sales</p>
                      </section>
                      <section>
                        <p className='text-xs text-gray-500 font-bold'>Today {orderTodayCount} Sales </p>
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
                        <p className='text-2xl font-bold'>{productCount} Prodcuts</p>
                      </section>
                      <section>
                        <p className='text-xs text-gray-500 font-bold'>Total Category {categoryCount} </p>
                      </section>
                    </div>
                  </div>
                  <div className='flex flex-wrap xl:flex-nowrap justify-between gap-3 w-full'>
                    <div className='w-full'>
                      <Perfomance />
                    </div>
                    <div className='p-6 border rounded-lg shadow-lg w-full h-96'>
                      <p className='font-bold text-lg mb-3'>Item In Stock</p>
                        <header className='font-bold text-sm flex justify-between'>
                            <p className='w-12'>ID</p>
                            <div className='w-48'>
                              <p className='w-48'>Name</p>  
                            </div>
                            <p className='lg:w-48'>Quantiy</p>
                        </header>
                        {
                            data.map((item,i)=>(
                                <div key={i} className='font-bold text-sm flex justify-between items-center my-5 border-t-2 pt-3'>
                                    <p className='w-12'>{i+1}</p>
                                    <div className='w-48'>
                                    <p className='font-medium text-gray-600 line-clamp-1 truncate'>{item.name}</p>                      
                                    </div>
                                    <p className='lg:w-48 font-medium text-gray-600 line-clamp-1 '>{item.cost}</p>
                                </div>
                            ))
                        }
                    </div>  
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}
