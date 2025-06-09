// import { NextResponse } from 'next/server';
// import { GoogleGenerativeAI } from '@google/generative-ai'; // Correct import

import { NextResponse } from "next/server";

// t3 code
// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// if (!GEMINI_API_KEY) {
//   console.error('GEMINI_API_KEY is not set in environment variables.');
// }

// const genAI = new GoogleGenerativeAI(GEMINI_API_KEY || ''); // Initialize the correct SDK instance

// export async function POST(req: Request) {
//   try {
//     const { input } = await req.json(); // Destructure 'input' from the request body

//     if (!input) {
//       return NextResponse.json({ error: 'No input text provided.' }, { status: 400 });
//     }


//     const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

//     const prompt = `Generate a JSON object containing a field "pattern" with a regex pattern that matches the following input: "${input}". The pattern should be as specific as possible and include any necessary flags inside the pattern itself if appropriate, or a separate "flags" field if the API explicitly supports it, but for now just the pattern string. Do not include any additional text or explanations outside the JSON object.
    
//     Example output format:
//     {"pattern": "\\d+"}
    
//     Input: "${input}"
    
//     JSON response:`;

//     const result = await model.generateContent(prompt);
//     const response = result.response;
//     const text = response.text(); 

//     let jsonResponse;
//     try {
//       jsonResponse = JSON.parse(text);
//     } catch (parseError) {
//       console.error('Failed to parse Gemini response as JSON:', text, parseError);
//       // Fallback: If parsing fails, try to extract something that looks like a pattern
//       const regexMatch = text.match(/"pattern":\s*"(.*?)"/);
//       if (regexMatch && regexMatch[1]) {
//         jsonResponse = { pattern: regexMatch[1] };
//       } else {
//         return NextResponse.json(
//           { error: 'AI failed to generate a valid JSON regex pattern.', rawResponse: text },
//           { status: 500 }
//         );
//       }
//     }

//     if (jsonResponse && typeof jsonResponse.pattern === 'string') {
//       return NextResponse.json({ pattern: jsonResponse.pattern });
//     } else {
//       return NextResponse.json(
//         { error: 'AI response missing "pattern" field or invalid format.', rawResponse: text },
//         { status: 500 }
//       );
//     }
//   } catch (error) {
//     console.error('Error generating AI regex:', error);
//     return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
//   }
// }


// My code
import {GoogleGenerativeAI} from '@google/generative-ai'
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if(!GEMINI_API_KEY) throw new Error('GEMINI_API_KEY is not set in environment variables.');

export const POST=async(req:Request)=>{
    try {
       const {input}=await req.json()
       if(!input) return NextResponse.json({error:`No input provided`}) 
      const model=new GoogleGenerativeAI(GEMINI_API_KEY)
    const genModel=await model.getGenerativeModel({model:"gemini-1.5-flash"})
    const prompt=`Generate a JSON object containing a field "pattern" with a regex pattern that matches the following input: "${input}". The pattern should be as specific as possible and include any necessary flags inside the pattern itself if appropriate, or a separate "flags" field if the API explicitly supports it, but for now just the pattern string. Do not include any additional text or explanations outside the JSON object.`
    const result=await genModel.generateContent(prompt)
    const response=result.response
    const text= response.text()
    console.log(text)
    let jsonResponse
    try {
        jsonResponse=JSON.parse(text)
        if(jsonResponse && typeof jsonResponse.pattern==='string'){
            return NextResponse.json({pattern:jsonResponse.pattern})
        }
    } catch (error) {
        console.error('Failed to parse Gemini response as JSON:', text, error)
        const jsonMatch=text.match(/"pattern":\s*"(.*?)"/)
        if(jsonMatch && jsonMatch[1]){
            jsonResponse={pattern:jsonMatch[1]}
            return NextResponse.json({pattern:jsonResponse.pattern})
    }else {
        return NextResponse.json(
          { error: 'AI failed to generate a valid JSON regex pattern.', rawResponse: text },
          { status: 500 }
        );}
    }
} catch (error) {
          console.error('Error in /api/generate:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })

    }
}