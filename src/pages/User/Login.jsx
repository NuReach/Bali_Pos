import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';


export default function Login() {

    const navigate = useNavigate();
    // const login = async (e)=>{
    //     e.preventDefault();
    //     const q = query(
    //         collection(db, "users"),
    //         where("username", "==", username),
    //         where("password", "==", password) 
    //         );
            
    //     const querySnapshot = await getDocs(q);
    //     const data = querySnapshot.docs.map((doc)=>(
    //     {...doc.data()}
    //     ))

    //     if (data.length > 0) {
    //         const user = {id:data[0].id,username:data[0].username,role:data[0].role};
    //         localStorage.setItem('user', JSON.stringify(user));
    //         navigate("/");
    //         toast.success("Login Successfully")
    //     }else{
    //         toast.error("Invalid username and password")
    //     }
    // }
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const loginMutation = useMutation({
        mutationFn: async () => {
            const q = query(
                collection(db, "users"),
                where("username", "==", username),
                where("password", "==", password)
            );
            
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
            console.log(data);
            return data;
        },
        onSuccess : (data) => {
            if (data.length > 0) {
                const userData = data[0];
                localStorage.setItem('user', JSON.stringify(userData));
                navigate("/");
                toast.success("Login Successful");
            } else {
                toast.error("Invalid username and password");
            }
        },
    });
    
    const login = (e) => {
        e.preventDefault();
        try {
            loginMutation.mutate(); // Pass username and password here
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className='flex'>
        <div className=' hidden md:w-1/2 md:h-screen bg-black md:flex md:justify-center md:items-center'>
            <img className='w-full' src="/bali.jpg" alt="" />
        </div>
        <div className='w-full h-screen md:w-1/2 justify-center items-center flex px-9'>
        <form className="bg-white w-96">
                <img className='mb-3 md:hidden rounded-lg' src="/bali.jpg" alt="" />
                <div className=''>
                    <h1 className="text-gray-800 font-bold text-lg mb-1">Hello again!</h1>
                    <p className="text-sm font-normal text-gray-600 mb-3">Welcome back!</p>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        <input className="pl-2 outline-none border-none focus:ring-0" type="text" name="" id="" value={username} placeholder="Username" onChange={(e)=>setUsername(e.target.value)} />
                    </div>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fillRule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clipRule="evenodd" />
                        </svg>
                        <input className="pl-2 outline-none border-none focus:ring-0" type="text" name="" id="" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    </div>
                    <button onClick={login} type="submit" className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Login</button>
                    <button  className="text-sm ml-2 hover:text-blue-500 cursor-pointer">Contact to admin to create new account !</button>
                </div>
            </form>
        </div>
    </div>
  )
}
