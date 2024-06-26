import React, {useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartItemReducer, minusCartItemReducer, updateCartItemReducer } from '../../functionSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateToCart } from '../../api';


function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

export default function Cart() {
  const date = new Date();
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  const [discount, setDiscount] = useState("0");
  const [discountPrice,setDiscountPrice] = useState("");
  const [payment,setPayment] = useState("");
  
  const [currency,setCurrency] = useState("");
  const [receive,setRecieve] = useState(0);
  const rate = 4100;
  const [change,setChange] = useState(0);
  

  const navigate = useNavigate();
  
  const cart = useSelector((state)=>state.function.cart);
  const dispatch = useDispatch();

  const [subTotal, setSubTotal]= useState("");
  const [total,setTotal] = useState("");

  const queryClient = useQueryClient();

  const showCartBoolean = useSelector((state)=>state.function.showCartBoolean);

  const user = JSON.parse(localStorage.getItem("user"));
 

  const handleInput = (e) => {
    if (e.target.value <0) {
        setDiscount(0);
    }else if(e.target.value > 100){
        setDiscount(100);
    }else{
    setDiscount(e.target.value);
    }
  };


  useEffect(()=>{
    setSubTotal(parseFloat(cart.reduce((a,cartItem)=>a + cartItem.total,0)).toFixed(2));
    setTotal(parseFloat(subTotal*(100-discount)/100).toFixed(2));
    setDiscountPrice(parseFloat(subTotal*(discount)/100).toFixed(2));
    if (currency == "riel") {
    setChange(parseFloat((receive/rate-total)).toFixed(2));    
    }else{
    setChange(parseFloat(receive-total).toFixed(2));  
    }
  },[discount,cart,subTotal,total,discountPrice,receive,change])

  const handleDelete = (e,item)=>{
    e.preventDefault();
    dispatch(deleteCartItemReducer({id:item.id}))
  }

  const updateQty = (e,item)=>{
    e.preventDefault();
    dispatch(updateCartItemReducer({id:item.id,qty:1}))
  }

  const minusQty = (e,item)=>{
    e.preventDefault();
    dispatch(minusCartItemReducer({id:item.id,qty:1}));
  }

  
  const { mutateAsync : addToCartMutation , isPending : updateToCartLoading  } = useMutation({
    mutationFn : updateToCart,
    onSuccess : ()=>{
        toast.success("Add Order Succesfully");
        navigate("/receipt");
    },
    onError : ()=>{
        toast.error("error")
    }
  })

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if (payment == "" || currency =="") {
        alert("Please Select Payemt")
    }else{
        try {
        await addToCartMutation({cart,discount,subTotal,total,payment,user,receive,currency}); 
        } catch (error) {
            console.log(error);
        }
    }
  }


  return (
    <div className={showCartBoolean ? 'border-l min-w-80 shadow-lg p-3 gap-3 absolute right-0 bg-white md:relative  md:flex flex-col transition-opacity ' : 'min-w-80 border-l shadow-lg p-3 gap-3 absolute right-0  bg-white md:relative hidden  md:flex flex-col '} >
        <section className='border-b pb-3 flex justify-between'>
            <div className='flex gap-3'>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M5.85 17.1q1.275-.975 2.85-1.537T12 15q1.725 0 3.3.563t2.85 1.537q.875-1.025 1.363-2.325T20 12q0-3.325-2.337-5.663T12 4Q8.675 4 6.337 6.338T4 12q0 1.475.488 2.775T5.85 17.1M12 13q-1.475 0-2.488-1.012T8.5 9.5q0-1.475 1.013-2.488T12 6q1.475 0 2.488 1.013T15.5 9.5q0 1.475-1.012 2.488T12 13m0 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22"/></svg>
                <div>
                    <p className='text-xs font-medium text-black'>{(user?.username).toUpperCase()}</p>
                    <p className='text-xs font-medium text-gray-600'>{(user?.role).toUpperCase()}</p>
                </div>
            </div>
        </section>
        <section className='flex gap-3 items-center text-gray-600 mt-3'>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 14q-.425 0-.712-.288T11 13q0-.425.288-.712T12 12q.425 0 .713.288T13 13q0 .425-.288.713T12 14m-4 0q-.425 0-.712-.288T7 13q0-.425.288-.712T8 12q.425 0 .713.288T9 13q0 .425-.288.713T8 14m8 0q-.425 0-.712-.288T15 13q0-.425.288-.712T16 12q.425 0 .713.288T17 13q0 .425-.288.713T16 14m-4 4q-.425 0-.712-.288T11 17q0-.425.288-.712T12 16q.425 0 .713.288T13 17q0 .425-.288.713T12 18m-4 0q-.425 0-.712-.288T7 17q0-.425.288-.712T8 16q.425 0 .713.288T9 17q0 .425-.288.713T8 18m8 0q-.425 0-.712-.288T15 17q0-.425.288-.712T16 16q.425 0 .713.288T17 17q0 .425-.288.713T16 18M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5z"/></svg>
            <p className='text-xs font-medium text-gray-600'>{formattedDate}</p>
        </section>
        <section>
            <p className='text-lg font-bold my-6'>Current Order</p>
            <div className='flex flex-col gap-6'>
                {
                    cart.length >0 ? cart.map((item,i)=>(
                        <div key={i} className='flex gap-2  items-center'>
                          
                            <p className='w-24 truncate text-xs font-medium capitalize'>{item.item.name}</p>
                            {
                                item.qty>1 ? 
                                <button onClick={(e)=>minusQty(e,item)} className=' w-6 h-6 rounded-lg bg-gray-300 text-white flex justify-center items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M19 12.998H5v-2h14z"/></svg>
                                </button>
                                 :
                                <button onClick={(e)=>handleDelete(e,item)} className=' w-6 h-6 rounded-lg bg-red-400 flex justify-center items-center'>
                                    <svg className='text-white' xmlns="http://www.w3.org/2000/svg" width="18" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"/></svg>
                                </button>
                            }
                        
                            <p className='w-9 text-center'>{item.qty}</p>
                            <button onClick={(e)=>updateQty(e,item)} className=' w-6 h-6 rounded-lg bg-gray-300 text-white flex justify-center items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/></svg>
                            </button>
                            <p className='text-sm font-medium pl-3'> ${(item?.total).toFixed(2)}</p>
                        </div>
                    )):
                    <p className='text-xs font-bold'>No Added Item !!</p>
                }
            </div>
        </section>
        <section className='flex flex-col gap-3'>
            <p className='text-lg font-bold'>Payment Method </p>
            <div className='flex gap-6'>
                <button onClick={(e)=>setPayment("cash")}  className={payment == "cash" ?'rounded-lg bg-gray-200 border-2 border-yellow-700 w-24 h-14 flex flex-col justify-center items-center text-yellow-700' :'rounded-lg border-2 border-yellow-700 w-24 h-14 flex flex-col justify-center items-center text-yellow-700'}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M9 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0"/><path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm15 4h.01M6 12h.01"/></g></svg>
                    <p className='text-xs font-medium'>Cash</p>
                </button>
                <button onClick={(e)=>setPayment("debit")} className={payment == "debit" ?'rounded-lg bg-gray-200 border-2 border-yellow-700 w-24 h-14 flex flex-col justify-center items-center text-yellow-700' :'rounded-lg border-2 border-yellow-700 w-24 h-14 flex flex-col justify-center items-center text-yellow-700'}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="32" viewBox="0 0 14 14"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><rect width="13" height="9.5" x=".5" y="2.25" rx="1"/><path d="M.5 5.75h13m-4 3.5H11"/></g></svg>
                    <p className='text-xs font-medium'>Debit</p>
                </button>
            </div>
        </section>
        <section className=' flex flex-col gap-3'>
            <p className='text-lg font-bold'>Receive </p>
            <div className='flex gap-6'>
                <button onClick={(e)=>{setCurrency("riel");setRecieve(0)}}  className={currency == "riel" ?'rounded-lg bg-gray-200 border-2 border-yellow-700 w-24 h-14 flex flex-col justify-center items-center text-yellow-700' :'rounded-lg border-2 border-yellow-700 w-24 h-14 flex flex-col justify-center items-center text-yellow-700'}>
                    <p className='text-xs font-medium'>Riel</p>
                </button>
                <button onClick={(e)=>{setCurrency("usd");setRecieve(0)}} className={currency == "usd" ?'rounded-lg bg-gray-200 border-2 border-yellow-700 w-24 h-14 flex flex-col justify-center items-center text-yellow-700' :'rounded-lg border-2 border-yellow-700 w-24 h-14 flex flex-col justify-center items-center text-yellow-700'}>
                    <p className='text-xs font-medium'>USD</p>
                </button>
            </div>
            {
                currency != "" && currency == "riel" &&
                <div>
                    <label htmlFor="riel" className="block mb-2 text-sm font-medium text-gray-900 ">RIEl</label>
                    <input required value={receive} onChange={(e)=>setRecieve(e.target.value)} type="number" id="receive" name="receive" autoComplete='off' className="block w-full p-2 text-gray-900 border-2 bg-white rounded-lg   " />
                </div>
            }
            {
                currency != "" && currency == "usd" &&
                <div>
                    <label htmlFor="usd" className="block mb-2 text-sm font-medium text-gray-900 ">USD</label>
                    <input required value={receive} onChange={(e)=>setRecieve(e.target.value)} type="number" id="receive" name="receive" autoComplete='off' className="block w-full p-2 text-gray-900 border-2 bg-white rounded-lg   " />
                </div>
            }
        </section>
        
        <section className='mt-3 flex flex-col gap-3'>
            <div className='flex justify-between'>
                <p className='text-xs font-medium text-gray-500'>Subtotal</p>
                <p className='text-sm font-medium text-gray-500'>USD ${subTotal}</p>
            </div>
            <div className='flex justify-between'>
                <p className='text-xs font-medium text-gray-500'>Discount</p>
                <div className='flex items-center'>
                <input type="text" onChange={handleInput} value={discount} className='focus:ring-0 focus:border-none focus:outline-none w-6 text-sm text-end pr-1 font-medium text-gray-500' />
                <span className='text-sm font-medium text-gray-500'>%</span>
                </div>
            </div>
            {
                receive != 0 && currency == "riel" && receive/rate >= total && 
                <div className='flex justify-between'>
                    <p className='text-xs font-medium text-gray-500'>Recieve</p>
                    <p className='text-sm font-medium text-gray-500'>{currency == "riel" ? "KHR ៛" : "USD $"}{(receive).toLocaleString() }</p>
                </div>
            }
            {
                receive != 0 && currency == "usd" && receive >= total && 
                <div className='flex justify-between'>
                    <p className='text-xs font-medium text-gray-500'>Recieve</p>
                    <p className='text-sm font-medium text-gray-500'>{currency == "riel" ? "KHR ៛" : "USD $"}{(receive).toLocaleString() }</p>
                </div>
            }
            {
                change > 0 &&
                <div className='flex justify-between'>
                    <p className='text-xs font-medium text-gray-500'>Change</p>
                    <div className='flex flex-col justify-end'>
                    <p className='text-sm font-medium text-gray-500 flex justify-end'>{currency == "riel" ? "KHR ៛" + (change*rate).toLocaleString() : "USD $" + change}</p>
                    <p className='text-sm font-medium text-gray-500 flex justify-end'>{currency == "riel" ? "USD $" + change : "៛" + (change*rate).toLocaleString() }</p>
                    </div>
                </div>
            }
            
            {
                discount > 0 && 
                <div className='flex justify-between'>
                <p className='text-xs font-medium text-gray-400'>Discount Price</p>
                <p className='text-sm font-medium text-gray-400'>-USD ${discountPrice} </p>
            </div>
            }
            <div className='flex justify-between'>
                <p className='text-sm font-medium text-black'>TOTAL</p>
                <div className='flex flex-col justify-end'>
                    <p className='text-sm font-bold text-black flex justify-end'>USD ${total}</p>
                    <p className='text-sm font-bold text-black flex justify-end'>{"KHR ៛"+(total*rate).toLocaleString() }</p>
                    </div>
            </div>
        </section>
        <section className='flex flex-col gap-3 mt-3 mb-9'>
            {/* <button disabled={cart.length == 0} onClick={createReciept}  className='w-full font-bold border-2 border-yellow-700 text-yellow-700 rounded-lg py-2 '>Reciept</button> */}
            <button disabled={cart?.length == 0 || updateToCartLoading==true} onClick={handleSubmit}  className='w-full font-bold text-white bg-yellow-700 rounded-lg py-2'>{updateToCartLoading ? "Loading..." : "Submit"}</button>
        </section>
    </div>
  )
}
