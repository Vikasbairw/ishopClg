import React from 'react'

export default function Homeimg(props) {
  return (
    <div className=' w-[235px] relative'>

     <img src={props.img} className='py-3'/>
   <p className='py-3'>{props.paragraph}</p>
   <p>⭐⭐⭐⭐⭐</p>
  
   <p><span className='text-[#FF4858]'>$499</span>  <span className='line-through text-[#C1C8CE]'>$599</span></p>
   <div className='absolute bg-[#FF4858] w-[40px] h-[20px] rounded text-[12px] text-[#fff] top-[-10px] left-[-3px]'>HOT</div>
    </div>
  )
}
