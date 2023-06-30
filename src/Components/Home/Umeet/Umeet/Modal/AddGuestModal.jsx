import { AiOutlineCloseCircle } from 'react-icons/ai'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUgFriends, getAllPgFriends } from '../../../../../redux/actionCreators/umeetActionCreator'

const AddGuestModal = ({ onClose, handleEducation, education,
  handleShowAddPeopleModal, showAddPeopleModal, handlePeopleModalClose,
  handleSelectedQualification, onGuestClose }) => {  
  const dispatch = useDispatch()
  const { umeetReducer, profileReducer } = useSelector(state=>state)

  const dataList = [
    {
      qualification: "SSC",
      address: profileReducer?.educationDetails?.schooladdress
    },
    {
      qualification: "Graduation",
      address: profileReducer?.educationDetails?.ugaddress
    },
    {
      qualification: "Post Graduation",
      address: profileReducer?.educationDetails?.pgaddress
    },
  ]

  const handleAddPeople = (qualification)=>{
    //handleShowAddPeopleModal()
    if(qualification?.toLowerCase() == 'graduation'){      
      handleEducation('ug')
      handleSelectedQualification(profileReducer?.educationDetails?.ugaddress)
      onClose()
    }else if(qualification?.toLowerCase().includes('post')){      
      handleEducation('pg')
      handleSelectedQualification(profileReducer?.educationDetails?.pgaddress)
      onClose()
    }else if(qualification?.toLowerCase().includes('ssc')){
      handleEducation('school')
      handleSelectedQualification(profileReducer?.educationDetails?.schooladdress)
      onClose()
    }
  }

  useEffect(()=>{
    // if(education == 'ug'){
    //   dispatch(getAllUgFriends(ugPostData))
    // }else if(education == 'pg'){
    //   dispatch(getAllPgFriends(pgPostData))
    // }
  }, [education])

  return (
    <div className='fixed top-0 left-0 z-20 h-full w-full flex justify-center items-center' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
     <div className='w-[78%] md:w-[41%] lg:w-[37%] xl:w-[29%] bg-white rounded-xl p-3'>
      <div className='flex justify-between py-1 text-gray-600'>
        <span className='text-[18px] text-gray-700'>Select a Group</span>
        <AiOutlineCloseCircle onClick={onGuestClose} className='w-8 cursor-pointer hover:text-red-500 h-7'/>
      </div>
      {
        dataList?.map((data, i)=>(
          <div 
           key={i} 
           onClick={()=>handleAddPeople(data.qualification)} 
           className='flex cursor-pointer justify-between py-3 px-3 items-center border-t'>
           <div className='flex flex-col w-5/6'>
            <span className='font-medium text-gray-800'>{data.qualification}</span>
            <span className='text-gray-600 text-[15px]'>{data.address}</span>
           </div>           
           <div><MdKeyboardArrowRight className='w-7 text-gray-600 h-7'/></div>
          </div>
        ))
      }              
     </div>     
    </div>
  )
}

export default AddGuestModal