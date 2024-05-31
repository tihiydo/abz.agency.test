"use client"

import React, { useEffect, useState } from 'react'
import axios from "axios"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Image from 'next/image'
import arrow from "@/assets/images/arrow.png"
import Link from 'next/link'
type Props = {}

const page = (props: Props) => 
{
    const [response, setResponse] = useState<any[]>([])
    const [page, setPage] = useState<number>(0)

    const getData = async (page: number) =>
    {
        const {data: responseData} = await axios(`${process.env.NEXT_PUBLIC_API_URL}/users?page=${page}`)
        setResponse(prevResponse => [...prevResponse, ...responseData.users])
    }

    const addData = () =>
    {
        const newPage = page + 1
        setPage(newPage)
        getData(newPage)
    }

    useEffect(() =>
    {
        getData(0)
    }, [])

    return (
        <div className='w-full flex justify-center'>
            <div className='w-[80%] flex gap-y-8 flex-col'>
                {response?.map((u : any) =>
                (
                    <Card key={u.id} className="h-[120px]">
                        <CardContent className='p-2 h-full flex'>
                            <div className='w-[100px] h-full flex justify-center items-center'>
                                <img className={"rounded-full"} src={`${process.env.NEXT_PUBLIC_API_URL}/photo/${u.photo}`} width={70} height={70} alt={""}></img>
                            </div>
                            <div className='w-full h-full flex justify-between py-5 pl-5'>
                                <div className='flex flex-col justify-between h-full'>
                                    <div className="font-bold text-2xl">{u.name}</div>
                                    <div>{u.email}</div>
                                </div>
                                <div className='cursor-pointer flex h-full w-[50px] justify-center items-center'>
                                    <Link href={`/users/${u.id}`}><Image src={arrow} alt="" height={40}></Image></Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                <div onClick={addData}>SHOW MORE</div>
            </div>
        </div>
    )
}

export default page
