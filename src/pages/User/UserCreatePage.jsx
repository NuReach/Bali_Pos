import React, { useState } from 'react'
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';

export default function UserCreatePage() {
    const [username,setUsername] = useState("");
    const [password, setPassword] = useState(""); // State for image
    const [confirm_password,setCPassword] = useState("");
  return (
    <div>
        <Navbar />
        <div className='flex'>
            <Sidebar route={"/user"} />
            <div className='w-full justify-center mt-24 flex'>
                <div className='w-96'>
                    <section>
                        <p className='text-lg font-bold'>Create New User</p>
                    </section>
                    <section className='mt-3'>
                        <form action="" className='gap-3 flex flex-col'>
                            <div>
                                    <label for="username" className="block mb-2 text-sm font-medium text-gray-900 ">Username</label>
                                    <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text" id="username" name="username" autoComplete='off' className="block w-full p-2 text-gray-900 border-2 bg-white rounded-lg   " />
                            </div>
                            <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                    <input value={password} onChange={(e)=>setPassword(e.target.value)} type="text" id="password" name="password" autoComplete='off' className="block w-full p-2 text-gray-900 border-2 bg-white rounded-lg   " />
                            </div>
                            <div>
                                    <label for="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 ">Conconfirm_password</label>
                                    <input value={confirm_password} onChange={(e)=>setCPassword(e.target.value)} type="text" id="confirm_password" name="confirm_password" autoComplete='off' className="block w-full p-2 text-gray-900 border-2 bg-white rounded-lg   " />
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
