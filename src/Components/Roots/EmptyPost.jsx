import React from 'react'

const EmptyPost = () => {
  return (
    <div className='my-5 flex flex-col gap-3 justify-center items-center w-[95%] sm:w-[50%] lg:w-[40%] '>
        <div className='p-2 px-6 rounded-lg bg-gray-400 text-white'>No Posts</div>
        <div className='text-center'>Follow, Send friend requests and make relations with your friend to get more posts. </div>
    </div>
  )
}

export default EmptyPost