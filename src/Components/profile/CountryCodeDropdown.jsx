import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { BsChevronDown } from 'react-icons/bs'
import countryList from '../Login/Content/Signup/countryList';
import ReactCountryFlag from 'react-country-flag';
import { Input } from '@material-tailwind/react';

export default function CountryCodeDropdown({ label, flag, options, keyName, name, selectedValue, handleChange, labelClass }) {
    console.log(selectedValue, '?????????????????');
    const [state, setState] = useState({});
    const country = Object.values(countryList).map((elem) => Object.values(elem))?.[0];
    const { countryLists = country, inputVal} = state
    const handleCodeChange = (e) => {
        const { value} = e.target;
        const filterList = country.filter((item) => {
            const { name , code} = item;
            return name.toLowerCase().includes(value) || code.includes(value)
        })
        setState({ ...state, countryLists: filterList, inputVal: value})
    }

  return (
    <div className="w-full mb-2 items-center flex">
      {label && <div className={`mr-3 w-1/4 ${labelClass}`}>{label}</div>}
      <Listbox value={selectedValue} onChange={(value)=> {
        console.log(value)
      }}>
        <div className="relative w-full flex-1 mt-1">
          <Listbox.Button className="relative flex gap-2 border border-1 border-gray-300 cursor-pointer w-full rounded-md bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange sm:text-sm">
          <ReactCountryFlag svg countryCode={selectedValue.iso2} />
            <span className="block truncate">+{selectedValue?.[keyName] || name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <BsChevronDown />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
            className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <Input value={inputVal} className='outline-0' onChange={ handleCodeChange } />
                    {countryLists.map((itemsss) => (
                        <div
                          className="w-full px-3 hover:bg-gray-300 py-1 mb-1 flex cursor-pointer"
                          onClick={() => {
                            handleChange(itemsss)
                          }}
                        >
                          
                          <div>
                            <ReactCountryFlag svg countryCode={itemsss.iso2} />
                            <span className="px-2"> +{itemsss?.code}</span>
                          </div>
                        </div>
                      ))
                    }
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
