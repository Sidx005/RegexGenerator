'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MoveLeft, MoveRight } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import RegexInp from './components/RegexInp'
import {toast} from 'sonner'
import Image from 'next/image'
import {useSession,signIn} from 'next-auth/react'
// import {redirect} from 'next/navigation'
import AuthComponent from './AuthComponent'
import Avatar from './Avatar'
type Lesson={
  title:string
  instruction:string
  text?:string
  correctRegex?:string
  prefix?:string
  defaultFlags?:string
  src?:string
}
const content:Lesson[]=[
  {
    title:"Introduction to Regex",
    instruction:"Regex is a powerful tool for pattern matching and text manipulation. It can be used to search, replace, and validate strings based on specific patterns. It is widely used in programming, data processing, and text analysis.It allows you to define complex search patterns using a combination of characters, symbols, and quantifiers. In this section we will learn about most common regex patterns and how to use them effectively."
  },
  {
    title:"Basic Pattern Matching",
    instruction:"We start with basic character matching. In regex, you can match specific characters or groups of characters using simple patterns. For example, the pattern 'abc' will match the exact sequence of characters 'abc' in a string. You can also use special characters like '.' to match any single character, or '*' to match zero or more occurrences of the preceding character.  To find the word 'hello' in the text, type the same",
    text:"Hello, user!",
    correctRegex:"Hello",
    prefix:'/',
    defaultFlags:'gm'


  },
  {
    title:"Digit Matching",
    instruction:"Match all the numbers in the text , by typing d+. The 'd' character in regex is used to match any digit (0-9). The '+' quantifier means one or more occurrences of the preceding element. So, 'd+' will match any sequence of digits in the text. For example, if the text contains 'There are 3 cats, 12 dogs, and 7 parrots.', typing 'd+' will match '3', '12', and '7'.",
    text:"There are 3 cats, 12 dogs, and 7 parrots.",
    correctRegex:"d+",
    prefix:'/',
    defaultFlags:'g'


  },
  {
   title:"Dot Character (.)",
   instruction:'The dot `.` matches any single character except newline. Match "c.t" to capture words like "cat", "cut", or "cot"',
   text:"cat, cout, cut, cit, c, t",
   correctRegex:"c.t",
   prefix:'/',
   defaultFlags:'g'

  },{
    title:'Negated Character (^)',
    instruction:"Negated character classes match any character **except** the ones inside the brackets. Use `[^aeiou]` to match any character that is **not a vowel**. Try it out below.",
    text:"Regex is powerful!",
    correctRegex:"[^aeiou]",
    prefix:'/',
    defaultFlags:'g'
  },
  {
    title:'Congratulations! 🎉',
    instruction:"You're now regex certified",
    src:'/Certificate.png'
  }


]



const LearnClient = () => {
  const {data:session,status}=useSession()


 
  const[currentPage,setCurrentPage]=React.useState(0)
  const currentContent=content[currentPage]
  const [userName,setUserName]=useState('')
  const [answer,setAnswer]=useState('')
  const certRef=useRef<HTMLDivElement>(null)
const [showModal, setShowModal] = useState(false)


useEffect(()=>{
  if(!session && currentPage===content.length-1){
    setShowModal(true)
  }else{
    setShowModal(false)
  }
},[currentPage,session])


  const checkRegex=useCallback(()=>{
  try{
    const userRegex=new RegExp(answer,currentContent.defaultFlags)
    console.log(userRegex)
    if( userRegex.test(currentContent.text||'') && answer===currentContent.correctRegex){
      return true
    }
  }catch(error){
    // toast.error('Invalid Regex Pattern')
    console.error('Invalid Regex Pattern:', error)
   return false
  }
  return false
},[answer, currentContent])

 useEffect(()=>{
  if(!answer.trim()) return;
  const timeout=setTimeout(()=>{

  
  if(checkRegex()){
    toast.success('Correct Regex Pattern!')
  }else{
    toast.error('Incorrect Regex Pattern, Try Again!')
  }},1000)
  return ()=>clearTimeout(timeout)
 },[answer,checkRegex])

  if(status==='loading') return <p>Loading ...</p>


  return (
    <div className='text-3xl flex flex-col gap-10 justify-between items-start font-bold'>
      <div className="w-full p-5 flex items-center  justify-center">
      <div className="w-full flex items-center flex-col justify-center">
<div className="w-1/2  bg-gray-300 rounded-xl h-4 mt-5">
  <div
    className="bg-green-300 h-4 rounded-xl transition-all duration-300"
    style={{ width: `${(currentPage+1)/content.length*100}%` }}
  />

</div>      
  <p className='text-sm text-gray-500'>{currentPage+1}/{content.length}</p>
    
      </div>
 {currentPage===content.length-1 && session?.user && <Avatar/>}  

      </div>
    <header className='mt-20 text-5xl'>{currentContent.title}</header>
  {/* Page Body */}
    <div className="w-full flex flex-col gap-5  p-5 justify-center font-normal">
     {currentContent.src ? (
  <div className="w-full flex flex-col items-center gap-4">
    <div ref={certRef} className="relative text-center w-fit">
      <Image
        alt="Certificate"
        src={currentContent.src}
        height={800}
        width={1200}
        className="rounded-xl"
      />
      <h1 className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[7px] md:text-4xl font-bold text-black">
        {session?.user?.name || 'Your Name'}
      </h1>
    
    </div>



    <Button
    disabled={!session?.user}
      onClick={async()=>{
        if(!session?.user) return toast.error('Please enter your name to download the certificate')
        if(!certRef.current) return toast.error('Certificate not ready yet')
          const html2canvas=(await import('html2canvas')).default
        const canvas=await html2canvas(certRef.current,{scale:2})
        const defaultURL=canvas.toDataURL('image/png')
        const link=document.createElement('a')
        link.href=defaultURL
          link.download = `${session?.user?.name || 'Certificate'}_NextJS.png`
        link.click()

      }}
    >
      Download Certificate
    </Button>
  </div>
) : (
  <p className="text-xl text-muted-foreground">{currentContent.instruction}</p>
)}

{currentContent.text && currentContent.correctRegex &&<>     <div className='w-full relative p-6 bg-black/20 backdrop-blur-md border-2 min-h-20 rounded-md mt-9 flex justify-start items-center border-white/30'>
     <p className='absolute left-2 -top-5 text-sm px-2 py-1 rounded-md bg-black text-white'><code>Text</code></p>
     <p className='text-xl'>{currentContent.text}</p>
     </div>
     <RegexInp prefix={currentContent.prefix} value={answer} onChange={e=>setAnswer(e.target.value)} flags={currentContent.defaultFlags}/>
   </>   }
    <div className={`flex w-full mt-10  ${currentPage===0?'justify-end':'justify-between'}`}>

     {currentPage!=0 && <Button disabled={currentPage===0} onClick={()=>setCurrentPage(prev=>prev-1)} className='text-xl p-5 items-center flex gap-3'> <MoveLeft/> Prev</Button>}
   {currentPage!==content.length-1 &&  <Button disabled={currentPage>0 && !checkRegex()} onClick={()=>{setCurrentPage((currentPage+1)%content.length);setAnswer('');}} className='text-xl p-5 items-center flex gap-3'>Next <MoveRight/></Button>}
    </div>
    </div>
{showModal &&  <AuthComponent />
}    </div>
  )
}

export default LearnClient