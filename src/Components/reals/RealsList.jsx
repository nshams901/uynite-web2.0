import React from 'react';
import {
    List,
    ListItem,
    ListItemSuffix,
    Card,
    IconButton,
} from "@material-tailwind/react";
import ItemList from '../common/ItemList';

const RealsList = () => {
    const reals = [1, 2, 3]
    return (
        <>
            <div className='w-full md:w-1/2 mt-2'>
                {
                    reals?.map((item) => {
                        return (
                            <ItemList
                                name={'State'}
                                value={'D80'}
                            />
                        )
                    })
                }
            </div>

        </>
    )
}

export default RealsList