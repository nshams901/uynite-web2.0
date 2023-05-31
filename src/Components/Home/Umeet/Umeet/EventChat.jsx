import React,{ useState, useEffect } from 'react'
import Send from '../../../../Assets/Images/Umeet/Umeet-Main/U-Send.png'
import { BsCamera, BsImage } from 'react-icons/bs'
import '../Umeet.css'
import person from '../../../../Assets/Images/Person.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { addEventMessage, getAllEventChatMessage } from '../../../../redux/actionCreators/umeetActionCreator'
import axios from 'axios'

const EventChat = ()=>{
  const [postMessage, setPostmessage] = useState("")
  const [messages, setMessages] = useState([
    {
      message: "Hi, how are you?",
      sender: "them",
      timestamp: "11:30 AM",
    },
    {
      message: "I'm good, thanks. How about you?",
      sender: "me",
      timestamp: "11:31 AM",
    },
    {
      message: "I'm doing well too, thanks.",
      sender: "them",
      timestamp: "11:32 AM",
    },
  ]);


  const dispatch = useDispatch()
  const { umeetReducer } = useSelector(state=>state)
  
  const sendMessage = (message) => {
    const newMessage = {
      message: message,
      sender: "me",
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, newMessage]);
  };  

  const clickHandler = () => {
    dispatch(addEventMessage({ message: postMessage }))
    sendMessage(postMessage);
  }

  useEffect(()=>{
    //dispatch(getAllEventChatMessage(umeetReducer?.eventDetail?.id))
    (async function getMessages(){
    const response = await axios.get(
      `https://web.uynite.com/event/api/eventmessage/getallmessage/${umeetReducer?.eventDetail?.id}`
    );
    console.log(response)
    })()
  }, [])

  return (
    <div className="flex flex-col h-[580px] border rounded-lg pt-2 overflow-hidden border-gray-400 w-full">
      <div className="flex-1 hideScroll overflow-y-scroll">
        {messages.map((msg, i) => (
          <ChatBubble
            key={i}
            message={msg.message}
            sender={msg.sender}
            timestamp={msg.timestamp}
            value={postMessage.messages}
          />
        ))}
      </div>
      <div className="flex items-center bg-white">
        <BsCamera className='h-8 w-8 text-[#649B8E] mx-2' />
        <BsImage className='h-8 w-8 text-[#649B8E]' />
        <input
          type="text"
          placeholder="Add message here"
          className="w-full h-12 pl-2 outline-none bg-white"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage(e.target.value);
              e.target.value = "";
            }
          }}

          onChange={(e) => { setPostmessage(e.target.value); }}
        />
        <img src={Send} className='mr-2 h-10 w-10 cursor-pointer' onClick={clickHandler} />
      </div>
    </div>
  );
}

function ChatBubble({ message, sender, timestamp }) {
  return (
    <div
      className={`flex flex-col items-${sender}-end mb-4 mx-4`}
    >
      <div
        className={`flex items-center ${sender === "me" ? "justify-end" : "justify-start"
          } mb-1`}
      >
        <section className='flex flex-col'>
          {sender !== "me" && (
            <div className='flex items-center mb-1'>
              <img
                src={person}
                alt="sender profile pic"
                className="w-10 h-10 rounded-full mr-1 object-cover"
              />
              <p className='text-[#649B8E] italic text-[14px] font-semibold'>Ajaykumar</p>
            </div>
          )}
          <div
            className={`px-2 py-2 flex justify-between items-end rounded-lg ${sender === "me"
              ? "bg-white rounded-br-none"
              : "bg-white rounded-bl-none"
              }`}
          >
            <p>{message}</p>
            <span className='text-[9px] ml-2'>{timestamp}</span>
          </div>
        </section>
      </div>
    </div>
  );
 }

 export default React.memo(EventChat)