import React, { useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { GrLocation } from "react-icons/gr";
import { HiUserGroup } from "react-icons/hi";
import CommentBox from "./CommentBox/CommentBox";
import MenuModal from "../../Modal/MenuModel/MenuModal";

import { useDispatch, useSelector } from "react-redux";
// import { commentsData } from "../../../../redux/actionCreators/userActionCreator";
import ShareWithModal from "../../Modal/ShareWithModal/ShareWithModal";
import Portals from "../../../Portals/Portals";
import KicksBeforeLike from "../../../../Assets/Images/KicksBeforeLike.png";
import KicksAfterLike from "../../../../Assets/Images/afterLike.png";
import SharePostModal from "../../Modal/SharePostModal/SharePostModal";
import { useNavigate } from "react-router-dom";
import {
  addCommentOnPost,
  decreaseLikeByLikeId,
  deletePostByPostId,
  getAllPostWithLimit,
  getCommentByPostid,
  getLikesById,
  getUserPostsList,
} from "../../../../redux/actionCreators/rootsActionCreator";
import user from "../../../../Assets/Images/user.png";
import OriginalPostModal from "../../Modal/OriginalPostModal/OriginalPostModal";
import UpdatePostModal from "../../Modal/CreatePostModal/CreatePostModal";
import LikeModal from "../../Modal/LikeModal/LikeModal";
import VideoCommentsModal from "../../KicksPage/VideoCommentsModal";
import { getPostHistory, getPostLike } from "../../../../redux/actionCreators/postActionCreator";
import { Alert } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import AlertSmall from "../../../common/AlertSmall";
import MenuDropdown from "../../../common/MenuDropdown";
import { otherPostOption, ownPostOption } from "../../dataList";
import Carousel from "react-multi-carousel";
import { responsive } from "../../SliderSection/MainCarousel";
import SharedPost from "./SharedPost";
import BlockModal from "../../Modal/BlockModal/BlockModal";
import { blockUser } from "../../../../redux/actionCreators/settingsActionCreator";
import moment from "moment";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { BsThreeDots } from "react-icons/bs";
import { getPrivacy, getTimeDiff } from "../../../Utility/utility";
import ReportModal from "../../KicksPage/ReportModal";
import { getFriendsList } from "../../../../redux/actionCreators/friendsAction";
import shareIcon from '../../../../Assets/Images/share.png';
import sendIcon from '../../../../Assets/Images/sendIcon.png'

const PostCard = ({ userData, item = {} }) => {
  const navigate = useNavigate();
  const ispenComment = true;
  const [showMore, setShowMore] = useState(false);
  const [showMenuList, setShowMenuList] = useState(false);
  const [inputComment, setInputComment] = useState("");
  const [userStatus, setUserStatus] = useState(0);
  const [showShareModal, setShowShareModal] = useState({
    shareModal: false,
    shareWith: false,
  });
  const [postMenuModal, setPostMenuModal] = useState({
    editPost: false,
    originalPost: false,
    externalShare: false,
    reportModal: false
  });
  const [alert, setAlert] = useState();
  const [state, setState] = useState({});
  const { modalData, modalOpen, blockModal, deleteModal } = state;

  const { likedDetails } = useSelector((state) => state.rootsReducer);
  const reducerData = useSelector((state) => {
    return {
      activePost: state.rootsReducer.activePost,
      profile: state.profileReducer.profile,
    };
  });
  const { activePost, profile } = reducerData;
  {
    /* implementing dynamic description, some redesign the postcard component */
  }
  const description = item?.text ? item?.text : "";
  const postOption =
    item?.profile?.id !== profile?.id ? otherPostOption : ownPostOption;

  const shortDescription = description.substring(0, 300);
  const onShowShareModal = () => {
    // dispatch({
    //   type: "ACTIVE_POST",
    //   payload: item,
    // });
    // console.log("jwww");
    setShowShareModal({ ...showShareModal, shareModal: true, activePost: item });
  };
  const dispatch = useDispatch();
  const showMenuListModal = () => {
    dispatch({
      type: "ACTIVE_POST",
      payload: item,
    });
    setShowMenuList(!showMenuList);
    setUserStatus(item.userId);
  };

  const [likeButton, setLikeButton] = useState(false);

  const [openModal, setOpenModal] = useState({
    OnLikeModal: false,
    commentModal: false,
    activePost: {}
  });

  const onHandleShareModal = () => {
    // dispatch({
    //   type: "ACTIVE_POST",
    //   payload: item,
    // });
    setShowShareModal({
      ...showShareModal,
      shareModal: false,
      shareWith: false,
      activePost: item
    });
  };
  const onHandleOpenLikeModal = () => {
    setOpenModal({
      ...openModal,
      OnLikeModal: true,
      activePost: item
    });
  };

  const onHandleOpenCommentModal = () => {
    setOpenModal(prev => ({...prev, commentModal: true, activePost: item }));
  };

  const onHandleCloseModal = () => {
    setOpenModal({
      ...openModal,
      OnLikeModal: false,
      commentModal: false,
    });
  };
  const onClickOnNext = () => {
    setShowShareModal({
      ...showShareModal,
      shareModal: false,
      shareWith: true,
    });
  };

  useEffect(() => {
    setLikeButton(item?.isliked);
  }, [likedDetails]);
  const { posts } = useSelector((state) => state.postReducer);
  const onHandleChange = (event) => {
    setInputComment(event.target.value);
  };
  const { defaultRootData } = useSelector((state) => state.eventReducer);
  const onLikeIncrease = async () => {
    if (item?.isliked) {
      dispatch({
        type: "DECREASE_LIKE_COUNT",
        payload: item?.id,
      });
      const dislikeResponse = await dispatch(
        decreaseLikeByLikeId(profile?.id, item?.likeid)
      );
      if (dislikeResponse?.status) {
        setLikeButton(false);
      }
    } else {
      const postDetils = {
        datetime: Date.now().toString(),
        postid: item?.id,
        profileid: profile?.id,
        type: "p",
      };
      dispatch({
        type: "INCREASE_LIKE_COUNT",
        payload: item?.id,
      });
      const response = await dispatch(getLikesById(postDetils));
      if (response?.status) {
        setLikeButton(true);
      }
    }
  };

  const onCommetIncrease = () => {
    dispatch({
      type: "ACTIVE_POST",
      payload: item,
    });
    const commentData = {
      datetime: Date.now(),
      postid: item?.id,
      profileid: profile?.id,
      text: inputComment,
    };
    if (!inputComment) {
      setAlert(true);
      return;
    }
    setAlert(false);
    dispatch(addCommentOnPost(commentData));
    setInputComment("");
    dispatch({
      type: "INCREASE_COMMENT_COUNT",
      payload: item.id,
    });
    // dispatch(getAllPostWithLimit(defaultRootData?.data?.postdata?.profileid));
  };

  const handleClickMenu = (modalName) => {
    // dispatch({
    //   type: "ACTIVE_POST",
    //   payload: item,
      // });
    if (modalName === "Edit") {
      setPostMenuModal({ ...postMenuModal, editPost: true, activePost: item });
    } else if (modalName === "History") {
      // dispatch(getPostHistory(item.id))
      setPostMenuModal({ ...postMenuModal, originalPost: true, activePost: item });
    } else if (modalName === "Report") {
      setPostMenuModal({ ...postMenuModal, reportModal: true, activePost: item });
    } else if (modalName === "Block user") {
      setState({ ...state, blockModal: true, activePost: item });
    } else if (modalName === "Delete") {
      setState({ ...state, deleteModal: true, activePost: item });
    }
  };

  const handleDelete = () => {
    dispatch(deletePostByPostId(profile?.id, state.activePost.id)).then((res) => {
      dispatch(getAllPostWithLimit(profile?.id));
      dispatch(getUserPostsList(profile.id))
      if (res?.status) {
        setState({ ...state, deleteModal: false });
        toast.success(res?.message);
      }
    });
  };

  const handleCloseModal = () => {
    setPostMenuModal({
      ...postMenuModal,
      originalPost: false,
      editPost: false,
      externalShare: false,
      reportModal: false

    });
  };
  const handleModal = (data) => {
    setState({ ...state, modalOpen: !modalOpen, modalData: data });
  };

  const handleBlock = () => {
    const payload = {
      blockedid: activePost.profileid,
      myprofileid: profile.id,
    };
    dispatch(blockUser(payload)).then((res) => {
      setState({ ...state, blockModal: false })
      if (res.status) {
        toast.success(res.message)
      } else {
        toast.error(res.message)
      }
    })
  }

  return (
    <>
      <div
        className={`flex w-full rounded-lg py-2 justify-between items-center px-2 flex-col mt-2 bg-white mb-2`}
      >
        {/* Top Section */}
        <section className="w-full flex items-center justify-between">
          <div
            className="flex overflow-hidden text-ellipsis w-full cursor-pointer"
            onClick={() => navigate(`/profile/${item?.profile.id}`)}
          >
            <div className="flex min-w-[46px] w-[46px] h-[46px]">
              {/* due to img broke dynamic src commented */}
              <img
                src={item?.profile?.pimage ? item?.profile?.pimage : user}
                alt=""
                className="w-full h-full rounded-full mt-1 object-cover"
              />
            </div>

            <div className="flex  flex-col flex-1 justify-center ml-2">
              <div className="text-start">
                {/*font weight removed*/}
                <span className="ml-1 font-bold">
                  {`${item?.profile?.fname || "User"} ${item?.profile?.lname || ""
                    }`}
                </span>
                <div className="text-xs pb-2">
                  {item?.profile?.job ? `@${item?.profile?.job}`: ""}
                </div>
              </div>

              <div className="w-full flex items-center whitespace-nowrap text-ellipsis overflow-hidden gap-2">
                {/* <HiUserGroup size={16} /> */}
                {item?.viptype === 5 ? (
                  <div className="text-xs">Updated profile picture</div>
                ) : item?.viptype === 6 ? (
                  <div className="text-xs">Updated cover picture</div>
                ) : (
                  ""
                )}
                <span><img className="w-5" src={getPrivacy(item?.shareto)} /></span>
                <span className="text-[11px] text-left">
                  {getTimeDiff(moment(item.createdatetime))} ago
                </span>

                {/* <img
                  src="./images/groups.png"
                  alt=""
                  className="w-[12px] relative"
                /> */}
                {/* font size reduced */}
                {/* <span className="text-[11px] font-semibold">1 year ago</span> */}
                {item?.location ? (
                  <div title={item?.location} className="flex gap-1 items-center">
                    <GrLocation size={12} />
                    <span className="text-xs">{item?.location}</span>
                  </div>
                ) : (
                  ""
                )}
                {/* <img src="" alt="" /> */}
                <span title={item?.profile?.location} className="text-[11px] font-semibold">
                  {item?.profile?.location}
                </span>
              </div>
            </div>
          </div>
          {
            <MenuDropdown
              placement={"left-end"}
              arrow={true}
              button={
                <BsThreeDots
                  size={28}
                  className="cursor-pointer m-0 text-gray-800 font-bold !p-0"
                // onClick={showMenuListModal}
                />
              }
              options={postOption}
              handleOption={handleClickMenu}
            />
          }
        </section>
        {/* {showMenuList && (
          <MenuModal
            postId={item?.id}
            data={userData}
            userStatus={userStatus}
            closeModel={handleClickMenu}
          />
        )} */}

        {/* Content/About And Images Section */}
        <section className="w-full flex flex-col items-center mt-2 px-2">
          <div className=" w-full ">
            <p className="text-[11px] text-left sm:text-[12px] break-words lg:text-[13px] font-[400] text-gray-500">
              {showMore ? description : `${shortDescription}`}

              {description.length > 150 && (
                <span
                  className="text-xs text-[#2F58CD] font-bold cursor-pointer"
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore ? "Show less" : "... Read more"}
                </span>
              )}
            </p>
          </div>

          {item?.sharedpostid ? (
            <div className="w-full">
              <SharedPost
                postid={item.sharedpostid}
                profileid={item?.shareprofileid}
              />
            </div>
          ) : item?.image ? (
            item.viptype === 5 ? (
              <>
                <div
                  className="m-3 mb-0 w-[200px] h-[200px] rounded-full"
                  onClick={() => handleModal(item)}
                >
                  <img
                    src={item?.image}
                    alt=""
                    className="w-full h-full rounded-full object-cover border border-gray-500"
                  />
                </div>
              </>
            ) : item.image?.split("@").length > 1 ? (
              <Carousel
                infinite
                arrows
                responsive={responsive}
                showDots={true}
                className="w-full"
              >
                {item.image?.split("@").map((item) => {
                  return (
                    <div className="flex justify-center ">
                      <div className="w-[300px] sm:w-full max-w-[500px] h-[260px] border border-gray-400">
                        {
                          item.includes('mp4') ?
                            <video src={item} > </video>
                            :
                            <img
                              src={item}
                              alt="image"
                              className="mb-3 w-full h-full object-cover"
                            />
                        }
                      </div>
                    </div>
                  );
                })}
              </Carousel>
            ) : (
              <>
                <div
                  className="m-3 mb-0 w-[300px] sm:w-full max-w-[500px] h-[260px] rounded-full"
                  onClick={() => handleModal(item)}
                >
                  {
                    item.image.includes('mp4')
                      ? <video src={item?.image}
                        className="w-full h-full object-cover border border-gray-500"
                        controls></video>
                      :
                      <img
                        src={item?.image}
                        alt=""
                        className="w-full h-full object-cover border border-gray-500"
                      />
                  }
                </div>
              </>
            )
          ) : (
            ""
          )}
        </section>

        {/* Like share Comment Button Sections  */}
        <section className="flex justify-between w-full mt-2 mb-1  px-2">
          <div
            className="flex justify-center gap-2 text-[12px] text-gray-600 items-center cursor-pointer"
            onClick={onHandleOpenLikeModal}
          >
            {/* <HiUserGroup size={16} /> */}

            <span className=" cursor-pointer ">{item?.likecount} like{ item.likecount > 1 ? 's': ''}</span>
          </div>

          <div className="flex  gap-5 items-center">
            <span
              className="text-[11px] lg:text-[11px] xl:text-[12px] font-medium text-gray-600 cursor-pointer"
              onClick={onHandleOpenCommentModal}
            >
              {item?.commentcount ? item?.commentcount : 0} Comment{item.commentcount > 1 ? 's': ''}
            </span>
            {/* <span className=" text-[11px] lg:text-[12px] xl:text-[13px] font-medium text-gray-600">
              28 Shares
            </span> */}
          </div>
        </section>

        {/* Comment Box Section */}

        <section className="w-full flex flex-col">
          <hr className="w-full mb-2 text-gray-500" />
          <div className="flex">
            <div className="flex flex-col items-center justify-center cursor-pointer">
              {item?.isliked ? (
                <img
                  src={KicksAfterLike}
                  alt=""
                  className="w-[50%] "
                  onClick={onLikeIncrease}
                />
              ) : (
                <img
                  src={KicksBeforeLike}
                  alt=""
                  className="w-[50%] "
                  onClick={onLikeIncrease}
                />
              )}
              {/* <RiDislikeFill/> */}

              {/* <span className="text-xs font-semibold mt-1">Like</span> */}
            </div>
            {/* Input Box Section */}
            <div className="relative flex grow overflow-hidden items-center outline-gray-300 py-1 border-[1px] w-[100%] border-[#C8C8C8] justify-center gap-2 rounded-xl mt-1.5 h-[38px]">
              <input
                type="text"
                className="w-full h-full outline-none rounded-xl pl-3"
                placeholder="Add your comment"
                value={inputComment}
                onChange={onHandleChange}
              />
              {
                <AlertSmall
                  showAlert={alert}
                  button={
                    <img
                      src={ sendIcon}
                      alt=""
                      className="w-[40px] pr-2 cursor-pointer"
                      onClick={onCommetIncrease}
                    />
                  }
                  message={"Please add your comment to send"}
                />
              }
            </div>

            <div
              className="mr-2 flex flex-col items-center justify-center"
              onClick={onShowShareModal}
            >
              <img
                src={shareIcon}
                alt=""
                className="w-[50%] cursor-pointer"
              />
            </div>
          </div>
        </section>
      </div>
      {showShareModal?.shareModal && (
        <Portals closeModal={onHandleShareModal}>
          <SharePostModal
            activePost={ showShareModal.activePost}
            showShareModal={showShareModal}
            onClickOnNext={onClickOnNext}
            handleClose={onHandleShareModal}
          />
        </Portals>
      )}
      {showShareModal?.shareWith && (
        <Portals closeModal={onHandleShareModal}>
          <ShareWithModal
            handleCloseModal={onHandleShareModal}
            showShareModal={showShareModal}
          />
        </Portals>
      )}
      {postMenuModal?.editPost && (
        <Portals closeModal={handleCloseModal}>
          <UpdatePostModal activePost={ postMenuModal.activePost } title="Edit" handleCloseModal={handleCloseModal} />
        </Portals>
      )}

      {postMenuModal?.originalPost && (
        <Portals closeModal={handleCloseModal}>
          <OriginalPostModal activePost={ postMenuModal.activePost } handleCloseModal={handleCloseModal} />
        </Portals>
      )}

      {openModal?.OnLikeModal && (
        <Portals closeModal={onHandleCloseModal}>
          <LikeModal activePost={ openModal.activePost } closeLikeModal={onHandleCloseModal} />
        </Portals>
      )}
      {openModal?.commentModal && (
        <Portals closeModal={onHandleCloseModal}>
          <VideoCommentsModal activePost={ openModal.activePost } roots onClose={onHandleCloseModal} post={posts} />
        </Portals>
      )}
      {blockModal && (
        <Portals closeModal={() => setState({ ...state, blockModal: false })}>
          <BlockModal
            activePost = { state.activePost }
            handleBlock={handleBlock}
            closeModalOption={() => setState({ ...state, blockModal: false })}
          />
        </Portals>
      )}
      {postMenuModal?.reportModal &&
          <ReportModal activePost={ state.activePost } onClose={ handleCloseModal }/>
      }

      {deleteModal && (
        <Portals closeModal={() => setState({ ...state, deleteModal: false })}>
          <ConfirmationModal
            activePost= { state.activePost}
            message={"Are you sure you want to delete this post?"}
            button={"Confirm"}
            closeModal={() => setState({ ...state, deleteModal: false })}
            handleAccept={handleDelete}
          />
        </Portals>
      )}
    </>
  );
};

export default PostCard;
