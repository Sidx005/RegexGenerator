import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
const Avatar = () => {
  const { data: session } = useSession({ required: true })
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      {/* Avatar Circle */}
      <div
        className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-gray-300 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <Image
          height={100}
          width={100}
          alt="avatar"
          src={session?.user?.image || "https://avatars.githubusercontent.com/u/10241045?v=4"}
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-xl p-4 z-50 border">
          <div className="flex items-center gap-3">
            <Image
              src={session?.user?.image || "https://avatars.githubusercontent.com/u/10241045?v=4"}
              alt="User"
              height={40}
              width={40}
              className="rounded-full"
            />
<div className='p-2 flex flex-col justify-center items-start max-w-[180px]'>
  <h2 className="text-md font-semibold break-words">{session?.user?.name}</h2>
  <p className="text-sm text-gray-500 truncate w-full" >
    {session?.user?.email}
  </p>
</div>

          </div>
          <Button
            className="mt-4 w-full bg-black hover:bg-gray-900 text-white"
            onClick={() => signOut({redirect:false,callbackUrl:'/dashboard/learn'})}
          >
            Sign Out
          </Button>
        </div>
      )}
    </div>
  )
}

export default Avatar
