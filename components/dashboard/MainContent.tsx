"use client";

import { useMenuStore } from "@/store/toggleMenuStore";
import { ReactNode } from "react";

export const MainContent = ({ children }: { children: ReactNode }) => {
  const { isOpen } = useMenuStore();

  return (
    <div
      className={`transition-all duration-300 ease-in-out p-4 w-full ${
        isOpen
          ? "md:ml-20 ml-0 w-[calc(100%-80px)]"
          : "ml-20 md:ml-64 w-[calc(100%-80px)] md:w-[calc(100%-256px)]"
      }`}
    >
      {children}
    </div>
  );
};
