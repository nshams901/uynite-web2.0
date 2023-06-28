import React, { useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from '../../Utility/utility';
import VideoComponent from './VideosComponent/VideoComponent';
import mute from "../../../Assets/Images/Mute.png";
import Messages from "../../../Assets/Images/Messages.png";
import like from "../../../Assets/Images/KicksBeforeLike.png";
import share from "../../../Assets/Images/share.png";
import beforeFollow from "../../../Assets/Images/Kicks before follow.png";
// import Collections from "../../../Assets/Images/Collections.png";
import Collections from '../../../Assets/Images/Collections.png'
import { useState } from 'react';
import { useEffect } from 'react';
import EmptyComponent from '../../empty component/EmptyComponent';
import { useLocation, useParams } from 'react-router-dom';

const dataList = [
    { title: "mute", img: mute },
    { title: "likes", img: like },
    { title: "follow", img: beforeFollow },
    { title: "comments", img: Messages },
    { title: "collection", img: Collections },
    // { title: "share", img: `${isMobile ? '' : share}` },
    // { title: "save", img: collection },
  ];

const UserVideos = () => {
    const dispatch = useDispatch();
    const params = useParams()
    const location = useLocation();
    const searchParams = new URLSearchParams(location)
    const [ isMobile , setIsMobile] = useState({})
    const { userKickList } = useSelector((state) => state.kicksReducer);

    const [ state, setState] = useState({
      videoList: location?.search ? [] : userKickList
    });
    const { videoList, isMute} = state

    useEffect(() => {
        window.addEventListener(
          "resize",
          () => {
            const ismobile = window.innerWidth < 900;
            if (ismobile !== isMobile) setIsMobile(ismobile);
          },
          false
        );
      }, [isMobile]);

      const handleMute = () => setState({ ...state, isMute: !isMute})
    // console.log(userKickList,params,location, 'JJJJJJJ');

    return (
        <div className='w-full h-screen md:w-1/3 2xl:w-1/3 bg-white mx-auto'>
            <div className='p-3'>
            <section
            className={`video-container mt-[3%] text-white ${
              isMobile ? "video-container_mobile" : ""
            }`}
            id="video-container"
          >
            {isEmpty(videoList) ? (
              <EmptyComponent
                message={`There is no video in this section`}
              />
            ) : (
              videoList?.map((item) => {
                const { text, id } = item;
                return (
                  <div className="w-full h-full inline-block" key={id}>
                    <VideoComponent dataList={dataList} data={item} handleMute={handleMute} isMute={isMute} />
                  </div>
                );
              })
            )}
          </section>
            </div>
        </div>
    )
}

export default UserVideos