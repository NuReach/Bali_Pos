import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import { collection, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import LoadingSkeleton from '../Components/LoadingSkeleton';
import FormSkeleton from '../Components/FormSkeleton';
import { fetchCategories, getProductById, updateProductById } from '../../api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


export default function ProductEditPage() {

  const [name,setName] = useState("");
  const [image, setImage] = useState(""); // State for image
  const [price, setPrice] = useState("");   // State for price
  const [cost, setCost] = useState("");     // State for cost
  const [stock, setStock] = useState("");   // State for stock
  const [category, setCategory] = useState(""); // State for category
  const [discount, setDiscount] = useState(""); 
  const {id} = useParams();   
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { isLoading : productFetchingStatus, isError : productFetchingError, data : product } = useQuery(
    { queryKey: ['product',{id}], queryFn: ()=> getProductById(id)}
  )
   
  const { isLoading : categoriesFetchingStatus, isError : categoriesFetchingError, data : categories } = useQuery(
    { queryKey: ['categories'], queryFn: ()=> fetchCategories() }
  )

  useEffect(()=>{
    setName(product?.name);
    setImage(product?.image);
    setPrice(product?.price);
    setCost(product?.cost);
    setStock(product?.stock);
    setCategory(product?.category);
    setDiscount(product?.discount);
  },[product])

  console.log(category);

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    await updateProductMutation({id,name,image,price,cost,stock,discount,category})
  };

  
  const { mutateAsync : updateProductMutation , isPending } = useMutation({
    mutationFn : updateProductById,
    onSuccess : ()=>{
        toast.success("Product Updated Successfully");
        queryClient.invalidateQueries(['productsPage']);
        queryClient.invalidateQueries(['products']);
        navigate("/product")
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
            <div className='w-full justify-center flex mt-6'>
                <div className='w-96'>
                    <section>
                        <p className='text-lg font-bold'>Create New Product</p>
                    </section>
                    {
                        categories && product ? 
                        <section className='mt-3'>
                            <form action="" className='gap-3 flex flex-col'>
                                <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                                        <input value={name} onChange={(e)=>setName(e.target.value)} type="text" id="name" name="name" autoComplete='off' className="block w-full p-2 text-gray-900 border-2 bg-white rounded-lg   " />
                                </div>
                                <div>
                                        <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 ">Image</label>
                                        <input value={image} onChange={(e)=>setImage(e.target.value)} type="text" id="image" name="image" autoComplete='off' className="block w-full p-2 text-gray-900 border-2 bg-white rounded-lg   " />
                                </div>
                                <div className='flex flex-wrap gap-3 justify-between mt-3'>
                                        <div>
                                            <label htmlFor="cost" className="block mb-2 text-sm font-medium text-gray-900 ">Cost</label>
                                            <input value={cost} onChange={(e)=>setCost(e.target.value)} type="number" id="cost" name="cost" autoComplete='off'  className="block w-24 p-2 text-gray-900 border-2 bg-white rounded-lg placeholder:text-xs  " />
                                    </div>
                                    <div>
                                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 ">Price</label>
                                            <input value={price} onChange={(e)=>setPrice(e.target.value)} type="number" id="price" name="price" autoComplete='off'  className="block w-24 p-2 text-gray-900 border-2 bg-white rounded-lg placeholder:text-xs  " />
                                    </div>
                                    <div>
                                            <label htmlFor="discount" className="block mb-2 text-sm font-medium text-gray-900 ">Discount</label>
                                            <input value={discount} onChange={(e)=>setDiscount(e.target.value)} type="number" id="discount" name="discount" autoComplete='off'  className="block w-24 p-2 text-gray-900 border-2 bg-white rounded-lg placeholder:text-xs  " />
                                    </div>
                                </div>
                                <div className='mt-3'>
                                        <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900 ">Stock</label>
                                        <input value={stock} onChange={(e)=>setStock(e.target.value)} type="number" id="stock" name="stock" autoComplete='off' className="block w-full p-2 text-gray-900 border-2 bg-white rounded-lg   " />
                                </div>
                                <div>
                                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 ">Category</label>
                                          <select className='block w-full p-2 py-3 text-gray-900 border-2 bg-white rounded-lg text-xs'  name="category" id="category" value={category} onChange={(e)=>setCategory(e.target.value)} required>
                                            {
                                                categories?.map((item,i)=>(
                                                    <option className='uppercase' key={i}  value={item.name}>{item.name}</option>
                                                ))
                                            } 
                                        </select>
                                </div>
                                <div className='mt-3'>
                                    <button  onClick={handleUpdateProduct} disabled={isPending==true}  className='w-full font-bold text-white bg-yellow-700 rounded-lg py-2'>{isPending ? "Loading..." : "Submit"}</button>
                                </div>
                            </form>
                        </section>
                        :
                        <FormSkeleton />
                    }
                </div>
            </div>
        </div>
    </div>
  )
}
