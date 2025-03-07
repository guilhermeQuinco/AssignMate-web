"use client";
import { useState, useEffect } from "react";
import { User, Bell, HelpCircle, Settings, LogOut } from "lucide-react";
import React from "react";
import Image from "next/image";
import bemvindo from "../../../../public/bg_bemvindo.png";

const Administrador = () => {
  return (
    <div className=" flex flex-col">
      <div className=" p-8 flex justify-center relative w-full h-screen overflow-hidden">
        <h1 className="text-center mt-24 text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] font-playfair tracking-[5px]">
          Bem-vindo
        </h1>
        <Image src={bemvindo} alt="bemvindo" fill priority />
      </div>
    </div>
  );
};

export default Administrador;
