import React, { useState } from 'react'
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import { createUser } from '../../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

export default function UserCreatePage() {
    const [username,setUsername] = useState("");
    const [password, setPassword] = useState(""); // State for image
    const [confirm_password,setCPassword] = useState("");
    const [role,setRole] = useState("");
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutateAsync : createUserMutation  } = useMutation({
        mutationFn : createUser,
        onSuccess : ()=>{
            toast.success("User Created Successfully");
            queryClient.invalidateQueries(['users']);
            navigate("/user")
        },
        onError : ()=>{
            toast.error("error")
        }
      })

    const handleSubmit =  async (e)=>{
        if (confirm_password != password) {
            alert("Password does not match !!");
        }
        const id = uuidv4();
        e.preventDefault();
        await createUserMutation({username,password,id,role});
    }
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
                        <form onSubmit={handleSubmit} action="" className='gap-3 flex flex-col'>
                            <div>
                                    <label for="username" className="block mb-2 text-sm font-medium text-gray-900 ">Username</label>
                                    <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text" id="username" name="username" required autoComplete='off' className="block w-full p-2 text-gray-900 border-2 bg-white rounded-lg   " />
                            </div>
                            <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                    <input value={password} onChange={(e)=>setPassword(e.target.value)} type="text" id="password" name="password" required autoComplete='off' className="block w-full p-2 text-gray-900 border-2 bg-white rounded-lg   " />
                            </div>
                            <div>
                                    <label for="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 ">Conconfirm_password</label>
                                    <input value={confirm_password} onChange={(e)=>setCPassword(e.target.value)} type="text" id="confirm_password" required name="confirm_password" autoComplete='off' className="block w-full p-2 text-gray-900 border-2 bg-white rounded-lg   " />
                            </div>
                            <div>
                                    <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 ">Role</label>
                                        <select className='block w-full p-2 py-3 text-gray-900 border-2 bg-white rounded-lg text-xs'  name="role" id="role" value={role} onChange={(e)=>setRole(e.target.value)} required>
                                        <option value="">Select Role</option>
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select>
                            </div>
                        
                            <div className='mt-3'>
                                <input type="submit" className='w-full font-bold text-white bg-yellow-700 rounded-lg py-2'/>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    </div>
  )
}
