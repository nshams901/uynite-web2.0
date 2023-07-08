import { MdOutlineMusicNote } from "react-icons/md";
import { TiArrowBack, TiTickOutline } from "react-icons/ti";
import { AiFillHeart } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, input } from "@material-tailwind/react";
import TypeMessage from "../../chat/TypeMessage";
import {
  addCommentOnKicks,
  addCommentReplyOnKicks,
  commentDisliked,
  commentLiked,
  commentPostLiked,
  getCommentsByPostid,
  getCommentsReplyByPostid,
  kicksCommentDisliked,
} from "../../../redux/actionCreators/kicksActionCreator";
import moment from "moment";
import { toast } from "react-toastify";
import {
  addCommentOnPost,
  addPostReply,
  addCommentReplyOnRoots,
  getCommentByPostid,
  imageUploadApi,
} from "../../../redux/actionCreators/rootsActionCreator";
import { useNavigate } from "react-router-dom";
import user from "../../../Assets/Images/user.png";
import liked from '../../../Assets/Images/kicksLike.png';
import afterLike from '../../../Assets/Images/afterLike.png'
import MenuDropdown from "../../../Components/common/MenuDropdown";
import { useEffect } from "react";


export default function VideoCommentsModal({ onClose, ispenComment, roots, activePost}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reducerData = useSelector((state) => {
    return {
      commentsList: state?.kicksReducer.comments,
      // activePost: state?.rootsReducer?.activePost, //active post --- that post which is currently click by user
      profile: state?.profileReducer?.profile,
      replyList: state?.kicksReducer?.reply,
      userprofileid: state.profileReducer.profile?.id
    };
  });

  const {  profile, userprofileid } = reducerData;
  const [state, setState] = useState({
    msgText: "",
  });
  const { commentImage, imgFile, alert, msgText,liked_commentId = [], editComment, editableComment, commentsList = []} = state;
  const [openInput, setOpenInput] = useState(false);
  const [id, setid] = useState("");
  const openReplyModal = (id) => {
    setOpenInput(true);
    setid(id);
  };

  useEffect(() => {
    let payload = {
      pageNumber: 0,
      pageSize: 10,
    };
    dispatch(roots ? getCommentByPostid(activePost?.id, payload) : getCommentsByPostid(activePost?.id, payload)).then((res) => {
      setState({ ...state, commentsList: res.data })
    });
  }, [])

  const postOption = [{ name: 'Edit' }, { name: 'Delete' }]
  // comment Reply api intregration....
  const handleSendReply = async () => {
    if (!msgText) {
      setState({ ...state, alert: true });
    }
    let imgPath;
    if (commentImage) {
      imgPath = dispatch(imageUploadApi(imgFile));
    }
    if (msgText?.trim() || imgPath) {
      const payload = {
        // profileid: activePost?.profileid,
        // commentid: activePost?.id,
        profileid: profile?.id,
        commentid: id,
        text: msgText,
        image: imgPath?.path,
        emogi: "emogi",
        datetime: new Date().getTime(),
      };
      if (roots) {
        const params = {
          pageNumber: 0,
          pageSize: 10,
        };
        const res = await dispatch(addPostReply(payload));
        dispatch(getCommentByPostid(activePost?.id, params));
        setState({ ...state, msgText: "" });
      } else {
        if (ispenComment == true) {
          dispatch(addCommentReplyOnRoots(payload)).then((res) => {
            console.log(res);
          });
        } else {
          dispatch(addCommentReplyOnKicks(payload)).then((res) => {
            console.log(res);
            if (res?.status) {
              dispatch(getCommentsReplyByPostid(id));
            } else {
              toast.error(res?.message);
            }
          });
          dispatch(getCommentsByPostid(activePost?.id));
        }
      }
    }
  };

  const handleSendComment = async () => {
    setState({ ...state, msgText: "", imgFile: "" });
    if (!msgText) {
      setState({ ...state, alert: true });
    }
    let imgPath;
    if (commentImage) {
      imgPath = await dispatch(imageUploadApi(imgFile));
    }
    if (msgText?.trim() || imgPath) {
      const commentData = {
        datetime: new Date().getTime(),
        postid: activePost?.id,
        profileid: profile?.id,
        text: msgText,
        image: imgPath?.path
      };
      if (roots) {
        const params = {
          pageNumber: 0,
          pageSize: 10,
        };
        if (!msgText) {
          return;
        }
        // setAlert(false);
        // dispatch({
        //   type: "INCREASE_COMMENT_COUNT",
        //   payload: activePost.id,
        // });
        const res = await dispatch(addCommentOnPost(commentData));

        if (res?.status) {
          dispatch(getCommentByPostid(activePost?.id, params)).then((res) => {
            setState({ ...state, commentsList: res.data})
          })
          dispatch({
            type: "INCREASE_COMMENT_COUNT",
            payload: activePost.id,
          });
        };
      } else {
        dispatch(addCommentOnKicks(commentData))
          .then((res) => {
            if (res?.status) {
              setState({ ...state, msgText: "",  commentsList: [...commentsList, { ...res.data, profile: profile }]})
            } else {
              toast.error(res?.message);
            }
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.message);
          });
      }
    }
  };

  const handleLike = (itemId, dislike, commentid) => {
    const payload = {
      datetime: new Date().getTime(),
      postid: itemId,
      profileid: profile.id,
      type: "c"
    }
    let params = {
      pageNumber: 0,
      pageSize: 10
    }
    if (roots) {
      if (dislike) {
        const payload = {
          profileid: profile.id,
          likeid: itemId
        }
        dispatch(commentDisliked(payload)).then((res) => {
          dispatch(getCommentByPostid(activePost?.id, params)).then((res)=> {
            setState({ ...state, commentsList: res.data})
          })
        })
      } else {
        dispatch(commentPostLiked(payload)).then(res => {
          dispatch(getCommentByPostid(activePost?.id, params)).then((res) => {
            setState({ ...state, commentsList: res.data})
          })
        })
      }
      return;
    }
    if (dislike) {
      const payload = {
        profileid: profile.id,
        id: commentid
      }
      dispatch(kicksCommentDisliked(payload)).then((res) => {
        dispatch(getCommentsByPostid(activePost?.id)).then((res) => {
          setState({ ...state, commentsList: res.data})
        });
      })
    } else
      dispatch(commentLiked(payload)).then(res => {
        if (res?.status) {
          setState({...state, liked_commentId: [...liked_commentId, res.data] })
        }
      })
  };
  const handleEmojiClick = (emoji) => {
    console.log(emoji);
    setState({ ...state, msgText: msgText + emoji.emoji });
  };

  const handleFile = (e) => {
    if (e === "remove") {
      return setState({ ...state, commentImage: "", imgFile: "" });
    }
    const file = URL.createObjectURL(e.target.files[0]);
    setState({ ...state, commentImage: file, imgFile: e.target.files[0] });
  };

  const getLikeId = (likes) => {
    const data = likes?.find(item => item?.profileid === profile?.id);
    if (data) return data?.id;
    else return false;
  }
  const handleReplyLike = (id, dislike) => {
    if (dislike) {
      const payload = {
        datetime: new Date().getTime(),
        likeid: id,
        profileid: profile.id,
        type: "r"
      }
      dispatch(commentDisliked(payload)).then((res) => {
        dispatch(getCommentByPostid(activePost?.id, { pageNumber: 0, pageSize: 10 }));
      })
    } else {
      let params = {
        pageNumber: 0,
        pageSize: 10
      }
      if (roots) {
        const payload = {
          datetime: new Date().getTime(),
          postid: id,
          profileid: profile.id,
          type: "r"
        }
        dispatch(commentPostLiked(payload)).then(res => {
          dispatch(getCommentByPostid(activePost.id, params))
          if (res?.status) {
          }
        })
      } else {

        // like comment in kicks
        const payload = {
          datetime: new Date().getTime(),
          postid: id,
          profileid: profile.id,
          type: "r"
        }
        dispatch(commentLiked(payload)).then(res => {
          dispatch(getCommentsByPostid(activePost?.id));
          if (res?.status) {
          }
        })
      }

    }
  }

  const handleClickMenu = ( option, text ) => {
    if( option === 'Edit'){
      setState({ ...state, editComment: text, editableComment: true})
    }else if( option === 'Delete'){
      setState({ ...state, confirmModal: true})
    }
  }

  const handleComment = (e) => {
    const { value } = e.target
    setState({ ...state, editComment: value})
  }

  const handleSaveComment = () => {
    setState({ ...state, editableComment: false})
  }
