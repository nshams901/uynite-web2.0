import navigation from '../../../../Assets/Images/Umeet/Umeet-Main/Umeet navigation.png'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import EventDeleteModal from './Modal/EventDeleteModal'
import selectedOne from '../../../../Assets/Images/Umeet/Umeet-Main/Umeet-Attending.png'
import { toast } from 'react-toastify'

export default function DetailsOfEvent({ myEvent,
 handleEditEvent, handleShareEvent, handleFeedbacks, eventDetail, 
 guestsList, NoOfGuests, NoOfResponed, setDeleteId, deleteId }){

   const [personal, setPersonal] = useState(true)
   const [publics, setPublics] = useState(false)
   const [political, setPolitical] = useState(false)
   const [online, setOnline] = useState(false)
   const [politicalPartyFeedback, setPoliticalPartyFeedback] = useState(false)
   const [isPoliticalPartyFeedback, setIsPoliticalPartyFeedback] = useState(false)
   const [showDeleteMyEvent, setShowDeleteMyEvent] = useState(false)
   const [feedback, setFeedback] = useState('')
   const [questionresponse, setQuestionresponse] = useState(null)

   const { umeetReducer, profileReducer } = useSelector(state=>state)

   const handleDeleteEvent = ()=>{
      setDeleteId(umeetReducer?.eventDetail?.id)
      setShowDeleteMyEvent(true)      
   }
    
   const handleFeedback = (opt)=>{
      console.log(opt)
     setIsPoliticalPartyFeedback(true)
     setQuestionresponse(opt)
   }

    useEffect(()=>{
      if(eventDetail && eventDetail.eventName){
         if(eventDetail.eventType.toLowerCase().includes('political')){
            setPolitical(true)
            setPublics(false)
            setPersonal(false)
         }else if(eventDetail.eventType.toLowerCase().includes('public')){
            setPublics(true)
            setPersonal(false)
            setPolitical(false)
         }else if(eventDetail.eventType.toLowerCase().includes('personal')){
            setPersonal(true)
            setPublics(false)
            setPolitical(false)
         }

         if(eventDetail.event_category.toLowerCase().includes('feedback') || eventDetail.eventType.toLowerCase().includes('feedback')){
            setPoliticalPartyFeedback(true)
         }

         if(eventDetail?.eventmode == 'online'){
            setOnline(true)
         }
      }
    }, [])

   const options = {weekday: 'long',year: 'numeric',month: 'long',day: 'numeric',hour: 'numeric',minute: 'numeric',second: 'numeric',timeZone: 'UTC'}

   const feedbackPostData = {
      "eventId": umeetReducer?.eventDetail?.id,
      "feedback": feedback,
      "feedbackBy": profileReducer?.profile?.id,
      "questionresponse": questionresponse
   }

   const handleSendFeedback = async()=>{
      const { data } = await axios.post(`https://web.uynite.com/event/api/event/feedback`,
         feedbackPostData)
      console.log(data), 'feedback'
      if(toast) toast.success('feedback sended!')
   }

    return (
     <div className='p-4 bg-white rounded-xl w-full'>
      <div className={`${politicalPartyFeedback ? 'hidden' : ''} mb-1`}>
       <span className='font-bold'>Responses</span>
       <span className='ml-3'>{NoOfResponed} of {guestsList ? guestsList?.length : 0} responded</span>
      </div>
      <div className={`${(political || publics) ? '' : 'hidden'} ${politicalPartyFeedback ? 'hidden' : ''}`}>
       <span className='font-bold'>Guests Attending: 0</span>
      </div>
      <div className={`${politicalPartyFeedback ? 'hidden' : ''} flex py-3 my-2 border-b-2 border-gray-300`}>
       <div className='w-1/3 border-r-2 border-gray-300 py-3 flex justify-center items-center'><span className='p-2 bg-[#118409] w-10 flex justify-center mr-2 items-center h-10 rounded-full text-white'>{NoOfGuests?.numberOfYes}</span>Yes</div>
       <div className='w-1/3 border-r-2 border-gray-300 py-3 flex justify-center items-center'><span className='p-2 bg-[#C40505] w-10 flex justify-center mr-2 items-center h-10 rounded-full text-white'>{NoOfGuests?.numberOfNo}</span>No</div>
       <div className='w-1/3  flex justify-center items-center'><span className='p-2 bg-[#E4891A] w-10 flex justify-center mr-2 items-center h-10 rounded-full text-white'>{NoOfGuests?.numberOfMaybe}</span>Maybe</div>
      </div>

      <div className=''>
       <div className={`${politicalPartyFeedback ? '' : 'hidden'} my-3 border-b`}>
        <p className='z-10 text-[17px] left-4 font-semibold'>{eventDetail?.eventQuestion}</p>
        <section>
         <div onClick={()=>handleFeedback('OPT1')} className='py-1.5 relative px-4 cursor-pointer my-1.5 font-bold relative w-full lg:w-[60%] bg-[#e7e1e1] rounded-2xl flex justify-between items-center'>
          <span className='font-bold'>{eventDetail?.eventquestionopt1}</span>
          <span className='p-1 text-white rounded-full flex justify-center items-center h-6 w-6 bg-green-600'>{questionresponse == 'OPT1' ? '1' : '0'}</span>
          {questionresponse == 'OPT1' ? <img src={selectedOne} className='w-6 h-6 absolute right-14'/> : null}
         </div>
         <div onClick={()=>handleFeedback('OPT2')} className='py-1.5 px-4 cursor-pointer my-1.5 font-bold w-full relative lg:w-[60%] bg-[#e7e1e1] rounded-2xl flex justify-between items-center'>
          <span className='font-bold'>{eventDetail?.eventquestionopt2}</span>
          <span className='p-1 text-white rounded-full flex justify-center items-center h-6 w-6 bg-green-600'>{questionresponse == 'OPT2' ? '1' : '0'}</span>
          {questionresponse == 'OPT2' ? <img src={selectedOne} className='w-6 h-6 absolute right-14'/> : null}
         </div>
         <div onClick={()=>handleFeedback('OPT3')} className='py-1.5 px-4 my-1.5 cursor-pointer font-bold w-full relative lg:w-[60%] bg-[#e7e1e1] rounded-2xl flex justify-between items-center'>
          <span className='font-bold'>{eventDetail?.eventquestionopt3}</span>
          <span className='p-1 text-white rounded-full flex justify-center items-center h-6 w-6 bg-green-600'>{questionresponse == 'OPT3' ? '1' : '0'}</span>
          {questionresponse == 'OPT3' ? <img src={selectedOne} className='w-6 h-6 absolute right-14'/> : null}
         </div>
         <div onClick={()=>handleFeedback('OPT4')} className={`${eventDetail?.eventquestionopt4 ? '' : 'hidden'} relative py-1.5 px-4 my-1.5 cursor-pointer font-bold w-full lg:w-[60%] bg-[#e7e1e1] rounded-2xl flex justify-between items-center`}>
          <span className='font-bold'>{eventDetail?.eventquestionopt4}</span>
          <span className='p-1 text-white rounded-full flex justify-center items-center h-6 w-6 bg-green-600'>{questionresponse == 'OPT4' ? '1' : '0'}</span>
          {questionresponse == 'OPT4' ? <img src={selectedOne} className='w-6 h-6 absolute right-14'/> : null}
         </div>                           
        </section>
        {isPoliticalPartyFeedback &&(
        <div className='relative w-full lg:w-[60%]'>
         <label className='absolute z-10 text-[10px] left-4 bg-white px-2 font-semibold text-gray-400'>Add Your Feedback here</label>
         <textarea rows='2' onChange={e=>setFeedback(e.target.value)} className='w-full outline-none my-1 rounded-lg border border-gray-300 p-2'/>
         <p onClick={handleSendFeedback} className='cursor-pointer text-[#649B8E] text-[15px] flex justify-end font-bold'>Send Vote</p>
        </div>
        )}
        
        <p onClick={handleFeedbacks} className='w-full lg:w-[60%] cursor-pointer py-1.5 text-[#649B8E] flex justify-center mb-1 font-bold'>View Feedbacks <span className='text-gray-400 pl-4'>public</span></p>        
       </div> 

       <div className='flex mb-3'>
        <span className='w-1/3'>Hostedt BY</span>
        <span className='w-2/3'>:<span className='ml-3 font-semibold'>{(eventDetail && eventDetail.profile) ? `${eventDetail.profile.fname} ${eventDetail?.profile?.lname}` : '-'}</span></span>
       </div>
       <div className={`${politicalPartyFeedback ? 'hidden' : ''} flex mb-3`}>
        <span className='w-1/3'>Mobile No</span>
        <span className='w-2/3'>:<span className='ml-3 font-bold'>{(eventDetail && eventDetail?.profile) ? eventDetail?.eventHostPhnNumber : '-'}</span></span>
       </div>
       <div className={`${politicalPartyFeedback ? 'hidden' : ''} flex mb-3`}>
        <span className='w-1/3'>Food Availability</span>
        <span className='w-2/3'>:<span className='ml-3 font-bold'>{(eventDetail && eventDetail.food) ? 'Yes': 'No'}</span></span>
       </div>
       <div className={`${(politicalPartyFeedback || publics || political) ? 'hidden' : ''} flex mb-3`}>
        <span className='w-1/3'>Event Live Stream</span>
        <span className='w-2/3'>:<span className='ml-3 font-bold'>{eventDetail ? 'Yes': 'No'}</span></span>
       </div>
       {online ? (
       <div className={`${politicalPartyFeedback ? 'hidden' : ''} flex mb-3`}>
        <div className='w-1/3'>Online</div>
        <div className='w-2/3 flex text-[#649B8E]'>:<div className='ml-3 font-bold cursor-pointer'><a href={eventDetail?.eventAddress} target='_blank' rel="noreferrer">{eventDetail?.eventAddress}</a></div></div>        
       </div> ) : (
       <div className={`${politicalPartyFeedback ? 'hidden' : ''} flex mb-3`}>
        <div className='w-1/3'>Location</div>
        <div className='w-2/3 flex'>:<div className='ml-3 font-bold'>{eventDetail ? eventDetail.eventAddress : null}</div><img src={navigation} className='w-8 h-8 cursor-pointer' /></div>        
       </div>
       )}

      
       <div className='flex mb-3'>        
        <span className='w-1/3'>Start Date & Time</span>
        <div className='flex flex-col w-2/3'>
         <div className=''>:<span className='ml-3 font-bold'>{(eventDetail && eventDetail.startdate ) ? new Date(eventDetail.startdate).toLocaleString('en-Us', options) : null}</span></div>
        </div>        
       </div>
       <div className='flex mb-3'>        
        <span className='w-1/3'>End Date & Time</span>
        <div className='flex flex-col w-2/3'>
         <span className=''>:<span className='ml-3 font-bold'>{(eventDetail && eventDetail.enddate) ? new Date(eventDetail.enddate).toLocaleString('en-Us', options) : null}</span></span>
         <span className={`${politicalPartyFeedback ? 'hidden' : ''} text-[#649B8E] ml-3 font-semibold cursor-pointer`}>Add to calender</span>
        </div>        
       </div>
             

       {/*personal && (
        <div className={`${politicalPartyFeedback ? 'hidden' : ''} flex mb-3`}>        
         <span className='w-1/3'>Date & Time</span>
         <div className='flex flex-col w-2/3'>
          <span className=''>:<span className='ml-3 font-bold'>{eventDetail ? eventDetail.eventdateAndTime : null}</span></span>
          <span className='text-[#649B8E] ml-3 font-semibold cursor-pointer'>Add to calender</span>
         </div>        
        </div>
        )*/}

       <div className='flex pb-4 border-b-2 border-gray-300'>
        <span className='w-1/3'>About</span>
        <span className='w-2/3'>:<span className='ml-3 font-bold'>{eventDetail ? eventDetail.aboutevent : null}</span></span>
       </div>
      </div>            
      
      <div className='flex flex-col justify-end items-end py-2 pb-12'>
       {
        myEvent && (
        <>
         <button onClick={handleEditEvent} className='py-1 w-40 my-1.5 px-4 rounded text-[#649B8E] border border-[#649B8E]'>Edit Details</button>
         <button onClick={handleDeleteEvent} className='py-1 w-40 my-1.5 px-4 rounded text-[#649B8E] border border-[#649B8E]'>Cancel Event</button>
        </>
        )
      }
       <button onClick={handleShareEvent} className='py-1 w-40 my-1.5 px-4 rounded text-[#649B8E] border border-[#649B8E]'>Share Invitation</button>
      </div>
     {showDeleteMyEvent && 
      <EventDeleteModal 
       onClose={()=>setShowDeleteMyEvent(false)}
       deleteId={deleteId}
      />
     }
     </div>
    )
}