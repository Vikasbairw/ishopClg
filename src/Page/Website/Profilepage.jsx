import React from 'react';

const Profilepage = () => {
    return (
        <div className='flex justify-center items-center  h-[100vh]'>
            <div className=" bg-[#fef3c7] w-[600px] h-[500px]  rounded shadow-lg">
                <div className="flex-col flex justify-center items-center">
<div className="w-[100px] h-[100px] rounded-full bg-slate-400  mt-[30px] overflow-hidden">
  <img src="./img/1.jpg" alt="" />
</div>
<form action="">
<input type="file" alt='image uplaod' className='font-serif' accept=".jpg, .jpeg, .png" style={{padding:"15px 0px 0px 40px"}}/>
<div className="pt-[40px] pb-[20px]">
    <label className='font-serif'>NAME:</label><br/>
    <input type="text" style={{width:"300px", padding:"5px"}} />
</div>
<div className="">
    <label className=' font-bold font-serif' >SKILL</label><br/>
    <input type="text"  style={{width:"300px",padding:"5px"}} />
</div>
</form>
            </div>
            </div>
            
        </div>
    );
}

export default Profilepage;
