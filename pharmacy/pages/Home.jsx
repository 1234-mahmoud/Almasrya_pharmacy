import { useSelector } from "react-redux";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Roles from "../components/Roles";
import GetingStarted from "../components/GetingStarted";
import API from "../api";

export default function Home() {

const {isLoggedin} = useSelector(state=>state.auth)
  return (
    <div className="">
     <Hero/>
     <Features/>
    {isLoggedin? "":<Roles/>}
    <GetingStarted/>
    </div>
  );
}
