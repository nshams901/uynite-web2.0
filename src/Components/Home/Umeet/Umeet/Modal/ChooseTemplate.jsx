import { AiOutlineCloseCircle } from 'react-icons/ai'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { HiUpload } from 'react-icons/hi'
import wishes from '../../../../../Assets/Images/Umeet/wishesTemplate.webp';
import { getReunionTemplates, createEventTemplate, getTemplateByEventid, getWeddingTemplates, getAnniversaryTemplates, getOthersTemplates, getBirthdayTemplates } from "../../../../../redux/actionCreators/umeetActionCreator";
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { config } from '../../../../../config/config';
import selectedOne from '../../../../../Assets/Images/Umeet/Umeet-Main/Umeet-Attending.png'

const ChooseTemplate = ({ onClose, saveTemplate, 
  selectedSpecificEvent, setTemplateSelected, handleTemplateSelected,
  handleSelectedImgFile, eventId, selectedImage, templateSelected }) => {  
  const [tempImages, setTempImages] = useState([])
  const [selectedImage1, setSelectedImage1] = useState(null)
  const [imgData, setImgData] = useState(null);
  const [state, setState] = useState({})
  const  { template} = state

  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(getTemplateByEventid())
  // }, [dispatch])
  const handleImageChange = (event) => {
    if (event?.target.files && event?.target.files[0]) {
      const image = event.target.files[0];
      handleSelectedImgFile(image)
      setSelectedImage1(URL.createObjectURL(image));
    }    
  }

  const handleUpload = () => {
    handleImageChange()   
  }

  const callTemp = (temps)=>{  
   const tempData = temps?.data?.map((data)=>{
    let temps = []
    let imgs = data?.tempdetail?.bgimage          
    return {...temps, imgs}
   })

   setTempImages(tempData)
  }   

  const handleTemp = async(item)=>{
    handleUpload();
    onClose()   
    if(selectedImage1){
      setTemplateSelected(selectedImage1);
    }else{          
      //handleImageChange(imgData);
      setTemplateSelected(imgData)
      const payload = {
      eventid:  eventId,
      textcolor: "0",
      bgimage: selectedImage,
      textstyle: "bold",
      category: selectedSpecificEvent,
      tempdetail: {
            "bgimage": imgData,
            "dateheadingcolor": "",
            "dateheadingstyle": "",
            "eventheadingcolor": "",
            "eventheadingstyle": "",
            "head1": "",
            "hosttextcolor": "",
            "hosttextstye": "",
            "locationtextcolor": "",
            "locationtextstyle": "",
            "textcolor": "#000000",
            "textstyle": "",
            "textstyles": ""
        },
    };
    //handleSelectedImgFile(file)
    dispatch(createEventTemplate(payload))
    }

    onClose() 
  }

  useEffect(()=>{
    if(selectedSpecificEvent == 'Re-Union'){
      dispatch(getReunionTemplates())
      .then(res => {
        setTempImages(res.data)
      })               
    }else if(selectedSpecificEvent == 'Birthday'){
      dispatch(getBirthdayTemplates())
      .then(res => {
        setTempImages(res.data)
      })                                    
    }else if(selectedSpecificEvent == 'Wedding'){
      dispatch(getWeddingTemplates())
      .then(res => {
        setTempImages(res.data)
      })               
    }else if(selectedSpecificEvent == 'Anniversary'){
      dispatch(getAnniversaryTemplates())
      .then(res => {
        setTempImages(res.data)
      })                                   
    }else if(selectedSpecificEvent == 'Others'){
      dispatch(getOthersTemplates())
      .then(res => {
        setTempImages(res.data)
      })                                    
    }else if(selectedSpecificEvent == 'Baby Shower'){
      dispatch(getOthersTemplates())
      .then(res => {
        setTempImages(res.data)
      })
    }

  }, [])

  return (
    <div className="fixed z-20 top-0 left-0 w-full h-full flex justify-center items-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
      <section className="w-[97%] md:w-[70%] lg:w-[46%] flex flex-col justify-betwee h-[94%] md:h-[87%] bg-white rounded-xl p-3">
        <div className="h-[85%]">
          <div className="flex justify-between items-center border-b pb-2 text-gray-600">
            <span className="text-[18px] text-gray-700">Choose Template</span>
            <label
              htmlFor="templateInput"
              className="px-5 py-1 flex font-medium items-center cursor-pointer rounded-md text-white border bg-[#649B8E]"
            >
              <input onChange={handleUpload}
                type="file"
                accept="image/*"
                className="hidden"
                id="templateInput"
              />
              <HiUpload className='h-4 w-5 mr-0.5'/>
              Upload              
            </label>
          </div>

          <div className={`h-[88%] ${selectedImage1 ? '' : 'overflow-y-scroll'} `}>
           <section className={`${selectedImage1 ? 'hidden' : ''} grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4`}>
            {tempImages?.map((data, i) => (
              <div
                key={i}
                className="flex flex-col justify-center py-3 px-3 items-center"
              >
                <img
                  src={data.tempdetail.bgimage}
                  onClick={()=>setImgData(data.id)}
                  className="h-52 cursor-pointer relative md:h-52 w-[150px] md:w-[130px] rounded object-cover"
                />
                {imgData === data.id && <img src={selectedOne} className='absolut flex justify-center left-10 h-5 w-5' />}
              </div>
            ))}
           </section>
           {selectedImage1 && (
            <section className='h-full mt-1'>
             <img src={selectedImage1} className='h-full object-cover rounded-xl w-full' />
            </section>
           )}
          </div>
        </div>

        <div className='h-[15%]'>
          <button 
            onClick={handleTemp}
            className="w-full py-1 rounded-md text-white border border-[#649B8E] bg-[#649B8E]">
            Save
          </button>
          <button
            onClick={onClose}
            className="w-full py-1 my-2 rounded-md  border border-[#649B8E]"
          >Cancel</button>
        </div>
      </section>
    </div>
  );
}

export default ChooseTemplate