import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { setSearchTerm } from '../store/slices/medicineSlice'
import search_pic from '../src/assets/search.svg'
export default function Search() {
  const medicines = useSelector(state=>state.medicine.medicines)
 const dispatch = useDispatch()



return (
   <div className={`border border-gray-400 px-3 py-2 rounded-md
            flex items-center gap-3
             transition-all ease-in-out duration-200 focus-within:outline-blue-500 focus-within:outline-2
            `}>
            <img src={search_pic} alt="" className="w-8"/>
            <input type="text" name="" id=""
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            placeholder="Search Medicines..." className={`w-full focus:outline-0 `}/>
          </div>
      
  )
}
