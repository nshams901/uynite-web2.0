import React, { useEffect, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import ProfileModal from "../Modal/ProfileModal/ProfileModal";
import NotificationModal from "../Modal/NotificationModal/NotificationModal";
import FriendsModal from "../Modal/FriendsModal/FriendsModal";
import { dataList, data } from "./data";
import { useSelector, useDispatch } from "react-redux";
import { isTabSelected } from "../../../redux/actionCreators/userActionCreator";
import { BsChevronCompactDown } from "react-icons/bs";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import User from "../../../Assets/Images/user.png";
import "./navbar.css";
import { getUsers } from "../../../redux/actionCreators/friendsAction";
import ItemList from "../../common/ItemList";
import { debounce } from "../../Utility/utility";
import ProfileMenu from "./ProfileMenu";
import MenuDropdown from "../../common/MenuDropdown";

const Navbar = () => {
  const [profileModal, setProfileModal] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);
  const [friendsModal, setFriendsModal] = useState(false);
  const [state, setState] = useState({});
  const { searchInput = "" } = state;
  const { selectedTab } = useSelector((state) => state.userReducer);
  const profile = useSelector((state) => state?.profileReducer?.profile);
  const { usersList } = useSelector((state) => state.friendReducer || {});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userFriendsModal = () => {
    setFriendsModal(!friendsModal);
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        const ismobile = window.innerWidth < 900;
        if (ismobile !== isMobile) setIsMobile(ismobile);
      },
      false
    );
  }, [isMobile, location.pathname]);

  const userProfileModal = () => {
    setProfileModal(!profileModal);
  };

  const userNotificationModal = () => {
    setNotificationModal(!notificationModal);
  };

  const onHandleClick = (option) => {
    if (option.name === "Friends") {
      userFriendsModal();
    } else if (option.name === "Notifications") {
      userNotificationModal();
    } else {
      navigate(option.url);
    }
  };

  const handleFriendOption = (item) => {
    console.log(item);
    if (item === "Find Friend") {
      navigate(`/find-friend`);
    } else if (item === "My Friends") {
      navigate(`/myfriend`);
    } else if (item === "Friend Request") {
      navigate(`/friend-request`);
    }
  };

  const onClickSlectedTab = (option) => {
    dispatch(isTabSelected(option?.url));
    navigate(option.url);
  };

  function searchUser(value) {
    dispatch(getUsers(value));
  }
  const processChange = debounce((e) => searchUser(e));

  const handleChange = (e) => {
    const { value } = e.target;
    setState({ ...state, searchInput: value });
    if (value.startsWith("#")) {
    } else {
      // dispatch(getUsers())
      processChange(value);
    }
  };

  const handleListItem = (item) => {
    setState({...state, searchInput: ''})
    navigate(`/profile/${item?.id}`);
  }

  return (
    <section className="h-[65px] w-full fixed flex bg-white z-10 responsive_navbar2">
      {/* -------------------------------------------------------------------------------------------------------------------------------------------------- */}
      {/* Left Section */}
      <div className="md:w-[30%] flex h-[65px] flex-row justify-center items-center">
        {/* Logo Section */}

        <div className="w-[50px] mx-[14px]">
          <img src="./images/Logo.png" alt="" className=" w-[52px] h-[52px]" />
        </div>

        {/* Search Bar Section */}
        <div className=" w-[80%] h-[38px] rounded-md relative bg-[#e4e7ec]  md:mr-5 hide_searchbar">
          <input
            value={searchInput}
            type="text"
            className="outline-none rounded-sm h-[38px] bg-[#e4e7ec]"
            placeholder="Search..."
            onChange={handleChange}
          />
          <img
            src="./images/Search.png"
            alt=""
            className="w-5 h-5 cursor-pointer absolute top-[30%] right-[6%]"
          />
          {searchInput && (
            <div className="bg-white  h-[400px] overflow-y-scroll overflow-x-hidden">
              {usersList?.map((item) => {
                return <ItemList user item={item} handleListItem={() =>handleListItem(item)}   />;
              })}
            </div>
          )}
        </div>
      </div>

      {/* --------------------------------------------------------------------------------------- */}
      <div className="responsive_navbar">
        {/* Root */}
        <section className="w-full flex h-full items-end bg-[#E4E7EC] rounded-tl-xl rounded-tr-xl relative">
          <div className=" h-[80%] flex w-full rounded-t-md items-end px-2 pb-1 gap-0 lg:gap-3 md:px-2">
            {dataList?.map((elem) => (
              <div
                key={elem?.name}
                className={`w-[40%] items-center rounded-t-md cursor-pointer gap-2 h-[90%] justify-center ${
                  isMobile ? "" : "flex"
                }`}
                style={{
                  backgroundColor: location.pathname?.includes(elem?.url)
                    ? "#6780AF"
                    : "#D8D8D8",
                }}
                onClick={() => onClickSlectedTab(elem)}
              >
                <div
                  className={`h-full flex items-center justify-center ${
                    isMobile ? "w-full text-center pt-1" : "w-[35px]"
                  }`}
                >
                  <img
                    src={
                      location.pathname?.includes(elem?.url)
                        ? elem?.afterIcon
                        : elem?.iconBefore
                    }
                    alt=""
                    className="w-[27px] lg:w-[35px]"
                  />
                </div>

                <div className="flex flex-col justify-center w-[85px]">
                  <h1
                    className={`text-sm font-bold  ${
                      isMobile ? "text-center" : ""
                    }`}
                  >
                    {elem?.name}
                  </h1>
                  <span className="text-[9px] font-semibold display_title">
                    {elem?.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ---------------------------------------------------------------------------------------------------- */}
      <div className="responsive_navbar1 mx-6 w-1/4">
        <div className="w-full flex justify-between items-center h-full">
          {/* Peoples */}

          {/* U-Straem and Interests are removed */}

          {data?.map((elem) => (
            <div
              key={elem?.name}
              className="flex flex-col items-center cursor-pointer relative -mb-[17px] text-[12px]"
              onClick={() => onHandleClick(elem)}
            >
              {elem?.name === "Friends" ? (
                <>
                  <MenuDropdown
                    classes={"mt-2"}
                    handleOption={handleFriendOption}
                    placement={"bottom-start"}
                    button={
                      <>
                        <img src={elem?.icon} className="ml-2 h-[30px]" />
                        <div className=" font-bold">{elem?.name}</div>
                      </>
                    }
                    options={[
                      { name: "My Friends" },
                      { name: "Find Friend" },
                      { name: "Friend Request" },
                    ]}
                  />
                </>
              ) : (
                <>
                  <img
                    src={elem?.icon}
                    alt={elem?.name}
                    className="h-[30px] profile_img"
                  />
                  <div className=" font-bold">{elem?.name}</div>
                </>
              )}
            </div>
          ))}

          {/* User Profile */}
          <div
            className="flex flex-col max-w-[250px] items-center cursor-pointer relative -mb-[19px]"
            onClick={userProfileModal}
          >
            {/* <img
              src={profile?.pimage || User}
              alt=""
              className="rounded-full object-cover w-[35px] h-[35px]"
            />
            <BsChevronCompactDown className="" /> */}

            <ProfileMenu data={profile} />
          </div>
          {/* {profileModal && <ProfileModal profile={profile} />} */}
          {notificationModal && <NotificationModal />}
          {/* {friendsModal && <FriendsModal setFriendsModal={setFriendsModal} />} */}
        </div>
      </div>
    </section>
  );
};

export default Navbar;
