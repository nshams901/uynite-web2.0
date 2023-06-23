import { useState, useEffect } from "react";
import notAttend from '../../../../../Assets/Images/Umeet/Umeet-Main/Umeet-NotAttending.png'
import Attend from '../../../../../Assets/Images/Umeet/Umeet-Main/Umeet-Attending.png'
import maybe from '../../../../../Assets/Images/Umeet/Umeet-Main/Umeet-maybe.png'
import { addInvitees } from "../../../../../redux/actionCreators/umeetActionCreator";
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';

const RvspModal = ({ onClose }) => {
  const [count, setCount] = useState(1);
  const [eventType, setEventType] = useState('')
  const [selectedValue, setSelectedValue] = useState('veg');
  const [selectedOption, setSelectedOption] = useState(null)

  const dispatch = useDispatch()
  const { eventDetail } = useSelector(state=>state.umeetReducer)
  const { umeetReducer, profileReducer } = useSelector(state=>state)

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleOptionChange = (option)=>{
    setSelectedOption(option);
  }

  const handleDecrement = () => {
    setCount(count - 1);
  }

  useEffect(()=>{    
    if(umeetReducer.invitiesAdded == true){
      toast.success('Invites added successfully')
      onClose()
    }

    if(eventDetail && eventDetail.eventName){
      if(eventDetail.eventType.toLowerCase().includes('political')){
        setEventType('Political')
      }else if(eventDetail.eventType.toLowerCase().includes('public')){
        setEventType('Public')
      }else if(eventDetail.eventType.toLowerCase().includes('personal')){
        setEventType('Personal')
      }
    }    

    umeetReducer.invitiesAdded = false
  }, [umeetReducer.invitiesAdded])  

  const rsvpData = [{
      "attend": selectedOption == 'yes' ? '1' : selectedOption == 'no' ? '2' : selectedOption == 'maybe' ? '3' : 'Send',
      "eventid": eventDetail?.id,
      "eventtype": eventType,
      "invitesasa": profileReducer?.profile?.email,
      "nonveg": (selectedValue === 'nonveg'),
      "profileid": profileReducer?.profile?.id,
      "extraguest": count == 0 ? null : {
        "noofAttendees": count
      },
      "id": profileReducer?.profile?.id ? profileReducer?.profile?.id : null,
    }]

  const handleInvitees = ()=>{ 
    umeetReducer.invitiesAdded = false   
    dispatch(addInvitees(rsvpData))  
  }

  useEffect(()=>{
    if(selectedOption == 'no') setCount(0)
  }, [selectedOption])

  return (
  <section className='z-20 fixed top-0 h-full w-full flex justify-center items-center' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
    <div className='w-[86%] md:w-[45%] lg:w-[38%] xl:w-[30%] h-[82%] lg:h-[77%] xl:h-[78%] flex flex-col justify-between p-5 bg-white md:ml-[9%] rounded-2xl'>
   <section>
	 <p className='pb-2 border-b border-gray-300 text-gray-600'>RSVP</p>
	 <div className='py-3 border-b border-gray-300'>
	  <div>Will you attend?</div>
	  <div className='flex justify-between py-3'>
	   <div className='flex items-center'>
	   	<span className='flex'>
      {(selectedOption=='yes') ? (
        <img src={Attend} alt="Selected Option" className='h-7 flex mr-1'/>
      ) : (
        <input
          type="radio"
          value="yes"
          id='yes'
          checked={selectedOption === 'yes'}
          onChange={() => handleOptionChange('yes')}
          className='w-5 mr-2'
        />)}
      <label htmlFor='yes'>
        Yes
      </label>
      </span>
	   </div>
	   <div className='flex items-center'>
	   	<span className='flex'>
      {(selectedOption=='no') ? (
        <img src={notAttend} alt="Selected Option" className='h-7 flex mr-1'/>
      ) : (
        <input
          type="radio"
          value="no"
          id='no'
          checked={selectedOption === 'no'}
          onChange={() => handleOptionChange('no')}
          className='w-5 mr-2'
        />)}
      <label htmlFor='no'>
        No
      </label>
      </span>
	   </div>
	   <div className='flex items-center'>
	   	<span className='flex'>
      {(selectedOption=='maybe') ? (
        <img src={maybe} alt="Selected Option" className='h-7 flex mr-1'/>
      ) : (
        <input
          type="radio"
          value="maybe"
          id='maybe'
          checked={selectedOption === 'maybe'}
          onChange={() => handleOptionChange('maybe')}
          className='w-5 mr-2'
        />)}
      <label htmlFor='maybe'>
        Maybe
      </label>
      </span>
	   </div>
	  </div>	  
	 </div>

	 <div className={`${selectedOption=='no' ? 'hidden' : ''} relative`}>
      <select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)} className="border bg-white border-gray-300 w-full py-2 pl-3 pr-10 text-gray-700 focus:outline-none focus:border-blue-500">
        <option value="veg">Veg</option>
        <option value="nonveg">Non-Veg</option>
      </select>
      <label className="absolute -top-1 left-2 -mt-px px-1 bg-white text-gray-600 text-xs">Food Preference</label>
    </div>

    <div className={`${selectedOption=='no' ? 'hidden' : ''} flex lg:py-2 flex-col justify-center items-center`}>
     <p className='py-1 text-gray-600'>No of guests ( Incliding you )</p>
     <div className='py-1 border px-2 border border-gray-300 lg:my-2'>      
      <button className='font-bold text-xl'  onClick={handleDecrement}>-</button>
      <span className='px-8 text-[#649B8E]'>{count}</span>
      <button className='font-bold text-xl' onClick={handleIncrement}>+</button>         
    </div>
    </div>

    <div className='flex py-1 lg:py-2 flex-col'>
     <label htmlFor='message' className="block text-gray-700 mb-2">Send a message</label>
     <textarea rows={selectedOption=='no' ? '6' : '3'} id='message' name='message' className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
    </div>
   </section>
   <section>
    <div className='flex py-1 lg:py-2'>
     <button onClick={onClose} className='px-5 w-1/2 py-2 border boredr-[#649B8E] text-[#649B8E]'>Cancel</button>
     <button onClick={handleInvitees} className='px-5 py-2 w-1/2 text-white border bg-[#649B8E]'>Save</button>     
    </div>
   </section>
  </div>
  </section>
  )
}

export default RvspModal