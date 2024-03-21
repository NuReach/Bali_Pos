import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import { collection, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import LoadingSkeleton from '../Components/LoadingSkeleton';
import FormSkeleton from '../Components/FormSkeleton';


export default function ProductEditPage() {
    const [name,setName] = useState("");
    const [image, setImage] = useState(""); // State for image
    const [price, setPrice] = useState("");   // State for price
    const [cost, setCost] = useState("");     // State for cost
    const [stock, setStock] = useState("");   // State for stock
    const [category, setCategory] = useState(""); // State for category
    const [discount, setDiscount] = useState(""); 
    const {id} = useParams();   
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getProduct = async () => {
          try {
            const productRef = doc(db, "products", id); // Reference to the product document
            const productSnap = await getDoc(productRef);
            if (productSnap.exists) {
              setName(productSnap.data().name);
              setImage(productSnap.data().image);
              setPrice(productSnap.data().price);
              setCost(productSnap.data().cost);
              setStock(productSnap.data().stock);
              setDiscount(productSnap.data().discount);
              setCategory(productSnap.data().category);
            } else {
              console.log("Product not found"); // Handle product not found scenario
            }
          } catch (error) {
            console.error("Error fetching product:", error);
          }
        };
      
        getProduct();
      }, [id]);



      useEffect(() => {
        const getCategories = async () => {
          try {
            const categoriesRef = collection(db, "categories"); // Reference to the categories collection
            const categoriesSnap = await getDocs(categoriesRef);
            const allCategories = categoriesSnap.docs.map(doc => doc.data());
            setCategories(allCategories);
          } catch (error) {
            console.error("Error fetching categories:", error);
          }
        };
      
        getCategories();
      }, [db])


      const handleUpdateProduct = async (e) => {
        e.preventDefault();
        const productRef = doc(db, "products", id);
        try {
          await updateDoc(productRef, {
            name: name,
            image: image,
            price: parseFloat(price),
            cost: parseFloat(cost),
            stock: parseInt(stock),
            discount: parseFloat(discount),
            category: category.toLowerCase(),
            createdAt : Date.now(),
          });
          console.log("Product updated successfully!");
          toast.success("Product updated successfully!");
          navigate("/product");
        } catch (error) {
          console.error("Error updating product:", error);
          toast.error("Error updating product");
        }
      };

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
                        categories != null && name != "" ? 

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
                                    <button  onClick={handleUpdateProduct}  className='w-full font-bold text-white bg-yellow-700 rounded-lg py-2'>Submit</button>
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
