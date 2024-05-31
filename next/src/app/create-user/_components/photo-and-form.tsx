"use client"

import React, { useState } from 'react'
import UserForm from './form'
import Photo from './photo/photo'

type Props = {}

const PhotoAndForm = ({positions} : {positions: any,}) => 
{
    const [formData, setFormData] = useState()

    return (
        <div className='w-full h-full flex'>
            <div className='flex justify-center items-center h-full min-w-[130px]'>
                <Photo formData={formData}/>
            </div>
            <div className="pl-[100px] w-full">
                <UserForm positions={positions} setFormData={setFormData}/>
            </div>
        </div>
    )
}

export default PhotoAndForm