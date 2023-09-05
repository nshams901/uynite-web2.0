import { useState, useEffect } from "react";
import notAttend from '../../../../../Assets/Images/Umeet/Umeet-Main/Umeet-NotAttending.png'
import Attend from '../../../../../Assets/Images/Umeet/Umeet-Main/Umeet-Attending.png'
import maybe from '../../../../../Assets/Images/Umeet/Umeet-Main/Umeet-maybe.png'
import ToggleButton from './ToggleButton';
import { createEvent, updateEvent, sendEmailInvites, 
addEventInvitees} from "../../../../../redux/actionCreators/umeetActionCreator";
import { useDispatch, useSelector } from 'react-redux'
import { config } from "../../../../../config/config";
import axios from 'axios'
import { isEmpty } from "../../../../Utility/utility";

const token = localStorage.getItem("userCredential")
  ? JSON.parse(localStorage.getItem("userCredential")).token
  : "";

const EventShareModal = ({ onClose, handleShareEvent, invitesEmail,
  emialObjects }) => {
  const [shareEnabled, setShareEnabled] = useState(true)
  const dispatch = useDispatch()
  const { umeetReducer } = useSelector(state=>state)

  const handleShare = ()=>{
    async function processShare(array) {
      for (let i = 0; i < array?.length; i++) {
      
      const object = array[i];
      console.log(object)
      await dispatch(sendEmailInvites({
        "eventname": umeetReducer?.createData?.eventName , 
        "umail" : object }))
      }
    } 

    processShare(invitesEmail)
    handleShareEvent(shareEnabled)
    onClose()          
  }

  useEffect(()=>{
    // try {
    //   if( !isEmpty(emialObjects)){
    //     dispatch( addEventInvitees(emialObjects))
    //   }
    //   dispatch( a)
    // } catch (error) { 
    //   throw error;
    // }
    //dispatch(addInvitees(emialObjects))
  }, [])
  return (
  <section className='absolut fixed z-20 justify-center items-center top-0 left-0 h-full w-full flex' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
   <div className=' flex flex-col justify-between p-3 bg-white mt-[4%] rounded-2xl'>
    <div className='text-[18px] text-gray-700 font-bold py-3 border-b flex justify-center items-center text-center'>Choose how you want to share this invitation</div>
    <div className='flex justify-between items-center py-4'>
     <span className='w-5/6 text-[15px] text-gray-600'>Do you want to post events on Root Screen</span>
     <span className='mx-2 pl-1'><ToggleButton btnText /></span>
    </div>
    <div className='flex justify-between items-center py-4'>
     <span className='w-5/6 text-[15px] text-gray-600'>Do you want to Enable share options</span>
     <span className='mx-2 pl-1'><ToggleButton share={true} btnText setShareEnabled={setShareEnabled} /></span>
    </div>
    <div className='flex justify-center py-2'>
     <button onClick={handleShare} className='px-10 py-2 my-1 rounded-lg text-white border bg-[#649B8E]'>Confrim</button>
    </div>
   </div>
  </section>
  )
}

export default EventShareModal