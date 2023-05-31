import video from '../../../Assets/Videos/v2.mp4';
import { AiOutlinePlayCircle } from 'react-icons/ai'

export default function SearchVideo(){
	return (
	<div className='grid grid-cols-3 gap-3'>
        {[1,2,34,5,3,4,5,5,6,8,3,3,3,3].map((elem)=>(
          <div className="cursor-pointer h-[160px] rounded-lg relative overflow-hidden">
            {/* <img src="./images/events.jpg" alt="" className="rounded-md object-cover h-[160px]"/> */}
          <video style={{ width: '100%', height: '100%', objectFit: 'cover' }} className=''>
            <source src={video} type="video/mp4" />
          </video>
          <AiOutlinePlayCircle className='absolute left-[42%] text-white w-8 h-8 top-[40%]'/>
          <span className='absolute bottom-[2%] text-[11px] right-[4%] text-white font-semibold'>02:00</span>
          </div>
        ))} 
    </div>  
    )
}          