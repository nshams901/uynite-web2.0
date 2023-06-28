import React from 'react'
import ItemList from '../common/ItemList';
import { useState } from 'react';
import { Button, Tab, TabPanel, Tabs, TabsBody, TabsHeader, Typography } from '@material-tailwind/react';
import DropdownComp from '../common/DropdownComp';
import AutocompletePlace from '../googlemap/AutocompletePlace';

const data = [
    {
        label: 'My Reals',
        value: 'my-reals',
        desc: 'This is my reals tab'
    },
    {
        label: 'All Reals',
        value: 'all-reals',
        desc: 'This is all reals tab'
    }
]
const RealTabs = ({ handleMenu, selectedValue, handleLivePlace }) => {
    const [state, setState] = useState({})
    const { searchInput, usersList } = state
    const handleChange = (item) => {
        console.log(item.target.id, "PPPPPPPPPPPPP");

    }
    return (
        <div className='flex flex-col h-full relative'>

            <SearchBar handleChange={handleMenu} selectedValue={selectedValue} 
            handleLivePlace={handleLivePlace} />

            {/* TAB NAME */}
            {/* <div className='flex-1 gap-2 justify-center items-center'> */}
            <Tabs value="my-reals" orientation="vertical" className='md:flex justify-center items-center h-full'>
                <TabsHeader className=" md:flex-col items-center gap-3" >
                    {/* SEARCH BAR */}


                    {data.map(({ label, value }) => (
                        <Tab key={value} value={value} id={value} onClick={handleChange} >
                            {label}
                        </Tab>
                    ))}
                    <span>
                        <img className='w-10' src={'./images/realsSelected.png'} />
                    </span>
                </TabsHeader>
                {/* <TabsBody className='top-0'>
                        {data.map(({ value, desc }) => (
                            <TabPanel key={value} value={value} className="py-0">
                                {desc}
                            </TabPanel>
                        ))}
                    </TabsBody> */}
            </Tabs>
            
        </div>
    )
}

export default RealTabs;

function SearchBar({ handleChange, selectedValue, handleChangeLocation, handleLivePlace}) {
    const [state, setState] = useState({})
    const { searchInput, usersList } = state
    return (
        <>
            <div className='flex gap-4 items-center'>
                <div className="relative w-full flex h-[38px] items-center justify-center gap-2">
                    <AutocompletePlace
                        placeholder={'Search'}
                        handleChangeLocation={handleChangeLocation}
                        livePlace={handleLivePlace}
                    />

                    {/* <img
                        src="./images/Search.png"
                        alt=""
                        className="w-5 h-5 cursor-pointer absolute right-4"
                    /> */}
                    {searchInput && (
                        <div className="bg-white h-[400px] overflow-y-scroll overflow-x-hidden">
                            {usersList?.map((item) => {
                                return (
                                    <ItemList
                                        user
                                        item={item}
                                        handleListItem={() => handleListItem(item)}
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>
                <div className='ml-auto'>
                    <DropdownComp
                        label={'View'}
                        options={[{ name: 'Map'}, { name: 'List'}]}
                        selectedValue={ selectedValue }
                        keyName={'name'}
                        handleChange={handleChange}
                    />
                </div>
            </div>
        </>

    )
}