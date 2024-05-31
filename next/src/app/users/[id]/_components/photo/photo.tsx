"use client"

import React, { useEffect, useState } from 'react'
import UploadPhoto from './upload-photo'
import Image from 'next/image'
import axios from 'axios'

type Props = {}

const Photo = ({user, formData}: {user: any, formData: any}) => 
{
    const [file, setFile] = useState<File>()
    const [image, setImage] = useState<string>(`${process.env.NEXT_PUBLIC_API_URL}/photo/${user.photo}`)

    useEffect(() => 
    {
        if (file) 
        {
            const reader = new FileReader()
            reader.onloadend = () => 
            {
                setImage(reader.result as string)
            }
            reader.readAsDataURL(file)
            uploadPhoto(file)
        }
    }, [file])

    const uploadPhoto = async (file: File) =>
    {
        const FormDataOject = new FormData()
        Object.entries(formData).forEach(([key, value]) => 
        {
            FormDataOject.append(key, value as string);
        });
        FormDataOject.append('photo', file);
        const request = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users`, FormDataOject, 
        {
            headers: 
            {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    return (
        <div className='relative'>
            <img className='rounded-full' src={image} alt="" width={100} height={100}></img>
            <UploadPhoto handleFile={setFile} className="absolute bottom-2 right-2">
                A
            </UploadPhoto>
        </div>
    )
}

export default Photo