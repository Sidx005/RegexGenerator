'use client'

// import { Card, CardContent, CardHeader } from "../../components/"
import {Card,CardContent,CardHeader} from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"
import dynamic from "next/dynamic"
import { useState } from "react"
const MonacoEditor=dynamic(()=>import('@monaco-editor/react'),{ssr:false})
interface RegexInputProps {
  pattern: string;
  setPattern: (pattern: string) => void;
  flags: string;
}
const RegexInput:React.FC<RegexInputProps>= ({  setPattern, flags })=>{
    const[rawPattern,setRawPattern]=useState('')
    return(
        <Card className="w-full p-5">
            <CardHeader className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Regex Pattern</h3>
             <Tooltip>
            <TooltipTrigger asChild >
            <Info className="w-4 h-4 text-muted-foreground"/>
            </TooltipTrigger>
            <TooltipContent>
              <p>Write a valid regex pattern like <code>/hello/i</code></p>  
            </TooltipContent>
            </Tooltip>
            </CardHeader>
            <CardContent>
                {/* <Monaco */}
              <MonacoEditor
  language='javascript'
  value={`/${rawPattern}/${flags}`}
  height='50px'
  theme='vs-dark'
  options={{
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    scrollbar: { vertical: 'hidden', horizontal: 'hidden' },
    wordWrap: 'off',
  }}
  onChange={(val) => {
    if (!val) return;
    
    const match = val.match(/^\/(.*)\/([a-z]*)$/);
  if (match) {
  setRawPattern(match[1]);
  setPattern(match[1]); 
 
} else {
  const cleaned = val.replaceAll('/', '');
  setRawPattern(cleaned);
  setPattern(cleaned); // 👈 update parent
}

  }}
/>

            </CardContent>

        </Card>
    )
}
export default RegexInput