import { AiOutlineCloseCircle } from "react-icons/ai";
import navigation from '../../../../../Assets/Images/Umeet/Umeet-Main/Umeet navigation.png'

export default function PreviewEvent({ onClose, selectedSpecificEvent,
 selectedImage, formState, profileReducer, eventMode, inputValue, code, 
 selectedQualification, isVeg, }){
 
 const options = { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric", hour12: true }

 return (
  <section className='absolut z-20 fixed top-0 left-0 h-full w-full flex justify-center items-center' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
    <div className="w-[96%] md:w-[55%] lg:w-[45%] xl:w-[40%] h-[96%] bg-white rounded-xl p-3">
        <section className={`${selectedQualification ? 'h-[15%]' : ''}`}>
        <div className="flex border-b pb-2 justify-between py-1">
          <div className='text-xl font-medium w-full flex justify-center'>{formState.eventName}</div>
          <span className="w-1/12">
            <AiOutlineCloseCircle
              onClick={onClose}
              className="w-8 text-gray-600 cursor-pointer hover:text-red-500 h-7"
            />
          </span>
        </div>
        <div className='text-center text-[13px] md:text-[14px] lg:text-[16px]'>
        	{selectedQualification ? selectedQualification : null}
        </div>
        </section>
        <section className={`${selectedQualification ? 'h-[85%]' : 'h-[92%]'} mt-1 overflow-y-scroll`}>
         <div className='flex justify-center items-center'>
         <div className='relative '>
          <img src={selectedImage} alt="Selected" className='w-ful h-[400px] rounded-xl object-cover' />
          <div class={`${selectedImage?.includes('localhost') ? 'hidden' : ''} absolute inset-0 flex justify-center items-center`}>
            <div className='w-1/2 flex flex-col justify-center items-center'>
              <div className='py-0.5'>{formState?.eventName}</div>
              <div className='py-0.5'>Hosted By: <span className='font-semibold'>{profileReducer?.profile?.fname}</span></div>
              <div className='py-0.5'>{`${(formState?.eventdateAndTime !== '') ? new Date(formState?.eventdateAndTime).toLocaleString("en-US", options) : 'start date'} - ${(formState?.eventEndDate !== '') ? new Date(formState?.eventEndDate).toLocaleString("en-US", options) : 'end date'}`}</div>
              <div className='py-0.5'>{formState?.eventAddress}</div>
            </div>
           </div>
          </div>
          </div>
         <div className='flex my-2'>
	        <span className='w-1/3'>Hostedt BY</span>
	        <span className='w-2/3'>:<span className='ml-3 font-semibold'>{profileReducer.profile.fname}</span></span>
	      </div>
	      <div className={`flex mb-2`}>
	        <span className='w-1/3'>Mobile No</span>
	        <span className='w-2/3'>:<span className='ml-3 font-bold'>{code ? code+' ' : ''}{formState.eventHostPhnNumber}</span></span>
	      </div>
	      <div className={`flex mb-2`}>
	        <span className='w-1/3'>Mail Id</span>
	        <span className='w-2/3'>:<span className='ml-3 font-bold'>{formState?.hostmailid ? formState?.hostmailid : ''}{formState.eventHostPhnNumber}</span></span>
	      </div>
	       {(eventMode == 'online') && (
	       <div className={`flex mb-2`}>
	        <div className='w-1/3'>Online</div>
	        <div className='w-2/3 flex text-[#649B8E]'>:<div className='ml-3 font-bold cursor-pointer'>{formState.eventAddress}</div></div>        
	       </div>
	       )}
	       {(eventMode == 'location') && (
	       <div className={`flex mb-2`}>
	        <div className='w-1/3'>Location</div>
	        <div className='w-2/3 flex'>:<div className='ml-3 font-bold'>{formState.eventAddress}</div><img src={navigation} className='w-5 h-5 ml-2 cursor-pointer' /></div>        
	       </div>
	       )}

	       <div className='flex mb-2'>        
	        <span className='w-1/3'>Start Date & Time</span>
	        <div className='flex flex-col w-2/3'>
	         <div className=''>:<span className='ml-3 font-bold'>{formState.eventdateAndTime}</span></div>
	        </div>        
	       </div>
	       <div className='flex mb-2'>        
	        <span className='w-1/3'>End Date & Time</span>
	        <div className='flex flex-col w-2/3'>
	         <span className=''>:<span className='ml-3 font-bold'>{formState.eventdateAndTime}</span></span>
	        </div>        
	       </div>
	       <div className='flex mb-2'>        
	        <span className='w-1/3'>Food Preference</span>
	        <div className='flex flex-col w-2/3'>
	         <span className=''>:<span className='ml-3 font-bold'>{isVeg ? 'Yes' : 'No'}</span></span>
	        </div>        
	       </div>
	       <div className='flex pb-1'>
	        <span className='w-1/3'>About</span>
	        <span className='w-2/3'>:<span className='ml-3 font-bold'>{inputValue}</span></span>
	       </div>
 
        </section>
    </div>
  </section> 
 )
}