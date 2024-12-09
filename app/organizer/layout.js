import React from 'react'
import Sidebar from "../components/Sidebar.js"
import Searchbar from '../components/Searchbar.js';

export default function layout({children}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className='flex flex-col'> <Searchbar/> {children}</div>
    </div>
  );
}
