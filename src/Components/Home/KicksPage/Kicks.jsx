import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import events from "./events.jpg";
import VideoComponent from "./VideosComponent/VideoComponent";
import { HiPlus, HiSearch } from "react-icons/hi";
import beforeFollow from "../../../Assets/Images/Kicks before follow.png";
// import afterFollow from "../../../Assets/Images/Kicks follow.png"
import kicksShare from "../../../Assets/Images/Kicks Share.png";
import "./kicks.css";
import {
  addCommentOnKicks,
  getFollowingKicks,
  getLatestKicks,
  getTrendingKicks,
  selectKicksType,
} from "../../../redux/actionCreators/kicksActionCreator";
import v1 from "../../../Assets/Videos/v1.mp4";
import v2 from "../../../Assets/Videos/v2.mp4";
import v3 from "../../../Assets/Videos/v3.mp4";
import v4 from "../../../Assets/Videos/v4.mp4";
import v5 from "../../../Assets/Videos/v5.mp4";
import { BsMusicNoteList } from "react-icons/bs";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import mute from "../../../Assets/Images/Mute.png";
import Messages from "../../../Assets/Images/Messages.png";
import like from "../../../Assets/Images/KicksBeforeLike.png";
import share from "../../../Assets/Images/share.png";
import Collections from "../../../Assets/Images/collection.png";
import "./kicks.css";
import { Link, useParams } from "react-router-dom";
import KicksComment from "./KicksComment";
import SelectedVideoModal from "../SearchKicksPage/SelectedVideoModal";
import EmptyComponent from "../../../Components/empty component/EmptyComponent";
import { isEmpty } from "../../Utility/utility";
import moment from "moment";
import { BiCategory } from "react-icons/bi";
import CategoriesModal from "../SearchKicksPage/CategoriesModal";

