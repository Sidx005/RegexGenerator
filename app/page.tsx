import React from "react";
import { ArrowRight } from "lucide-react";
import Nav from "./components/Nav";
import Link from "next/link";
import Animation from "./components/Animation";
import FAQ from "./components/FAQ";
import Features from "./components/Features";
import Footer from "./dashboard/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 w-full">
      <Nav />
      <main className="flex flex-col items-center gap-5  px-4 md:px-20 py-16">
       <div className="w-full flex flex-col items-center justify-center gap-9">
        <h1 className="text-5xl  md:text-7xl font-sans p-5 font-extrabold text-center bg-gradient-to-b from-black/50 to-black bg-clip-text text-transparent">
          Regex Made Simple and Fast.
        </h1>
        <p className="text-2xl opacity-60 text-center"> An interactive tool to build, test, and debug regular expressions <br /> with instant feedback.</p>
  <Link
  href="/dashboard"
  className="flex link items-center gap-2 text-lg md:text-xl font-medium px-6 py-3 rounded-md shadow-md 
             text-white bg-black  opacity-80
             animate-gradient hover:opacity-80 transition"
>
       <p className="flex items-center p-1 z-30">   Start Testing <ArrowRight className="" size={24} /></p>
        </Link>
       </div>
      
     {/* Animation */}
     <Animation/>
        <Features/>

        <FAQ/>
      </main>
      <Footer/>
    </div>
  );
}
