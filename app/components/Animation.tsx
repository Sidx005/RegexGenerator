'use client'
import Image from 'next/image'
import React from 'react'

const Animation = () => {
  return (
    <section className="w-full mb-20 mt-20 flex justify-center items-center gap-3">
      {/* LEFT: Strings (Scroll Right) */}
      <div className="relative w-86 h-48 flex items-center overflow-hidden  rounded-lg bg-transparent">
  <div className="flex shrink-0 animate-marquee-right w-max gap-10 items-center p-4">
    {[...Array(2)].flatMap(() => (
      <>
        {[...Array(10)].map((_, i) => (
          <Image key={i} src="/Frame8.png" alt="String" width={400} height={400} />
        ))}
      </>
    ))}
  </div>
</div>
<div className='h-86 w-2 relative'>
<div

  style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
  className="h-full w-2 bg-gradient-to-r from-green-100 via-white relative to-green-100  shadow-transparent "
>
</div>
    <div className="absolute top-1/2 left-1/2 w-3 h-1/2 blur-xl z-40 bg-green-500  -translate-1/2"/>

</div>

<div className="relative w-86 h-48 flex items-center overflow-hidden  rounded-lg bg-transparent">
  <div className="flex shrink-0 animate-marquee-right w-max gap-10 items-center p-4">
    {[...Array(2)].flatMap(() => (
      <>
        {[...Array(8)].map((_, i) => (
          <Image key={i} src="/Frame7.png" alt="Regex" width={400} height={400} />
        ))}
      </>
    ))}
  </div>
</div>

    </section>
  )
}

export default Animation
