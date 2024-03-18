import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { useParams } from 'react-router-dom';


export default function ProductEditPage() {
    const [name,setName] = useState("");
    const [image, setImage] = useState(""); // State for image
    const [price, setPrice] = useState();   // State for price
    const [cost, setCost] = useState();     // State for cost
    const [stock, setStock] = useState();   // State for stock
    const [category, setCategory] = useState(""); // State for category
    const [discount, setDiscount] = useState(); 
    const {id} = useParams(); 
    
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
          const q = query(collection(db, "products"), where("id", "==", id));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            setName(doc.data().name);
            setImage(doc.data().image);
            setPrice(doc.data().price);
            setCost(doc.data().cost);
            setStock(doc.data().stock);
            setDiscount(doc.data().discount);
            setCategory(doc.data().category);
          });
        };
        fetchData(); // Call the async function immediately
    }, []);

    useEffect(()=>{
        const q = query(collection(db, "categories"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const updatedCategories = [];
        querySnapshot.forEach((doc) => {
            updatedCategories.push(doc.data());
        });
        setCategories(updatedCategories);
        });
        unsubscribe();
    },[])

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
                                        <input value={cost} onChange={(e)=>setCost(e.target.value)} type="text" id="cost" name="cost" autoComplete='off'  className="block w-24 p-2 text-gray-900 border-2 bg-white rounded-lg placeholder:text-xs  " />
                                </div>
                                <div>
                                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 ">Price</label>
                                        <input value={price} onChange={(e)=>setPrice(e.target.value)} type="text" id="price" name="price" autoComplete='off'  className="block w-24 p-2 text-gray-900 border-2 bg-white rounded-lg placeholder:text-xs  " />
                                </div>
                                <div>
                                        <label htmlFor="discount" className="block mb-2 text-sm font-medium text-gray-900 ">Discount</label>
                                        <input value={discount} onChange={(e)=>setDiscount(e.target.value)} type="text" id="discount" name="discount" autoComplete='off'  className="block w-24 p-2 text-gray-900 border-2 bg-white rounded-lg placeholder:text-xs  " />
                                </div>
                            </div>
                            <div className='mt-3'>
                                    <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900 ">Stock</label>
                                    <input value={stock} onChange={(e)=>setStock(e.target.value)} type="text" id="stock" name="stock" autoComplete='off' className="block w-full p-2 text-gray-900 border-2 bg-white rounded-lg   " />
                            </div>
                            <div>
                                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 ">Category</label>
                                        <select className='block w-full p-2 py-3 text-gray-900 border-2 bg-white rounded-lg text-xs'  name="category" id="category" value={category} onChange={(e)=>setCategory(e.target.value)} required>
                                        {
                                            categories?.map((item,i)=>(
                                                <option key={i} selected={item.name == category  }  value={item.name}>{item.name}</option>
                                            ))
                                        }
                                    </select>
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
