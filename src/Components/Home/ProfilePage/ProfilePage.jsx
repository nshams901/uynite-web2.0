import React, { useState } from "react";
import ProfileImageSection from "./ProfileImageSection/ProfileImageSection";
import CategorySection from "../CategorySection/CategorySection";
import PostForm from "../PostForm/PostForm";
import PostContent from "../PostContetnt/PostContent";
import AboutSection from "./AboutSection/AboutSection";
import PrivatePage from "./PrivatePage/PrivatePage";
import GridBoxes from "../GridBoxes/GridBoxes";
import SearchComponent from "../SearchComponent/SearchComponent";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkFriend, getEducationDetail, getFollower, getFollowing, getFriendProfile, getProfileById, updateProfile } from "../../../redux/actionCreators/profileAction";
import { getUserDataFromLocalStorage, toasterFunction } from "../../Utility/utility";
import { useMemo } from "react";
import { checkingIsEmailExist } from "../../../redux/actionCreators/authActionCreator";
import { userData } from "../dataList";

import { getFriendsList, getOwnFriendsList } from "../../../redux/actionCreators/friendsAction";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import PostCard from "../PostContetnt/PostCard/PostCard";
import { createPost } from "../../../redux/actionCreators/postActionCreator";
import moment from "moment";
import { getUserPostsList, imageUploadApi } from "../../../redux/actionCreators/rootsActionCreator";
import { getPrivacyDetail } from "../../../redux/actionCreators/profileAction"
import { AiOutlineEyeInvisible } from 'react-icons/ai'
const ProfilePage = ({ isOthers }) => {
  const [selectedOption, setSelectedOption] = useState("Posts");
  const [privacyType, setPrivacyType] = useState('Public')
  const dispatch = useDispatch();
  const params = useParams();
  const data = [
    { title: "Posts" },
    { title: "Photos" },
    { title: "Videos" },
    { title: "Kicks" },
  ];

  const reducerData = useSelector((state) => {
    return {
      following: state?.profileReducer?.following,
      followers: state?.profileReducer?.followers,
      friends: state?.friendReducer?.friends,
      myFriendsList: state?.friendReducer?.myFriendsList,
      profileDetail: state?.profileReducer?.profileDetail?.data,
      friendDetail: state.profileReducer.friendDetail,
      profile: state.profileReducer.profile,
      privacyDetails: state?.profileReducer?.privacyDetails,      
    }
  });
  const { following, followers, friends, friendDetail, 
          profile, privacyDetails,  myFriendsList} = reducerData;

  const isOther = isOthers && params?.id !== profile?.id

  const user = useMemo(() => {
    return  isOther ? { id: params?.id} : profile;
  }, [isOther, params.id])

  const isFriend = myFriendsList?.some(data => data?.friend?.friendprofileid == params?.id);


  const isPersonal = isOther ? friendDetail?.profiletype === 'Personal' : profile?.profiletype === "Personal";
  const [state, setState ] = useState({})
  const { coverImg, profileImg, showEditModal} = state
  useEffect(() => {
    window.scrollTo(0, 0)
     isPersonal ? getEducation(): '';
     
     dispatch(getOwnFriendsList(profile?.id))
     dispatch(getUserPostsList(user?.id));
     if(privacyDetails) setPrivacyType(privacyDetails?.viewprofile)
     if(isOther){
      dispatch(getPrivacyDetail(params?.id));
      dispatch(getFriendProfile(user?.id)).then((res) => {
           const payload ={
             ownProfileId: profile?.id,
             othersProfileId: user?.id,
           }
    
           dispatch(checkFriend(payload))
        });
        // dispatch(getUserPostList(user?.id));
    }
    dispatch(getFollowing(user?.id));
    dispatch(getFollower(user?.id));
    dispatch(getFriendsList(user?.id));
    // dispatch

  }, []);


  function getEducation (){
    dispatch(getEducationDetail(user?.id))
  }

  const BasedOnPrivacy = ()=>{
    if(privacyType){
      if(privacyType == 'Public'){
        return <AboutSection isOther={isOther} data={isOther ? friendDetail : profile} />
      }else if(privacyType == 'Friends' && isFriend){
        return <AboutSection isOther={isOther} data={isOther ? friendDetail : profile} />
      }else{
        return (
        <div className='w-[95%] relative lg:w-[80%] xl:w-[70%] flex justify-center flex-col items-center'>
          <AiOutlineEyeInvisible className='absolute left-[40%] text-gray-300 h-32 w-32'/>
          <div className='my-6 text-2xl text-gray-600 z-10'>This Account is Private</div>
          <div className='text-gray-600 z-10'>Profile view hidden by {friendDetail?.fname}</div>
        </div>)
      }
    }
  }

  const ContentBasedOnPrivacy = ()=>{
    if(privacyType){
      if(privacyType == 'Public'){
        return <GridBoxes selectedOption={selectedOption} isOther={isOther} />
      }else if(privacyType == 'Friends' && isFriend){
        return <GridBoxes selectedOption={selectedOption} isOther={isOther} />
      }else{
        return (
        <div className='w-[95%] relative lg:w-[80%] xl:w-[70%] flex justify-center flex-col items-center'>
          <AiOutlineEyeInvisible className='absolute left-[40%] text-gray-300 h-32 w-32'/>
          <div className='my-6 text-2xl text-gray-600 z-10'>This Account is Private</div>
          <div className='text-gray-600 z-10'>Profile view hidden by {friendDetail?.fname}</div>
        </div>)
      }
    }
  }
  
  return (
    <div className="w-full flex flex-col sm:flex-row justify-evenly bg-[#E4E7EC] mt-2">
      <section className="flex sm:w-[50%] flex-col mt-2 items-center lg:items-end">
        <ProfileImageSection
          data={ isOther ? friendDetail : profile }
          friends={friends}
          following={following}
          followers={followers}
          coverImg={coverImg}
          profileImg={profileImg}
          isOther={isOther}
          isPersonal={isPersonal}
        />

        {/* About Section */}        
        <BasedOnPrivacy />        
      </section>
      <section className="flex sm:w-[50%] flex-col items-center">
        {/* Category Section */}
        <section className="w-full sm:w-[90%] flex items-center justify-between">
          <CategorySection
          data={data}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </section>

        <section className="w-full mt-3 rounded-xl flex justify-center sm:w-[92%] lg:w-full xl:w-[93%]">
          <ContentBasedOnPrivacy />
        </section>
      </section>
    </div>
  );
};

export default ProfilePage;
