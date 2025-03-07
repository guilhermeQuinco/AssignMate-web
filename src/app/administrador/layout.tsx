import React, { PropsWithChildren } from "react";
import { SideBar } from "./_components/sidebar";
import { Header } from "./_components/header";

const LayoutDashboard = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-screen  text-white flex flex-row font-playfair">
      <SideBar />
      <div className="w-full flex flex-col ">
        <Header />
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
};

export default LayoutDashboard;
