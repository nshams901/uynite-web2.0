import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { unionTabSelection } from "../../../redux/actionCreators/userActionCreator";
import MyUnion from "./MyUnion";
import PartOfUnion from "./MyUnion";

const UnionHomePage = () => {
  const unionData = ["My Unions", "Part of Unions"];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState({
    myUnion: false,
    partOfUnion: false,
  });
  const { unionTab } = useSelector((state) => state.userReducer);
  const { myUnionList, partOfUnions } = useSelector((state) => state.unionReducer )
  const onHandleModal = (union) => {
    setShowModal({ ...showModal, partOfUnion: union });
  };
  const onHandleModal2 = () => {
    setShowModal({ ...showModal, myUnion: true });
  };
  const onCloseModal = () => {
    setShowModal({ ...showModal, myUnion: false, partOfUnion: false });
  };
  const onSingleUnionPage = (data) => {
    dispatch({
      type: "ACTIVE_POST",
      payload: data
    })
    navigate("/single-unions-page");
  };
  const onCreateUnion = () => {
    navigate("/create-union");
  };
  const onUnionTabSelected = (option) => {
    dispatch(unionTabSelection(option));
  };
  return (
    <div className="w-[95%] sm:w-[50%] lg:w-[40%] mx-auto flex flex-col items-center gap-5 px-3 h-[88%] mt-1 pt-4 bg-white">
      <h1 className="text-xs sm:text-sm text-center">
        Create and Join Private unions to Create post's Events and Polls.
      </h1>
      <div className="flex justify-center gap-5 w-full">
        {unionData?.map((elem) => (
          <button
            key={elem}
            className={`w-[30%] text-white font-bold text-[9px] sm:text-xs py-2 rounded-lg`}
            style={{
              backgroundColor: unionTab === elem ? "#3b82f6" : "#6f6f6f",
            }}
            onClick={() => onUnionTabSelected(elem)}
          >
            {elem}
          </button>
        ))}
        <button
          className={`w-[30%] text-white font-bold py-1  text-[9px] sm:text-xs rounded-lg bg-[#666567]`}
          onClick={onCreateUnion}
        >
          Add Unions
        </button>
      </div>

      {unionTab === "My Unions" && (
        <MyUnion
          isValid={true}
          onSingleUnionPage={onSingleUnionPage}
          showModal={showModal}
          onHandleModal={onHandleModal2}
          onCloseModal={onCloseModal}
          unionList={myUnionList}
        />
      )}
      {unionTab === "Part of Unions" && (
        <PartOfUnion
          isValid={false}
          showModal={showModal}
          onHandleModal={onHandleModal}
          onCloseModal={onCloseModal}
          unionList={partOfUnions}
        />
      )}
    </div>
  );
};

export default UnionHomePage;
