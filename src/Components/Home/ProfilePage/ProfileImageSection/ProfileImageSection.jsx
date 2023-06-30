import React, { useState } from "react";
import { createPortal } from "react-dom";
import { BsCamera, BsPeopleFill } from "react-icons/bs";
import { FaWalking } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import FollowersModal from "../../Modal/FollowersModal/FollowersModal";
import Portals from "../../../Portals/Portals";
import { useDispatch, useSelector } from "react-redux";
import {
  getFollower,
  getFollowing,
  getProfileById,
  startFollowing,
  updateProfile,
} from "../../../../redux/actionCreators/profileAction";
import {
  addFriend,
  checkFriends,
  getFriendsList,
  removeFollowers,
  removeFriend,
  unfollow,
  updateFriendProfileId,
} from "../../../../redux/actionCreators/friendsAction";
import { toast } from "react-toastify";
import User from "../../../../Assets/Images/user.png";
import { Typography } from "@material-tailwind/react";
import ImageModal from "../../../common/ImageModal";
import { useNavigate } from "react-router-dom";
import { imageUploadApi } from "../../../../redux/actionCreators/rootsActionCreator";
import { createPost } from "../../../../redux/actionCreators/postActionCreator";
import alreadyFrnd from '../../../../Assets/Images/acceptFriendRequest.png';
import addFrnd from '../../../../Assets/Images/SendFriendRequest.png'
import moment from "moment";
import { useParams } from "react-router"
import ConfirmationModal from "../../../common/ConfirmationModal";
import { useMemo } from "react";
import ChangeRelationshipModal from "../../Modal/ChangeRelationshipModal/ChangeRelationshipModal";

