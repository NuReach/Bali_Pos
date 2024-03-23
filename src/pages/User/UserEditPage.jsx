import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchUserById, updateUser } from '../../api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import FormSkeleton from '../Components/FormSkeleton';
import { toast } from 'sonner';

export default function UserEditPage() {
    const [username,setUsername] = useState("");
    const [password, setPassword] = useState("");// State for image
    const [confirm_password,setCPassword] = useState("");
    const [role,setRole] = useState("");
    const {id} = useParams();
    
    const navigate = useNavigate();
    const queryClient = useQueryClient();

  const { isLoading: userStatus, isError: userError, data: user } =  useQuery(
    { queryKey: ['user',{id}] , queryFn : ()=>fetchUserById(id)}
  );


  useEffect(()=>{
    setUsername(user?.username);
    setRole(user?.role);
    setPassword(user?.password);
    setCPassword(user?.password);
  },[user])

 

  const handleSubmit =  async (e)=>{
    if (confirm_password != password) {
        alert("Password does not match !!");
    }
    e.preventDefault();
    await updateUserMutation({username,password,id,role});
}

const { mutateAsync : updateUserMutation , isPending  } = useMutation({
    mutationFn : updateUser,
    onSuccess : ()=>{
        toast.success("User Created Successfully");
        queryClient.invalidateQueries(['users']);
        navigate("/user")
    },
    onError : ()=>{
        toast.error("error")
    }
  })

  console.log(isPending);

  return (
    <div>
        <Navbar />
        <div className='flex'>
            <Sidebar route={"/user"} />
            <div className='w-full justify-center mt-24 flex '>
                <div className='w-96'>
                    <section>
                        <p className='text-lg font-bold'>Edit User</p>
                    </section>
                    <section className='mt-3'>
                    {
                        user ? 
                        <form action="" className='gap-3 flex flex-col'>
                            <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 ">Username</label>
                                    <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text" id="username" name="username" autoComplete='off' className="block w-full p-2 text-gray-900 border-2 bg-white rounded-lg   " />
                            </div>
                            <div>
                                    <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 ">Role</label>
                                        <select className='block w-full p-2 py-3 text-gray-900 border-2 bg-white rounded-lg text-xs'  name="role" id="role" value={role} onChange={(e)=>setRole(e.target.value)} required>
                                        <option value="">Select Role</option>
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select>
                            </div>
                            <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                    <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}  id="password" name="password" autoComplete='off' className="block w-full p-2 text-gray-900 border-2 bg-white rounded-lg   " />
                            </div>
                            <div>
                                    <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 ">Conconfirm_password</label>
                                    <input type='password' value={confirm_password} onChange={(e)=>setCPassword(e.target.value)}  id="confirm_password" required name="confirm_password" autoComplete='off' className="block w-full p-2 text-gray-900 border-2 bg-white rounded-lg   " />
                            </div>                
                            <div className='mt-3'>
                                <button disabled={isPending} onClick={handleSubmit} className='w-full font-bold text-white bg-yellow-700 rounded-lg py-2'>Submit</button>
                            </div>
                        </form>
                        :
                        <FormSkeleton />
                    }
                    </section>
                </div>
            </div>
        </div>
    </div>
  )
}
