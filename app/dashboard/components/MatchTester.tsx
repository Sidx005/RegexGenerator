import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { FormInputIcon } from "lucide-react"
import { useEffect, useState } from "react"

const MatchTester=({pattern,flags}:any)=>{
    const[inp,setInp]=useState('')
    const[matches,setMatches]=useState<string[]>([])

    useEffect(()=>{
        try {
           const regex=new RegExp(pattern,flags);
           const allMatches=[...inp.matchAll(regex)].map(m=>m[0]);
           setMatches(allMatches);
        } catch (error) {
          setMatches([])  
        }
    },[inp,pattern,flags])

    return(
        <Card>
            <CardHeader className="font-bold justify-start flex gap-5 text-lg items-center">Test Input <FormInputIcon/></CardHeader>
            <CardContent>
                <Textarea value={inp} onChange={e=>setInp(e.target.value)} placeholder="Enter test string here"/>
               <div className="mt-4 space-y-2">
          <h4 className="text-lg font-bold">Matches Found:</h4>
          {matches.length && pattern.trim()? (
            <ul className="list-disc pl-5 text-green-600">
              {matches.map((m, i) => <li key={i}>{m}</li>)}
            </ul>
          ) : (
            <p className="text-muted-foreground">No matches</p>
          )}
        </div>        
            </CardContent>
        </Card>
    )
}
export default MatchTester