import img from '../../../../Assets/Images/events.jpg'
import { MdMessage } from 'react-icons/md'
import UmeetNotAttending from '../../../../Assets/Images/Umeet/Umeet-Main/Umeet-NotAttending.png'
import UmeetAttending from '../../../../Assets/Images/Umeet/Umeet-Main/Umeet-Attending.png'
import Umeetmaybe from '../../../../Assets/Images/Umeet/Umeet-Main/Umeet-maybe.png'
import { getInviteesList } from "../../../../redux/actionCreators/umeetActionCreator"
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

function EventStatus({ invites }) {
  if(invites){
    if (invites?.attend == '1') {
      return <img src={UmeetAttending} className='h-8 w-8 cursor-pointer' />
    } else if (invites?.attend == '2') {
      return <img src={UmeetNotAttending} className='h-8 w-8 cursor-pointer' />
    } else if (invites?.attend == '3') {
      return <img src={Umeetmaybe} className='h-8 w-8 cursor-pointer' />
    }
  }
}

export default function EventGuests({ guestsList, NoOfGuests, NoOfResponed }){
    const [FilteredGuestsList, setFilteredGuestsList] = useState([])
    const [choosen, setChoosen] = useState('All Guests')

    const dispatch = useDispatch()
    const { profile } = useSelector(state=>state.profileReducer)
    const { eventDetail } = useSelector(state=>state.umeetReducer)

    const invitees = profile
    
console.log(FilteredGuestsList, choosen)
    useEffect(() => { 
        if(choosen == 'All Guests'){
         setFilteredGuestsList(guestsList);
        }else if(choosen == 'Attending'){
          const attend = guestsList?.filter(item =>{
          console.log(item, 'item')               
          const hasAttend = item?.invities?.attend == '1'
          console.log(hasAttend, hasAttend)
          return hasAttend
         })

         setFilteredGuestsList(attend)
        }else if(choosen == 'Maybe'){
          const may = guestsList?.filter(item =>{         
          const hasMay = item?.invities?.attend == '3'
          console.log(hasMay)
          return hasMay
         })

         setFilteredGuestsList(may)
        }else if(choosen == 'Not Attending'){
          const noAttend = guestsList?.filter(item =>{         
          const hasNoAttend = item?.invities?.attend == '2'

          return hasNoAttend
         })

         setFilteredGuestsList(noAttend)
        }
    }, [choosen])

    return (
    <div className='p-4 bg-white rounded-xl w-full'>
      <div className='mb-1'>
       <span className='font-bold'>Responses</span>
       <span className='ml-3'>{NoOfResponed} of {guestsList ? guestsList?.length : 0} responded</span>
      </div>
      <div className='flex py-3 my-1 border-b-2 border-gray-300'>
       <div className='w-1/3 border-r-2 border-gray-300 py-3 flex justify-center items-center'><span className='p-2 bg-[#118409] w-10 flex justify-center mr-2 items-center h-10 rounded-full text-white'>{NoOfGuests?.numberOfYes }</span>Yes</div>
       <div className='w-1/3 border-r-2 border-gray-300 py-3 flex justify-center items-center'><span className='p-2 bg-[#C40505] w-10 flex justify-center mr-2 items-center h-10 rounded-full text-white'>{NoOfGuests?.numberOfNo}</span>Yes</div>
       <div className='w-1/3  flex justify-center items-center'><span className='p-2 bg-[#E4891A] w-10 flex justify-center mr-2 items-center h-10 rounded-full text-white'>{NoOfGuests?.numberOfMaybe}</span>Maybe</div>
      </div>

      <div className='flex justify-between items-center border-b border-gray-300 py-4'>
       <span className='w-2/3 text-xl font-bold'>Guest List</span>
       <select value={choosen} onChange={()=>setChoosen(event.target.value)} className="border w-1/3 bg-white border-gray-300 w-full py-2 pl-3 pr-10 text-gray-700 focus:outline-none focus:border-blue-500">         
         <option value="All Guests">All Guests</option>
         <option value="Attending">Attending</option>
         <option value="Maybe">Maybe</option>
         <option value="Not Attending">Not Attending</option>
       </select>
      </div>

      {
        FilteredGuestsList?.map((data, i)=>(
        <div key={i} className='py-4 border-t flex justify-between'>
          <div className='flex'>
           <img src={img} className='h-10 mr-2 w-10 rounded-full object-cover' />
           <div className='flex flex-col'>
            <div className='flex font-medium items-center'>{data?.profile?.fname}<span className='text-[10px] text-gray-600 pl-3'>( {data?.invities?.nonveg ? 'non-veg' : 'veg'} )</span></div>
            <div className='flex'>
             <span>{data.invities?.extraguest?.noofAttendees ? <div className='text-[12px] text-gray-600'> ( {data.invities?.extraguest?.noofAttendees} ) </div> : null}</span>
             <span>{data.chat ? <MdMessage className='ml-3 h-5 w-5 text-green-600' /> : null}</span>            
            </div>
           </div>
          </div>  

          <div>
           <EventStatus invites={data?.invities} />
          </div>
        </div>
        ))
      }
    </div>
    )
}