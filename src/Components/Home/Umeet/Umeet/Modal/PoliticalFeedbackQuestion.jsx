import { AiOutlineCloseCircle } from 'react-icons/ai'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { useState } from 'react'

const PoliticalFeedbackQuestion = ({ onClose }) => {

  return (
    <div className='absolut fixed top-0 left-0 h-full w-full flex justify-center items-center' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
     <div className='w-[98%] md:w-[60%] lg:w-[40%] xl:w-[29%] bg-white rounded-xl p-3'>
      <div className='flex py-1 text-gray-600'>
        <span className='text-[18px] w-11/12 flex justify-center text-gray-700 font-bold'>Add Question</span>
        <AiOutlineCloseCircle onClick={onClose} className='w-8 cursor-pointer hover:text-red-500 h-7'/>
      </div>          

      <section>
       <div className='relative'>
       	<label className='absolute z-10 text-[10px] left-4 bg-white px-2 font-semibold text-gray-400'>Enter Your Question</label>
       	<textarea placeholder='What is good in event?' rows='2' className='w-full outline-none my-1 rounded-lg border border-gray-300 p-2'/>
       	<p className='flex justify-end text-gray-600 text-[10px]'>40/140</p>
       </div>
       <div className='relative'>
       	<label className='absolute z-10 text-[10px] left-4 bg-white px-2 font-semibold text-gray-400'>Option 1*</label>
       	<input className='w-full outline-none my-1 rounded-lg border border-gray-300 p-2'/>
       	<p className='flex justify-end text-gray-600 text-[10px]'>40/85</p>
       </div>
       <div className='relative'>
       	<label className='absolute z-10 text-[10px] left-4 bg-white px-2 font-semibold text-gray-400'>Option 2*</label>
       	<input className='w-full outline-none my-1 rounded-lg border border-gray-300 p-2'/>
       	<p className='flex justify-end text-gray-600 text-[10px]'>40/85</p>
       </div>
       <div className='relative'>
       	<label className='absolute z-10 text-[10px] left-4 bg-white px-2 font-semibold text-gray-400'>Option 3 (optional)</label>
       	<input className='w-full outline-none my-1 rounded-lg border border-gray-300 p-2'/>
       	<p className='flex justify-end text-gray-600 text-[10px]'>40/85</p>
       </div>
       <div className='relative'>
       	<label className='absolute z-10 text-[10px] left-4 bg-white px-2 font-semibold text-gray-400'>Option 4 (optional)</label>
       	<input className='w-full outline-none my-1 rounded-lg border border-gray-300 p-2'/>
       	<p className='flex justify-end text-gray-600 text-[10px]'>40/85</p>
       </div>                    
      </section>  

      <section className='w-full mx-'>
         <button className='py-2.5 my-2 text-[17px] w-full rounded-lg text-white font-semibold bg-[#649B8E] '>Done</button>
      </section> 
     </div>
    </div>
  )
}

export default PoliticalFeedbackQuestion