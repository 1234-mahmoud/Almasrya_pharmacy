import React, { useState,useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { setRole } from "../store/slices/roleSlice";
// import Admin from "./Admin";
// import Cashier from "./Cashier";
// import User from "./User";

import Hero from "../components/Hero";
import Features from "../components/Features";
import Roles from "../components/Roles";
import GetingStarted from "../components/GetingStarted";

import API from "../api";
export default function Home() {
  // const role = useSelector((state) => state.role.role);
  // const dispatch = useDispatch();

  const [data,setData] = useState("");
  useEffect(()=>{
    API.get("/").then((res)=>setData(res.data.message))
  })

  return (
    <div className="">
     <Hero/>
     <Features/>
     <Roles/>
    <GetingStarted/>
    {data}
    </div>
  );
}
