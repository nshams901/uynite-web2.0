import video from '../../../Assets/Videos/v2.mp4';

const dataList = [
  'All','Action', 'Adventures', 'Arts & Craft', 'Beauty Tips', 'Comedy', 'Drama', 'Fiction', 'Novel', 'Romance'
]

export default function SearchHastag(){
	return (
	<>
        {dataList.map((elem, i)=>(
        <div key={i} className="cursor-pointer flex items-center justify-cente py-4 hover:bg-blue-50 border-b">
         <span className='mx-3 font-semibold'>#{elem}</span>
		</div>
        ))} 
    </>  
    )
}          