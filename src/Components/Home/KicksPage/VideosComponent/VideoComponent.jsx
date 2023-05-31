import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import v2 from "../../../../Assets/Videos/v2.mp4";
import { BsThreeDotsVertical } from "react-icons/bs";
import eye from "../../../../Assets/Images/eye.png";
import group from "../../../../Assets/Images/Group 716@3x.png";
import mute from "../../../../Assets/Images/Mute.png";
import kicksPageBeforeLike from "../../../../Assets/Images/Kicks before like.png";
import kicksComments from "../../../../Assets/Images/Kicks Comment.png";
import kicksShare from "../../../../Assets/Images/Kicks Share.png";
import collection from "../../../../Assets/Images/Collections.png";
import kicksLiked from "../../../../Assets/Images/KicksLike.png";
import unmute from "../../../../Assets/Images/Un-Mute.png";
import OwnUserVideoModal from "../OwnUserVideoModal";
import DeleteVideoModal from "../DeleteVideoModal";
import EditMyVideoModal from "../EditMyVideoModal";
import OtherUserVideoModal from "../OtherUserVideoModal";
import VideoCommentsModal from "../VideoCommentsModal";
import { useDispatch, useSelector } from "react-redux";
import {
  addLikes,
  deletePostLike,
  getCommentsByPostid,
} from "../../../../redux/actionCreators/kicksActionCreator";
import moment from "moment/moment";
import { startFollowing } from "../../../../redux/actionCreators/profileAction";
import { toast } from "react-toastify";
import SelectedVideoModal from "../../SearchKicksPage/SelectedVideoModal";
import { HiPlus } from "react-icons/hi";
import shortVideo from "../../../../Assets/Videos/v1.mp4";
import user from "../../../../Assets/Images/user2.png";
import "../kicks.css";
import { useEffect } from "react";
import { debounce } from "../../../Utility/utility";
import { GrWaypoint } from "react-icons/gr";
import { unfollow } from "../../../../redux/actionCreators/friendsAction";
import { select } from "@material-tailwind/react";
import { blockUser } from "../../../../redux/actionCreators/settingsActionCreator";

