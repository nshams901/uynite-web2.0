import { useState, useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import wishes from '../../../../../Assets/Images/Umeet/wishesTemplate.webp'
import axios from 'axios' 
import { useSelector, useDispatch } from 'react-redux'

const ViewFeedbacks = ({ onClose }) => {
  const [feedbackDetail, setFeedbackDetail] = useState(null)
  const { eventDetail } = useSelector(state=>state.umeetReducer)

  console.log(feedbackDetail)

  useEffect(()=>{
    (async function fetchData(){
      const postData = {
        "eventId": eventDetail?.id,
        "profileId": eventDetail?.profileid,
      }
      const { data } = await axios.post(`https://web.uynite.com/event/api/event/fetch/feedback`,
        postData)
      setFeedbackDetail(data?.data?.feedbacks)      
    })()
  },[])
console.log(feedbackDetail)
  return (
  <section className='absolut z-10 fixed top-7 left-0 h-full w-full flex justify-center items-center' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
    <div className="w-[96%] md:w-[60%] lg:w-[40%] xl:w-[30%] h-[80%] bg-white rounded-xl p-3">
        <div className="flex border-b pb-2 justify-between py-1 text-gray-600">
          <div className="text-[18px] flex justify-between items-center font-bold text-gray-700 text-gray-800 w-11/12">
            <p>Feedbacks</p>
            <select className='w-[40%] px-2 text-[15px] font-medium h-9 outline-none border bg-white rounded-md mr-3'>
              <option className={`${eventDetail?.eventquestionopt1 ? '' : 'hidden'}`}>{eventDetail?.eventquestionopt1 ? eventDetail?.eventquestionopt1 : null}</option>            
              <option className={`${eventDetail?.eventquestionopt2 ? '' : 'hidden'}`}>{eventDetail?.eventquestionopt2 ? eventDetail?.eventquestionopt2 : null}</option>
              <option className={`${eventDetail?.eventquestionopt3 ? '' : 'hidden'}`}>{eventDetail?.eventquestionopt3 ? eventDetail?.eventquestionopt3 : null}</option>
              <option className={`${eventDetail?.eventquestionopt4 ? '' : 'hidden'}`}>{eventDetail?.eventquestionopt4 ? eventDetail?.eventquestionopt4 : null}</option>
            </select>          
          </div>
          <span className="w-1/12">
            <AiOutlineCloseCircle
              onClick={onClose}
              className="w-8 cursor-pointer hover:text-red-500 h-7"
            />
          </span>
        </div>

        <section className='overflow-y-scroll h-[90%]'>
         {feedbackDetail?.length ? feedbackDetail?.map((data,i)=>(
          <div key={i} className='flex p-2 pb-2 border-b'>
           <div className='flex flex-col justify-center items-center'>
          	<img src={wishes} className='w-11 h-11 rounded-full' />
          	<span className='text-[12px] text-gray-600 my-0.5'>{data?.feedback}</span>
           </div>
           <div className='ml-4 mt-4 font-bold'>{data?.feedbackBy?.fname} {data?.feedbackBy?.lname}</div>
          </div>
         )) : <p className='flex justify-center items-center h-36 w-full rounded-xl bg-blue-50 p-3 mt-8'>Oops no feedbacks found....</p>}       
        </section>
    </div>
  </section>
  )
}

export default ViewFeedbacks