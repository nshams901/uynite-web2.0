import upload from '../../../../../Assets/Images/upload.jpeg'
import guest from '../../../../../Assets/Images/Umeet/Umeet-Main/Group 1054.png'
import { useState, useEffect } from 'react'
import ToggleButton from './ToggleButton';
import { createEvent, updateEvent, handleCreateDataUI,
getReunionTemplates, createEventTemplate } from "../../../../../redux/actionCreators/umeetActionCreator";
import { getEducationDetail } from "../../../../../redux/actionCreators/profileAction"
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import AutocompletePlace from '../../../../googlemap/AutocompletePlace';
import ToastWarning from '../../../../common/ToastWarning';
import { toast } from 'react-toastify';
import { AiOutlineEye } from 'react-icons/ai'
import PreviewEvent from './PreviewEvent'
import axios from 'axios'
import AddPeopleModal from './AddPeopleModal'
import AddByContactModal from './AddByContactModal'
import ChooseTemplate from './ChooseTemplate'
import AddGuestModal from './AddGuestModal'
import EventShareModal from './EventShareModal'
import PoliticalGuestAddModal from './PoliticalGuestAddModal'
import PersonalOtherGuest from './PersonalOtherGuest'
import CountryCodeModal from '../../../../Login/Content/Signup/CountryCodeModal'
import { createPortal } from "react-dom";
import Modal from "../../../../Login/Content/Modal/Modal";
import Portals from "../../../../Portals/Portals";
import PoliticalFeedbackQuestion from './PoliticalFeedbackQuestion'

