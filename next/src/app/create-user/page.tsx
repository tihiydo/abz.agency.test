import { Card, CardContent } from '@/components/ui/card'
import React, { useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import UserForm from './_components/form'
import Photo from './_components/photo/photo'
import PhotoAndForm from './_components/photo-and-form'

type Props = 
{
    params:
    {
        id: string
    }
}

const page = async ({params: {id}}: Props) => 
{
    const {data: responsePositions} = await axios(`${process.env.NEXT_PUBLIC_API_URL}/positions`)
    const { positions } = responsePositions

    return (
        <div className='w-full flex justify-center'>
            <Card className='w-[80%] min-h-[88vh]'>
                <CardContent className='p-6 w-full h-full'>
                    <PhotoAndForm positions={positions}/>
                </CardContent>
            </Card>
        </div>
    )
}

export default page