import { useState, useEffect } from "react";
import wishes from "../../../../Assets/Images/Umeet/wishesTemplate.webp";
import DetailsOfEvent from "./DetailsOfEvent";
import EventGuests from "./EventGuests";
import EventChat from "./EventChat";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { getEventDetails, getAllEventChatMessage } from "../../../../redux/actionCreators/umeetActionCreator";
import { useSelector, useDispatch } from "react-redux";
import '../Umeet.css'
import axios from 'axios'

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const EventDetails = ({
  myEvent, handleEditEvent,
  handleShareEvent, handleRvspModal, singleEvent,
  handleFeedbacks, setDeleteId, deleteId }) => {
  const [details, setDetails] = useState(true);
  const [guests, setGuests] = useState(false);
  const [chat, setChat] = useState(false);

  const dispatch = useDispatch();
  const { umeetReducer, profileReducer } = useSelector(state=>state)
  const [guestsList, setGuestsList] = useState([])
  const numberOfYes = guestsList?.filter(item=>item?.invities?.attend == '1').length
  //const numberOfYes = guestsList?.filter(item=>item?.invities?.attend == '1').length
  const numberOfNo = guestsList?.filter(item=>item?.invities?.attend == '2').length
  const numberOfMaybe = guestsList?.filter(item=>item?.invities?.attend == '3').length
  const NoOfGuests = { numberOfYes, numberOfNo, numberOfMaybe }
  const NoOfResponed = numberOfYes + numberOfNo + numberOfMaybe

  useEffect(()=>{
    (async function getData(){
      const response = await axios.get(`https://web.uynite.com/event/api/invities/getinvitietslist/${umeetReducer?.eventDetail?.id}`)
      console.log(response.data.data)
      setGuestsList(response.data.data)
    })()      
  }, [])    

  const eventDetail = umeetReducer?.eventDetail
    console.log(eventDetail)
  const handleDetails = ()=>{
    setDetails(true)
    setGuests(false)
    setChat(false)
  }

  const handleGuests = () => {
    setGuests(true)
    setDetails(false)    
    setChat(false)
  };

  const handleChat = () => {
    setChat(true)
    setDetails(false)
    setGuests(false)      
  };

  const showChat = eventDetail?.event_category?.toLowerCase().includes('feedback') || 
  eventDetail?.eventType?.toLowerCase().includes('politicalpartymeeting') || 
  eventDetail?.event_category?.toLowerCase().includes('politicalpartymeeting') || 
  eventDetail?.eventType?.toLowerCase().includes('feedback')

  const showFeedback = eventDetail?.event_category?.toLowerCase().includes('feedback') ||  
  eventDetail?.eventType?.toLowerCase().includes('feedback') 

  const showGuest = eventDetail?.event_category?.toLowerCase().includes('feedback') || 
  eventDetail?.eventType?.toLowerCase().includes('politicalpartymeeting') || 
  eventDetail?.eventType?.toLowerCase().includes('feedback') || eventDetail?.eventPrivacyType == 'Public'

  function RenderStatus() {
    if (details){
      return (
        <DetailsOfEvent
          myEvent={myEvent}
          NoOfGuests={NoOfGuests}
          NoOfResponed={NoOfResponed}
          handleEditEvent={handleEditEvent}
          handleShareEvent={handleShareEvent}
          handleFeedbacks={handleFeedbacks}
          eventDetail={eventDetail}
          guestsList={guestsList}
          setDeleteId={setDeleteId}
          deleteId={deleteId}
        />)
    }else if(guests){
     return <EventGuests guestsList={guestsList} NoOfGuests={NoOfGuests} NoOfResponed={NoOfResponed} />;
    }else if(chat){
     return <EventChat />;
    }     
  }

  return (
    <section
      className={`w-full mr-1 flex items-center ${chat ? "mb-3" : "mb-12"} `}
    >
      <div className="w-[96%] lg:w-[70%] xl:w-[60%] flex flex-col items-center">
        <div className="p-3 w-full bg-white rounded-xl">
          {eventDetail?.eventType ? <div className='flex rounded-xl justify-center text-[#649B8E] font-semibold text-xl pb-1'>{eventDetail?.eventType} Event</div> : null}         
          <h3 className="py-1 text-xl font-medium flex justify-center">
            {(eventDetail && eventDetail.eventName) ? eventDetail.eventName : (
              <div className='flex flex-col'>
               <p className='skeleton-text skeleton'></p>
               <p className='skeleton-text skeleton'></p>
              </div>)
            }
          </h3>
          {eventDetail?.event_category ? <div className='text-[15px] py-1'>{eventDetail?.event_category}</div> : null}
          {eventDetail?.eventfrndEducationType ? <div className='text-[14px]'>{eventDetail?.eventfrndEducationType}</div> : null}
          <div className="w-full overflow-hidden">
            {eventDetail ? 
             <img
              src={eventDetail ? eventDetail.eventTemplate : wishes}
              className="w-full h-[300px] lg:h-[400px] object-cover rounded-xl"
            /> : <div className='skeleton w-full h-[300px] rounded-xl object-cover'></div>
            }
            
          </div>
          <div className={`${(profileReducer?.profile?.id == umeetReducer?.eventDetail?.profile?.id) ? 'hidden' : ''} flex justify-center my-4`}>
            <button
              onClick={handleRvspModal}
              className={`${umeetReducer?.eventDetail?.eventstatus == 'Completed' ? 'bg-gray-100 text-gray-400' : 'text-white'} bg-[#649B8E] rounded-xl font-semibold py-1.5 px-10`}
              disabled={umeetReducer?.eventDetail?.eventstatus == 'Completed'}
            >{console.log(umeetReducer?.eventDetail?.eventstatus == 'Completed')}
              Send RSVP
            
            </button>
          </div>
        </div>

        <div className="p-2.5 my-3 flex w-full bg-white rounded-xl">
          <div
            onClick={handleDetails}
            className={`${details ? "bg-[#649B8E] text-white" : "bg-[#E4E4E4]"
              } rounded-lg flex justify-center py-1 px-4 w-1/3 cursor-pointer`}
          >
            Details
          </div>
          <div
            onClick={handleGuests}
            className={`${guests ? "bg-[#649B8E] text-white" : "bg-[#E4E4E4]"
              } ${showFeedback ? 'hidden' : ''} ${showGuest ? 'hidden' : ''} rounded-lg flex justify-center py-1 px-4 w-1/3 mx-2 cursor-pointer`}
          >
            Guests
          </div>
          <div
            onClick={handleChat}
            className={`${chat ? "bg-[#649B8E] text-white" : "bg-[#E4E4E4]"
              } ${showChat  ? 'hidden' : ''} ${showFeedback ? 'hidden' : ''} ${umeetReducer?.eventDetail?.eventType == 'Public' ? 'mx-2' : ''} rounded-lg flex justify-center py-1 px-4 w-1/3 cursor-pointer`}
          >
            Chat
          </div>
        </div>

        <RenderStatus />
        {myEvent && (
          <div className="w-full my-8 p-3 py-7 bg-white rounded-xl">
            <div className="flex justify-between font-semibold px-2 pb-4">
              <span>Suggested Ads</span>
              <span className="text-[#649B8E] cursor-pointer">View All</span>
            </div>
            <Carousel
              responsive={responsive}
              containerClass={`w-full pl-2 z-[1]`}
            >
              {[1, 2, 3, 4, 5, 6, 7]?.map((data, i) => (
                <img
                  id={data}
                  key={i}
                  src={wishes}
                  className="w-[250px] px-1 rounded-xl h-36 object-cover cursor-pointer"
                />
              ))}
            </Carousel>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventDetails;
