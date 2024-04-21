"use client";

import React, { useState } from "react";
import Image from "next/image";

function HomeBanner() {
  const [currentCoverIndex, setCurrentCoverIndex] = useState(0);
  const bannerCoverSrc = [
    "/img/cover4.jpg",
    "/img/cover3.jpg",
    "/img/cover2.jpg",
    "/img/cover1.jpg",
  ];

  const changeCover = () => {
    const nextIndex = (currentCoverIndex + 1) % bannerCoverSrc.length;
    setCurrentCoverIndex(nextIndex);
  };

  return (
    <div className="fixed inset-0 overflow-hidden" onClick={changeCover}>
    <div className="absolute inset-0">
      <Image
        src={bannerCoverSrc[currentCoverIndex]}
        alt="cover"
        layout="fill"
        objectFit="cover"
        className="w-full h-full"
      />
    </div>
    <div className="absolute inset-0 flex items-center justify-center text-center text-white z-20">
      <div>
        <h1 className="text-4xl font-bold">Welcome to our services</h1>
        <h3 className="text-xl mt-5">Have a great time here!</h3>
      </div>
    </div>
  </div>
  
  
  );
}

export default HomeBanner;