const CreateEventModal = ({ selectedSpecificEvent, editMyEvent,
  handleCreatedEvent, whichType, politicalPartyFeedback,
  politicalPartyMeeting, publicShopOpening, setNoMyEvent, setNoCreateEvent, setCreateEvent,
  handleMyEvent }) => {

  const { profileReducer, umeetReducer } = useSelector(state => state)

  const detail = umeetReducer.eventDetail

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
  const [previewEvent, setPreviewEvent] = useState(false)
  const [eventMode, setEventMode] = useState('location')
  const [isValid, setIsValid] = useState(true);
  const [isVeg, setIsveg] = useState(true)
  const [foodType, setFoodType] = useState('')
  const [inputValue, setInputValue] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [feedbackVal, setFeedbackVal] = useState(false)
  const [noGuest, setNoGuest] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [eventId, setEventId] = useState(null)

  const [showTemplate, setShowTemplate] = useState(false)  
  const [templateSelected, setTemplateSelected] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedImgFile, setSelectedImgFile] = useState(null)
  const [showAddPeopleModal, setShowAddPeopleModal] = useState(false)
  const [showAddGroup, setShowAddGroup] = useState(false)
  const [showAddByContactModal, setShowAddByContactModal] = useState(false)
  const [reunionModal, setReunionModal] = useState(true)
  const [showAddGroupPersonalOthers, setShowAddGroupPersonalOthers] = useState(false)
  const [showPoliticalFeedbackQuestionModal, setShowPoliticalFeedbackQuestionModal] = useState(false)
  const [showShareMyEvent, setShowShareMyEvent] = useState(false)
  const [showPoliticalAddGroup, setShowPoliticalAddGroup] = useState(false)
  const [selectedQualification, setSelectedQualification] = useState(null)
  const [invitesEmail, setInvitesEmail] = useState(null)
  const [invitesPlace, setInvitesPlace] = useState(null)
  const [shareEvent, setShareEvent] = useState(null)
  const [question, setQuestion] = useState(null)
  const [guestType, setGuestType] = useState(null)
  const [locatioCountry, setLocationCountry] = useState(null)
  const [invitePlaceData, setInvitePlaceData] = useState(null)

  //country code states
  const [dataList, setDataList] = useState([])
  const [countryCode, setCountryCode] = useState(false);
  const [countryData, setCountryData] = useState(null);
  const [countryList, setCountryList] = useState(null)
  const [code, setCode] = useState(null)

  // re-union related
  const [education, setEducation] = useState('')

  const dispatch = useDispatch()

  const phoneNumberRules = /[0-9]{10}$/;

  const handleToggle = () => {
    setInputType('datetime-local');
  }

  const closeCountryModal = () => {
    setCountryCode(false);
  };

  const handleEventMode = (e) => {
    setEventMode(e.target.value);
  }

  const handleShowAddGroup = ()=>{
    setShowAddGroup(true)
  }

  const handleShowAddPeopleModal = ()=>{
    setShowAddPeopleModal(true)
  }

  const handleAddByContactModal = ()=>{
   setShowAddByContactModal(true)
  }  

  const handlePersonalOtherModal = ()=>{
    setShowAddGroupPersonalOthers(true)
  }

  const handleShowAddPoliticalGroup = ()=>{
    setShowPoliticalAddGroup(true)
  }

  const handlePoliticalFeedbackQuestion = ()=>{
    setShowPoliticalFeedbackQuestionModal(true)
  }
  const handleSelectedQualification = (data)=>{
    console.log(data, 'jd')
    setSelectedQualification(data)
  }

  let emialObjects = [];

  invitesEmail?.forEach(function(email) {
      // (async()=>{
      //   const { data } = await axios.get(
      //    `https://web.uynite.com/profile/api/profile/profilebyemail/${email}`,
      //    {headers: { Authorization: `Bearer ${token}` }});
      //   console.log(data, "getProfileByEmail");
      // })
      let obj = {
          "attend": "Send",
          "eventid": eventId,
          "eventtype": "Personal",
          "invitesasa": email,
          "nonveg": false,
          "profileid":  profileReducer?.profile?.id
      };
      emialObjects.push(obj);
  });

  useEffect(()=>{
    if(invitesPlace && guestType){
      if(guestType == 'State'){
        const placeDataList = invitesPlace?.map((place) => ({
          country: locatioCountry,
          isPreselected: false,
          state: place,
        }))
        setInvitePlaceData(placeDataList)
      }else if(guestType == 'District'){
        const placeDataList = invitesPlace?.map((place) => ({
          country: locatioCountry,
          isPreselected: false,
          city: place,
        }))
        setInvitePlaceData(placeDataList)
      }else if(guestType == 'Loksabha'){
        const placeDataList = invitesPlace?.map((place) => ({
          country: locatioCountry,
          isPreselected: false,
          loksabha: place,
        }))
        setInvitePlaceData(placeDataList)
      }else if(guestType == 'Assembly'){
        const placeDataList = invitesPlace?.map((place) => ({
          country: locatioCountry,
          isPreselected: false,
          assembly: place,
        }))
        setInvitePlaceData(placeDataList)
      }
    }
  }, [invitesPlace, guestType])

   const options = { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric", hour12: true }

  const handleImageChange = () => {
    if (event.target.files && event.target.files[0]) {
      const image = event.target.files[0];
      setSelectedImgFile(image)
      setSelectedImage(URL.createObjectURL(image));
    }
  };

  const handlePreview =()=>{
    if(!selectedImage){
      return toast.error('Please Select Image to Preview!')
    }
    setPreviewEvent(true)
  }

  const handleShowGroup = () => {
    if(whichType == 'personal'){
      if(selectedSpecificEvent == 'Re-Union'){
        handleShowAddPeopleModal()
      }else{
        handlePersonalOtherModal()
      }
    }
    else if(whichType == 'political') handleShowAddPoliticalGroup()
    else if(whichType == 'public') handleShowAddPoliticalGroup()
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleDateChange = (event) => {
    const { name, value} = event.target
    const currentDate = new Date().toISOString().slice(0, 10); // Get current date in "YYYY-MM-DD" format

    if(value >= currentDate) {
      setFormState(prevState => ({
        ...prevState,
        [name]: value
      }))
    } else {
      toast.error('past date selected!');
    }
  };

  const handleEndDateChange = (event) => {
    const { name, value} = event.target
    const currentDate = new Date().toISOString().slice(0, 10); // Get current date in "YYYY-MM-DD" format
    if(!formState?.eventdateAndTime) return toast.error('pls select start date!');
    if(value >= currentDate && value > formState?.eventdateAndTime) {
      setFormState(prevState => ({
        ...prevState,
        [name]: value
      }))
    } else {
      toast.error('select higher then start date!');
    }
  };  
  const handleLocation = (location) => {
    console.log(location)
    setFormState({...formState, eventAddress:location})
  }

  const handleBlur = () => {
    const phoneRegex = /^\d{10}$/; 
    const isValidNumber = phoneRegex.test(formState.eventHostPhnNumber);
    setIsValid(isValidNumber)
  }

  const showChat = selectedSpecificEvent?.toLowerCase().includes('feedback') || 
  selectedSpecificEvent?.toLowerCase().includes('party meeting') || 
  selectedSpecificEvent?.toLowerCase().includes('party meeting') || 
  selectedSpecificEvent?.toLowerCase().includes('feedback') || 
  (whichType == 'political') 

  const isFeedbackEvent = selectedSpecificEvent?.toLowerCase().includes('feedback')

  const startingDate = new Date(formState.eventdateAndTime)
  const endingDate = new Date(formState.eventEndDate)

  const postData = {
    "eventName": formState.eventName,
    "createdatetime": new Date().toISOString().replace("Z", "+0000"),
    "date_created": Date.now().toString(),
    "event_category": (whichType == 'personal' || whichType == 'public') ? selectedSpecificEvent : '',
    "profileid": profileReducer?.profile?.id,
    "eventdateAndTime": new Date(formState?.eventdateAndTime).toLocaleString('en-US', options),
    "eventAddress": formState?.eventAddress,
    "eventHostPhnNumber": code ? code + formState?.eventHostPhnNumber : '',
    "eventPrivacyType": whichType == 'personal' ? 'Personal' : 'Public',
    "eventFrndId": "need",
    "eventType":  whichType == 'personal' ? 'Personal' : whichType == 'public' ? 'Public' : selectedSpecificEvent,
    "hostmailid": formState?.hostmailid,
    "id": eventId,
    "aboutevent": inputValue,
    "eventmode": eventMode,
    "eventTemplate": selectedImage,
    "startdate": startingDate?.getTime(),
    "enddate": endingDate?.getTime(),
    "eventQuestion": question ? umeetReducer?.question?.question : null,
    "eventquestionopt1": question?.option1 ? question?.option1 : null,
    "eventquestionopt2": question?.option2 ? question?.option2 : null,
    "eventquestionopt3": question?.option3 ? question?.option3 : null,
    "eventquestionopt4": question?.option4 ? question?.option4 : null,
    "food": isVeg,
    "chat": showChat ? false : true,
    "feedbackAvailability": isFeedbackEvent,
    "edittemplate": {
      "category": selectedSpecificEvent,
      "enddateforevent": endingDate?.getTime(),
      "eventid": eventId,
      "id": eventId,
      "isAllshowtoEveryone": true,
      "isfromserver": true,
      "isselected": true,
      "isshareenabled": shareEvent,
      "mCreatedUserid": profileReducer?.profile?.id,
      "rootsIdforPost": profileReducer?.profile?.id,
      "tempdetail": {
        "bgimage": selectedImage,
        "category": selectedSpecificEvent,
        "dateheadingcolor": "#eb4334",
        "dateheadingstyle": "italic",
        "eventheadingcolor": "#eb7734",
        "eventheadingstyle": "bold",
        "head1": "#0001",
        "hosttextcolor": "#34dceb",
        'hosttextstye': "roboto",
        "locationtextcolor": "#0d6e8c",
        "locationtextstyle": "arial",
        "textcolor": "#000000",
        "textstyle": "bold",
        "textstyles": "bold",
      }
    },
    "eventLocation": invitePlaceData,
    "eventfrndEducationType": selectedQualification ? selectedQualification : null,
  }

  const handleCreateEvent = async() => {
    if(invitesEmail == null || invitePlaceData){
      return ToastWarning('Please select invities')
    }

    if(!question?.question && isFeedbackEvent){
      return ToastWarning('Please craete a question')
    }
    
    if(!postData?.eventName) {
      return ToastWarning('Event name is required')
    }
    if(!selectedImage){
      return ToastWarning('Please Select Event Template!')
    }

    if(!formState?.eventdateAndTime){
      return ToastWarning("Start date and time is required");
    }else if(!formState?.eventEndDate){
      return ToastWarning("End date and time is required")
    }else if(!formState.eventAddress){
      if(!isFeedbackEvent){
        return ToastWarning("please enter the location/url")
      }
    }else if(formState?.hostmailid?.length == 1){
      if(!formState.hostmailid.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
        return toast.error("Add valid host mail id")
      }
    }
    setShowShareMyEvent(true)
    console.log(shareEvent)
    // if(showShareMyEvent == false && shareEvent!= null){
    //  await dispatch(createEvent(postData)).then((res) => {
    //     if(res?.status){
    //       toast.success(res?.message)
    //       dispatch(handleCreateDataUI({...postData, eventMode, foodType}))
    //       handleCreatedEvent()
    //     }else{
    //      toast.error(res?.message)
    //     }
    //  })
    // }
  }

  const handleEditAdd = async()=>{
    //await dispatch(handleCreateDataUI({...postData, eventMode}))
    //handleShowAddPeopleModal()
    handleShowGroup()
  }

  const handleGroupAndCreate = async()=>{    
    //await dispatch(handleCreateDataUI({...postData, eventMode, startDate}))
    handleShowGroup()
  }

  const handleEventCreate = async()=>{
    //await dispatch(handleCreateDataUI({...postData, eventMode, foodType}))
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

  const handleTemplateType = (e)=>{
    if(whichType == 'personal'){
      setShowTemplate(true)
    }else{
      handleImageChange(e)    
    }
  }

  const GuestType = ()=>{
    if(guestType == 'State'){
      return invitesPlace?.length + ' ' + 'States Added'
    }else if(guestType == 'District'){
      return invitesPlace?.length + ' ' + 'District Added'
    }else if(guestType == 'Loksabha'){
      return invitesPlace?.length + ' ' + 'Loksabha Added'
    }else if(guestType == 'Assembly'){
      return invitesPlace?.length + ' ' + 'Assembly Added'
    }else {
      return 'Guests Added'
    }
  }

  useEffect(()=>{
    // if(selectedImgFile){      
    //   (async()=>{
    //     console.log(selectedImgFile)     
    //     const { data } = await 
    //     axios.post(`https://web.uynite.com/fileservice/s3/upload`, 
    //       selectedImgFile).catch(err=>toast.error(err.message))
    //     console.log(data)
    //   })()
    // }  

    (async()=>{
      const { data } = await axios.get(
      `https://web.uynite.com/api/user/country/countrylist`,
      {headers: {"Accept-Language": "us","Content-Type": "application/json"}})

      //console.log(data?.data, 'countrylist')
      setCountryList(data?.data)
    })()

    if(countryData){
      setCode(`+` + countryData?.code)
    }

    setEventId(uuidv4())

    if(editMyEvent){
      setSelectedImage(umeetReducer?.eventDetail?.eventTemplate)
    }

    if(umeetReducer?.inviteEmailsUI){
      setNoGuest(umeetReducer?.inviteEmailsUI)
    }

    if(selectedSpecificEvent == 'Re-Union' && reunionModal) {   
      handleShowAddGroup()      
    }

    if(selectedSpecificEvent?.toLowerCase().includes('feedbac')){
      setFeedbackVal(true)
    }

    if(showShareMyEvent == false && shareEvent!= null){
     dispatch(createEvent(postData)).then((res) => {
        if(res?.status){
          toast.success(res?.message)
          dispatch(handleCreateDataUI({...postData, eventMode, foodType}))
          handleCreatedEvent()
        }else{
         toast.error(res?.message)
        }
     })
    }    

    if(editMyEvent){
      if(detail?.eventAddress) setEventMode('location')      
      setFoodType(detail?.food)
      setInputValue(detail?.aboutevent)
      setFormState((prev) => ({
       ...prev,
       eventName: detail?.eventName,
       eventAddress: detail?.eventAddress,
       eventHostPhnNumber: detail?.eventHostPhnNumber,
       hostmailid: detail?.hostmailid,
      }))       
    }    

  }, [selectedImgFile, selectedQualification, countryData, shareEvent])

//umeetReducer?.createData, showAddGroup, dispatch
  return (
    <div className='lg:fullPage pb-16 lg:pb-3 bg-white border-gray-300'>
      <div className={`${editMyEvent ? 'lg:w-[65%]' : 'w-full md:w-[96%]'} border bg-white md:px-2 lg:px-3`}>
       <section className='flex justify-between items-center'>
        {
          editMyEvent ? <div className='px-3 my-2.5 text-[17px] font-semibold'>Edit Event</div>
            : <div className='px-3 my-2.5 text-[17px] font-semibold'>{whichType =='personal' ? 'Personal Event' : 'Create Event'}</div>
        }
        <AiOutlineEye onClick={handlePreview} className='mr-3 w-6 h-6 text-gray-700 cursor-pointer' />
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

          <div className='mt-3 flex flex-col justify-center items-center'>
            <label>
              {selectedImage ? (<div className='relative'>
                <img 
                 src={selectedImage} 
                 alt="Selected" 
                 className='w-ful h-[350px] lg:h-[500px] object-cover rounded-md' />
                 <div class={`${selectedImage?.includes('localhost') ? 'hidden' : ''} absolute inset-0 flex justify-center items-center`}>
                   <div className='w-1/2 flex flex-col justify-center items-center'>
                    <div className='py-0.5'>{formState?.eventName}</div>
                    <div className='py-0.5'>Hosted By: <span className='font-semibold'>{profileReducer?.profile?.fname}</span></div>
                    <div className='py-0.5'>{`${(formState?.eventdateAndTime !== '') ? new Date(formState?.eventdateAndTime).toLocaleString("en-US", options) : 'start date'} - ${(formState?.eventEndDate !== '') ? new Date(formState?.eventEndDate).toLocaleString("en-US", options) : 'end date'}`}</div>
                    <div className='py-0.5'>{formState?.eventAddress}</div>
                   </div>
                 </div>
                </div>) : <img src={upload} className='w-full h-[350px] object-cover' />
              }
            </label>
            <input 
             type="file" 
             id="myfile" 
             accept="image/*" 
             onChange={handleImageChange} 
             className='hidden' />          
            <label 
             htmlFor={(whichType == 'personal') ? null : "myfile" }
             onClick={handleTemplateType} 
             className='flex cursor-pointer justify-center py-2 mt-3 font-medium text-[#649B8E]'>
             {(whichType == 'personal') ?  `${selectedImage ? 'Change Template' : 'Select Template'}` : `${selectedImage ? 'Change Template' : 'Upload Template'}` }
            </label>
          </div>

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
           onChange={handleDateChange}
           //value={startDate ? startDate : null}
           className='border-b focus:outline-none h-10 my-2 w-full text-gray-500' 
           placeholder='Start Date & Time*' />
          <input 
           name='eventEndDate' 
           type={inputType} 
           onClick={handleToggle} 
           onChange={handleEndDateChange} 
           className='border-b focus:outline-none h-10 my-2 w-full text-gray-500' 
           placeholder='End Date & Time*' />
          <div className={`${politicalPartyFeedback ? 'hidden' : ''} my-2 flex items-center`}>
            <span className='font-bold text-xl text-gray-600'>Event Mode</span>
            <div className='px-6 flex items-center'>
              <input 
                type="radio"
                value="online"
                checked={eventMode === 'online'}
                onChange={handleEventMode} 
                className='accent-[#649B8E] w-5 h-5' 
                id='online' /><label htmlFor='online' className='pl-2'>Online</label>
            </div>            
            <div className='px-6 flex items-center'>
              <input 
               type="radio"
               value="location"
               checked={eventMode === 'location'}
               onChange={handleEventMode}
               className='accent-[#649B8E] w-5 h-5' 
               id='location' /><label htmlFor='location' className='pl-2'>Location</label>
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
             //value={formState.eventAddress} 
             onChange={handleChange} 
             className={`${(politicalPartyFeedback || politicalPartyMeeting) ? 'hidden' : ''} border-b border-gray-300 h-10 my-2 w-full focus:outline-none`} 
             placeholder='Enter URL Link*' 
            />
          </div>
          )}          
          <div className={`${(politicalPartyFeedback || publicShopOpening || politicalPartyMeeting) ? 'hidden' : ''} flex items-center`}>
            <div>
             <span onClick={() => setCountryCode(true)} className={`min-w-[80px] flex justify-center text-gray-600 cursor-pointer mr-2 outline-none h-10 flex items-center rounded-lg px-2 border-b border-gray-300`}>          
              {code ? code : 'select'}
            </span>
            </div>
            <input name='eventHostPhnNumber' 
             className='border-b ml-3 border-gray-300 outline-none pl-2 h-10 my-2 w-full' 
             placeholder='Host Phone Number'
             value={formState.eventHostPhnNumber}
             onChange={handleChange}
             onBlur={handleBlur}
             />            
          </div>
          {!isValid && <span className='text-xs flex justify-center text-red-600 bg-red-50 py-1'>Please enter valid phone number</span>}

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
            <label onClick={handleGroupAndCreate} className={`${(invitesEmail || invitesPlace) ? 'hidden' : ''} pl-1 font-medium cursor-pointer text-[#649B8E]`}>Add Guests</label>
            <label onClick={handleEditAdd} className={`${(invitesEmail || invitesPlace) ? '' : 'hidden'} pl-2 cursor-pointer font-medium text-[#649B8E]`}>{invitesEmail?.length} <GuestType /></label>
           </div>
           <span onClick={handleEditAdd} className={`${(invitesEmail || invitesPlace) ? '' : 'hidden'} cursor-pointer text-[#649B8E] border border-[#649B8E] px-2 py-0.5 rounded-md`}>Edit List</span>
          </div>

          <div className={`${(politicalPartyFeedback || politicalPartyMeeting) ? 'hidden' : ''} border-b my-3 mb-6`}>
            <select className='h-10 outline-none w-full border-b bg-white text-gray-600'>
              {publicShopOpening && (<>
                <option>Chat Type - Hide</option>
                <option>Chat Type - Display</option>
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
              <select 
               value={foodType} 
               onChange={(e)=>setFoodType(e.target.value)} 
               className='w-full h-10 bg-white outline-none text-gray-500 rounded-md border'>
                <option >Select Food Preference</option>
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
           style={{ resize: 'none' }}
           placeholder='say something...' 
           className={`${(characterCount > 200) ? 'outline-red-100' : ''} w-full text-gray-700 outline-none my-2 rounded-xl relative border border-gray-300 p-2`} />
          <label className={`${characterCount > 200 ? 'error' : ''} text-xs flex text-gray-600 justify-end`}>
            {characterCount}/200
          </label>

          <div className={`${politicalPartyFeedback ? '' : 'hidden'} `}>
            <p onClick={handlePoliticalFeedbackQuestion} className='py-2 font-bold text-[18px] cursor-pointer text-[#519d8b]'>Create Your Question</p>
            <label className=''>Your Question</label>
            <textarea 
             placeholder='What about it?' 
             rows='3' 
             style={{ resize: 'none' }}
             value={question ? question?.question : ''}
             onChange={()=>{}}
             className='w-full outline-none my-2 border-gray-300 rounded-xl relative border p-2' />
          </div>

          <div className={`${politicalPartyFeedback ? '' : 'hidden'} flex my-7 justify-between`}>
            <span className='text-gray-700'>Feedback visible to</span>
            <div className="">
              <ToggleButton 
               feedbackVal={feedbackVal}
              />
            </div>
          </div>

          <div className='flex flex-col my-1'>
            {editMyEvent ?
              <button onClick={() => dispatch(updateEvent(postData))} className='py-2.5 my-2 text-[17px] rounded-lg text-white font-semibold bg-[#649B8E] '>Update</button>
              : <button onClick={handleEventCreate} className='py-2.5 my-2 text-[17px] rounded-lg text-white font-semibold bg-[#649B8E] '>Send</button>
            }
            <button className='py-2 text-[17px] rounded-lg font-semibold border border-[#649B8E]'>Cancel</button>
          </div>

        </div>
      </div>
      {previewEvent && 
      <PreviewEvent
       onClose={()=>setPreviewEvent(false)}
       selectedSpecificEvent={selectedSpecificEvent}
       selectedImage={selectedImage}
       formState={formState}
       code={code}
       inputValue={inputValue}
       profileReducer={profileReducer}
       eventMode={eventMode}
       selectedQualification={selectedQualification}
       isVeg={isVeg}
       />}
     {showTemplate && 
      <ChooseTemplate 
       onClose={()=>setShowTemplate(false)} 
       //saveTemplate={handleTemplateImage} 
       //handleImageChange={handleImageChange}
       templateSelected={templateSelected}
       eventId={eventId}
       selectedImage={selectedImage}
       selectedSpecificEvent={selectedSpecificEvent}
       setTemplateSelected={(urlid)=>setSelectedImage(urlid)} 
       handleSelectedImgFile={(file)=>setSelectedImgFile(file)}
      />}       
     {showAddGroup && 
      <AddGuestModal 
       education={education} 
       handleSelectedQualification={handleSelectedQualification}
       handleEducation={(eduData)=>setEducation(eduData)} 
       onClose={()=>{
          setShowAddGroup(false); 
          setReunionModal(false);
          
          }
        }
       onGuestClose={handleMyEvent}
       handleShowAddPeopleModal={handleShowAddPeopleModal}
       showAddPeopleModal={showAddPeopleModal}
       handlePeopleModalClose={()=>setShowAddPeopleModal(false)} />}
     {showAddPeopleModal && 
      <AddPeopleModal 
       education={education}
       selectedQualification={selectedQualification} 
       handleAddByContactModal={handleAddByContactModal}
       showAddByContactModal={showAddByContactModal}
       handlePeopleModalClose={()=>setShowAddPeopleModal(false)} />}       
     {showAddByContactModal && 
      <AddByContactModal 
        onClose={()=>setShowAddByContactModal(false)} 
        invitesEmail={invitesEmail} 
        setInvitesEmail={setInvitesEmail} />}       
     {showAddGroupPersonalOthers && 
      <PersonalOtherGuest 
       handleAddByContactModal={handleAddByContactModal}
       onClose={()=>setShowAddGroupPersonalOthers(false)} />}
     {showPoliticalAddGroup && 
      <PoliticalGuestAddModal
       setInvitesPlace={setInvitesPlace}
       setGuestType={setGuestType}
       setLocationCountry={setLocationCountry}
       onClose={()=>setShowPoliticalAddGroup(false)}
       whichType={whichType} />}
     {showShareMyEvent && 
      <EventShareModal 
       onClose={()=>setShowShareMyEvent(false)}
       invitesEmail={invitesEmail} 
       emialObjects={emialObjects}
       handleShareEvent={(share)=>{console.log(share);setShareEvent(share)}}/>}
     {showPoliticalFeedbackQuestionModal && 
      <PoliticalFeedbackQuestion
       question={question}
       setQuestion={setQuestion}
       onClose={()=>setShowPoliticalFeedbackQuestionModal(false)} />}
      {countryCode && (
        <Portals closeModal={closeCountryModal}>
          <CountryCodeModal
            countryList={countryList}
            setCountryData={setCountryData}
            closeCountryModal={closeCountryModal}
          />
        </Portals>
      )}              
    </div>
  )
}

export default CreateEventModal