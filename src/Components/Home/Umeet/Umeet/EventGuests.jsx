import img from '../../../../assets/images/events.jpg'
import { MdMessage } from 'react-icons/md'
import UmeetNotAttending from '../../../../Assets/Images/Umeet/Umeet-Main/Umeet-NotAttending.png'
import UmeetAttending from '../../../../Assets/Images/Umeet/Umeet-Main/Umeet-Attending.png'
import Umeetmaybe from '../../../../Assets/Images/Umeet/Umeet-Main/Umeet-maybe.png'

const dataList = [
 {
    img: img,
    name: 'Mukesh Ambani',
    foodType: 'Veg',
    guests: '3 guest',
    chat: true,
    status: 'attending'
 },
 {
    img: img,
    name: 'Mukesh Ambani',
    foodType: 'Non-Veg',
    guests: '5 guest',
    chat: true,
    status: 'not Attending'
 },
 {
    img: img,
    name: 'Mukesh Ambani',
    foodType: 'Veg',
    guests: '',
    chat: false,
    status: 'attending'
 },
 {
    img: img,
    name: 'Mukesh Ambani',
    foodType: 'Veg',
    guests: '6',
    chat: true,
    status: 'pending'
 },
 {
    img: img,
    name: 'Mukesh Ambani',
    foodType: 'Veg',
    guests: '7',
    chat: true,
    status: 'pending'
 },
]

function EventStatus({ data }){
    if(data.status.toLowerCase() == 'attending'){
        return <img src={UmeetAttending} className='h-8 w-8 cursor-pointer'/>
    }else if(data.status.toLowerCase() == 'not attending'){
        return <img src={UmeetNotAttending} className='h-8 w-8 cursor-pointer'/>
    }else if(data.status.toLowerCase() == 'pending'){
        return <img src={Umeetmaybe} className='h-8 w-8 cursor-pointer'/>
    }
}


export default function EventGuests(){
    return (
    <div className='p-4 bg-white rounded-xl w-full'>
      <div className='mb-1'>
       <span className='font-bold'>Responses</span>
       <span className='ml-3'>10 of 25 responded</span>
      </div>
      <div className='flex py-3 my-1 border-b-2 border-gray-300'>
       <div className='w-1/3 border-r-2 border-gray-300 py-3 flex justify-center items-center'><span className='p-2 bg-green-600 w-10 flex justify-center mr-2 items-center h-10 rounded-full text-white'>5</span>Yes</div>
       <div className='w-1/3 border-r-2 border-gray-300 py-3 flex justify-center items-center'><span className='p-2 bg-red-600 w-10 flex justify-center mr-2 items-center h-10 rounded-full text-white'>4</span>Yes</div>
       <div className='w-1/3  flex justify-center items-center'><span className='p-2 bg-yellow-600 w-10 flex justify-center mr-2 items-center h-10 rounded-full text-white'>2</span>Yes</div>
      </div>

      <div className='flex justify-between items-center border-b border-gray-300 py-4'>
       <span className='w-2/3 text-xl font-bold'>Guest List</span>
       <select className="border w-1/3 bg-white border-gray-300 w-full py-2 pl-3 pr-10 text-gray-700 focus:outline-none focus:border-blue-500">         
         <option value="option2">All Guests</option>
         <option value="option3">By Name</option>
         <option value="option3">Event people</option>
       </select>
      </div>

      {
        dataList.map((data, i)=>(
        <div key={i} className='py-4 border-t flex justify-between'>
          <div className='flex'>
           <img src={data.img} className='h-10 mr-2 w-10 rounded-full object-cover' />
           <div className='flex flex-col'>
            <div className='flex font-medium items-center'>{data.name} <span className='text-[10px] text-gray-600 pl-3'>( {data.foodType} )</span></div>
            <div className='flex'>
             <span>{data.guests ? <div className='text-[12px] text-gray-600'> ( {data.guests} ) </div> : null}</span>
             <span>{data.chat ? <MdMessage className='ml-3 h-5 w-5 text-green-600' /> : null}</span>            
            </div>
           </div>
          </div>  

          <div>
           <EventStatus data={data} />
          </div>
        </div>
        ))
      }
    </div>
    )
}