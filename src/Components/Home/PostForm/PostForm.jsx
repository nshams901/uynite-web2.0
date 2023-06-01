import React, { useState } from "react";
import { BsImage } from "react-icons/bs";
import Portals from "../../Portals/Portals";
import CreatePostModal from "../Modal/CreatePostModal/CreatePostModal";
import { Avatar } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import userIcon from "../../../Assets/Images/user.png";

const PostForm = ({ width, bgColor, rightIcon }) => {
  // const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [state, setState] = useState({});
  const { showModal } = state;
  const createPostModal = () => {
    setState({ ...state, showModal: !showModal });
  };
  const { profile } = useSelector((state) => state.profileReducer);
  return (
    <div className="w-full cursor-pointer">
      <div
        className="flex justify-between items-center w-full"
        onClick={createPostModal}
      >
        <Avatar
          src={profile?.pimage || userIcon}
          alt="Avatar"
          variant="circular"
          className="rounded-full mr-4"
        />
        <input
          type="text"
          placeholder="Write Your Thoughts....."
          className="outline-none rounded-md"
        />
        {
          rightIcon &&
        <span className="mr-2">
          <BsImage size={25} />
        </span>
        }
      </div>
      {showModal && (
        <Portals
          closeModal={() => {
            setState((prev) => ({ ...prev, naehal: true, showModal: false }));
          }}
        >
          <CreatePostModal
            title={"Create"}
            handleCloseModal={() => {
              setState((prev) => ({ ...prev, naehal: true, showModal: false }));
            }}
          />
        </Portals>
      )}
    </div>
  );
};

export default PostForm;
