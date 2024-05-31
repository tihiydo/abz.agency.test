"use client"
import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';

type Props = {};

const Navbar = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Sheet open={open} onOpenChange={(e) => setOpen(e)} defaultOpen={open}>
      <SheetTrigger>
        <div
          className={twMerge(
            `fixed left-0 h-12 bg-[#78787852] w-full flex justify-center items-center backdrop-blur-sm uppercase transition-all duration-1000`,
            open ? "top-[-48px]" : "top-0"
          )}
        >
          Open
        </div>
      </SheetTrigger>
      <SheetContent side={'left'}>
        <div className="p-3 flex flex-col gap-y-2">
          <Link href={"/users"}><div className="cursor-pointer bg-[#f4f4f4] hover:bg-slate-200 hover:ml-1 rounded-sm p-2 pl-4">All users</div></Link>
          <Link href={"/create-user"}><div className="cursor-pointer bg-[#f4f4f4] hover:bg-slate-200 hover:ml-1 rounded-sm p-2 pl-4">Create user</div></Link>
          <Link  href={"/create-position"}><div className="cursor-pointer bg-[#f4f4f4] hover:bg-slate-200 hover:ml-1 rounded-sm p-2 pl-4">Create position</div></Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Navbar;
