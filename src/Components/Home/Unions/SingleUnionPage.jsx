import React, { useState } from "react";
import UnionMembers from "./UnionMembers";
import { useDispatch, useSelector } from "react-redux";
import { unionsMembersTab } from "../../../redux/actionCreators/userActionCreator";
import { useEffect } from "react";
import { getInviteeList, getUnionMembers, removeUserFromUnion } from "../../../redux/actionCreators/unionActionCreator";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import unionIcon from '../../../Assets/Images/unionIcon.png'
import { getProfileDetails } from "../../../redux/actionCreators/profileAction";
import user from '../../../Assets/Images/user.png'

const SingleUnionPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { unionMembersTab } = useSelector((state) => state.userReducer);
  const reducerData = useSelector((state) => {
    return {
      memberList: state.unionReducer.unionMemberList,
      unionInviteeList: state.unionReducer.unionInviteeList,
      activeUnion : state.rootsReducer.activePost,
      profile: state.profileReducer.profile,
    }
  });
  const { profile, activeUnion, memberList, unionInviteeList } = reducerData;

  const [state, setState] = useState({})
  const { adminDetails } = state

  useEffect(() => {
    dispatch(getUnionMembers(activeUnion?.groupId))
    dispatch(getInviteeList(activeUnion?.groupId))
    dispatch(getProfileDetails(activeUnion.profileId)).then((res) => {
      if(res.status){
        setState({ ...state, adminDetails: res.data})
      }
    })
  }, [])
  const onUnionMembersTabSelected = (option) => {
    if(option === 'Invited Members'){
      dispatch(getInviteeList(activeUnion?.groupId))
    }else {
      dispatch(getUnionMembers(activeUnion?.groupId))
    }
    dispatch(unionsMembersTab(option));
  };

  const handleRemove = (item) => {
    // console.log(item);
    const payload = {
      groupId: activeUnion?.groupId,
      profileId: item?.profileId
    }
    dispatch(removeUserFromUnion(payload)).then((res) => {
      if(res?.status){
        dispatch(getInviteeList(activeUnion?.groupId));
        dispatch(getUnionMembers(activeUnion?.groupId))
        toast.success(res.message)
      }else {
        toast.error(res.message)
      }
    })

  }

  const membersTab = ["Members", "Invited Members"];
  return (
    <div className="w-[95%] sm:w-[50%] lg:w-[40%] bg-white mx-auto flex flex-col items-center gap-2 px-4 h-[89%] mt-1">
      <div className="flex gap-2 w-full py-2 mb-2">
        <img src={unionIcon} alt="" className="w-[40px] h-[40px]" />
        <div className="flex-col flex flex-1">
          <h1 className="text- font-bold">{activeUnion?.groupName}</h1>
          <p className="text-gray-500 text-[10px]">
            {activeUnion?.count} Joined
          </p>
        </div>
        <button
          className="px-5 bg-blue-400 text-white font-bold text-[10px] rounded-lg"
          onClick={() => navigate("/unions-searchlist")}
        >
          Invite +
        </button>
      </div>

      <div className="w-full flex items-center">
        <div className="">
          <img
            src={ adminDetails?.pimage || user }
            alt=""
            className="w-[35px] h-[35px] sm:w-[45px] sm:h-[45px] rounded-full object-cover"
          />
        </div>
        <div className=" flex flex-1 flex-col justify-center ml-4">
          <span className="font-bold text-xs sm:text-sm">
            {adminDetails?.fname || ""} { adminDetails?.lname || ""}
          </span>
          <em>
            <p className="text-[9px] sm:text-[10px]  font-bold text-green-700">
              Admin
            </p>
          </em>
        </div>
      </div>

      <div className="flex justify-center gap-5 w-full px-2">
        {membersTab?.map((elem) => (
          <button
            key={elem}
            className="w-1/2 bg-blue-500 text-white font-bold py-2 my-3 text-[10px] sm:text-xs rounded-lg"
            style={{
              backgroundColor: unionMembersTab === elem ? "#3b82f6" : "#6f6f6f",
            }}
            onClick={() => {
              onUnionMembersTabSelected(elem)
              }}
          >
            {elem}
          </button>
        ))}
      </div>

      <div className="w-full h-full overflow-y-scroll mb-2 flex flex-col gap-3">
        {unionMembersTab === "Members" &&
          memberList?.map((item) => (
            <UnionMembers
              data={item}
              button="Remove"
              handleRemove={() => handleRemove(item)}
            />
          ))}

        {unionMembersTab === "Invited Members" &&
          unionInviteeList?.map((item) => (
            <UnionMembers
              data={item}
              button="Cancel"
              handleRemove={() => handleRemove(item)}
            />
          ))}
      </div>
    </div>
  );
};

export default SingleUnionPage;
