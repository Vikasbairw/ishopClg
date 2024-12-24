import React from 'react'

export default function Multipalbox(props) {
  return (

        <div className='w-[300px] mt-[50px] border border-primary h-[200px] text-center '>
            <img src={props.img} className='m-auto'/>
<h4 className='text-[25px] font-bold py-[10px]'>{props.h4}</h4>
<p className='text-[14px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor minim veniam, quis nostrud reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p>
    </div>

  )
}
