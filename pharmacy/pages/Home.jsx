import React, { useState,useEffect } from "react"
import Hero from "../components/Hero";
import Features from "../components/Features";
import Roles from "../components/Roles";
import GetingStarted from "../components/GetingStarted";

import API from "../api";
export default function Home() {
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
