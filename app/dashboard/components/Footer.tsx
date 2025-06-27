'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
// motio

const Footer = () => {
  return (
       <motion.footer  className=''>
        <div className="bg-gradient-to-br rounded-t-4xl  p-20 from-black/60 via-black/80 to-black   text-white  text-center">
            <p className="text-xl ">
            &copy; {new Date().getFullYear()} Regex Made Simple. All rights reserved.
            </p>
            <p className="text-lg flex justify-center  items-center gap-2 mt-5">
            Made with <Heart size={20} className='text-red-600'/> <p>by Siddharth
            </p>
            </p></div>
       </motion.footer>

  )
}

export default Footer