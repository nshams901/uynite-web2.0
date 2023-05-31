import friends from "../../../Assets/Images/groups.png";
import chat from "../../../Assets/Images/chat1.png";

export const dataList = [
  {
    name: "Root",
    title: "Connect Friends",
    iconBefore: "./images/rootsBefore.png",
    afterIcon: "./images/rootsSelected.png",
    url: "root",
  },

  {
    name: "Kicks",
    title: "Short Videos",
    iconBefore: "./images/kicksUnselected.png",
    afterIcon: "./images/kicksSelected.png",
    url: "kicks",
  },
  {
    name: "U-Meet",
    title: "Create Events",
    iconBefore: "./images/umeetUnselected.png",
    afterIcon: "./images/umeetSelected.png",

    url: "umeet",
  },
  {
    name: "Reals",
    title: "Create Map",
    iconBefore: "./images/realsBefore.png",
    afterIcon: "./images/realsSelected.png",
    url: "reals",
  },
];
export const data = [
  {
    name: "Chat",
    icon: chat,
    url: "/chat-page",
  },
  {
    name: "Friends",
    icon: friends,
    url: null,
  },
  {
    name: "Notifications",
    icon: "./images/unmute.png",
    url: null,
  },
];
