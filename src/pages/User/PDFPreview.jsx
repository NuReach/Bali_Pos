import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { getTodayIncome } from '../../api';
import LoadingSkeleton from '../Components/LoadingSkeleton';

export default function PDFPreview() {
    const { isLoading: exportTodayIncomesLoading, isError: exportTodayIncomesFetching, data: exportTodayIncomes } = useQuery(
        { queryKey: ['exportTodayIncomes'], 
        queryFn: getTodayIncome , 
        }
    ) ;

    const rate = 4100;
    
    let totalPrice = 0;
    const getTotalPrice = ()=>{
        exportTodayIncomes?.data.map((item)=>{
            totalPrice = item.total+totalPrice;
        })
        return totalPrice;
    }
    getTotalPrice();

    let totalItem = 0;
    const getTotalItem = ()=>{
        exportTodayIncomes?.data.map((item)=>{
            item.cartItems.map(cartItem=>{
                totalItem = cartItem.qty+totalItem
            })
        })
    return totalItem;
    }

    getTotalItem();

   
  return (
    <div>
        {
            exportTodayIncomes ?
            <div className='p-9 a4Container'>
                <section className='flex justify-between border-b-4 border-black pb-3'>
                        <div>
                            <p className='text-lg font-bold'>Bali</p>
                            <p className='text-xs font-medium'>Villa and Resort, Kompot, Cambodia</p>
                        </div>
                        <div>
                            <p className='text-xs font-medium'>{new Date().toLocaleDateString()+" "+new Date().toLocaleTimeString()}</p>
                        </div>
                </section>
                <section className='p-3'>
                    <div>
                        <p className='text-xs font-bold'>From</p>
                        <p className='text-xs font-bold'>{new Date(exportTodayIncomes.todayTimestamp).toLocaleDateString()+" "+new Date(exportTodayIncomes.todayTimestamp).toLocaleTimeString()}</p>
                    </div>
                    <div>
                        <p className='text-xs font-bold'>UNTILL</p>
                        <p className='text-xs font-bold'>{new Date(exportTodayIncomes.tomorrowTimestamp).toLocaleDateString()+" "+new Date(exportTodayIncomes.tomorrowTimestamp).toLocaleTimeString()}</p>
                    </div>
                </section>
                <section>
                    {
                        exportTodayIncomes.data.map((item,i)=>(
                            <div className='flex justify-between gap-3 border-b p-3'>
                                <div className='flex flex-col gap-3'>
                                    <section className='flex items-center gap-3 ' >
                                            <p className='text-xs font-medium w-36  justify-between '>Name</p>
                                            <p className='text-xs font-medium w-24'>Price</p>
                                            <p className='text-xs font-medium w-24'>Quantity</p>
                                            <p className='text-xs font-medium w-24 justify-end flex'>Total</p>
                                    </section>
                                    {
                                        item.cartItems.map((cartItem,i)=>(
                                        <section className='flex items-center gap-3 ' key={i}>
                                            <p className='text-xs font-medium w-36  justify-between capitalize '>{(cartItem.item.name)}</p>
                                            <p className='text-xs font-medium w-24'>{(cartItem.item.price).toFixed(2)}$</p>
                                            <p className='text-xs font-medium w-24'>{cartItem.qty}X</p>
                                            <p className='text-xs font-medium w-24 justify-end flex'>{(cartItem.total).toFixed(2)}$</p>
                                        </section>
                                        ))
                                    }
                                </div>
                                <section className='flex w-full justify-end'>
                                    <div>
                                        <div className='flex' >
                                            <p className='text-xs font-medium w-24 justify-end flex'>Subtotal :</p>
                                            <p className='text-xs font-medium w-24 justify-end flex'>{(item?.subTotal).toFixed(2)}$</p>
                                        </div>
                                        <div className='flex mt-3' >
                                            <p className='text-xs font-medium w-24 justify-end flex'>Discount :</p>
                                            <p className='text-xs font-medium w-24 justify-end flex'>{item?.discount}%</p>
                                        </div>
                                        {
                                            item.currency && item.receive &&
                                            <div className='flex mt-3' >
                                                <p className='text-xs font-medium w-24 justify-end flex'>Receive :</p>
                                                <p className='text-xs font-medium w-24 justify-end flex'>{ item.currency == "riel" ? ((item?.receive)).toLocaleString()+"៛" : (item?.receive).toFixed(2)+"USD" }</p>
                                            </div>
                                        }
                                        {
                                            item.currency && item.currency &&
                                            <div className='flex mt-3' >
                                                <p className='text-xs font-medium w-24 justify-end flex'>Change :</p>
                                                <p className='text-xs font-medium w-24 justify-end flex'>{ item.currency == "riel" ? (((item.receive/4100)-item.total)*4100).toLocaleString()+"៛" : (item.receive-item.total).toFixed(2)+"USD" }</p>
                                            </div>
                                        }
                                        <div className='flex mt-3' >
                                            <p className='text-xs font-medium w-24 justify-end flex'>Total :</p>
                                            <p className='text-xs font-medium w-24 justify-end flex'>{(item?.total).toFixed(2)}$</p>
                                        </div>
                                        <div className='flex mt-3' >
                                            <p className='text-xs font-medium w-24 justify-end flex'>User :</p>
                                            <p className='text-xs font-medium w-24 justify-end flex'>{(item?.user)}</p>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        ))
                    }
                </section>
                <section className='w-full flex flex-col p-3'>
                    <div className='flex mt-3' >
                        <p className='text-sm font-medium w-24  flex'>Total Receipts :</p>
                        <p className='text-sm font-medium w-40 justify-end flex'>{exportTodayIncomes.data.length} Receipt</p>
                    </div>
                    <div className='flex mt-3' >
                        <p className='text-sm font-medium w-24  flex'>Total Items :</p>
                        <p className='text-sm font-medium w-40 justify-end flex'>{totalItem} Items</p>
                    </div>
                    <div className='flex mt-3' >
                        <p className='text-sm font-medium w-24  flex'>Total Price :</p>
                        <p className='text-sm font-medium w-40 justify-end flex'>USD ${totalPrice.toFixed(2)}</p>
                    </div>
                    <div className='flex mt-3' >
                        <p className='text-sm font-medium w-24  flex'>Total Price :</p>
                        <p className='text-sm font-medium w-40 justify-end flex'>KHR ៛{(totalPrice.toFixed(2)*rate).toLocaleString()}</p>
                    </div>
                </section>
            </div>
             :
            <div className='h-screen w-full flex justify-center items-center'>
                <LoadingSkeleton />
            </div>
        }
    </div>
  )
}
