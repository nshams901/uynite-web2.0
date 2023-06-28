import { GoogleMap } from '@react-google-maps/api'
import React from 'react'
import RealsList from './RealsList';

const RealContent = ( { type, location = {lat: 0, lng: 0} }) => {
    const containerStyle = {
        width: '100%',
        height: '100%',
        // display: 'none'
      };
      
      const center = {
        lat: 28.7041,
        lng: 77.1025
      };

  return (
    <div className='w-full h-full md:ml-6'>
        {
        type.name === 'Map' ?
        <GoogleMap
             id="searchbox-example"
            mapContainerStyle={containerStyle}
            zoom={location ? 12 : 3}
            center={location || center}
        />
        :
        <RealsList />
        }
    </div>
  )
}

export default RealContent