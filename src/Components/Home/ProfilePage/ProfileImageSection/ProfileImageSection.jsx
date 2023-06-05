import React, { useState } from "react";
import { createPortal } from "react-dom";
import { BsCamera, BsPeopleFill } from "react-icons/bs";
import { FaWalking } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import FollowersModal from "../../Modal/FollowersModal/FollowersModal";
import Portals from "../../../Portals/Portals";
import { useDispatch } from "react-redux";
import {
  getFollower,
  getFollowing,
} from "../../../../redux/actionCreators/profileAction";
import {
  getFriendsList,
  removeFollowers,
  removeFriend,
  unfollow,
} from "../../../../redux/actionCreators/friendsAction";
import { toast } from "react-toastify";
import User from "../../../../Assets/Images/user.png";
import { Typography } from "@material-tailwind/react";
import ImageModal from "../../../common/ImageModal";
import { useNavigate } from "react-router-dom";

const ProfileImageSection = ({
  isOther,
  data = {},
  following,
  followers,
  friends,
  uploadImage,
  coverImg,
  profileImg,
  isPersonal
}) => {
  const navigate = useNavigate()
  const { id } = data || {};
  const friendsCount = friends?.length || 0;
  const followingCount = following?.length || 0;
  const followersCount = followers?.length || 0;

  const userName = data?.fname + data?.lname;

  const [state, setState] = useState({});
  const { showModal, modalName, modalData, coverImgModal, profileImgModal } = state;
  const dispatch = useDispatch();

  const handleModal = async (name) => {
    if (name === "Friends") {
      navigate('/myfriend')
    } else if (name === "Followers") {
      dispatch(getFollower(id));
      setState({
        ...state,
        showModal: true,
        modalName: name,
        modalData: followers,
      });
    } else if (name === "Following") {
      dispatch(getFollowing(id));
      setState({
        ...state,
        showModal: true,
        modalName: name,
        modalData: following,
      });
    }
  };
  const handleRemove = (friend) => {
    const payload = {
      profileid: id,
      friendprofileid: friend?.profile?.id || friend?.id,
    };
    dispatch(
      modalName === "Friends"
        ? removeFriend(payload)
        : modalName === "Following"
        ? unfollow(payload)
        : modalName === "Followers"
        ? removeFollowers(payload)
        : { type: "" }
    ).then((res) => {
      if (res?.status) {
        dispatch(
          modalName === "Friends"
            ? getFriendsList(id)
            : modalName === "Following"
            ? getFollowing(id)
            : modalName === "Followers"
            ? getFollower(id)
            : { type: "" }
        ).then((res) => {
          if (res.status) {
            setState({ ...state, modalData: res.data });
          }
        });
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    });
  };

  return (
    <div className="w-[95%] lg:w-[80%] xl:w-[70%] bg-white rounded-xl flex flex-col items-center mb-3">
      {/*Cover Image Section */}
      <label
        onClick={() => setState({...state, coverImgModal: true})}
        className="w-[95%] h-[100px] cursor-pointer sm:h-[150px] lg:h-[200px] rounded-xl flex items-center justify-center mt-3 border border-gray-400"
      >
        {coverImg || data?.pcoverimage ? (
          <img
            src={coverImg || data?.pcoverimage}
            alt=""
            className="w-full h-full rounded-xl border border-gray-400 object-cover"
          />
        ) : (
          <BsCamera size={28} className="text-gray-600" />
        )}
      </label>

      {/* Profile Image Section  */}
      <section className="w-[95%] my-2 rounded-xl flex flex-col">
        <div className="flex sm:h-[90px] lg:h-[140px] justify-between items-center">
          <label
            onClick={() => {
              setState({...state, profileImgModal: true})
            }}
            className="sm:min-w-[180px] sm:h-[180px] min-w-[125px] h-[125px] relative top-[-30px] sm:top-[-60px] lg:top-[-40px]"
          >
            <img
              src={profileImg || data?.pimage || User}
              alt=""
              className="w-full bg-white h-full cursor-pointer border-2 border-gray-500 rounded-full ml-1 object-cover"
            />
          </label>

          {/* Follower Following and Friends Section */}
          <section
            className=" flex flex-col w-[40%] sm:w-[45%] items-center cursor-pointer"
            onClick={() => handleModal("Friends")}
          >
            <BsPeopleFill
              alt=""
              className="w-6 h-6 sm:w-7 sm:h-7 text-[#7991bd] py-0.5"
            />
            <Typography variant='small' >Friends</Typography>
            <span className="w-[90%] text-center sm:w-[97%] font-bold text-[7px] sm:text-[9px] xl:text-[11px] my-1 py-[1px] bg-gray-300 px-4  rounded-md">
              {friendsCount}
            </span>
          </section>

          <section
            className=" flex flex-col w-[40%] sm:w-[45%] items-center cursor-pointer"
            onClick={() => handleModal("Followers")}
          >
            <FaWalking
              alt=""
              className="w-6 h-6 sm:w-7 sm:h-7 text-[#7991bd] py-0.5"
            />
            <Typography variant='small' >Followers</Typography>
            <span className="text-center w-[90%] sm:w-[97%] font-bold text-[7px] sm:text-[9px] xl:text-[11px] my-1 py-[1px] bg-gray-300 px-3 sm:px-4 rounded-md">
              {followersCount} 
            </span>
          </section>

          <section
            className=" flex flex-col w-[40%] sm:w-[45%] items-center cursor-pointer"
            onClick={() => handleModal("Following")}
          >
            <IoIosPeople className="w-6 h-6 sm:w-7 sm:h-7 text-[#7991bd] py-0.5" />
            <Typography variant='small' >Following</Typography>
            <span className="w-[90%] sm:w-[97%] text-center font-bold text-[7px] sm:text-[9px] xl:text-[11px] my-1 py-[1px] bg-gray-300 px-3 sm:px-4 rounded-md">
              {followingCount} 
            </span>
          </section>
        </div>
        <div className="flex gap-2 items-center mb-3 mt-1">
        {
          isPersonal ? 
          <span className="font-bold sm:text-xl lg:text-2xl flex items-center justify-center">{`${
            userName ? `${data?.fname} ${data?.lname || ""}` : "User"
          }`}</span>
          :
          <span className="font-bold sm:text-xl lg:text-2xl flex items-center justify-center">{`${
            userName ? `${data?.personalname || ""} ${data?.personalLastName|| ""}` : "User"
          }`}</span>
        }
          <span className=" text-xs lg:text-sm font-medium text-gray-700  2xl:text-[20px] flex items-center justify-center">
            {data?.job ? `@${data?.job}` : ""}
          </span>
        </div>
      </section>
      {/* {
        showModal && createPortal(<FollowersModal modalName={`Your ${modalName}`} data={friends}/>, document.getElementById('root'))
      } */}
      {showModal && (
        <Portals closeModal={() => setState({ ...state, showModal: false })}>
          <FollowersModal
            handleClick={handleRemove}
            modalName={modalName }
            emptyMessage={`No ${modalName}`}
            data={modalData}
            closeModal={() => setState({...state, showModal: false})}
          />
        </Portals>
      )}

      {
        (coverImgModal || profileImgModal) &&
        <Portals closeModal={() => setState({...state, coverImgModal: false, profileImgModal: false})}>

        <ImageModal
          closeModal={() => setState({...state, coverImgModal: false, profileImgModal: false})}
          profileImgModal={ profileImgModal}
          handleImage={uploadImage}
          file={profileImgModal ? (profileImg|| data?.pimage) : (coverImg || data?.pcoverImg)}
          leftBtn={'Remove'}
        />
        </Portals>
      }
    </div>
  );
};

export default ProfileImageSection;
