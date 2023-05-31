import video from '../../../Assets/Videos/v2.mp4';

export default function SearchPeople(){
	return (
	<>
        {[1,2,34,5,3,4,5,5,].map((elem, i)=>(
        <div key={i} className="cursor-pointer flex items-center justify-cente py-4 hover:bg-blue-50 border-b">
         <img src="./images/events.jpg" alt="" className="rounded-full object-cover h-12 w-12"/>
         <span className='mx-3 font-semibold'>Ajaykumar Siva</span>
		</div>
        ))} 
    </>  
    )
}          