import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { removeAllCartItem } from '../../functionSlice';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

export default function Receipt() {
  const [printData, setPrintData] = useState(null);
  const date = new Date();
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  const dispatch = useDispatch();
  const formattedDate = date.toLocaleDateString('en-US', options);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  const fetchOrder = async ()=>{
    const orderRef = doc(db, "cart", id); // Reference to the product document
    const order = await getDoc(orderRef);
    setPrintData(order.data());
   } 
  
  useEffect(()=>{
    const storedData = localStorage.getItem('printData');
    if (storedData) {
      setPrintData(JSON.parse(storedData));
    } else {
        if (id) {
        fetchOrder();
        }
    }
  },[])


  const print = (e)=>{
    e.preventDefault();
    window.print();
    localStorage.removeItem("printData");
    dispatch(removeAllCartItem());
  }

  
  const back = (e)=>{
    e.preventDefault();
    localStorage.removeItem("printData");
    dispatch(removeAllCartItem());
    navigate("/");
  }

  console.log(printData);

  return (
    <div className='w-full bg-gray-300 flex justify-center items-center '>
        {
            printData ? 
                <div className='w-96 bg-white p-3 '>
                    <section className='flex justify-between border-b-4 border-black pb-3'>
                        <div>
                            <p className='text-lg font-bold'>Bali</p>
                            <p className='text-xs font-medium'>Villa and Resort, Kompot, Cambodia</p>
                        </div>
                        <div>
                            <p className='text-xs font-medium'>{new Date(printData?.createdAt).toLocaleDateString()+" "+new Date(printData?.createdAt).toLocaleTimeString()}</p>
                        </div>
                    </section>
                    <section className='mt-3 flex justify-between'>
                        <div>
                        <p className='text-xs font-medium'>From : </p>
                        <p className='text-xs font-medium'>{printData?.user.toUpperCase()}</p>
                        {/* <p className='text-xs font-medium'>{printData?.id}</p> */}
                        </div>
                        <div>
                            <p className='text-xs font-medium uppercase'>Payment : {printData?.payment} </p>
                        </div>
                    </section>
                    <section className='flex mt-3'>
                        <p className='text-xs font-medium w-36 truncate justify-between'>Name</p>
                        <p className='text-xs font-medium w-24'>Price</p>
                        <p className='text-xs font-medium w-24'>Quantity </p>
                        <p className='text-xs font-medium w-24 justify-end flex'>Total</p>
                    </section>
                    <section className='flex flex-col gap-3 mt-3  border-t-2 py-3'>
                        {
                            printData?.cartItems.map((cartItem,i)=>(
                                <section className='flex items-center border-b pb-3 gap-1' key={i}>
                                    <p className='text-xs font-medium w-36  justify-between capitalize'>{(cartItem.item.name)}</p>
                                    <p className='text-xs font-medium w-24'>{(cartItem.item.price).toFixed(2)}$</p>
                                    <p className='text-xs font-medium w-24'>{cartItem.qty}X</p>
                                    <p className='text-xs font-medium w-24 justify-end flex'>{(cartItem.total).toFixed(2)}$</p>
                                </section>
                            ))
                        }
                    </section>
                    <section className='flex w-full justify-end'>
                        <div>
                            <div className='flex mt-3' >
                                <p className='text-sm font-medium w-24 justify-end flex'>Subtotal :</p>
                                <p className='text-sm font-medium w-24 justify-end flex'>{(printData?.subTotal).toFixed(2)}$</p>
                            </div>
                            <div className='flex mt-3' >
                                <p className='text-sm font-medium w-24 justify-end flex'>Discount :</p>
                                <p className='text-sm font-medium w-24 justify-end flex'>{printData?.discount}%</p>
                            </div>
                            {
                                printData.currency && printData.receive &&
                                <div className='flex mt-3' >
                                    <p className='text-sm font-medium w-24 justify-end flex'>Receive :</p>
                                    <p className='text-sm font-medium w-24 justify-end flex'>{ printData.currency == "riel" ? (printData?.receive).toLocaleString()+"៛" : (printData?.receive).toFixed(2)+"USD" }</p>
                                </div>
                            }
                            {
                                printData.currency && printData.currency &&
                                <div className='flex mt-3' >
                                    <p className='text-sm font-medium w-24 justify-end flex'>Change :</p>
                                    <p className='text-sm font-medium w-24 justify-end flex'>{ printData.currency == "riel" ? (((printData.receive/4100)-printData.total)*4100).toLocaleString()+"៛" : (printData.receive-printData.total).toFixed(2)+"USD" }</p>
                                </div>
                            }
                            <div className='flex mt-3' >
                                <p className='text-sm font-medium w-24 justify-end flex'>Total :</p>
                                <p className='text-sm font-medium w-24 justify-end flex'>{(printData?.total).toFixed(2)}$</p>
                            </div>
                        </div>
                    </section>
                    <section className='border-black flex justify-end border-t-4 mt-3 pt-3 '>
                        <p className='text-xs font-medium w-24 justify-end flex'>Telephone : </p>
                        <div className='justify-start flex flex-col pl-3'>
                            <p className='text-xs font-medium  justify-start flex'>093 676322 </p>
                            <p className='text-xs font-medium  justify-start flex'>096 8080808 </p>
                            <p className='text-xs font-medium  justify-start flex'>010 978980 </p>
                            <p className='text-xs font-medium  justify-start flex'>096 5939485 </p>
                        </div>
                    </section>
                    <section className='flex justify-center my-9'>
                        <p className='text-lg font-bold'>Thank You For Coming</p>
                    </section>
                    <section>
                        <button onClick={print} className='w-full rounded-lg bg-yellow-700 text-white text-xs py-2 font-bold print:hidden'>Print Receipt</button>
                    </section>
                    <section className=' mt-3'>
                        <button onClick={back} className='w-full rounded-lg bg-black text-white text-xs py-2 font-bold print:hidden' >Back</button>
                    </section>
                </div>
            : <p>No Print Data</p>
        }
    </div>
  )
}
