import upload from '../../../../../Assets/Images/upload.jpeg'
import guest from '../../../../../Assets/Images/Umeet/Umeet-Main/Group 1054.png'
import { useState, useEffect } from 'react'
import ToggleButton from './ToggleButton';
import { createEvent, updateEvent, handleCreateDataUI } from "../../../../../redux/actionCreators/umeetActionCreator";
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import AutocompletePlace from '../../../../googlemap/AutocompletePlace';
import ToastWarning from '../../../../common/ToastWarning';
import { toast } from 'react-toastify';
import { AiOutlineEye } from 'react-icons/ai'
import PreviewEvent from './PreviewEvent'

const CreateEventModal = ({ selectedSpecificEvent, editMyEvent,
  handleCreatedEvent, handleShowTemplate, handleShowAddGroup,
  handleShowAddPoliticalGroup, whichType, politicalPartyFeedback,
  politicalPartyMeeting, handlePoliticalFeedbackQuestion,
  publicShopOpening, handlePersonalOtherModal, handleShowAddPeopleModal,
  showAddGroup, reunionModal, handleReuinion }) => {

  const { profileReducer, umeetReducer } = useSelector(state => state)

  const [formState, setFormState] = useState({
    eventName: '',
    eventdateAndTime: '',
    eventAddress: '',
    eventHostPhnNumber: '',
    hostmailid: '',
    eventEndDate: '',
    aboutevent: '',
  })
  const [inputType, setInputType] = useState('text');
  const [enabled, setEnabled] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [previewEvent, setPreviewEvent] = useState(false)
  const [eventMode, setEventMode] = useState('location')
  const [isValid, setIsValid] = useState(true);
  const [isVeg, setIsveg] = useState(true)
  const [foodType, setFoodType] = useState('veg')
  const [inputValue, setInputValue] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const dispatch = useDispatch()
  const phoneNumberRules = /[0-9]{10}$/;

  const handleToggle = () => {
    setInputType('datetime-local');
  }

  const handleEventMode = (e) => {
    setEventMode(e.target.value);
  }

  const options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true}

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const image = event.target.files[0];
      setSelectedImage(URL.createObjectURL(image));
    }
  };

  const handlePreview =()=>{
    setPreviewEvent(true)
  }

  const handleShowGroup = () => {
    if (whichType == 'personal') {      
      if(selectedSpecificEvent == 'Re-Union'){
        handleShowAddPeopleModal()
      }else{
        handlePersonalOtherModal()
      }
    }
    else if (whichType == 'political') handleShowAddPoliticalGroup()
    else if (whichType == 'public') handleShowAddPoliticalGroup()
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleLocation = (location) => {
    setFormState({...formState, location})
  }

  const handleBlur = () => {
    const phoneRegex = /^\d{10}$/; 
    const isValidNumber = phoneRegex.test(formState.eventHostPhnNumber);
    setIsValid(isValidNumber);
  }  

  const postData = {
    "eventName": formState.eventName,
    "createdatetime": new Date().toISOString().replace("Z", "+0000"),
    "date_created": Date.now().toString(),
    "event_category": whichType,
    "eventTemplate": "need",
    "profileid": profileReducer.profile.id,
    "eventdateAndTime": new Date(formState.eventdateAndTime).toLocaleString('en-US', options),
    "eventAddress": formState.eventAddress,
    "eventHostPhnNumber": formState.eventHostPhnNumber,
    "eventfrndEducationType": "need",
    "eventPrivacyType": "need",
    "eventFrndId": "need",
    "eventType": selectedSpecificEvent,
    "hostmailid": formState.hostmailid,
    "id": uuidv4(),
    "aboutevent": formState.aboutevent
  }

  const handleCreateEvent = () => {
    if(!postData?.eventName) {
      return ToastWarning('Event name is required')
    }
    if(whichType === 'personal'){
      if (!formState?.eventdateAndTime) {
         return ToastWarning("Start date and time is required");
      }else if(!formState?.eventEndDate){
        return ToastWarning("End date and time is required")
      }
      // else if (!phoneNumberRules.test(formState?.eventHostPhnNumber)) {
      //   return ToastWarning("Add valid mobile number")
      // }else if(!formState.hostmailid.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
      //   return ToastWarning("Add valid host mail id")
      // }
    }
    dispatch(createEvent(postData)).then((res) => {
       if(res?.status){
        toast.success(res?.message)
        handleCreatedEvent()
      }else{
        toast.error(res?.message)
      }
    })
  }

  const handleEditAdd = async()=>{
    await dispatch(handleCreateDataUI({...postData, eventMode}))
    handleShowAddPeopleModal()
  }

  const handleGroupAndCreate = async()=>{    
    await dispatch(handleCreateDataUI({...postData, eventMode}))
    handleShowGroup()
  }

  const handleEventCreate = async()=>{
    await dispatch(handleCreateDataUI({...postData, eventMode}))
    handleCreateEvent()
  }

  const handleInputChange = (event) => {
    const input = event.target.value;
    if (input.length <= 200) {
      setInputValue(input);
      setCharacterCount(input.length);
    } else {
      setInputValue(input.slice(0, 200));
      setCharacterCount(200);
    }
  };

  useEffect(()=>{
    if(selectedSpecificEvent == 'Re-Union' && reunionModal) {
      handleShowAddGroup()      
    }

    if(umeetReducer?.createData){
      setEventMode(umeetReducer?.createData?.eventMode)
      setFormState((prev) => ({
       ...prev,
       eventName: umeetReducer?.createData?.eventName,
       eventAddress: umeetReducer?.createData?.eventAddress,
       eventHostPhnNumber: umeetReducer?.createData?.eventHostPhnNumber,
       hostmailid: umeetReducer?.createData?.hostmailid,
       aboutevent: umeetReducer?.createData?.aboutevent,
      }))       
    }

  }, [umeetReducer?.createData, showAddGroup])

  return (
    <div className='lg:fullPage pb-16 lg:pb-3 bg-white border-gray-300'>
      <div className={`${editMyEvent ? 'lg:w-[65%]' : 'w-full md:w-[96%]'} border bg-white md:px-2 lg:px-3`}>
       <section className='flex justify-between items-center'>
        {
          editMyEvent ? <div className='px-3 my-2.5 text-[17px] font-semibold'>Edit Event</div>
            : <div className='px-3 my-2.5 text-[17px] font-semibold'>Create Event</div>
        }
        {selectedImage && (<AiOutlineEye onClick={handlePreview} className='mr-3 w-6 h-6 text-gray-700 cursor-pointer' />)}
       </section>
        <div className='border-2 mx-3'></div>
        <div className='px-7'>
          {editMyEvent ? (
            <select className='h-10 my-1 outline-none w-full border-b bg-white text-gray-600'>
              <option>Guest List - Display to all</option>
              <option>Guest List - Display only to Host</option>
            </select>
          ) : (
            <>
              <p className='pt-4 pb-2 text-[#649B8E]'>{selectedSpecificEvent}</p>
              <hr />
            </>
          )
          }
          <div className='my-3'>
            <label htmlFor="myfile">
              {selectedImage ? (
                <img src={selectedImage} alt="Selected" className='w-full h-[350px] object-cover' />
              ) : <img src={upload} className='w-full h-[350px] object-cover' />
              }
            </label>
            <input type="file" id="myfile" accept="image/*" onChange={handleImageChange} className='hidden' />
          </div>
          <span onClick={handleShowTemplate} className='flex cursor-pointer justify-center py-2 text-[#649B8E]'>Select Template</span>
          <input 
           name='eventName' 
           onChange={handleChange}
           value={formState.eventName} 
           className='border-b border-gray-300 h-10 my-2 w-full focus:outline-none'
           placeholder='Event Title*' />
          <input            
           name='eventdateAndTime' 
           type={inputType} 
           onClick={handleToggle} 
           onChange={handleChange} 
           className='border-b focus:outline-none h-10 my-2 w-full text-gray-500' 
           placeholder='Start Date & Time*' />
          <input 
           name='eventEndDate' 
           type={inputType} 
           onClick={handleToggle} 
           onChange={handleChange} 
           className='border-b focus:outline-none h-10 my-2 w-full text-gray-500' 
           placeholder='End Date & Time*' />
          <div className={`${(politicalPartyFeedback || publicShopOpening) ? 'hidden' : ''} my-2 flex items-center`}>
            <span className='font-bold text-xl text-gray-600'>Event Mode</span>
            <div className='px-6 flex items-center'>
              <input 
               type="radio"
               value="location"
               checked={eventMode === 'location'}
               onChange={handleEventMode}
               className='accent-[#649B8E] w-5 h-5' 
               id='location' /><label htmlFor='location' className='pl-2'>Location</label>
            </div>
            <div className='px-6 flex items-center'>
              <input 
                type="radio"
                value="online"
                checked={eventMode === 'online'}
                onChange={handleEventMode} 
                className='accent-[#649B8E] w-5 h-5' 
                id='online' /><label htmlFor='online' className='pl-2'>Online</label>
            </div>
          </div>

          {/* <input name='eventAddress' onChange={handleChange} className={`${(politicalPartyFeedback || politicalPartyMeeting) ? 'hidden' : ''} border-b border-gray-300 h-10 my-2 w-full`} placeholder='Location*' /> */}
          {(eventMode == 'location') && (          
          <div className={`${(politicalPartyFeedback || politicalPartyMeeting) ? 'hidden' : ''} w-full my-3`}>
             <AutocompletePlace 
              livePlace={handleLocation} 
              placeholder={'Location*'} 
             />
          </div>
          )}
          {(eventMode == 'online') && (          
          <div className={`${(politicalPartyFeedback || politicalPartyMeeting) ? 'hidden' : ''}`}>
            <input 
             name='eventAddress'
             value={formState.eventAddress} 
             onChange={handleChange} 
             className={`${(politicalPartyFeedback || politicalPartyMeeting) ? 'hidden' : ''} border-b border-gray-300 h-10 my-2 w-full focus:outline-none`} 
             placeholder='Enter url*' 
            />
          </div>
          )}          
          <div className={`${(politicalPartyFeedback || publicShopOpening || politicalPartyMeeting) ? 'hidden' : ''} flex items-center`}>
            <div>
              <select className='h-10 outline-none border-b bg-white pr-6 text-gray-500'>
                <option className=''>+91</option>
                <option>USA</option>
              </select>
            </div>
            <input name='eventHostPhnNumber' 
             className='border-b ml-3 border-gray-300 outline-none pl-2 h-10 my-2 w-full' 
             placeholder='Host Phone Number'
             value={formState.eventHostPhnNumber}
             onChange={handleChange}
             onBlur={handleBlur}
             />            
          </div>
          {!isValid && <div className='text-xs flex justify-center text-red-600'>Please enter a valid 10-digit phone number.</div>}

          <input 
           type='email' 
           name='hostmailid'
           value={formState.hostmailid} 
           onChange={handleChange} 
           className={`${(politicalPartyFeedback || publicShopOpening || politicalPartyMeeting) ? 'hidden' : ''} border-b border-gray-300 h-10 my-2 w-full focus:outline-none`} 
           placeholder='Host Mail Id' 
          />

          <div className='flex justify-between items-center my-2'>
           <div className='flex items-center'>
            <img src={guest} />
            <label onClick={handleGroupAndCreate} className={`${umeetReducer.inviteEmailsUI ? 'hidden' : ''} pl-5 cursor-pointer text-[#649B8E]`}>Add Guests</label>
            <label onClick={handleEditAdd} className={`${umeetReducer.inviteEmailsUI ? '' : 'hidden'} pl-5 cursor-pointer text-[#649B8E]`}>{umeetReducer?.inviteEmailsUI?.length} Guests Added</label>
           </div>
           <span onClick={handleEditAdd} className={`${umeetReducer.inviteEmailsUI ? '' : 'hidden'} cursor-pointer text-[#649B8E] border border-[#649B8E] px-2 py-0.5 rounded-md`}>Edit List</span>
          </div>

          <div className={`${(politicalPartyFeedback || politicalPartyMeeting) ? 'hidden' : ''} border-b my-3 mb-6`}>
            <select className='h-10 outline-none w-full border-b bg-white text-gray-600'>
              {publicShopOpening && (<>
                <option>Chat Type - Hide</option>
                <option>Chat Type - Show</option>
              </>)
              }
              <option className={`${publicShopOpening ? 'hidden' : ''}`}>Guest List - Display to all</option>
              <option className={`${publicShopOpening ? 'hidden' : ''}`}>Guest List - Display only to host</option>
            </select>
          </div>

          <div className={`${((eventMode == 'online') || politicalPartyFeedback) ? 'hidden' : ''} flex my-4 justify-between`}>
            <span className='text-gray-700'>Food Availability</span>
            <div className="">
              <ToggleButton 
               handleFoodCreate={(value)=>setIsveg(value)} />
            </div>
          </div>
          {isVeg && (
            <div className={`${((eventMode == 'online') || politicalPartyFeedback) ? 'hidden' : ''} mb-3 w-full`}>
              <select value={foodType} onChange={(e)=>setFoodType(e.target.value)} className='w-full h-10 bg-white outline-none text-gray-500 rounded-md border'>
                <option value='veg'>Veg</option>
                <option value='non-veg'>Non-Veg</option>
                <option value='veg & non-veg'>Veg & Non-Veg</option>
              </select>
            </div>
          )}

          {editMyEvent &&
            <div className={`${politicalPartyFeedback ? 'hidden' : ''} flex my-7 justify-between`}>
              <span className='text-gray-700'>Live Streaming</span>
              <div className="py-">
                <ToggleButton />
              </div>
            </div>
          }
          <label className='py-1'>About Event</label>
          <textarea  
           value={inputValue} 
           onChange={handleInputChange} 
           rows='3' 
           placeholder='say something...' 
           className={`${(characterCount > 200) ? 'outline-red-100' : ''} w-full text-gray-700 outline-none my-2 rounded-xl relative border p-2`} />
          <label className={`${characterCount > 200 ? 'error' : ''} text-xs flex justify-end`}>
            {characterCount}/200 characters
          </label>

          <div className={`${politicalPartyFeedback ? '' : 'hidden'} `}>
            <p onClick={handlePoliticalFeedbackQuestion} className='py-2 font-bold text-[18px] cursor-pointer text-[#519d8b]'>Create Your Question</p>
            <label className=''>Your Question</label>
            <textarea 
             placeholder='What about it?' 
             rows='3' 
             className='w-full outline-none my-2 rounded-xl relative border p-2' />
          </div>

          <div className={`${politicalPartyFeedback ? '' : 'hidden'} flex my-7 justify-between`}>
            <span className='text-gray-700'>Feedback only visible to me</span>
            <div className="">
              <ToggleButton />
            </div>
          </div>

          <div className='flex flex-col my-1'>
            {editMyEvent ?
              <button onClick={() => dispatch(updateEvent(postData))} className='py-2.5 my-2 text-[17px] rounded-lg text-white font-semibold bg-[#649B8E] '>Update</button>
              : <button onClick={handleEventCreate} className='py-2.5 my-2 text-[17px] rounded-lg text-white font-semibold bg-[#649B8E] '>send</button>
            }
            <button className='py-2 text-[17px] rounded-lg font-semibold border border-[#649B8E]'>Cancel</button>
          </div>

        </div>
      </div>
      {previewEvent && <PreviewEvent
       onClose={()=>setPreviewEvent(false)}
       selectedSpecificEvent={selectedSpecificEvent}
       selectedImage={selectedImage}
       formState={formState}
       profileReducer={profileReducer}
       eventMode={eventMode}
       />}
    </div>
  )
}

export default CreateEventModal