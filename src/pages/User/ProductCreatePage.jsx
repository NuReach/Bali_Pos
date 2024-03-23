import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import LoadingSkeleton from '../Components/LoadingSkeleton';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createCategory, createNewProduct, deleteCategory, fetchCategories } from '../../api';


export default function ProductCreatePage() {
    const [name,setName] = useState("");
    const [image, setImage] = useState(""); 
    const [price, setPrice] = useState("");   
    const [cost, setCost] = useState("");     
    const [stock, setStock] = useState("");   
    const [category, setCategory] = useState(""); 
    const [discount, setDiscount] = useState(""); 
    const navigate = useNavigate();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get('page');
    
    const [categoryName, setCategoryName] = useState("");

    const queryClient = useQueryClient();

      
    const { isLoading : categoriesFetchingStatus, isError : categoriesFetchingError, data : categories } = useQuery(
        { queryKey: ['categories'], queryFn : ()=>fetchCategories()}
      )

    
    const createProduct = async (e)=>{
        e.preventDefault();
        await createProductMutation({name,image,price,cost,discount,category,stock})
        }
    

    const { mutateAsync : createProductMutation  } = useMutation({
        mutationFn : createNewProduct,
        onSuccess : ()=>{
            setName("");
            setImage("");
            setPrice("");
            setCost("");
            setDiscount("");
            setCategory("");
            setStock("");
            toast.success("Add Product Succesfully");
            navigate("/product/create?page=product");
            queryClient.invalidateQueries(['productsPage'])
        },
        onError : ()=>{
            toast.error("error")
        }
      })


    
    const createCategoryBtn = async (e)=>{
        e.preventDefault();
        const id = uuidv4();
        await createCategoryMutation({id,categoryName});   
    }
    
    const { mutateAsync : createCategoryMutation  } = useMutation({
        mutationFn : createCategory,
        onSuccess : ()=>{
            setCategoryName("");
            navigate("/product/create?page=product");
            queryClient.invalidateQueries(['productsPage']);
            queryClient.invalidateQueries(['categories']);
            queryClient.invalidateQueries(['product']);
            toast.success("Add Product Succesfully");
        },
        onError : ()=>{
            toast.error("error")
        }
      })


    const deleteCategoryBtn = async (e,id)=>{
        e.preventDefault();
        if (window.confirm("Do you really want to delete?")) {
            await deleteCategoryMutation({id});     
        }
    }

    const { mutateAsync : deleteCategoryMutation  } = useMutation({
        mutationFn : deleteCategory,
        onSuccess : ()=>{
            queryClient.invalidateQueries(['categories']);
            toast.success("Category Delete Succesfully");
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
                    <section className='flex gap-1'>
                        <button onClick={()=>navigate("/product/create?page=product")} className='text-lg font-bold'>Create New Product</button>
                        <p>|</p>
                        <button onClick={()=>navigate("/product/create?page=category")} className='text-lg font-bold'>Category</button>
                    </section>
                    {
                        page == "product"  ?  
                        <section className='mt-3'>
                            <form onSubmit={createProduct} action="" className='gap-3 flex flex-col'>
                                <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                                        <input required value={name} onChange={(e)=>setName(e.target.value)} type="text" id="name" name="name" autoComplete='off' className="block w-full p-2 text-gray-900 border-2 bg-white rounded-lg   " />
                                </div>
                                <div>
                                        <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 ">Image</label>
                                        <input required value={image} onChange={(e)=>setImage(e.target.value)} type="text" id="image" name="image" autoComplete='off' className="block w-full p-2 text-gray-900 border-2 bg-white rounded-lg   " />
                                </div>
                                <div className='flex flex-wrap gap-3 justify-between mt-3'>
                                    <div>
                                            <label htmlFor="cost" className="block mb-2 text-sm font-medium text-gray-900 ">Cost</label>
                                            <input required value={cost} onChange={(e)=>setCost(e.target.value)} type="text" id="cost" name="cost" autoComplete='off'  className="block w-24 p-2 text-gray-900 border-2 bg-white rounded-lg placeholder:text-xs  " />
                                    </div>
                                    <div>
                                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 ">Price</label>
                                            <input required value={price} onChange={(e)=>setPrice(e.target.value)} type="text" id="price" name="price" autoComplete='off'  className="block w-24 p-2 text-gray-900 border-2 bg-white rounded-lg placeholder:text-xs  " />
                                    </div>
                                    <div>
                                            <label htmlFor="discount" className="block mb-2 text-sm font-medium text-gray-900 ">Discount</label>
                                            <input required value={discount} onChange={(e)=>setDiscount(e.target.value)} type="text" id="discount" name="discount" autoComplete='off'  className="block w-24 p-2 text-gray-900 border-2 bg-white rounded-lg placeholder:text-xs  " />
                                    </div>
                                </div>
                                <div className='mt-3'>
                                        <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900 ">Stock</label>
                                        <input required value={stock} onChange={(e)=>setStock(e.target.value)} type="text" id="stock" name="stock" autoComplete='off' className="block w-full p-2 text-gray-900 border-2 bg-white rounded-lg   " />
                                </div>
                                <div>
                                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 ">Category</label>
                                         <select className='block w-full p-2 py-3 text-gray-900 border-2 bg-white rounded-lg text-xs'  name="category" id="category" value={category} onChange={(e)=>setCategory(e.target.value)} required>
                                            <option value="">Select Category</option>
                                            {
                                                categories?.map((item,i)=>(
                                                    <option key={i}  value={item.name}>{item.name}</option>
                                                ))
                                            }
                                        </select>
                                </div>
                                <div className='mt-6'>
                                    <input type='submit'   className='w-full font-bold text-white bg-yellow-700 rounded-lg py-2' />
                                </div>

                            </form>
                        </section>
                        :
                       <section className='mb-9'>
                            <div className='mt-3'>
                                <label htmlFor="categoryName" className="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                                <input value={categoryName} onChange={(e)=>setCategoryName(e.target.value)} type="text" id="categoryName" name="categoryName" autoComplete='off' className="block w-full p-2 text-gray-900 border-2 bg-white rounded-lg   " />
                            </div>
                            <div className='mt-3'>
                                <button onClick={createCategoryBtn} disabled={categoryName==""}  className='w-full font-bold text-white bg-yellow-700 rounded-lg py-2'>Submit</button>
                            </div>
                            <div className='p-6 mt-3 border rounded-lg shadow-lg '>
                                <header className='font-bold text-sm flex justify-between'>
                                    <p className='w-12'>ID</p>
                                    <p className='w-48'>Name</p>
                                    <p className='w-20'>State</p>
                                </header>
                                {
                                categories ? 
                                <div>
                                    {
                                        categories?.length >0 ? categories?.map((item,i)=>(
                                            <div key={i} className='font-bold text-sm flex justify-between items-center my-6 border-b-2 pb-3'>
                                                <p className='w-12'>{i+1}</p>
                                                <div className='w-48'>
                                                <p className='font-medium text-gray-600 line-clamp-1 truncate'>{item.name}</p>                      
                                                </div>
                                                <p className='w-20'>  
                                                <button onClick={ (e) => deleteCategoryBtn(e,item.id) } className='font-medium text-xs py-1 rounded-full px-4 text-white bg-red-500 w-fit  my-1'>Delete</button> 
                                                </p>
                                            </div>
                                        )) : 
                                        <div className='w-full h-screen flex justify-center items-center text-xs'>
                                            <p>No Items</p>
                                        </div>
                                    }
                                </div>
                                 :
                                    <div className='flex h-screen justify-center items-center'>
                                        <LoadingSkeleton />
                                    </div>
                                }
                            </div>
                       </section>
                    } 
                </div>
            </div>
        </div>
    </div>
  )
}
