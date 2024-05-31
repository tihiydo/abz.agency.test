"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { set, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useEffect, useState } from "react"
import axios from "axios"
import { Card } from "@/components/ui/card"

const formSchema = z.object
({
    name: z.string(),
})

const Page = () => {

  const [data, setData] = useState<any>()
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
        name: "",
    },
  })
 
  useEffect(() =>
  {
    getData()
  },[])

  const getData = async () =>
  {
    const position = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/positions`)
    setData(position.data.positions)
  }

  async function onSubmit(values: z.infer<typeof formSchema>) 
  {
    const request = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/positions`, values)
    await getData()
  }

  return (
    <div className='w-full flex justify-center'>
    <Card className='w-[80%] min-h-[88vh] p-[10rem] flex flex-col gap-y-4 justify-center items-center'>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full ">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Create Position</FormLabel>
                        <FormControl>
                            <Input placeholder="Position Name" {...field} />
                        </FormControl>
                        <FormDescription>
                        This is public display name.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
            )}
            />
                <Button type="submit">Create</Button>
            </form>
        </Form>
        <div className="flex gap-y-3 flex-col justify-center">
        {data?.map((el : any) => 
        {
            return <Button key={el.id}>{el.name}</Button>
        })}
        </div>
    </Card>
    </div>
  )
}
export default Page