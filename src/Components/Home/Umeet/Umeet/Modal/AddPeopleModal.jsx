import { useState, useEffect } from "react";
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { MdKeyboardArrowRight } from 'react-icons/md'
import wishes from '../../../../../Assets/Images/Umeet/wishesTemplate.webp'
import selectedimg from '../../../../../Assets/Images/Umeet/Umeet-Main/Umeet-Attending.png'
import person from '../../../../../Assets/Images/Person.jpg'
import '../../Umeet.css'
// import AddByContactModal from './AddByContactModal'
import group from '../../../../../Assets/Images/Umeet/Umeet-Main/Group 1054.png'
import { useSelector } from 'react-redux'
import axios from 'axios'
import user from '../../../../../Assets/Images/user.png'
import { config } from "../../../../../config/config";

const tab = [
  { name: 'Choose all friends', key: 'friends'},
  { name: 'Choose classmates', key: 'classmates'},
  { name: 'Choose relatives', key: 'relatives'},
  { name: 'Choose officemates', key: 'officemates'},
]
const token = localStorage.getItem("userCredential")
  ? JSON.parse(localStorage.getItem("userCredential")).token
  : "";

const AddPeopleModal = ({ onClose, education, handlePeopleModalClose,
handleAddByContactModal, showAddByContactModal, selectedQualification, handleCheckbox, selectedUser }) => {

  const [selectAll, setSelectAll] = useState(false);
  const [eduData, setEduData] = useState([]);
  
  const { umeetReducer, profileReducer, friendReducer } = useSelector(state=>state);
  
  const isPersonal = profileReducer.profile.profiletype === 'Personal'
  
    const [state, setState] = useState({})
    const { activeTab = tab?.[0], dataList = friendReducer.myFriendsList  } = state
  
  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
  }

  for (let i = 0; i < eduData.length; i++) {
    eduData?.map(inviteData=>(
      dataList.push({
        "name": inviteData?.fname + ' ' + inviteData?.lname,
        "email": inviteData?.email,
        "img": inviteData?.pimage
      })
    ))
  }
