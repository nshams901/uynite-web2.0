import React from 'react'
import Input from '../../input/input'
import Dropdown from '../../Login/Content/Modal/Dropdown'
import { useSelector } from 'react-redux'

const OrganizationAccount = ({ handleChange, orgDetail}) => {
  const reducerData = useSelector((state) => {
    return {
      orgCategory: state.userReducer.orgCategory
    }
  })
  const {orgCategory} = reducerData;
  const { org, website, address, intro, orgname, businesscategory } = orgDetail;
  console.log(orgDetail, "++++++++");

  return (
    <div>
      <div className="mb-6 text-white ps-4 py-2 mt-6 text-[20px] bg-[#7991bd]">
        Professional Detail:
      </div>
      <Input
        classes={"flex"}
        label={"Organization Name"}
        attributes={{
          name: "orgname",
          onChange: (e) => handleChange(e.target.name, e.target.value),
          placeholder: "Organization Name",
          value: orgname,
        }}
      />
      <Dropdown
        options={orgCategory}
        keyName={"category"}
        label={"Organization Type"}
        name={"Organization Type"}
        style={"w-[74%] my-2"}
        selectedValue={businesscategory}
        handleChange={(value) =>
          handleChange("businesscategory", value.category)
        }
      />
      <Input
        attributes={{
          name: "website",
          onChange: (e) => handleChange(e.target.name, e.target.value),
          placeholder: "website",
          value: website,
        }}
        classes={"flex"}
        label={"Website"}
      />
      <Input
        classes={"flex my-2"}
        attributes={{
          name: "address",
          onChange: (e) => handleChange(e.target.name, e.target.value),
          placeholder: "Organization Name",
          value: address,
        }}
        label={"Address"}
      />

      <Input
        classes={"my-2"}
        attributes={{
          type: "textarea",
          placeholder: "Write your intro...",
          onChange: (e) => handleChange(e.target.name, e.target.value),
          name: "intro",
          value: intro,
        }}
      />
    </div>
  );
}

export default OrganizationAccount