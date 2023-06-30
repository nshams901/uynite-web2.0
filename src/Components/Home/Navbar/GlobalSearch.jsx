import React from 'react'
import ItemList from '../../common/ItemList';
import CatergorySection from '../CategorySection/CategorySection';
import { useState } from 'react';

const tabs = [
  { title: "Profile" },
  { title: "Photos" },
  { title: "Hashtag" },
];
const GlobalSearch = ({ data, handleListItem }) => {
  const [selectedOption, setSelectedOption] = useState({ title: 'Profile'})

  return (
    <div className="bg-white h-[400px] overflow-y-scroll absolute top-[60px] overflow-x-hidden">
      {/* <div>
        <CatergorySection
          data={tabs}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </div> */}
      {data?.map((item) => {
        return (
          <ItemList
            user
            item={item}
            handleListItem={() => handleListItem(item)}
          />
        );
      })}
    </div>
  )
}

export default GlobalSearch