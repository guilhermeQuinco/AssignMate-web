import React from "react";
import Image from "next/image";
import bemvindo from "../../../../public/bg_bemvindo.png";

const Administrador = async () => {
  return (
    <div className=" p-8 flex justify-center ">
      <h1 className="text-center mt-24 text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] font-playfair tracking-[5px]">
        Bem-vindo
      </h1>

      <Image src={bemvindo} alt="bemvindo" fill priority />
    </div>
  );
};

export default Administrador;
