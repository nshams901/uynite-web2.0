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
import { isEmpty } from "../../../Utility/utility";
import EmptyComponent from "../../../empty component/EmptyComponent";

const Post = () => {
  // 6451d620e3601831e45125da
  const reducerData = useSelector((state) => {
    return {
      profile: state.profileReducer.profile || {},
      postList: state.profileReducer.userPostList || [],
    };
  });

  const { profile, postList = [] } = reducerData;
  // useEffect(() => {
  //   dispatch(getUserPostList(profile.id));
  // }, [profile?.id]);
  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="bg-white rounded-md w-full flex py-2">
        <PostForm />
      </div>
      {
        isEmpty(postList)
          ?
          <div>
            <EmptyComponent message={'No post'} />
          </div>
          :
          postList?.map((post) => {
            const { userData, id } = post;
            return (
              <div key={id} className="w-full flex items-center justify-center flex-col ">
                <PostCard userData={userData || []} item={post} />
              </div>
            );
          })
      }
    </div>
  );
};

export default Post;
