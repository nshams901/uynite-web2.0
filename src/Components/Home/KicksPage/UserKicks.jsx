import { Avatar } from '@material-tailwind/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const UserKicks = () => {
    const navigate = useNavigate()
    const { userKickList } = useSelector((state) => state.kicksReducer);
    console.log(userKickList?.[0]?.pimage, "{{{{{{{{{{{");
    const user = userKickList?.[0]?.profile
    return (
        <div className='w-full md:w-1/2 bg-white mx-auto'>
            <div className='p-3'>
                <Avatar
                    className='rounded-full w-20 h-20 mx-4 cursor-pointer'
                    src={user?.pimage}
                    onClick={() => navigate(`/profile/${user.id}`)}
                />
                <span onClick={() => navigate(`/profile/${user?.id}`)}
                className='font-bold cursor-pointer'>{user?.fname || ""} {user?.lname || ""}</span>
                <div className='flex flex-wrap mt-3'>
                    {
                        userKickList?.map((item) => {
                            return (
                                <div className='w-1/2 p-3 md:w-1/3 h-60' key={item?.id}>
                                    <div className='h-full bg-black cursor-pointer'>
                                        <video className='h-full'><source src={item?.video}></source></video>
                                    </div>
                                </div>
                        )
                        })
                    }

                </div>
            </div>
        </div>
    )
}

export default UserKicks