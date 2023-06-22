import React, { useState } from "react";
import Portals from "../../Portals/Portals";
import user from '../../../Assets/Images/user.png'
import ChangeRelationshipModal from "../Modal/ChangeRelationshipModal/ChangeRelationshipModal";
import { Link } from "react-router-dom";

const UnionFindFriends = ({ data = {}, handleSendRequest, relationOption, handleRelation}) => {
  const {fname, lname, id, pimage} = data;
  const [openModal, setOpenModal] = useState(false);

  const onHandleCloseModal = () => {
    setOpenModal(false);
  };

  const onHandleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <>
      <div key={id} className="flex h-[60px] hover:bg-gray-300 px-3 py-2 rounded-md items-center w-full justify-center flex-col">
        <div className="w-full flex items-center">
          <Link className="">
            <img
              src={ pimage || user }
              alt=""
              className="w-[45px] h-[45px] rounded-full"
            />
          </Link>
          <Link className=" flex flex-1 flex-col justify-center ml-4">
            <span className="font-bold text-sm">{fname || ""} {lname || ""}</span>
          </Link>
          <img
            src="./images/SendFriendRequest.png"
            alt=""
            className="w-[25px] cursor-pointer"
            onClick={onHandleOpenModal}
          />
        </div>
      </div>

      {openModal && (
        <Portals>
          <ChangeRelationshipModal
            handleRelation={handleRelation}
            relationOption={relationOption}
            button="Send Request"
            title="Wanna Send Friend Request"
            closeModalOption={onHandleCloseModal}
            handleSendRequest={handleSendRequest}
          />
        </Portals>
      )}
    </>
  );
};

export default UnionFindFriends;