//console.log(dataList, 'dataList')
  const ugPostData = {
   "ugaddress": profileReducer?.educationDetails?.ugaddress,
   "ugdegree": profileReducer?.educationDetails?.ugdegree,
   "ugbranch": profileReducer?.educationDetails?.ugbranch,
   "ugpassyear": profileReducer?.educationDetails?.ugpassyear,
  }

  const pgPostData = {
   "pgaddress": profileReducer?.educationDetails?.pgaddress,
   "pgdegree": profileReducer?.educationDetails?.pgdegree,
   "pgbranch": profileReducer?.educationDetails?.pgbranch,
   "pgpassyear": profileReducer?.educationDetails?.pgpassyear,
  }
  const schoolPostData = {
   "schooladdress": profileReducer?.educationDetails?.pgaddress,
   "schoolpass": profileReducer?.educationDetails?.pgpassyear,
  }
  useEffect(()=>{
    if(education == 'ug'){
      //dataList = umeetReducer.ugFriends
    }else if(education == 'pg'){
      (async()=>{
        const  { data } = await axios.post(
        `${config.API_URI}profile/api/education/getpgfriends`,
        pgPostData, {headers: { Authorization: `Bearer ${token}` }})
        console.log(data?.data, "getAllPgFriends")
        setEduData(data?.data)
      })()    
      //dataList = umeetReducer.pgFriends
    }else if(education == 'school'){
      // (async()=>{
      //   const  { data } = await axios.post(
      //   `${config.API_URI}profile/api/education/getschoolfriends`,
      //   schoolPostData, {headers: { Authorization: `Bearer ${token}` }})
      //   console.log(data?.data, "schoolFriends")
      //   setEduData(data?.data)
      // })()      
    }
  }, [selectedQualification]);
   
  useEffect(() => {
    // dispatch( getOwnFriendsList( profileReducer.profile.id)  )
  }, [])

  const handleTabClick = ( tab ) => {
    let key = {
      classmates: 'classment',
      relatives: 'relative',
      officemates: 'collgues',
      friends: 'id'
    }[tab.key]
    const data = friendReducer.myFriendsList.filter(( item ) => {
      return item.friend[key]
    })
    setState({...state, activeTab:  tab , dataList: data})
  }

  return (
    <div className='fixed top-0 left-0 z-20 w-full h-full flex justify-center items-center' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>

     <div className={`w-[96%] md:w-[70%] lg:w-[45%] 2xl:w-[50%] h-[95%] md:h-[94%] flex flex-col justify-between bg-white rounded-xl p-3 lg:p-5 ${showAddByContactModal ? '-z-10' : ''}`}>
      <div className=''>
       <div className='flex flex-wrap justify-center items-center text-[14px] lg:text-[16px] border-b pb-2 text-gray-600'>
       {
        (isPersonal ? tab : []).map(item => {
          return <button onClick={() => handleTabClick(item) } className={`px-5 my-2 text-[#649B8E] w-1/3 py-1 rounded-md border ${ activeTab.key === item.key ? 'bg-[#649B8E] text-white ' : ""}`}>{ item.name }</button>

        })
      }
         <button onClick={handleAddByContactModal} className='px-5 py-1 rounded-md ml-5 border boredr-[#649B8E] text-[#649B8E]'>Add by Email/Phone</button>
       </div>
       <div className=''>
        <p className='py-2'>{selectedQualification}</p>  
        <input type='search' className='h-7 p-2 h-8 outline-none border border-gray-300 w-full bg-gray-100 rounded-md' placeholder='Search....' />
        <div className='my-3 flex items-center'>
      	 <label className='text-[17px] text-gray-700 flex items-center'>
         <input
          type="checkbox"
          checked={selectAll}
          onChange={handleSelectAllChange}
          className='w-5 h-5 mr-2'
          />Select All</label>
    	</div>
    	<div className='h-[190px] md:h-[205px] lg:h-[210px] xl:h-[280px] 2xl:h-[320px] hideScroll overflow-y-scroll'>
    	{ (dataList.length !== 0) ?
    	 dataList.map((data, i)=>(
    	  <div key={i} className='flex items-center mb-2 lg:mb-3'>  	   
    	   <div className='w-auto mr-5'>
    	    <img src={data.profile.pimage || user } className='w-10 h-10 rounded-full object-cover' />
    	   </div>
    	   <span className='w-4/6 font-medium text-[15px]'>{data.profile.fname || "User"} { data.profile.lname || "" }</span>
    	   <div className='w-1/6 flex justify-end'>
    	    {selectAll ? <img src={selectedimg} className='h-6 w-6'/> :
    	     <input type="checkbox" checked={ selectedUser.includes(data.profile.id ) } className='w-4 h-4' onChange={ () => handleCheckbox( data.profile.id) } />
    	    }
    	   </div>
    	  </div>
    	 )) : <p className='h-full flex justify-center items-center bg-sky-50'>No {education} friends were found</p>       
    	}
    	</div>

       </div>            
      </div>

      <section className='flex w-full'>       
        <img src={group} className='h-9 w-9 mr-3 mt-2.5' />
        <div className='w-5/6'>
         <button onClick={ handlePeopleModalClose } className='w-full py-1 rounded-xl text-white mt-2.5 border border-[#649B8E] bg-[#649B8E]'>Add Guests</button>       
         <button onClick={handlePeopleModalClose} className='w-full py-1 my-1 rounded-xl border border-[#649B8E] text-[#649B8E]'>Cancel</button> 
        </div>
      </section>
     </div>  
     {/*{showAddByContactModal && <AddByContactModal onClose={()=>setShowAddByContactModal(false)} />}*/}
    </div>
  )
}

export default AddPeopleModal