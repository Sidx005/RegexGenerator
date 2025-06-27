'use client'

import { signIn } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { GithubIcon, LucideGithub } from 'lucide-react'
import {Github} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { toast } from 'sonner'
const AuthComponent = () => {
  const [showSignUp,setShowsignUp]=useState(false)
  const [creds,setCreds]=useState({
    name:'',
    email:'',
    password:''
  })
  const toggleSignUp=()=>{
    setShowsignUp(!showSignUp)
  }
  const handleSignUp=async()=>{
    if(showSignUp){
      const res=await fetch('/api/register',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"

        },
        body:JSON.stringify(creds)
      })
      if(res.ok){
        toast.success('Signed up successfully');
        setCreds({name:'',email:'',password:''});
        setShowsignUp(false);
      }else{
        toast.error('Failed to sign up');
      }
    }else{
    const res=await signIn('credentials',{
      ...creds,
      redirect:false,
    });
    if(res?.error) toast.error(res.error);
    else if(res?.ok) {
      toast.success('Signed in successfully');
      setCreds({name:'',email:'',password:''});
      setShowsignUp(false);
    }}
  }
  // const {data:session}=useSession()
  return (
    <div className="bg-transparent flex justify-center items-center flex-col gap-5 backdrop-blur-2xl p-10 rounded-xl h-screen w-full z-50 absolute top-0 left-0 shadow-xl text-center space-y-6">
      <div className="p-5 min-h-7/12  bg-white border-2 rounded-lg shadow-md flex flex-col justify-center items-start text-center gap-5">
      <h2 className="text-2xl mt-3 w-full text-center font-bold">Sign {showSignUp?'Up':'in'} Required</h2>
     
      <p className="text-lg text-gray-500">Please sign in to access your certificate.</p>
   { !showSignUp?
   <> 
    <Input value={creds.email}    onChange={e=>setCreds({...creds,email:e.target.value})} type='email' placeholder='Enter your Email' className=''/>
    <Input value={creds.password} onChange={e=>setCreds({...creds,password:e.target.value})} type='password' placeholder='Enter your Password' className=''/>
   <Button onClick={handleSignUp}>Submit</Button></>
   :
   <> 
   <Input  value={creds.name}       onChange={(e) => setCreds({ ...creds, name: e.target.value })}
  type='text' placeholder='Enter your name' className=''/>
    <Input value={creds.email}      onChange={(e) => setCreds({ ...creds, email: e.target.value })}
  type='email' placeholder='Enter your Email' className=''/>
    <Input value={creds.password}   onChange={(e) => setCreds({ ...creds, password: e.target.value })}
  type='password' placeholder='Enter your Password' className=''/>
   <Button onClick={handleSignUp}>Submit</Button></>
   }
   <div className="w-full flex justify-center items-center">
<p onClick={toggleSignUp} className="text-center cursor-pointer text-lg  underline">{showSignUp?'Already have an Account ?':"Don't have an account?"} </p>
   </div>
    <p className='text-lg w-full text-center'>OR</p>
    <hr className='w-full bg-black ' />
    <div className="flex w-full justify-center items-center">
      <Button className='bg-black/90 border border-white/40 rounded-md' onClick={() => signIn('github')}>Sign in with GitHub <LucideGithub/></Button>

    </div>
    
      </div>
</div>
  )
}

export default AuthComponent
