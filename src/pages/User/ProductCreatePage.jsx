import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import { useLocation, useNavigate } from 'react-router-dom';
import { Timestamp, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc } from "firebase/firestore"; 
import { toast } from 'sonner';
import { db } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';
import LoadingSkeleton from '../Components/LoadingSkeleton';


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

    const [categories, setCategories] = useState();


    const createProduct = async (e)=>{
        e.preventDefault();
        const id = uuidv4();
        try {
            await setDoc(doc(db, "products", id), {
                id: id,
                name: name,
                image : image,
                price : parseFloat(price),
                cost : parseFloat(cost),
                discount : parseFloat(discount),
                category : category.toLowerCase(),
                stock : parseInt(stock),
                createdAt: Date.now()
              });
            toast.success("Product created successfully!");
            setName("");
            setImage("");
            setPrice("");
            setCost("");
            setDiscount("");
            setCategory("");
            setStock("");
          } catch (error) {
            console.log(error);
            toast.error('Error creating product ', error)
        }
    }

    const createCategory = async (e)=>{
        const id = uuidv4();
        e.preventDefault();
        try {
            await setDoc(doc(db, "categories", id), {
                id: id,
                name: categoryName,
                createdAt: Date.now(),
              });
            toast.success("Category created successfully!");
            setCategoryName("");
            navigate("/product/create?page=category");
          } catch (error) {
            console.log(error);
            toast.error('Error creating category ', error)
        }
    }

    //fetch Categories
    useEffect(() => {
        const fetchCategories = async () => {
            const q = query(collection(db, "categories"),orderBy("createdAt","desc"));
            const querySnapshot = await getDocs(q);
            const categoriesData = querySnapshot.docs.map(doc => ({
                ...doc.data()
              }));
              setCategories(categoriesData);
        };
    
        fetchCategories();
      }, [categories]);

      console.log(category);
    


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
                                <button onClick={createCategory} disabled={categoryName==""}  className='w-full font-bold text-white bg-yellow-700 rounded-lg py-2'>Submit</button>
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
                                                <button onClick={ async()=>{
                                                    if (window.confirm("Do you really want to delete?")) {
                                                        await deleteDoc(doc(db, "categories", item.id));
                                                        toast.success("Deleted Category Successfully");
                                                        //navigate("/product/create?page=product")
                                                        }
                                                }} className='font-medium text-xs py-1 rounded-full px-4 text-white bg-red-500 w-fit  my-1'>Delete</button> 
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
                                {/* <div className='w-full flex justify-end'>
                                    <button className='font-medium text-xs py-1 rounded-md px-4 text-white bg-black  my-1 hidden xl:block'>Next</button>
                                </div> */}
                            </div>
                       </section>
                    } 
                </div>
            </div>
        </div>
    </div>
  )
}