const VideoComponent = ({ dataList, data }) => {
  const dispatch = useDispatch();
  const reducerData = useSelector((state) => {
    return {
      profileDetail: state.profileReducer.profile,
    };
  });
  const { profileDetail } = reducerData;
  const [isMyVideo, setIsMyVideo] = useState(false);
  const [showOwnVideoModal, setShowOwnVideoModal] = useState(false);
  const [showOthersVideoModal, setShowOthersVideoModal] = useState(false);
  const [deleteVideo, setDeletetVideo] = useState(false);
  const [editVideo, setEditVideo] = useState(false);
  const [commentVideo, setCommentVideo] = useState(false);
  const [showCollection, setShowCollection] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectVideo, setSelectVideo] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isVideoPlaying, setIsvideoPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  console.log(selectVideo);
  const videoRef = useRef(null);
  // const handleButtonActions = (elem) => {
  //   if (elem.title == "mute") {
  //     console.log(isMuted, videoRef.current.muted);
  //     setIsMuted(!isMuted);
  //     videoRef.current.muted = !videoRef.current.muted;
  //   } else if (elem.title == "comments") {
  //     setCommentVideo(true);
  //   }
  // };
  const onVideoClick = () => {
    if (isVideoPlaying) {
      videoRef.current.pause();
      setIsvideoPlaying(false);
    } else {
      videoRef.current.play();
      setIsvideoPlaying(true);
    }
  };
  const [state, setState] = useState({});
  const { isMute = true } = state;
  const {
    id,
    commentcount = "",
    createddatetime,
    duration,
    image,
    isliked,
    likecount = "",
    profile,
    segment,
    shareto,
    text,
    type,
    video,
    viewcount,
    viptype,
    profileid,
  } = data;
  // console.log("main like count show", likecount)
  const name = profile?.fname + profile?.lname;
  const handleDelete = () => {
    setShowOwnVideoModal(false);
    setDeletetVideo(true);
  };

  const handleEdit = () => {
    setShowOwnVideoModal(false);
    setEditVideo(true);
  };

  const handleIsMyVideo = (data) => {
    // console.log(data)
    console.log(profileDetail);
    dispatch({
      type: "ACTIVE_POST",
      payload: data,
    });
    if (isMyVideo) {
      setShowOthersVideoModal(false);
      setShowOwnVideoModal(true);
    } else {
      setShowOthersVideoModal(true);
      setShowOwnVideoModal(false);
    }
  };

  const handleIconClick = (title) => {
    dispatch({
      type: "ACTIVE_POST",
      payload: data,
    });
    if (title === "comments") {
      dispatch(getCommentsByPostid(id));
      setCommentVideo(true);
    } else if (title === "mute") {
      setState({ ...state, isMute: !isMute });
    } else if (title === "likes") {
      // console.log("isliked", likecount)
      if (isliked) {
        // console.log("likes is called")
        dispatch({ type: "REMOVE_LIKE", payload: id });
        const payload = {
          postid: id,
          profileid: profileid,
          type: "c",
          datetime: moment().format("YYYY-MM-DDTHH:mm:ss:ms"),
        };
        dispatch(deletePostLike(id)).then((res) => {
          if (res.status) {
            toast.success(res.message);
          } else {
            toast.error(res.message);
          }
        });
      } else {
        console.log(id, "LIKKKKKKKKKKKKKKKKK+++++++++++++++++");
        dispatch({ type: "INCREASE_LIKE", payload: id });
        const payload = {
          postid: id,
          profileid: profileid,
          type: "c",
          datetime: moment().format("YYYY-MM-DDTHH:mm:ss:ms"),
        };
        // console.log("add like payload", payload)
        dispatch(addLikes(payload)).then((res) => {
          // console.log("responce of add like", res)
          if (res.status) {
            toast.success(res.message);
          } else {
            toast.error(res.message);
          }
        });
      }
    } else if (title === "follow") {
      const payload = {
        myprofileid: profileDetail?.id,
        followerprofileid: profileid,
        datetimes: moment().format("YYYY-MM-DD"),
      };
      console.log("");
      dispatch(startFollowing(payload))
        .then((res) => {
          title === "unfollo";
          console.log("followed success", res);
          // if (res?.status) {
          //   toast.success(res?.message)
          // } else {
          //   toast.error(res?.message)
          // }
        })
        .catch((err) => {
          console.log("followed denyed", err);
        });
    } else if (title === "unfollow") {
      const payload = {
        profileid: profileDetail?.id,
        friendprofileid: profileid,
      };
      dispatch(unfollow(payload))
        .then((res) => {
          console.log("unfollowed success", res);
        })
        .catch((err) => {
          console.log("unfollowed denyed", err);
        });
    }
  };

  const handleBlock = () => {
    const payload = {
      blockedid: id,
      myprofileid: profileid,
    };
    dispatch(blockUser(payload))
      .then((res) => {
        console.log("user is blocked", res);
      })
      .catch((err) => {
        console.log("user is not blocked", err);
      });
  };

  const [isVideoPlayings, setisVideoPlayings] = useState(false);

  const vidRef = useRef();

  const onVideoClick1 = () => {
    if (isVideoPlayings) {
      vidRef.current.pause();
      setisVideoPlayings(false);
    } else {
      vidRef.current.play();
      setisVideoPlayings(true);
    }
  };
  useEffect(() => {
    const scroll = document.getElementById("video-container");

    if (scroll) {
      scroll.addEventListener("scroll", () => {
        vidRef.current.pause();
      });
    } else {
      vidRef.current.play();
    }

    window.addEventListener(
      "resize",
      () => {
        const ismobile = window.innerWidth < 900;
        if (ismobile !== isMobile) setIsMobile(ismobile);
      },
      false
    );
  }, [isMobile]);
  return (
    <div key={profile?.id} className="snap-y snap-mandatory">
      <div className="">
        <section className="relative snap-y snap-mandatory justify-center flex items-center bg-black hideScroll right-0  left-0 h-1/2 w-full z-0">
          <div className="video-cards">
            <video
              className={`video-player cursor-pointer ${
                isMobile ? "w-full h-[386px]" : ""
              }`}
              loop={true}
              autoPlay="autoplay"
              muted={isMute}
              ref={vidRef}
              onClick={onVideoClick1}
              // src={video}
              src={shortVideo}
            >
              {/* <source
                // src={data?.video} type="video/mp4"
                src={video} type="video/mp4"
              /> */}
            </video>

            <div className="absolute right-[5%] bottom-[8%]">
              {/* <span >
                <label
                  onClick={() => setSelectVideo(true)}
                  htmlFor="chooseVideo"
                >
                  <HiPlus className="w-8 h-8 p-0.5 bg-[#dd8e58] cursor-pointer rounded-full text-white ml-[52px]" />
                </label>
              </span> */}
              <div className="cursor-pointer flex items-end mb-3 gap- font-semibold flex-col">
                <BsThreeDotsVertical
                  onClick={() => handleIsMyVideo(data)}
                  className="w-[27px] h-[27px] text-white"
                />
              </div>
              {dataList?.map((elem, index) =>
                (elem.title === "follow") &
                (profileid === profileDetail?.id) ? (
                  ""
                ) : (
                  <div
                    key={elem?.title}
                    onClick={() => handleIconClick(elem?.title)}
                    className="flex items-end mb-3 gap- font-semibold flex-col"
                  >
                    <img
                      src={
                        elem?.title === "likes" && isliked
                          ? kicksLiked
                          : elem?.title === "mute" && isMute
                          ? unmute
                          : elem?.img
                      }
                      alt=""
                      className="w-[30px] cursor-pointer "
                    />

                    <div className="text-[12px] text-white flex items-center mr-[12px]">
                      {elem?.title === "likes"
                        ? `${likecount}`
                        : elem?.title === "comments"
                        ? `${commentcount}`
                        : ""}
                    </div>
                  </div>
                )
              )}
              <span>
                <label
                  onClick={() => setSelectVideo(true)}
                  htmlFor="chooseVideo"
                  className="z-50"
                >
                  <HiPlus className="w-8 h-8 p-0.5 bg-[#dd8e58] cursor-pointer rounded-full text-white ml-[52px] z-50" />
                </label>
              </span>
            </div>
          </div>
        </section>

        <div
          className={`flex relative bottom-[85px] ${
            isMobile ? "bottom-[100px]" : "bottom-[85px]"
          }`}
        >
          <div className="">
            <div className="flex gap-2 items-center mb-3">
              <img src={eye} alt="" className="w-[25px] h-[15px] ml-2" />
              <p className="text-[10px]">{viewcount} Views </p>
            </div>
            <div className="flex">
              <img
                src={profile?.pimage ? profile?.pimage : user}
                alt=""
                className="w-[50px] h-[50px] rounded-full object-cover inline mr-3"
              />
              <span className="font-semibold flex items-start">
                {name ? `${profile?.fname} ${profile?.lname}` : "User"}
              </span>
            </div>
            <div className="ml-[53px] mt-[-22px]">
              <span className="px-3 py-[2px] border-white p-1 text-[10px] rounded-lg bg-white text-slate-400 mr-4">
                Adventures
              </span>
              <span className="text-[10px] font-medium">5 hours ago</span>
            </div>
          </div>
        </div>
      </div>
      {/* <ReactPlayer url='https://www.youtube.com/watch?v=vNeN13EQbqk' /> */}

      {/* For profile picture */}

      {/* For Username and time when he created the video and views */}

      {/* For creating mute, likes, comments and share */}

      {showOwnVideoModal && (
        <OwnUserVideoModal
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          onClose={() => setShowOwnVideoModal(false)}
        />
      )}
      {showOthersVideoModal && (
        <OtherUserVideoModal
          handleBlock={handleBlock}
          onClose={() => setShowOthersVideoModal(false)}
        />
      )}
      {editVideo && <EditMyVideoModal onClose={() => setEditVideo(false)} />}
      {deleteVideo && (
        <DeleteVideoModal onClose={() => setDeletetVideo(false)} />
      )}
      {commentVideo && (
        <VideoCommentsModal onClose={() => setCommentVideo(false)} />
      )}

      {selectVideo && (
        <SelectedVideoModal
          selectedVideo={selectedVideo}
          onClose={() => setSelectVideo(false)}
        />
      )}
    </div>
  );
};

export default VideoComponent;
