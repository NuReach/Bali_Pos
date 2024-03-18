import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'

export default function ProductEditPage() {
    const [name,setName] = useState("Beer");
    const [image, setImage] = useState("image.png"); // State for image
    const [price, setPrice] = useState("15.00");   // State for price
    const [cost, setCost] = useState("12.00");     // State for cost
    const [stock, setStock] = useState("100");   // State for stock
    const [category, setCategory] = useState("Beer"); // State for category
    const [discount, setDiscount] = useState("10"); 
  return (
    <div>
        <Navbar />
        <div className='flex'>
            <Sidebar route={"/product"} />
            <div className='w-full justify-center flex mt-6'>
                <div className='w-96'>
                    <section>
                        <p className='text-lg font-bold'>Create New Product</p>
                    </section>
                    <section className='mt-3'>
                        <form action="" className='gap-3 flex flex-col'>
                            <div>
                                    <label for="name" className="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                                    <input value={name} onChange={(e)=>setName(e.target.value)} type="text" id="name" name="name" autoComplete='off' className="block w-full p-2 text-gray-900 border-2 bg-white rounded-lg   " />
                            </div>
                            <div>
                                    <label for="image" className="block mb-2 text-sm font-medium text-gray-900 ">Image</label>
                                    <input value={image} onChange={(e)=>setImage(e.target.value)} type="text" id="image" name="image" autoComplete='off' className="block w-full p-2 text-gray-900 border-2 bg-white rounded-lg   " />
                            </div>
                            <div className='flex flex-wrap gap-3 justify-between mt-3'>
                                 <div>
                                        <label for="cost" className="block mb-2 text-sm font-medium text-gray-900 ">Cost</label>
                                        <input value={cost} onChange={(e)=>setCost(e.target.value)} type="text" id="cost" name="cost" autoComplete='off'  className="block w-24 p-2 text-gray-900 border-2 bg-white rounded-lg placeholder:text-xs  " />
                                </div>
                                <div>
                                        <label for="price" className="block mb-2 text-sm font-medium text-gray-900 ">Price</label>
                                        <input value={price} onChange={(e)=>setPrice(e.target.value)} type="text" id="price" name="price" autoComplete='off'  className="block w-24 p-2 text-gray-900 border-2 bg-white rounded-lg placeholder:text-xs  " />
                                </div>
                                <div>
                                        <label for="discount" className="block mb-2 text-sm font-medium text-gray-900 ">Discount</label>
                                        <input value={discount} onChange={(e)=>setDiscount(e.target.value)} type="text" id="discount" name="discount" autoComplete='off'  className="block w-24 p-2 text-gray-900 border-2 bg-white rounded-lg placeholder:text-xs  " />
                                </div>
                            </div>
                            <div className='mt-3'>
                                    <label for="stock" className="block mb-2 text-sm font-medium text-gray-900 ">Stock</label>
                                    <input value={stock} onChange={(e)=>setStock(e.target.value)} type="text" id="stock" name="stock" autoComplete='off' className="block w-full p-2 text-gray-900 border-2 bg-white rounded-lg   " />
                            </div>
                            <div>
                                    <label for="category" className="block mb-2 text-sm font-medium text-gray-900 ">Category</label>
                                    <input value={category} onChange={(e)=>setCategory(e.target.value)} type="text" id="category" name="category" autoComplete='off' className="block w-full p-2 text-gray-900 border-2 bg-white rounded-lg   " />
                            </div>
                            <div className='mt-3'>
                                <button  className='w-full font-bold text-white bg-yellow-700 rounded-lg py-2'>Submit</button>
                            </div>

                        </form>
                    </section>
                </div>
            </div>
        </div>
    </div>
  )
}
