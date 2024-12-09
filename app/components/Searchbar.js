"use client"
import React from 'react';
import { Input } from 'antd';
import { usePathname } from "next/navigation";

export default function Searchbar() {
  const pathname = usePathname()
  return (
    <div className="flex w-[100vw] fixed justify-between zIndex-[999] z-[999]   bg-[#F2EFEA] items-center">
      <h2 className="text-lg py-6 px-4 ">
        {pathname == "/dashboard" && "Over View"}
        {pathname == "/dashboard/event" && "Event"}{" "}
        {pathname == "/dashboard/event/expired" && "Expired Event"}{" "}
        {pathname == "/dashboard/event/active" && "Active Event"}
      </h2>
      <div className="py-6 px-4 ">
        <input
          className="outline-none w-[400px] h-8 px-2 py-2 rounded"
          type="search"
          placeholder="Search events,expired events,active...."
        />
      </div>
    </div>
  );
}
