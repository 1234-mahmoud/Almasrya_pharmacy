import React from "react";
import box from "../src/assets/box.svg";
import up_arrow from "../src/assets/up_arrow.svg";
import time from "../src/assets/time.svg";
import badge from "../src/assets/badge.svg";
export default function Features() {
  const feature = [
    {
      icon: box,
      icon_bg:"bg-blue-200",
      title: "Inventory Management",
      description:
        "Track stock levels, expiry dates, and reorder points efficiently",
    },
    {
      icon: up_arrow,
      icon_bg:"bg-green-200",
      title: "Sales Analytics",
      description: "Real-time insights into sales performance and trends",
    },
    {
      icon: time,
      icon_bg:"bg-purple-200",
      title: "Fast Processing",
      description:
        "Quick checkout and transaction processing for better service",
    },
    {
      icon: badge,
      icon_bg:"bg-orange-100",
      title: "Secure & Reliable",
      description: "Role-based access control and data encryption",
    },
  ];

  return (
   <section className=" bg-white">
     <div className="container m-auto px-2 md:px-10 py-10">
      <p className={`text-center font-bold text-xl md:text-2xl lg:text-3xl pb-10`}>Why Choose PharmaCare?</p>
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
         gap-5
        
        `}>
            {
                feature.map((f,idx)=>(
                    <div key={idx} className={` py-3 flex flex-col justify-center items-center gap-2`}>
                        <div className={`${f.icon_bg} w-15 h-15 flex justify-center items-center rounded-full`}>
                            <img src={f.icon} alt={f.icon} className={`w-10`}/>
                        </div>
                            <span className={`font-bold text-lg`}>{f.title}</span>
                            <p className={`text-center w-full md:w-70`}>{f.description}</p>
                    </div>
                ))
            }
        </div>
    </div>
   </section>
  );
}