const Kicks = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const reducerDate = useSelector((state) => {
    return {
      profile: state.profileReducer.profile,
      followingsContent: state.kicksReducer.followingKicks,
      trendingContents: state.kicksReducer.trendingKicks,
      latestContents: state.kicksReducer.latestKicks,
    };
  });

  const { profile, followingsContent, trendingContents, latestContents } =
    reducerDate;
  const [state, setState] = useState({});
  const { kicksType = params.segment || "Following" } = state;
  const [comments, setComments] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectVideo, setSelectVideo] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [openCat, setOpenCat] = useState(false);
  const videoData = useMemo(() => {
    return kicksType === "Following"
      ? followingsContent
      : kicksType === "Trending"
      ? trendingContents
      : kicksType === "Latest"
      ? latestContents
      : {};
  }, [kicksType]);

  useEffect(() => {
    getKicks("Following");
    window.addEventListener(
      "resize",
      () => {
        const ismobile = window.innerWidth < 900;
        if (ismobile !== isMobile) setIsMobile(ismobile);
      },
      false
    );
  }, [isMobile]);

  const data = [
    { title: "Following" },
    { title: "Latest" },
    { title: "Trending" },
  ];

  const dataList = [
    { title: "mute", img: mute },
    { title: "likes", img: like },
    { title: "follow", img: beforeFollow },
    { title: "comments", img: Messages },
    { title: "collection", img: Collections },
    { title: "share", img: `${isMobile ? share_mobi : share}` },
    // { title: "save", img: collection },
  ];

  function handleFileSelection(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedVideo(reader.result);
    };

    reader.readAsDataURL(file);
  }

  // const { kicksType } = useSelector((state) => state.userReducer);

  const getKicks = () => {
    dispatch({ type: "KICKS_SEGMENT", payload: kicksType });
    setState({ ...state, kicksType: kicksType });
    const data = {
      categories: [],
      profileId: profile?.id,
      rootRequest: false,
    };
    let params = { index: 0, size: 10 };
    if (kicksType === "Latest") {
      dispatch(getLatestKicks(params, { ...data, segment: "LATEST" }));
      setOpenCat(true);
    } else if (kicksType === "Trending") {
      dispatch(getTrendingKicks(params, { ...data, segment: "TRENDING" }));
      setOpenCat(false);
    } else if (kicksType === "Following") {
      dispatch(getFollowingKicks(params, { ...data, segment: "FOLLOWING" }));
      setOpenCat(false);
    }
  };
  const handleComment = (commentText, postid) => {
    if (commentText?.trim()) {
      const payload = {
        profileid: profile?.id,
        postid: postid,
        text: commentText,
        image: "image",
        emogi: "emogi",
        datetime: moment().format("YYYY-MM-DDTHH:mm:ms"),
      };
      dispatch(addCommentOnKicks(payload));
    }
  };

  return (
    <>
      {/* // mobile view// */}
      <div
        className={`w-full flex flex-col items-center bg-[url(${events})] ${
          isMobile ? "" : "hidden"
        }`}
      >
        <section className=" w-[95%] sm:w-[50%] lg:w-[40%] p-3 bg-black">
          <div className="flex justify-evenly sticky top-[10%] p-2">
            {openCat && (
              <div className="mt-1">
                <span
                  onClick={() => setShowCategories(true)}
                  className="cursor-pointer"
                >
                  <BiCategory className="text-white bg-[#6e6f6f] h-10 w-10 rounded-full p-0.5" />
                </span>
              </div>
            )}

            {data?.map((elem) => (
              <p
                key={elem?.title}
                className="text-white cursor-pointer flex items-center justify-center rounded-xl font-semibold"
                style={{
                  padding: kicksType === elem?.title ? "0.5rem 1rem" : "0rem",
                  backgroundColor:
                    kicksType === elem?.title ? "#DD8E58" : "black",
                }}
                onClick={() => getKicks(elem?.title)}
              >
                {elem?.title}
              </p>
            ))}
            <section className=" mt-1">
              <Link to="/veiwallkicks">
                <HiSearch className="w-8 p-0.5 h-8 cursor-pointer bg-[#6e6f6f] text-white rounded-full" />
              </Link>
            </section>
          </div>
          {/*  */}
          <section
            className={`video-container mt-[3%] flex-1 text-white bg-black ${
              isMobile ? "video-container_mobile" : "hidden"
            }`}
            id="video-container"
          >
            {isEmpty(videoData?.content) ? (
              <EmptyComponent
                message={`There is no video in ${kicksType} section`}
              />
            ) : (
              videoData?.content?.map((item) => {
                const { text, id } = item;
                return (
                  <div className="" key={id}>
                    <VideoComponent dataList={dataList} data={item} />
                  </div>
                );
              })
            )}
          </section>
        </section>

        {/* Reels Section */}

        {selectVideo && (
          <SelectedVideoModal
            selectedVideo={selectedVideo}
            onClose={() => setSelectVideo(false)}
          />
        )}

        {showCategories && (
          <CategoriesModal onClose={() => setShowCategories(false)} />
        )}
      </div>

      {/* // desktop version// */}
      <div
        className={`w-full flex h-[90vh] bg-black bg-[url(${events})] z-10 ${
          isMobile ? "hidden" : ""
        }`}
      >
        <section className="flex w-[39%] items-center justify-center bg-black">
          <div className="w-[80%] flex flex-col items-center">
            <div className="flex flex-col gap-3">
              {data?.map((elem) => (
                <p
                  key={elem?.title}
                  className="text-white cursor-pointer flex items-center justify-center rounded-xl font-semibold"
                  style={{
                    padding: kicksType === elem?.title ? "0.5rem 1rem" : "0rem",
                    backgroundColor:
                      kicksType === elem?.title ? "#DD8E58" : "black",
                  }}
                  onClick={() => getKicks(elem.title)}
                >
                  {elem?.title}
                </p>
              ))}
              <section className="flex justify-evenly gap-2 mt-1">
                <Link to="/veiwallkicks">
                  <HiSearch className="w-9 p-0.5 h-9 cursor-pointer bg-[#6e6f6f] text-white rounded-full" />
                </Link>
                {openCat && (
                  <div className="mt-1">
                    <span
                      onClick={() => setShowCategories(true)}
                      className="cursor-pointer"
                    >
                      <BiCategory className="text-white bg-[#6e6f6f] h-10 w-10 rounded-full p-0.5" />
                    </span>
                  </div>
                )}
              </section>
            </div>
          </div>
        </section>

        {/* Reels Section */}

        <section
          className="video-container mt-[3%] flex-1 text-white bg-black"
          id="video-container"
        >
          {isEmpty(videoData?.content) ? (
            <EmptyComponent
              message={`There is no video in ${kicksType} section`}
            />
          ) : (
            videoData?.content?.map((item) => {
              const { text, id } = item;
              return (
                <div className="flex " key={id}>
                  <VideoComponent dataList={dataList} data={item} />
                </div>
              );
            })
          )}
        </section>

        {selectVideo && (
          <SelectedVideoModal
            selectedVideo={selectedVideo}
            onClose={() => setSelectVideo(false)}
          />
        )}
        {showCategories && (
          <CategoriesModal onClose={() => setShowCategories(false)} />
        )}
      </div>
    </>
  );
};

export default Kicks;
