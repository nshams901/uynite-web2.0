import React, { useEffect } from "react";
import user from '../../../Assets/Images/user.png'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { inviteMember } from "../../../redux/actionCreators/unionActionCreator";
import { toast } from "react-toastify";

const UnionsFriendsList = ({ item }) => {
  const dispatch = useDispatch()
  const {fname, lname, pimage, id} = item?.profile;
  const relation = [ item.friend.classment && 'classmate', item.friend.collgues && 'officemate', item.friend.relative && 'relative']

  const reducerData = useSelector((state) => {
    return {
      activeUnion : state.rootsReducer.activePost
    }
  } );
  const { activeUnion } = reducerData
  useEffect(() => {

  }, []);

  const handleInvite = () => {
    const payload = {
      "groupId":activeUnion?.groupId,
      "groupName": activeUnion?.groupName,
      "profileId": id
    }
    dispatch(inviteMember(payload)).then((res) => {
      if(res?.status){
        toast.success(res.message)
      }else {
        toast.error(res?.message)
      }
    })
  }
  return (
    <div className="flex  items-center w-full hover:bg-gray-300 px-3 py-1 rounded-md">
      <Link className="">
        <img
          src={pimage || user}
          alt=""
          className="w-[35px] h-[35px] sm:w-[45px] sm:h-[45px] rounded-full"
        />
      </Link>
      <Link className=" flex flex-1 flex-col justify-center ml-4">
        <span className="font-bold text-xs sm:text-sm">{ fname || "" } { lname || "" }</span>
        <em>
          <p className="text-[9px] sm:text-[10px] font-bold text-gray-500">
            { relation?.map((item) => <span>{item ? item+ ", " : ""} </span>)}
          </p>
        </em>
      </Link>

      <div className="flex gap-2 items-center cursor-pointer">
        <button
          className="px-5 bg-blue-500 text-white font-bold py-2 text-[10px] sm:text-xs rounded-lg"
          onClick={ handleInvite }
        >
          Invite +
        </button>
      </div>
    </div>
  );
};

export default UnionsFriendsList;
