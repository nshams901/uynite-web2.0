import React, { useState } from "react";
import PostForm from "../PostForm/PostForm";
import FriendList from "../FriendList/FriendList";
import SearchComponent from "../SearchComponent/SearchComponent";
import SelectDropdown from "./SelectDropdown";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { isEmpty } from "../../Utility/utility";
// import { getFriendsList } from "../../../redux/actionCreators/profileAction";
import EmptyComponent from "../../empty component/EmptyComponent";
import {
  getFriendsList,
  getTypeOfFriends,
  updateFriendProfileId,
} from "../../../redux/actionCreators/friendsAction";
import Locations from "../../googlemap/Locations";
import Dropdown from "../../Login/Content/Modal/Dropdown";
import { useMemo } from "react";
import DropdownComp from "../../common/DropdownComp";
import { getMyUnion } from "../../../redux/actionCreators/unionActionCreator";
import globe from '../../../Assets/Images/globe.png';
import home from '../../../Assets/Images/home.png';
import friend from '../../../Assets/Images/friendsIcon.png';
import union from '../../../Assets/Images/unionIcon.png';
import books from '../../../Assets/Images/books.png';
import person from '../../../Assets/Images/personIcon.png'


const MyFriendsPage = () => {

  const dispatch = useDispatch();
  const { friendProfileId }  = useSelector((state) => state.friendReducer )

  const reducerData = useSelector((state) => {
    return {
      // following: state?.profileReducer?.following,
      // followers: state?.profileReducer?.followers,
      // friends: state?.profileReducer?.friends?.data,
      friends: state.friendReducer.friends,
      profile: state.profileReducer.profile,
      unionList: state.unionReducer.myUnionList
    };
  });
  const { following, followers, friends, profile, unionList } = reducerData;
  const [state, setState] = useState({});
  const { relation = { name: "All", key: "all" }, friendList = friends} = state;
  const isPersonal = profile.profiletype === 'Personal'
  console.log(friendProfileId)
  useEffect(() => {
    const profileid = friendProfileId ? friendProfileId : JSON.parse(localStorage.getItem("profile"))?.id;
    dispatch(getFriendsList(profileid));
    dispatch(getMyUnion(profileid))
    dispatch(getTypeOfFriends(profileid));

    return ()=>{
      dispatch(updateFriendProfileId(null))
    }
  }, [friendProfileId]);
  // console.log(isEmpty(friends), "CHHHH", friends);
  const option = useMemo(() => {
     const unions = unionList.map((item) => ({name: item.groupName, key: item.groupId, icon: union}))
    const forPersonalAcc = [
      { name: 'All', key: 'all', icon: globe},
      { name: "Friends", key: "friends", icon: friend },
      { name: "Relatives", key: "relatives", icon: home },
      { name: "Classmates", key: "classmates", icon: books },
      { name: "Officemates", key: "officemates", icon: person },
      ...unions
    ];
    const forOrgAcc = [
      { name: "Friends", key: "friends" },
      ...unions
    ];
    return {
      filterOptions: isPersonal ? forPersonalAcc : forOrgAcc,
    };
  }, [unionList]);

  const handleChange = (name, value) => {
    setState({ ...state, [name]: value });
  };
  const { filterOptions } = option;

  const searchFriend = (e) => {
    const { value} = e.target;
    const filteredList = friends.filter((item) => {
      const friend = item?.profile;
      const name = `${friend.fname ? friend.fname : ""} ${friend.lname ? friend.lname: ""}`.toLowerCase()
      return name.includes(value)
    })
    setState({...state, friendList: filteredList })
  }
  const handleFilter = (value) => {
    const key = value.key === 'relatives' ? 'relative' : value.key === "classmates" ?
    'classment' : value.key === 'officemates' ? 'collgues' : value.key === 'friends' ? 'isFriend'  : "id"
    const filteredList = friends?.filter((item) => {
      return item.friend[key]
    });
    setState(prev => ({...prev, friendList: filteredList, relation: value}))
  }
  return (
      <div className="w-[95%] sm:w-[50%] lg:w-[40%] bg-white text-black mt-1 mx-auto">
        <section className="flex gap-2 px-2 items-center flex-col-reverse lg:flex-row ">
          <div className="w-full flex">
            <DropdownComp
              label="View by"
              options={filterOptions}
              name={"Friends"}
              keyName={"name"}
              handleChange={(value) => {
                handleFilter(value);
                // handleChange("relation", value)
              }}
              selectedValue={relation}
            />
          </div>

          <div className="flex w-[100%] lg:w-[58%] xl:w-[70%]">
            <SearchComponent
              handleChange={searchFriend}
              width={98}
              bgColor={"#E4E7EC"}
              placeholder={"Search...."}
            />
          </div>
        </section>
        {/* <hr className="" /> */}

        <section className="h-[345px] lg:h-[80vh] overflow-y-scroll pt-2 flex flex-col gap-4">
          {isEmpty(friendList) ? (
            <EmptyComponent
              message={`No ${
                relation?.name === "Friends" || relation?.name === 'All' ? "Friends" : relation?.name
              }`}
            />
          ) : (
            friendList?.map((elem, index) => (
              <FriendList icon={true} desc={true} data={elem} />
            ))
          )}
        </section>
        {/* <Locations/> */}
      </div>
  );
};

export default MyFriendsPage;
