import { AiOutlineCloseCircle } from 'react-icons/ai'
import { MdKeyboardArrowRight } from 'react-icons/md'
import wishes from '../../../../../Assets/Images/Umeet/wishesTemplate.webp';
// import createEventTemplate from '../../'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

const ChooseTemplate = ({ onClose, handleImageChange, saveTemplate }) => {
  const dispatch = useDispatch()
  const [state, setState] = useState({})
  const { templatesImage = [], templates = []} = state
  const handleUpload = (file) => {
    const payload = {
      eventid: "12",
      textcolor: "0",
      bgimage: "http",
      textstyle: "bold",
      category: "marrage",
    };
    // dispatch(createEventTemplate())
    setState({...state, templatesImage: [...templatesImage,file], templates: [...templates, URL.createObjectURL(file)]})
  }
  return (
    <div
      className="absolut fixed top-8 w-full h-full flex justify-center items-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
    >
      <div className="w-[98%] md:w-[70%] lg:w-[41%] flex flex-col justify-between min-h-[86%] bg-white rounded-xl p-3">
        <div className="">
          <div className="flex justify-between items-center border-b pb-2 text-gray-600">
            <span className="text-[18px] text-gray-700">Choose Template</span>
            <label
              htmlFor="templateInput"
              className="px-5 py-1 cursor-pointer rounded-md text-white border bg-[#649B8E]"
            >
              <input onChange={(e) => handleUpload(e.target.files[0])}
                type="file"
                accept="image/*"
                className="hidden"
                id="templateInput"
              />
              Upload
            </label>
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 2xl:grid-cols-5">
            {templates.map((data, i) => (
              <div
                key={i}
                className="cursor-pointer justify-center py-3 px-3 items-center"
              >
                <img
                  src={data}
                  onClick={handleImageChange}
                  className="h-36 w-[110px] rounded object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <button onClick={() => saveTemplate} className="w-full py-1 rounded-md text-white border border-[#649B8E] bg-[#649B8E]">
            Save
          </button>
          <button
            onClick={onClose}
            className="w-full py-1 my-2 rounded-md  border border-[#649B8E]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChooseTemplate