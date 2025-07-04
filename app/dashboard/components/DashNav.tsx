'use client'
import React from 'react'
import { ArrowLeft, X } from 'lucide-react'
import Link from 'next/link'


const DashNav = ({open,setOpen}:{open:boolean,setOpen:(open:boolean)=>void}) => {
  return (
    <>
    <div className={`${open?'h-full opacity-100 w-full p-5':'h-0 w-0 p-0 opacity-0'} overflow-hidden ease-in-out duration-200  absolute  z-50  md:relative   text-sm font-bold  flex flex-col md:p-5 justify-center gap-10  text-white min-h-screen md:w-1/5 bg-black`}>
        <Link onClick={()=>setOpen(false)} href='/' className='absolute text-sm top-8 font-medium flex gap-5 items-center  left-2'><ArrowLeft size={20}/> Back</Link>
        <Link onClick={()=>setOpen(false)} href='regex-test' className=''>Test Regex</Link>
        <Link onClick={()=>setOpen(false)} href='learn' className=''>Learn Regex</Link>
        <Link onClick={()=>setOpen(false)} href='generate-regex' className=''>Generate Regex</Link>
        <X className='absolute top-8 z-50 right-8 md:hidden cursor-pointer' onClick={()=>setOpen(false)}/>
    </div>


    </>
  )
}

export default DashNav