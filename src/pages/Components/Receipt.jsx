import React, { useEffect, useState } from 'react'

export default function Receipt() {
  const [printData, setPrintData] = useState(null);
  const date = new Date(printData?.createdDate);
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  useEffect(()=>{
    const storedData = localStorage.getItem('printData');
    if (storedData) {
      setPrintData(JSON.parse(storedData));
    } else {
      alert('No data found in local storage.');
    }
  },[])

  const print = (e)=>{
    e.preventDefault();
    window.print();
  }

  console.log(printData);

  return (
    <div className='w-full bg-gray-300 flex justify-center items-center '>
        <div className='w-96 bg-white p-3 '>
            <section className='flex justify-between border-b-4 border-black pb-3'>
                <div>
                    <p className='text-lg font-bold'>Bali</p>
                    <p className='text-xs font-medium'>Villa and Resort, Kompot, Cambodia</p>
                </div>
                <div>
                    <p className='text-xs font-medium'>{formattedDate}</p>
                </div>
            </section>
            <section className='mt-3 flex justify-between'>
                <div>
                <p className='text-xs font-medium'>From : </p>
                <p className='text-xs font-medium'>{printData?.user}</p>
                <p className='text-xs font-medium'>{printData?.id}</p>
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
            <section className='flex flex-col gap-3 mt-3 border-b-2 border-t-2 py-3'>
                {
                    printData?.cart.map((cartItem,i)=>(
                        <section className='flex'>
                            <p className='text-xs font-medium w-36 truncate justify-between'>{cartItem.item.name}</p>
                            <p className='text-xs font-medium w-24'>{cartItem.item.price}$</p>
                            <p className='text-xs font-medium w-24'>{cartItem.qty}X</p>
                            <p className='text-xs font-medium w-24 justify-end flex'>{cartItem.total}$</p>
                        </section>
                    ))
                }
            </section>
            <section className='flex w-full justify-end'>
                <div>
                    <div className='flex mt-3' >
                        <p className='text-sm font-medium w-24 justify-end flex'>Subtotal :</p>
                        <p className='text-sm font-medium w-24 justify-end flex'>{printData?.subTotal}$</p>
                    </div>
                    <div className='flex mt-3' >
                        <p className='text-sm font-medium w-24 justify-end flex'>Discount :</p>
                        <p className='text-sm font-medium w-24 justify-end flex'>{printData?.discount}%</p>
                    </div>
                    <div className='flex mt-3' >
                        <p className='text-sm font-medium w-24 justify-end flex'>Total :</p>
                        <p className='text-sm font-medium w-24 justify-end flex'>{printData?.total}$</p>
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
        </div>
    </div>
  )
}
