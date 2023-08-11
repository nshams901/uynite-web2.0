import { MdOutlineDeleteForever } from "react-icons/md";

export const userData=[]
export const ownPostOption = [
  {
    samePostedUser: 0,
    name: "Edit",
    icon: "./images/edit.png",
  },
  {
    samePostedUser: 1,
    name: "History",
    icon: "./images/history.png",
    key: 'Others'
  },
  {
    samePostedUser: 1,
    name: "External Share",
    icon: "./images/externalShare.png",
    key: 'others'
  },
  {
    samePostedUser: 0,
    name: "Delete",
    reactIcon: <span className="w-6 mr-2 text-[#707070]"><MdOutlineDeleteForever size={25}/></span>
  },
  {
    samePostedUser: 0,
    name: "Mute Notifications",
    icon: "./images/mute.png",
    key: 'others'
  },  
  {
    samePostedUser: 0,
    name: "Turn off Commeting",
    icon: "./images/Messages.png",
  }, 
];

export const otherPostOption =[
  {
    samePostedUser: 1,
    name: "History",
    icon: "./images/history.png",
    key: 'Others'
  },
  {
    samePostedUser: 1,
    name: "External Share",
    icon: "./images/externalShare.png",
    key: 'others'
  },
  {
    samePostedUser: 2,
    name: "Report",
    icon: "./images/Report.png",
    key: 'others'
  },
  {
    samePostedUser: 2,
    name: "Block user",
    icon: "./images/blockuser.png",
    key: 'others'
  },
]

const postData = [
  {
    userId: 1,
    userIcon: "./images/event.jpg",
  },
  {
    userId: 1,
    userIcon: "./images/event.png",
  },
  {
    userId: 3,
    userIcon: "./images/groups.jpg",
  },
  {
    userId: 2,
    userIcon: "./images/pizza.jpg",
  },
  {
    userId: 4,
    userIcon: "./images/Report.png",
  },
  {
    userId: 1,
    userIcon: "./images/joker.jpg",
  },
];

export default postData;