console.log(commentsList, ">>>>>>>>>>>");
  return (
    <section
      className=" items-stretch justify-center h-full w-full flex  fixed top-[50%] left-[50%]
  transform translate-x-[-50%] translate-y-[-50%] z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
    >
      <section className="pb-20 w-[95%] sm:w-[50%] lg:w-[40%] relative  bg-white my-16 flex flex-col justify-between overflow-scroll hideScroll text-black rounded-xl">
        <div className="flex justify-between p-3 border-b">
          <span className="text-[19px] font-medium">Comments</span>
          <AiOutlineCloseCircle
            onClick={onClose}
            className="w-7 h-7 text-gray-700 cursor-pointer"
          />
        </div>
        <div className="h-full overflow-auto">
          {(commentsList?.content ? commentsList?.content : commentsList)?.map(
            (data, i) => {
              const {
                profile,
                text,
                id,
                likecount,
                replycount,
                datetime,
                image,
                postid,
                profileid,
              } = data || {};
              const name = profile?.fname + profile?.lname;
              const isLike = liked_commentId.find((item) => item.postid === id)
              let likecounts = [...(likecount || []), isLike && isLike]
              return (
                <>
                  <div key={id} className="my-2 flex items-center z-50 ">
                    <div className="w-1/6 flex justify-center cursor-pointer"
                      onClick={() => navigate(`/profile/${profile?.id}`)}>
                      <img
                        src={profile?.pimage}
                        className="w-12 h-12 border border-gray-500 rounded-full object-cover"
                      />
                    </div>

                    <div className="bg-[#f3f6f8] w-4/6 p-2 rounded-md">
                      <div className="flex justify-between">
                        <div>
                          <span className="font-semibold text-[15px]">
                            {name
                              ? `${profile?.fname} ${profile?.lname}`
                              : "User"}
                          </span>
                          <span className="text-[10px] px-2">
                            {moment(datetime, "x").format("DD MMM, YYYY")}
                          </span>
                        </div>
                        <div>
                          <MenuDropdown
                            placement={"left-end"}
                            arrow={true}
                            button={
                              <BsThreeDots
                                size={28}
                                className="cursor-pointer m-0 text-gray-800 font-bold z-[999999] !p-0"
                              // onClick={showMenuListModal}
                              />
                            }
                            options={ userprofileid === profile?.id ? postOption : [ { name: 'Report'}]}
                            handleOption={(option) => handleClickMenu(option, text)}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between items-end">
                      {
                        editableComment ? 
                        <>
                          <Input className="bg-white rounded-md" value={editComment} onChange={handleComment}/>
                          <TiTickOutline size={25} className="ml-2 my-auto" onClick={ handleSaveComment}/>
                        </>
                        :
                        <>
                        <span className="text-[14px]">{text}
                          {image ? <img className="w-24" src={image} /> : ""}
                        </span>
                        <div className="text-[11px]">
                          <span className="px-1">
                            {likecounts?.length || 0} likes
                          </span>
                          <span>{replycount?.length || 0} replies</span>
                        </div>
                        </>
                      }
                      </div>
                    </div>
                    {/* <input type="text" /> */}

                    <div className="w-1/6 pl-2 text-[#666666]">
                      {
                        getLikeId(likecounts) ?
                          <img className="w-6 cursor-pointer" src={ roots ? afterLike : liked} onClick={() => handleLike(getLikeId(likecounts), "dislike", id)} /> :
                          <AiFillHeart
                            className="text-2xl cursor-pointer"
                            onClick={() => handleLike(id)}
                          />
                      }
                      <TiArrowBack
                        className="text-2xl cursor-pointer"
                        onClick={() => openReplyModal(id)}
                      />
                    </div>
                  </div>
                  {replycount?.map((item, i) => {
                    const {
                      text,
                      emoji,
                      commentid,
                      profile,
                      id,
                      likecount,
                      datetime,
                    } = item;
                    const name = profile?.fname + profile?.lname;
                    const isLiked = likecount?.find(item => item.profileid === userprofileid)
                    return (
                      <div
                        key={i}
                        className="my-2 ml-[14%] w-[83%] flex items-center"
                      >
                        <div className="w-1/6 text-sm flex justify-center">
                          <img
                            onClick={() => navigate(`profile/${profile.id}`)}
                            src={profile?.pimage || user}
                            alt="User"
                            className="w-10 h-10 border-gray-600 border flex items-center justify-center rounded-full object-cover"
                          />
                        </div>

                        <div className="bg-[#f3f6f8] w-4/6 p-2 rounded-md">
                          <div className="flex justify-between">
                            <div>
                              <span className="font-semibold text-[15px]">
                                {name
                                  ? `${profile?.fname} ${profile?.lname}`
                                  : "User"}
                              </span>
                              <span className="text-[10px] px-2">
                                {moment(datetime, "x").format("DD MMM, YYYY")}
                              </span>
                            </div>
                            <div>
                              <BsThreeDots />
                            </div>
                          </div>

                          <div className="flex justify-between items-end">
                            <span className="text-[14px]">{text}</span>
                            <div className="text-[11px]">
                              <span className="px-1">
                                {likecount?.length || 0} likes
                              </span>
                              {/* <span>2 replies</span> */}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={(e) => {
                            e.preventDefault()
                          }}
                          className="w-1/6 pl-2 text-[#666666]"
                        >
                          {
                            isLiked ?
                              <img className="w-6 cursor-pointer" src={roots ? afterLike :liked} onClick={() => handleReplyLike(isLiked.id, "dislike")} />
                              :
                              <AiFillHeart className="text-2xl"
                                onClick={() => handleReplyLike(id)}
                              />

                          }
                        </button>
                      </div>
                    );
                  })}
                </>
              );
            }
          )}
        </div>

        <div className="absolute w-full bottom-[0%]  bg-blue-200  rounded-md ">
          {/* <div className="mt-auto fixed left-50 bottom-[10%] bg-blue-200  rounded-md w-[90%] lg:w-[35%]"> */}
          {openInput === false ? (
            <TypeMessage
              alert={alert}
              msgFile={commentImage}
              handleFile={handleFile}
              placeholder="Add comment"
              sendMessage={handleSendComment}
              handleInputChange={(e) =>
                setState({ ...state, msgText: e.target.value })
              }
              inputValue={msgText}
              handleEmojiClick={handleEmojiClick}
            />
          ) : (
            <div className="relative flex w-full items-center">
              <TypeMessage
                alert={alert}
                msgFile={commentImage}
                handleFile={handleFile}
                placeholder="Reply comment....."
                handleInputChange={(e) =>
                  setState({ ...state, msgText: e.target.value })
                }
                sendMessage={handleSendReply}
                inputValue={msgText}
              />
              <div className="ml-auto">
                <AiOutlineCloseCircle
                  onClick={() => setOpenInput(false)}
                  className="w-7 h-7 text-gray-700 cursor-pointer mr-4"
                // className="w-7 h-7 text-gray-700 cursor-pointer mr-4 absolute right-[-3%] bottom-3"
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </section>
  );
}
