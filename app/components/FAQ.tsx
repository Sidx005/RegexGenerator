'use client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { motion } from 'framer-motion'
// import { AccordionItem } from '@radix-ui/react-accordion'
import React from 'react'
// motion
type Props = {}
const FAQvariants={
    hidden:{opacity:0,y:50},
    visible:{
        opacity:1,
        y:0,
        transition:{staggerChildren:0.4,duration:0.8,ease:'easeInOut'}
    }
}
const AccordionItemMotion=motion(AccordionItem)
const FAQ = (props: Props) => {
  return (
    <motion.div variants={FAQvariants} initial="hidden" whileInView={'visible'} viewport={{once:true,amount:0.3}} className="flex flex-col p-5  gap-20 md:w-1/2 text-center">
      <h1 className="text-3xl md:text-3xl font-bold">Frequently Asked Questions</h1>
    <Accordion collapsible type='single'>
    <AccordionItemMotion variants={FAQvariants} value="item-1">
      <AccordionTrigger className='text-xl font-bold' >
        What is Regex
      </AccordionTrigger>
      <AccordionContent className='text-left text-lg'>
        <p>
        Regular expressions (regex) are sequences of characters that form a search pattern. They are used for string matching and manipulation, allowing you to find, replace, or validate text based on specific patterns.

        </p>

      </AccordionContent>
      </AccordionItemMotion> 
       <AccordionItemMotion variants={FAQvariants} value="item-2">
      <AccordionTrigger className='text-xl font-bold' >
           Features of This Regex Tester
      </AccordionTrigger>
      <AccordionContent className='text-left text-lg'>
        <p>
      This app lets you test and learn regex through an interactive dashboard. Enter your pattern and text to see instant feedback and explanations, making it easy to understand, debug, and refine regex.

        </p>

      </AccordionContent>
      </AccordionItemMotion><AccordionItemMotion variants={FAQvariants} value="item-3">
      <AccordionTrigger className='text-xl font-bold' >
          Is Regex Tester free?
      </AccordionTrigger>
      <AccordionContent className='text-left text-lg'>
        <p>
    Yes this is completely free.It is made for learning purposes and to help people understand regex better. You can use it without any cost.
        </p>

      </AccordionContent>
      </AccordionItemMotion>
    </Accordion>
    </motion.div>
  )
}

export default FAQ