import React from 'react'
import Post from '../ProfilePage/posts/Post';
import PostPhotos from "../ProfilePage/posts/PostPhotos";
import PostVideo from "../ProfilePage/posts/PostVideo";
import PostKicks from "../ProfilePage/posts/PostKicks";
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';


const GridBoxes = ({selectedOption, isOther}) => {
  const { userPostsList, profile } = useSelector((state) => state.profileReducer);

  useEffect(() => {
    //  dispatch(getUserPostList( isOther ? params?.id : profile?.id));
  }, [])
  const data = useMemo(() => {
    const photo = userPostsList?.filter((item) => {
      return item?.image
    })
    const video = userPostsList?.filter((item) => {
      return item?.video
    })
    return {photo: photo,
      video: video
    };
  }, [userPostsList?.length])

  return (
    <div className="w-[95%] sm:w-[95%] lg:w-[85%] xl:w-[95%] flex text-center rounded-xl">
      {
        <div className="rounded-lg w-full">
          {selectedOption === "Posts" && <Post data={userPostsList} />}
          {selectedOption === "Photos" && <PostPhotos data={data?.photo} />}
          {selectedOption === "Videos" && <PostVideo data={data?.video} />}
          {selectedOption === "Kicks" && <PostKicks isOther={isOther}/>}
        </div>
      }
    </div>
  );
}

export default GridBoxes;
