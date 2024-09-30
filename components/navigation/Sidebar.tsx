"use client";

import { useMenuStore } from "@/store/toggleMenuStore";
import { motion } from "framer-motion";
import { SidebarItem } from "./SidebarItem";
import { LogoutButton } from "../authenticate/LogoutButton";

export const Sidebar = () => {
  const { isOpen } = useMenuStore();
  return (
    <motion.aside
      initial={{
        width: isOpen ? 80 : 256,
      }}
      animate={{
        width: isOpen ? 80 : 256,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className={`sticky z-10 top-0 flex flex-col  items-center py-10  border-r max-md:max-w-[80px] ${
        isOpen ? "max-md:hidden gap-10" : "block justify-between"
      }`}
    >
      <h2 className={`text-sm max-md:hidden ${isOpen && "hidden"}`}>
        Main Menu
      </h2>
      <SidebarItem isOpen={isOpen} />
      <LogoutButton />
    </motion.aside>
  );
};
