import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getInstancePost,
  getUserPostList,
} from "../../../../redux/actionCreators/rootsActionCreator";
import PostForm from "../../PostForm/PostForm";
import PostCard from "../../PostContetnt/PostCard/PostCard";
import userData from "../../dataList";

const Post = () => {
  // 6451d620e3601831e45125da
  const dispatch = useDispatch();
  const reducerData = useSelector((state) => {
    return {
      profile: state.profileReducer.profile || {},
      postList: state.profileReducer.userPostList,
    };
  });

  const { profile, postList = [] } = reducerData;
  useEffect(() => {
    dispatch(getUserPostList(profile.id));
  }, []);
  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="bg-white rounded-md w-full flex py-2">
        <PostForm />
      </div>

      {postList?.map((post) => {
        const { userData } = post;
        return (
          <div className="w-full flex items-center justify-center flex-col ">
            <PostCard userData={userData || []} item={post} />
          </div>
        );
      })}
    </div>
  );
};

export default Post;
