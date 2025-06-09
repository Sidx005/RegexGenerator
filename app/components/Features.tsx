'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { motion, Variants } from 'framer-motion'

type Props = object

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
      ease: 'anticipate',
      duration: 1,
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeInOut' },
  },
}

const Features = (props: Props) => {
  const MotionCard = motion(Card)

  return (
    <motion.div
      className='flex overflow-hidden flex-col items-center p-5 gap-20 mb-20 w-full'
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <h1 className="text-4xl font-bold text-center">Features</h1>

      <MotionCard variants={cardVariants} className='md:w-1/2'>
        <CardHeader className='text-2xl font-bold'>
          <CardTitle>Learn Regex</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className='text-lg'>
            Get a clear understanding of regex through interactive lessons, examples, and instant feedback. Perfect for beginners and those brushing up.
          </CardDescription>
        </CardContent>
      </MotionCard>

      <MotionCard variants={cardVariants} className='md:w-1/2'>
        <CardHeader className='text-2xl font-bold'>
          <CardTitle>Test Regex</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className='text-lg'>
            Enter your regex and sample text to instantly test and visualize pattern matches. See results live and tweak your expressions easily.
          </CardDescription>
        </CardContent>
      </MotionCard>
    </motion.div>
  )
}

export default Features
