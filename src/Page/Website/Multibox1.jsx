import React from 'react'

export default function Multibox1( props) {
  return (

          <div className='w-[300px] mt-[50px]   text-center  flex'>
       <img src={props.img} className='m-auto w-[120px] h-[60%]'/>
          <div>
          <h4 className='text-[12px] font-bold p-[10px]'>{props.h4}</h4>
<p>⭐⭐⭐⭐⭐</p>
<p><span className='text-[#FF4858]'>$499</span>  <span className='line-through text-[#C1C8CE]'>$599</span></p>
          </div>
    </div>
   
  )
}
