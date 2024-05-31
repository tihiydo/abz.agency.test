"use client"

import React, { useEffect, useState } from 'react'
import UploadPhoto from './upload-photo'
import Image from 'next/image'
import axios from 'axios'
import { useRouter } from 'next/navigation'

type Props = {}

const Photo = ({formData}: {formData: any}) => 
{
    const { push } = useRouter()
    const [file, setFile] = useState<File>()
    const [image, setImage] = useState<string>(`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==`)

    useEffect(() => 
    {
        if (file) 
        {
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

        if(request.status)
        {
            const reader = new FileReader()
            reader.onloadend = () => 
            {
                setImage(reader.result as string)
            }
            reader.readAsDataURL(file)
            push(`/users`)
        }
        return request
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