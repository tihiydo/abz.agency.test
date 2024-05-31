"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { useEffect } from "react"
import axios from "axios"

const formSchema = z.object
({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    position: z.string()
})

const UserForm = ({user, positions, setFormData} : {user: any, positions: any, setFormData: any}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        position: user.position.id
    },
  })
 

  async function onSubmit(values: z.infer<typeof formSchema>) 
  {
    const request = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users`, values, 
    {
        headers: 
        {
            'Content-Type': 'multipart/form-data',
        },
    });
  }

  const { watch, getValues } = form
  // Use effect to watch for form changes
  useEffect(() => {
    const subscription = watch((values) => 
    {
        setFormData(values)
    })
    return () => subscription.unsubscribe()
  }, [watch])

  useEffect(() => {
    const initialValues = form.getValues()
    setFormData(initialValues)
  }, [form, setFormData])

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full ">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormDescription>
                    This is public display name.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormDescription>
                        This is public email.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                        <Input placeholder="Phone" {...field} />
                    </FormControl>
                    <FormDescription>
                        This is public phone.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
            />
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => 
          (
            <FormItem>
                <FormLabel>Position</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                    <FormControl>
                        <SelectTrigger>
                        <SelectValue placeholder={`Select a user position`} />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {
                            positions.map((el : any) => 
                            (
                            <SelectItem key={el.id} value={String(el.id)}>{el.name}</SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
                <FormDescription>
                    This is public position
                </FormDescription>
                <FormMessage />
            </FormItem>
          )}
        />
            <Button type="submit">Submit</Button>
        </form>
    </Form>
  )
}
export default UserForm