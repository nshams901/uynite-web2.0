import { Card, CardHeader, Typography } from '@material-tailwind/react'
import React from 'react'
import { Link } from 'react-router-dom'

const RealsLocation = () => {
    const list = [1, 2, 3]
    return (
        <div className='mx-4 overflow-scroll'>
            <div className='md:w-1/2'>
                <Typography className='text-center bg-white rounded-md py-2'>State name</Typography>
                {
                    list?.map((item) => {
                        return (
                            <Link to={`/user/videos/${676}?state`}>
                                <Card className='my-2'>
                                    <CardHeader>
                                        <img className='my-3 rounded-md' src='https://www.allrecipes.com/thmb/uJDZFx5hM3SlIEV7ZMa_avTaDu8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/BM_2847-c355f468b10146828d397e32d1b364a3.jpg' />
                                    </CardHeader>
                                </Card>
                            </Link>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default RealsLocation