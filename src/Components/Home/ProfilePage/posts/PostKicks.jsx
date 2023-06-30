import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserKickList } from '../../../../redux/actionCreators/kicksActionCreator';
import { useNavigate, useParams } from 'react-router-dom';

const PostKicks = ({ isOther }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {profile} = useSelector((state) => state.profileReducer);
  const { userKickList } = useSelector((state) => state.kicksReducer);
  const params = useParams()
  useEffect(() => {
    dispatch(getUserKickList( isOther ?  params?.id : profile?.id ))
  }, [])
  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 text-center rounded-xl p-2 min-h-[400px] bg-white">
      {userKickList?.map(( item) => {
     return (
      <>
        {
          item.image ?
          <img
            src={item?.image}
            alt=""
            className="w-[250px] cursor-pointer h-[300px] rounded-lg object-cover"
            onClick={() => navigate(`/user/videos/${params.id}`)}
          />
          :
          <video src={item.video} className='hover:cursor-pointer' onClick={() => navigate(`/user/videos/${params.id}`)}></video>
        }
      </>
        )
      })
        }
    </div>
  );
}

export default PostKicks