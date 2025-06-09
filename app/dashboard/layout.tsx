// app/dashboard/layout.tsx
'use client'
import { useState } from 'react';
// import DashNav from '@''
import DashNav from './components/DashNav'
import { Menu } from 'lucide-react';
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className='flex w-full relative  h-screen'>

      <DashNav open={open} setOpen={setOpen} />
      <Menu onClick={()=>setOpen(true)} size={20}  className='top-2 z-50 cursor-pointer absolute left-2'/>
      <div className='flex-1 overflow-y-auto p-10'>
        {children}
      </div>
    </div>
  )
}
