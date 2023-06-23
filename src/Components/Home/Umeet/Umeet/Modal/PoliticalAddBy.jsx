import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEmailToList, allEmailInvites } from "../../../../../redux/actionCreators/umeetActionCreator";
import axios from 'axios'
import { toast } from 'react-toastify'

export default function PoliticalAddBy({ onClose, whichBy, 
   countryId, country, setInvitesPlace }) {

  const [addByMail, setAddByMail] = useState(false)
  const [addEmail, setAddEmail] = useState("") 
  const [data, setData] = useState([])
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')   
  const [filteredStateList, setFilteredStateList] = useState(null)
  const [filteredDistrictList, setFilteredDistrictList] = useState(null)
  const [filteredLoksabhaList, setFilteredLoksabhaList] = useState(null)
  const [filteredAssemblyList, setFilteredAssemblyList] = useState(null)

  const dispatch = useDispatch()
  const { emailList } = useSelector((state) => state.umeetReducer)

  const onHandleEmailChange = (event) => {
    setAddEmail(event.target.value);
  }

  const onHandleAddEmail = () => {
    const emailData = {
      umail: addEmail,
      eventname: "event",
    }
    dispatch(addEmailToList(emailData));
    setAddEmail("")
    console.log("emailData", emailData);
  }

  const onAddInvitesClick = async()=>{
    await setInvitesPlace(selectedCheckboxes)
    
    onClose()
  }

  const handleCheckboxChange = (event) => {
    const value = event.target.value;

    if (event.target.checked) {
      setSelectedCheckboxes([...selectedCheckboxes, value]);
    } else {
      setSelectedCheckboxes(selectedCheckboxes.filter(item => item !== value));
    }
  }

  const handleSelectAllChange = (event) => {
    const checked = event.target.checked;

    setSelectAll(checked);

    if (checked) {
      if(whichBy == 'State'){
        const allOptions = data?.map(option => option.state);
        setSelectedCheckboxes(allOptions);
      }else if(whichBy == 'District'){
        const allOptions = data?.map(option => option.distric);
        setSelectedCheckboxes(allOptions);
      }else if(whichBy == 'Loksabha'){
        const allOptions = data?.map(option => option.loksabha);
        setSelectedCheckboxes(allOptions);
      }else if(whichBy == 'Assembly'){
        const allOptions = data?.map(option => option.assembly);
        setSelectedCheckboxes(allOptions);
      }
    } else {
      setSelectedCheckboxes([]);
    }
  }

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter the data based on the search query
    if(whichBy == 'State'){
      console.log('jk')
      const filtered = data?.filter(item =>
       item?.state?.toLowerCase().includes(query.toLowerCase())
      );
      console.log(filtered)
      setFilteredStateList(filtered)
    }else if(whichBy == 'District'){
      const filtered = data?.filter(item =>
       item?.distric?.toLowerCase().includes(query.toLowerCase())
      );

      setFilteredDistrictList(filtered)
    }else if(whichBy == 'Loksabha'){
      const filtered = data?.filter(item =>
       item?.loksabha?.toLowerCase().includes(query.toLowerCase())
      );

      setFilteredLoksabhaList(filtered)
    }else if(whichBy == 'Assembly'){
      const filtered = data?.filter(item =>
       item?.assembly?.toLowerCase().includes(query.toLowerCase())
      );

      setFilteredAssemblyList(filtered)
    }
  }  

  useEffect(() => {
    if(country && whichBy == 'State'){
      (async()=>{
        const { data } = await axios.get(
        `https://web.uynite.com/api/user/country/getstate/${countryId}`)

        console.log(data)
        setData(data?.data)
        setFilteredStateList(data?.data)
      })().catch(err=>toast.error(err.message))
    }
    
    if(country && whichBy == 'District'){
      (async()=>{
        const postData = {
          "citytype":"DISTRICT",
          "countrycode": countryId
        }
        const { data } = await axios.post(
        `https://web.uynite.com/profile/api/country/citytype`,
        postData)

        console.log(data)
        setData(data?.data)
        setFilteredDistrictList(data?.data)
      })().catch(err=>toast.error(err.message))
    }    

    if(country && whichBy == 'Loksabha'){
      (async()=>{
        const postData = {
          "citytype":"LOCKSABHA",
          "countrycode": countryId
        }
        const { data } = await axios.post(
        `https://web.uynite.com/profile/api/country/citytype`,
        postData).catch(err=>toast.error(err.message))

        console.log(data)
        setData(data?.data)
        setFilteredLoksabhaList(data?.data)
      })()
    }    

    if(country && whichBy == 'Assembly'){
      (async()=>{
        const postData = {
          "citytype":"ASSEMBLY",
          "countrycode": countryId
        }
        const { data } = await axios.post(
        `https://web.uynite.com/profile/api/country/citytype`,
        postData)

        console.log(data)
        setData(data?.data)
        setFilteredAssemblyList(data?.data)
      })().catch(err=>toast.error(err.message))
    }

    // if(whichBy == 'Assembly'){
    //   setAll(data?.data)
    // }   
  }, [country])

  return (
    <section className="h-full">
      <div className="flex justify-between font-semibold my-1">
        <span
          onClick={() => setAddByMail(false)}
          className={`${
            addByMail ? "border text-[#649b8e]" : "bg-[#649b8e] text-white"
          } cursor-pointer flex justify-center rounded-lg mx-1 w-1/2 px-1 border-[#649b8e] py-1`}
        >
          Add By {whichBy}
        </span>
        <span
          onClick={() => setAddByMail(true)}
          className={`${
            addByMail ? "bg-[#649b8e] text-white" : ""
          } border text-[#649b8e] w-1/2 cursor-pointer flex justify-center rounded-lg mx-1 border-[#649b8e] px-1 py-1`}
        >
          Add By Phone/Email
        </span>
      </div>

      {addByMail ? (
        <section className="h-[52%] lg:h-[61%] 2xl:h-[63%]">
          <div className="flex items-center my-3">
            <input
              value={addEmail}
              type="email"
              onChange={onHandleEmailChange}
              className="w-full outline-none bg-gray-200 border border-gray-200 rounded-lg h-9 pl-1"
              placeholder="Entre Email Address"
            />
            <button
              className="px-4 py-1.5 text-sm rounded-md text-white ml-1 border bg-[#649B8E]"
              onClick={onHandleAddEmail}
            >
              Add
            </button>
          </div>

          <div className='flex items-center pb-3 border-b border-gray-300'>  
           <select className='bg-gray-200 mr-2 outline-none h-9 rounded-lg px-2 border border-gray-200'>          
            <option>+91</option>
            <option>USA</option>
           </select>      
          <input className='w-full outline-none bg-gray-200 border border-gray-200 rounded-lg h-9 pl-1' placeholder='9879867543' />
          <button className='px-4 py-1.5 text-sm rounded-md text-white ml-1 border bg-[#649B8E]'>Add</button>
         </div>

          {emailList?.map((email) => (
            <div>{email?.umail}</div>
          ))}
        </section>
      ) : (
        <>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
            className='w-full h-9 outline-none border border-gray-300 rounded-lg my-1.5 pl-2 bg-gray-50'
          />

          <div className="flex pb-1.5 border-b items-center">
            <input 
             type="checkbox"
             //id="selectAll" 
             className="w-5 h-5"
             checked={selectAll}
             onChange={handleSelectAllChange}
           />
            <label
              htmlFor="selectAll"
              className="ml-5 flex items-center text-[17px] text-gray-700"
            >
              Select All
            </label>
          </div>

          <div className="h-[52%] 2xl:h-[59%] overflow-y-scroll">
            {filteredStateList && filteredStateList?.map((data, i) => (
              <div key={i} className="flex items-center my-2.5">
                <input
                  value={data?.state}
                  type="checkbox"
                  id={data?.state}
                  className="w-5 h-5"
                  checked={selectedCheckboxes.includes(data?.state)}
                  onChange={handleCheckboxChange}                                    
                />
                <label
                  htmlFor={data?.state}
                  className="ml-5 text-[17px] text-gray-700"
                >
                  {data?.state}
                </label>
              </div>
            ))}
            
            {filteredDistrictList && filteredDistrictList?.map((data, i) => (
              <div key={i} className="flex items-center my-2.5">
                <input
                  value={data?.distric}
                  type="checkbox"
                  id={data?.distric}
                  className="w-5 h-5"
                  checked={selectedCheckboxes.includes(data?.distric)}
                  onChange={handleCheckboxChange}
                />
                <label
                  htmlFor={data?.distric}
                  className="ml-5 text-[17px] text-gray-700"
                >
                  {data?.distric}
                </label>
              </div>
            ))}    
             
            {filteredLoksabhaList && filteredLoksabhaList?.map((data, i) => (
              <div key={i} className="flex items-center my-2.5">
                <input
                  value={data?.loksabha}
                  type="checkbox"
                  id={data?.loksabha}
                  className="w-5 h-5"
                  checked={selectedCheckboxes.includes(data?.loksabha)}
                  onChange={handleCheckboxChange}
                />
                <label
                  htmlFor={data?.loksabha}
                  className="ml-5 text-[17px] text-gray-700"
                >
                  {data?.loksabha}
                </label>
              </div>
            ))}    
              
            {filteredAssemblyList && filteredAssemblyList?.map((data, i) => (
              <div key={i} className="flex items-center my-2.5">
                <input
                  value={data?.assembly}
                  type="checkbox"
                  id={data?.assembly}
                  className="w-5 h-5"
                  checked={selectedCheckboxes.includes(data?.assembly)}
                  onChange={handleCheckboxChange}
                />
                <label
                  htmlFor={data?.assembly}
                  className="ml-5 text-[17px] text-gray-700"
                >
                  {data?.assembly}
                </label>
              </div>
            ))}                         
          </div>
        </>
      )}
      <div className="flex mx-6 my-2">
        <button  
         className="py-2 bg-[#649b8e] m-1 font-semibold text-white rounded-lg w-full" 
         onClick={onAddInvitesClick}>
        Add Invities
        </button>
        <button
          onClick={onClose}
          className="py-2 border border-[#649b8e] m-1 font-semibold rounded-lg w-full"
        >
          Cancel
        </button>
      </div>
    </section>
  );
}
