'use client'
import { MenuIcon, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const Nav = () => {
  const [open, setOpen] = useState(false)

  const toggleMenu = () => setOpen(prev => !prev)

  return (
    <>
      <div className='w-full flex items-center justify-between p-5 sticky top-0 left-0 bg-white z-10'>
        <h1 onClick={toggleMenu} className='text-2xl cursor-pointer flex gap-2 items-center text-gray-700 font-bold'>
          <MenuIcon  className="" />
          Menu
        </h1>
      </div>

      <div className={`fixed top-0 left-0  bg-black text-white transition-all duration-300 ease-in-out delay-100 overflow-hidden z-50 ${open ? ' w-full opacity-100 h-full' : 'w-0 h-0 opacity-0'}`}>
        {/* Sidebar content here */}
        <div className="p-5 flex flex-col gap-5 text-4xl ">
        
                <p style={{fontSize:'100px'}} className='text-4xl cursor-pointer' onClick={toggleMenu}><X size={50} className=''/></p>
                        <Link onClick={()=>setOpen(false)} href='/' className='mt-10'>Home</Link>
                        <Link onClick={()=>setOpen(false)} href='/dashboard' className=''>Test Regex</Link>
                        <Link onClick={()=>setOpen(false)} href='/' className=''>About</Link>

        </div>
      </div>
    </>
  )
}

export default Nav
