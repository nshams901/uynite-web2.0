import React from 'react'

const EmptyComponent = ({message}) => {
  return (
    <div  className='w-full px-6 h-full flex justify-center text-gray-500 items-center'>{message} </div>
  )
}

export default EmptyComponent