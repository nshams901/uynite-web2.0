import { useState, useEffect } from "react";
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { MdKeyboardArrowRight } from 'react-icons/md'
import wishes from '../../../../../Assets/Images/Umeet/wishesTemplate.webp'
import selectedimg from '../../../../../Assets/Images/Umeet/Umeet-Main/Umeet-Attending.png'
import person from '../../../../../Assets/Images/Person.jpg'
import '../../Umeet.css'
import AddByContactModal from './AddByContactModal'
import group from '../../../../../Assets/Images/Umeet/Umeet-Main/Group 1054.png'
import axios from 'axios'
import { useSelector } from 'react-redux'

// const unionsDataList = [
//   {name: "Smith4",img: person,checked: false},{name: "jd4",img: person,checked: false},{name: "Ak1",img: person,checked: false},
// ]

const PersonalOtherGuest = ({ onClose, handleAddByContactModal }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [showAddByContactModal, setShowAddByContactModal] = useState(false)
  const [selectedBy, setSelectedBy] = useState('Friends')
  const [dataList, setDataList] = useState([])
  const [friendDataList, setFriendDataList] = useState([])
  const [classmatesDataList, setClassmatesDataList] = useState([])
  const [relativesDataList, setRelativesDataList] = useState([])
  const [officematesDataList, setOfficematesDataList] = useState([])

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([])

  const handleSelected = (select)=>{
    setSelectedBy(select)
  }
 
  const { profileReducer } = useSelector(state=>state)

  const handleCheckboxChange = (index) => {
    const value = event.target.value;
    console.log(value)
    if(event.target.checked){
      setSelectedCheckboxes([...selectedCheckboxes, value]);
    }else{
      setSelectedCheckboxes(selectedCheckboxes.filter(item => item !== value));
    }
  };

  const handleSelectAllChange = () => {
    const checked = event.target.checked;

    setSelectAll(checked);

    if(checked){
      const allOptions = dataList?.map(option => option?.profile?.email);
      setSelectedCheckboxes(allOptions);
    }else{
      setSelectedCheckboxes([]);
    }
  }
console.log(selectedCheckboxes)
  const filterType = (data)=>{
    const friends = data?.filter((item)=>
      item?.friend?.isFriend == true
    ).map(obj=> obj)
    setFriendDataList(friends)

    const collgues = data?.filter((item)=>
      item?.friend?.collgues == true
    ).map(obj=> obj)
    setOfficematesDataList(collgues)
    
    const relative = data?.filter((item)=>
      item?.friend?.relative == true
    ).map(obj=> obj)
    setRelativesDataList(relative)

    const classment = data?.filter((item)=>
      item?.friend?.classment == true
    ).map(obj=> obj)
    setClassmatesDataList(classment)  
  }


  useEffect(()=>{
    (async()=>{
     const { data } = await axios.get(
      `https://web.uynite.com/friend/api/friend/${profileReducer?.profile?.id}/Accepted`)    
       console.log(data?.data)
       setDataList(data?.data)
      filterType(data?.data)
    })()

  }, [])
  return (
    <div className='fixed top-0 left-0 w-full z-10 h-full flex justify-center items-center' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
     <div className={`w-[96%] md:w-[70%] lg:w-[50%] 2xl:w-[50%] h-[95%] md:h-[93%] flex flex-col justify-between bg-white rounded-xl p-3 lg:p-5 ${showAddByContactModal ? '-z-10' : ''}`}>
      <div className=''>
       <div className='flex font-medium border-b justify-start items-center flex-wrap text-[14px] lg:text-[16px] pb-1 mb-1 text-gray-600'>
         <button 
         onClick={()=>{ handleSelected('Friends'); setDataList(friendDataList) }} 
         className={`${selectedBy == 'Friends' ? 'bg-[#649B8E] text-white' : ''} px-1 py-1 text-[#649B8E] rounded-md border`}>
         Friends</button>
         <button 
         onClick={()=>{ handleSelected('Classmates'); setDataList(classmatesDataList) }}  
         className={`${selectedBy == 'Classmates' ? 'bg-[#649B8E] text-white' : ''} px-1 py-1 rounded-md ml-1 border text-[#649B8E]`}>
         Classmates</button>
         <button 
         onClick={()=>{ handleSelected('Relatives'); setDataList(relativesDataList) }}  
         className={`${selectedBy == 'Relatives' ? 'bg-[#649B8E] text-white' : ''} px-1 py-1 rounded-md ml-1 border boredr-[#649B8E] text-[#649B8E]`}>
         Relatives</button>
         <button 
         onClick={()=>{ handleSelected('Officemates'); setDataList(officematesDataList) }}  
         className={`${selectedBy == 'Officemates' ? 'bg-[#649B8E] text-white' : ''} px-1 py-1 rounded-md ml-1 border boredr-[#649B8E] text-[#649B8E]`}>
         Officemates</button>

         <button 
         onClick={()=>{
          handleSelected('Add by Email/Phone')
          handleAddByContactModal() }}  
         className={`${selectedBy == 'Add by Email/Phone' ? 'bg-[#649B8E] text-white' : ''} px-1 py-1 rounded-md ml-1 my-0.5 border boredr-[#649B8E] text-[#649B8E]`}>
         Add by Email/Phone</button>
       </div>
       <div className=''>
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
    	<div className='h-[250px] md:h-[350px] 2xl:h-[320px] hideScrol overflow-y-scroll pr-2'>
    	{
    	 dataList?.map((data, i)=>(
    	  <div key={i} className='flex items-center mb-2 lg:mb-3'>    	   
    	   <div className='w-1/6'>
    	    <img src={data?.profile?.pimage} className='w-10 h-10 rounded-full object-cover' />
    	   </div>
    	   <span className='w-4/6 font-medium text-[15px]'>{data?.profile?.fname}</span>
    	   <div className='w-1/6 flex justify-end'>
    	     <input 
            type="checkbox"
            checked={data.checked}
            value={data?.profile?.email}
            checked={selectedCheckboxes.includes(data?.profile?.email)}
            onChange={() => handleCheckboxChange(i)}
            className='w-4 h-4' />
    	   </div>
    	  </div>
    	 ))
    	}
    	</div>

       </div>            
      </div>

      <section className='flex w-full'>       
        <img src={group} className='h-9 w-9 mr-3 mt-2.5' />
        <div className='w-5/6'>
         <button className='w-full py-1 rounded-xl text-white mt-2.5 border border-[#649B8E] bg-[#649B8E]'>Save</button>       
         <button onClick={onClose} className='w-full py-1 my-1 rounded-xl border border-[#649B8E] text-[#649B8E]'>Cancel</button> 
        </div>
      </section>
     </div>  
     {showAddByContactModal && <AddByContactModal onClose={()=>setShowAddByContactModal(false)} />}
    </div>
  )
}

export default PersonalOtherGuest