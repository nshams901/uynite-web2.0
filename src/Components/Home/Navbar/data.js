import chatIcon from "../../../Assets/Images/chatIcons.png"
import friendsIcons from "../../../Assets/Images/friendsIcons.png";
import notificationIcons from "../../../Assets/Images/notificationIcons.png";
import rootsBefore from '../../../Assets/Images/rootsBefore.png';
import rootsSelected from '../../../Assets/Images/rootsSelected.png';
import kicks from '../../../Assets/Images/kicksUnselected.png'
import kicksSelected from '../../../Assets/Images/kicksSelected.png';
import realsSelected from '../../../Assets/Images/reals.jpeg';
import realsBefore from '../../../Assets/Images/realsBefore.png';
import umeet from '../../../Assets/Images/umeetUnselected.png';
import umeetSelected from '../../../Assets/Images/umeetSelected.png'


export const dataList = [
  {
    name: "Roots",
    title: "Connect Friends",
    iconBefore: rootsBefore,
    afterIcon: rootsSelected,
    color: "#6780AF",
    url: "root",
  },

  {
    name: "Kicks",
    title: "Short Videos",
    iconBefore: kicks,
    afterIcon: kicksSelected,
    color: "#DD8E58",
    url: "kicks",
  },
  {
    name: "Reals",
    title: "Create Map",
    iconBefore: realsBefore,
    afterIcon: realsSelected,
    color: "#F40229",
    url: "reals",
  },
  {
    name: "U-Meet",
    title: "Create Events",
    iconBefore: umeet,
    afterIcon: umeetSelected,
    color: "#649B8E",
    url: "umeet",
  },
];
export const data = [
  {
    name: "Chat",
    icon: chatIcon,
    url: "/chat-page",
  },
  {
    name: "Friends",
    icon: friendsIcons,
    url: null,
  },
  {
    name: "Notifications",
    icon: notificationIcons,
    url: null,
  },
];
