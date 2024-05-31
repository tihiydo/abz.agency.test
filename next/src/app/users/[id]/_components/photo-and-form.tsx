"use client"

import React, { useState } from 'react'
import UserForm from './form'
import Photo from './photo/photo'

type Props = {}

const PhotoAndForm = ({user, positions} : {user: any,positions: any,}) => 
{
    const [formData, setFormData] = useState()

    return (
        <div className='w-full h-full flex'>
            <div className='flex justify-center items-center h-full min-w-[130px]'>
                <Photo user={user} formData={formData}/>
            </div>
            <div className="pl-[100px] w-full">
                <UserForm user={user} positions={positions} setFormData={setFormData}/>
            </div>
        </div>
    )
}

export default PhotoAndForm