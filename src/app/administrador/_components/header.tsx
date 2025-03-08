"use client";

import { Bell, HelpCircle, LogOut, Settings, User } from "lucide-react";
import { useEffect, useState } from "react";

export function Header() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();
    const formattedDate = new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
    setCurrentDate(`Manaus, ${formattedDate}`);
  }, []);

  return (
    <header className="fixed z-10 h-fit w-full bg-[#415A77] shadow-md p-2 flex justify-between items-center border-b border-[#313056]">
      <div className="text-[#d9d9d9] font-medium text-lg font-playfair tracking-[3px] px-5">
        {currentDate}
      </div>
      <div className="flex items-center space-x-2">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <User className="w-6 h-6 text-[#d9d9d9]" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Bell className="w-6 h-6 text-[#d9d9d9]" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <HelpCircle className="w-6 h-6 text-[#d9d9d9]" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Settings className="w-6 h-6 text-[#d9d9d9]" />
        </button>
        <button className="p-2 hover:bg-red-100 rounded-full">
          <LogOut className="w-6 h-6 text-[#d9d9d9]" />
        </button>
      </div>
    </header>
  );
}
