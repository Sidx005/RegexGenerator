'use client'

import { signIn } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { GithubIcon, LucideGithub } from 'lucide-react'
import {Github} from 'lucide-react'
const AuthComponent = () => {
  return (
    <div className="bg-transparent flex justify-center items-center flex-col gap-5 backdrop-blur-2xl p-10 rounded-xl h-screen w-full z-50 absolute top-0 left-0 shadow-xl text-center space-y-6">
      <h2 className="text-3xl font-bold">Sign in Required</h2>
      <p className="text-gray-600">Please sign in to access your certificate.</p>
      <Button className='bg-black/90 border border-white/40 rounded-md' onClick={() => signIn('github')}>Sign in with GitHub <LucideGithub/></Button>
    </div>
  )
}

export default AuthComponent
