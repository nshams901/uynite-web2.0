import React from 'react'
import Post from '../ProfilePage/posts/Post';
import PostPhotos from "../ProfilePage/posts/PostPhotos";
import PostVideo from "../ProfilePage/posts/PostVideo";
import PostKicks from "../ProfilePage/posts/PostKicks";


const GridBoxes = ({selectedOption}) => {
  
  return (
    <div className="w-[95%] sm:w-[95%] lg:w-[85%] xl:w-[95%] flex text-center rounded-xl">
      {
        <div className="rounded-lg w-full">
          {selectedOption === "Post" && <Post />}
          {selectedOption === "Photos" && <PostPhotos />}
          {selectedOption === "Videos" && <PostVideo />}
          {selectedOption === "Kicks" && <PostKicks />}
        </div>
      }
    </div>
  );
}

export default GridBoxes;