const ProfileImageSection = ({
  isOther,
  data,
  following,
  followers,
  friends,
  isPersonal
}) => {
  const navigate = useNavigate()
  const { id } = data || {};
  const friendsCount = friends?.length || 0;
  const followingCount = following?.length || 0;
  const followersCount = followers?.length || 0;
  const { profile }  = useSelector((state) => state.profileReducer );
  const { friendProfileId }  = useSelector((state) => state.friendReducer );
  const { myUnionList: unionList } = useSelector((state) => state.unionReducer)

  const userName = data?.fname + data?.lname;

  const [state, setState] = useState({});
  const { showModal, modalName, modalData, coverImgModal, confirmationModal,
    profileImgModal, profileImg, coverImg, isFriends, handleAddFriendModal, relationOptions,
   } = state;
  const dispatch = useDispatch();
  const params = useParams();

  const handleModal = async (name) => {
    if (name === "Friends") {
      dispatch(updateFriendProfileId(params?.id))
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
    if (name === "Friends") {
      console.log('remove ma')
      const friendProfileId = params?.id
    }
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

  const handleImage = async (profile, value) => {
    if (value === 'delete') {
      const files = new File([""], 'empty')
      if (profile) {
        setState({ ...state, profileImg: files })
      } else {
        setState({ ...state, coverImg: files })
      }
    } else {
      setState({ ...state, [profile]: value[0] })
    }

  }

  const handleSavePic = async (profilePic) => {
    const uploadResponse = await dispatch(imageUploadApi(profileImgModal ? profileImg : coverImg))
    if(!uploadResponse?.status){
      return toast.error(uploadResponse?.status)
    }
    const userid = localStorage.getItem('userCredential')?.id
    if (!profilePic) {
      let payloads = { ...data, state: data?.state || "", pcoverimage: uploadResponse.path }
      dispatch(updateProfile(payloads)).then((res) => {
        if (res?.status) {
          // dispatch(getProfileById(userid))
          handleCreatePost(uploadResponse?.path, profilePic)
          toast.success(res?.message)
        } else {
          toast.error(res?.message)
        }
      })
    } else {
      let payloads = { ...data, state: data?.state || "", pimage: uploadResponse.path, };
      dispatch(updateProfile(payloads)).then((res) => {
        if (res?.message) {
          // dispatch(getProfileById(userid))
          handleCreatePost(uploadResponse?.path, profilePic)
          toast.success(res?.message)
        } else {
          toast.error(res?.message)
        }
      });
    }
    setState({ ...state, coverImgModal: false, profileImgModal: false })
  }
console.log(relationOptions, "KKKKKKK");
  const handleCreatePost = (img, isProfile) => {
    const payload = {
      shareto: '',
      type: "personal",
      template: "template1",
      image: img,
      text: isProfile ? 'profile pic' : 'cover pic',
      suggesttemp: "sugest1",
      utag: null,
      delete: false,
      close: "close",
      profileid: id,
      city: '',
      viptype: isProfile ? 5 : 6,
      postdatetime: new Date().getTime(),
      createdatetime: new Date().getTime()
    };
    dispatch(createPost(payload))
  }

  const handleAddFriend = () => {
    const { fname, lname } = profile;
    const userCredential = JSON.parse(localStorage.getItem('userCredential'));

    const payloads = {
      myprofileid: profile?.id,
      followerprofileid: id,
      datetimes: moment().format("YYYY-MM-DDTHH:mm:ss"),
    };
    dispatch(startFollowing(payloads));

    let payload = {
      id: profile?.id,
      fname: fname,
      lname: lname,
      friendprofileid: id,
      friendtype: "Friend",
      profileid: id,
      requesttype: "Send",
      isFriend: "true",

      isFriend: true,
      party: "",
      groupsUpdate: [],
      userid: userCredential.id,
      reqdatetime: new Date().getTime(),
    };
    dispatch(addFriend(payload)).then((res) => {
      if (res.status) {
        toast.success(res?.message);
        // setState({ ...state, requestModal: false });
      } else {
        toast.error(res?.message);
      }
    });
  }

  const addFollowing = () => {
    const payloads = {
      myprofileid: profile?.id,
      followerprofileid: id,
      datetimes: new Date().getTime(),
    };
    dispatch(startFollowing(payloads)).then((res) => {
      setState({ ...state, confirmationModal: false})
    })
  }

  
  const options = useMemo(async () => {
    const union = unionList.map((item) => ({
      name: item.groupName,
      key: item.groupId,
      union: true
    }));

    const forPersonalAcc = [
      { name: "Friends", key: "friend", checked: true, disable: true },
      { name: "Relative", key: "relative", checked: false },
      { name: "Classmate", key: "classmate", checked: false },
      { name: "Officemate", key: "officemate", checked: false },
      ...union,
    ];
    const forOrgAcc = [
      { name: "Friend", key: "friend", checked: true, disable: true },
      ...union,
    ];
    setState({ ...state, relationOptions: isPersonal ? forPersonalAcc : forOrgAcc })
  }, [unionList]);

  
  const handleRelation = (e) => {
    const name = e.target.name;
    const value = e.target.checked;
    // console.log(name, value);
    const selected = relationOptions.map((item) => {
      return item?.name === name ? { ...item, checked: value } : item;
    });
    setState({ ...state, relationOptions: selected });
  };

  const handleSendRequest = () => {
    const { id, fname, lname } = profile || {};
    const payloads = {
      myprofileid: profile?.id,
      followerprofileid: id,
      datetimes: new Date().getTime(),
    };
    dispatch(startFollowing(payloads));
    const relationData = relationOptions.flatMap((item) =>
      item.checked ? item.key : false
    );
    const userCredential = JSON.parse(localStorage.getItem('userCredential'));
    const group = relationOptions?.filter((item) => item.union);

    let payload = {
      id: profile?.id,
      fname: fname,
      lname: lname,
      friendprofileid: data.id,
      friendtype: "Friend",
      profileid: profile?.id,
      requesttype: "Send",

      classment: relationData.includes("classmate"),
      collgues: relationData.includes("officemate"),
      relative: relationData.includes("relative"),

      isFriend: true,
      party: "",
      groupsUpdate: group?.map((item) => (
        {
          groupId: item.key,
          groupName: item.name,
          isAdd: !!item.checked,
          isRemove: false,
          profileid: data.id
        }
      )),
      userid: userCredential.id,
      reqdatetime: new Date().getTime(),
    };
    dispatch(addFriend(payload)).then((res) => {
      if (res.status) {
        toast.success(res?.message);
        setState({ ...state, handleAddFriendModal: false });
      } else {
        toast.error(res?.message);
      }
    });
  };

  return (
    <div className="w-[95%] lg:w-[80%] xl:w-[70%] bg-white rounded-xl flex flex-col items-center mb-3">
      {/*Cover Image Section */}
      <label
        onClick={() => !isOther && setState({ ...state, coverImgModal: true })}
        className="w-[95%] h-[100px] cursor-pointer sm:h-[150px] lg:h-[200px] rounded-xl flex items-center justify-center mt-3 border border-gray-400"
      >
        {coverImg || data?.pcoverimage ? (
          <img
            src={coverImg?.type ? URL.createObjectURL(coverImg) : data?.pcoverimage}
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
            onClick={() => !isOther && setState({ ...state, profileImgModal: true })}
            className="sm:min-w-[180px] sm:h-[180px] min-w-[125px] h-[125px] relative top-[-30px] sm:top-[-60px] lg:top-[-40px]"
          >
            <img
              src={profileImg?.type ? URL.createObjectURL(profileImg) : (data?.pimage || User)}
              alt=""
              className="w-full bg-white h-full cursor-pointer border-2 border-gray-500 rounded-full ml-1 object-cover"
            />
          </label>

          {/* Follower Following and Friends Section */}
          {isOther ?

            <section
              className=" flex flex-col w-[40%] sm:w-[45%] items-center cursor-pointer"
              onClick={() => !isOther && handleModal("Friends")}
            >
            {
              data?.isFriend ? 
              <img className="w-6 h-6" src={ alreadyFrnd }/>
              : <img onClick={() => setState({ ...state, handleAddFriendModal: true})} className="w-6 h-6" src={ addFrnd }/>
            }
              <Typography variant='small' >Friends</Typography>
              <span className="w-[90%] text-center sm:w-[97%] font-bold text-[7px] sm:text-[9px] xl:text-[11px] my-1 py-[1px] bg-gray-300 px-4  rounded-md">
                {friendsCount}
              </span>
            </section>
            
            :
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
            </section>}

          <section
            className=" flex flex-col w-[40%] sm:w-[45%] items-center cursor-pointer"
            
          >
            <FaWalking
              alt=""
              className="w-6 h-6 sm:w-7 sm:h-7 text-[#7991bd] py-0.5"
              onClick={ () =>setState({ ...state, confirmationModal: true}) }
            />
            <Typography variant='small' >Followers</Typography>
            <span
            onClick={() => handleModal("Followers")} 
            className="text-center w-[90%] sm:w-[97%] font-bold text-[7px] sm:text-[9px] xl:text-[11px] my-1 py-[1px] bg-gray-300 px-3 sm:px-4 rounded-md">
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
              <span className="font-bold sm:text-xl lg:text-2xl flex items-center justify-center">{`${userName ? `${data?.fname} ${data?.lname || ""}` : "User"
                }`}</span>
              :
              <span className="font-bold sm:text-xl lg:text-2xl flex items-center justify-center">{`${userName ? `${data?.fname || ""} ${data?.lname || ""}` : "User"
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
     { console.log(modalName)}
      {showModal && (
        <Portals closeModal={() => setState({ ...state, showModal: false })}>
          <FollowersModal
            isOther={isOther}
            handleClick={handleRemove}
            modalName={modalName}
            emptyMessage={`No ${modalName}`}
            data={modalData}
            closeModal={() => setState({ ...state, showModal: false })}
          />
        </Portals>
      )}

      {
        (coverImgModal || profileImgModal) &&
        <Portals closeModal={() => setState({ ...state, coverImgModal: false, profileImgModal: false })}>

          <ImageModal
            closeModal={() => setState({ ...state, coverImgModal: false, profileImgModal: false })}
            profileImgModal={profileImgModal}
            handleImage={handleImage}
            file={profileImgModal ? (profileImg || data?.pimage) : (coverImg || data?.pcoverImg)}
            leftBtn={'Remove'}
            rightBtn={'Save'}
            handleSave={handleSavePic}
          />
        </Portals>
      }
      {
        confirmationModal &&
        <Portals>
          <ConfirmationModal
            message={'Do you want to follow ?'}
            button={'Yes'}
            closeModal={() => setState({ ...state, confirmationModal: false})}
            handleAccept={ addFollowing }
          />
        </Portals>
      }
      
        { handleAddFriendModal && (
        <Portals closeModal={() => setState({ ...state, handleAddFriendModal: false})}>
          <ChangeRelationshipModal
            relationOption={relationOptions}
            handleRelation={handleRelation}
            handleSendRequest={handleSendRequest}
            button="Send Request"
            title="Wanna send Friend Request"
            closeModalOption={() => setState({ ...state, handleAddFriendModal: false})}
          />
        </Portals>
      )}

    </div>
);
};

export default ProfileImageSection;
