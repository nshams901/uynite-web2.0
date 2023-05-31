import React from 'react'

const PostVideo = () => {
  return (
    <div className="w-full grid sm:grid-cols-3 lg:grid-cols-4 gap-3 text-center rounded-xl p-2 h-[400px] bg-white">
      {[
        [1, 2, 3, 4].map(() => (
          <img
            src="./images/events.jpg"
            alt=""
            className="w-[150px] h-[100px] rounded-lg object-cover"
          />
        )),
      ]}
    </div>
  );
}

export default PostVideo;