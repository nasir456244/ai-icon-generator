import React from 'react'
import Image from 'next/image';

const Card = ({title, array, state, setstate}) => {
  return (
    <div className='flex max-w-[650px] flex-wrap items-center gap-5'>
        <span className='text-white text-2xl w-full -mb-2'>{title}</span>
        {array?.map((item) => (
          <div className={`flex flex-col items-center gap-1 cursor-pointer hover:opacity-100 ${state === item ? "opacity-100 scale-110" : "opacity-40"}`} key={item} onClick={() => setstate(item)}>
              <Image alt={item} className='rounded-[10px]' width={90} height={70} src={`/${item}.webp`} />
              <p className='text-white capitalize text-md text-center'>{item}</p>
          </div>
        ))}
    </div>
  )
}

export default Card