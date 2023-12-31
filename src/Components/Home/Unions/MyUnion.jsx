import React, { useState } from "react";
import ExitUnionModal from "./ExitUnionModal";
import Portals from "./../../Portals/Portals";
import PopOver from "../../popover/Popover";
import UnionUpdateModal from "./UnionUpdateModal";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuDropdown from '../../../../src/Components/common/MenuDropdown'
import { addUnion, deleteUnion, exitFromUnion, getMyUnion, getPartOfUnions, getUnionList } from "../../../redux/actionCreators/unionActionCreator";
import { BsThreeDotsVertical } from "react-icons/bs";
import { data } from "autoprefixer";
import { toast } from "react-toastify";
import unionIcon from '../../../Assets/Images/unionIcon.png'

const MyUnion = ({
  isValid,
  onSingleUnionPage,
  showModal,
  onHandleModal,
  onCloseModal,
  unionList
}) => {
  const dispatch = useDispatch();
  const reducerDate = useSelector((state) => {
    return {
      profile: state.profileReducer.profile,
      // unionList: state.unionReducer.unionList,
      myUnionList: state.unionReducer.myUnionList
    }
  })

  const { profile, myUnionList} = reducerDate;
  // const data = [{ name: "Edit Union" }, { name: "Delete Union" }];
  const [modalType, setModalType] = useState({
    editPost: false,
    deletePost: false,
    activeUnion: ''
  });
  const [state, setState] = useState({});
  const { unionName = modalType.activeUnion?.groupName } = state

  useEffect(() => {
    dispatch(getMyUnion(profile?.id));
    dispatch(getPartOfUnions(profile?.id))
    
  }, [])
  const openModalOption = (optionName, data) => {
    if (optionName === "Edit Union") {
      // console.log("lllllllllll", optionName);
      setModalType({
        ...modalType,
        editPost: true,
        activeUnion: data
      });
    } else {
      // console.log("lllllllllll", optionName);
      setModalType({
        ...modalType,
        deletePost: true,
        activeUnion: data
      });
    }
  };

  const closeModalOption = () => {
    setModalType({
      ...modalType,
      editPost: false,
      deletePost: false,
    });
  };

  const handleUpdateUnion = (e) => {
    setState({...state, unionName: e.target.value})
  }

  const updateUnion = () => {
    const payload = {
      groupId: modalType?.activeUnion?.groupId,
      groupName: unionName,
      profileId: profile?.id,
    };
    dispatch(addUnion(payload)).then((res) => {
      setModalType({})
      if(res?.status){
        toast.success("Group Added");
        dispatch(getMyUnion(profile?.id));
      }else{
        toast.error(res?.message)
      }
    })

  }
  const handleDeleteUnion = () => {
    dispatch(deleteUnion(modalType?.activeUnion?.groupId)).then((res) => {
      if(res?.status){
        toast.success("Group deleted")
        dispatch(getMyUnion(profile?.id))
        setModalType({})
      }else{
        toast.error(res?.message)
      }
    })
  }
  const handleExit = () => {
    const payload = {
      groupId: showModal.partOfUnion,
      profileId: profile.id
    }
    console.log(payload, "___________");
    dispatch( exitFromUnion(payload)).then((res) => {
    dispatch(getPartOfUnions(profile?.id))
    onCloseModal()
    })
  }
  return (
    <>
      <div
        className="w-full h-[100%] overflow-y-scroll flex flex-col gap-2 "
        // onClick={onSingleUnionPage}
      >
        {unionList?.map((elem) => {
          const { groupId, groupName, count } = elem;
          return (
            <div
              key={groupId}
              className="flex gap-2 w-full py-2 mb-2 hover:bg-gray-300 px-3 rounded-md cursor-pointer"
            >
              <img
                src={unionIcon}
                alt=""
                className="w-[30px] h-[30px]"
                onClick={() => onSingleUnionPage(elem)}
              />
              <div
                className="flex-col flex flex-1"
                onClick={() => onSingleUnionPage(elem)}
              >
                <h1 className="text-xs font-bold">{groupName}</h1>
                <p className="text-gray-500 text-[10px]">{count} Joined</p>
              </div>
              {isValid ? (
                <MenuDropdown
                  button={
                    <div className="flex gap-2 items-center cursor-pointer">
                      <BsThreeDotsVertical className="" size={18} />
                    </div>
                  }
                  options={[{ name: "Edit Union" }, { name: "Delete union" }]}
                  handleOption={(optionName) =>
                    openModalOption(optionName, elem)
                  }
                />
              ) : (
                <button
                  className={`w-[15%] sm:w-[12%] border-2   border-[#979797] text-[#7991BD] font-bold text-xs rounded-lg`}
                  onClick={() => onHandleModal(groupId)}
                >
                  Exit
                </button>
              )}
            </div>
          );
        })}
      </div>
      {showModal?.partOfUnion && (
        <Portals closeModal={onCloseModal}>
          <ExitUnionModal exitUnion={handleExit} onCloseModal={onCloseModal} />
        </Portals>
      )}

      {modalType?.editPost && (
        <Portals closeModal={closeModalOption}>
          <UnionUpdateModal
            handleInputChange={handleUpdateUnion}
            unionName={unionName}
            handleCloseModal={closeModalOption}
            updateUnion={updateUnion}
          />
        </Portals>
      )}

      {modalType?.deletePost && (
        <Portals closeModal={closeModalOption}>
          <ExitUnionModal
            exitUnion={ handleDeleteUnion }
            onCloseModal={closeModalOption}
          />
        </Portals>
      )}
    </>
  );
};

export default MyUnion;
