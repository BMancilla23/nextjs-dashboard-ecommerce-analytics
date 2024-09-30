"use client";

import { useMenuStore } from "@/store/toggleMenuStore";
import { motion } from "framer-motion";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

export const MenuToggle = () => {
  const { isOpen, toggleMenu } = useMenuStore();

  return (
    <button onClick={toggleMenu}>
      <motion.div
        animate={{
          rotate: isOpen ? 360 : 0,
        }}
        transition={{ duration: 0.5 }}
      >
        {!isOpen ? <ChevronsLeft /> : <ChevronsRight />}
      </motion.div>
    </button>
  );
};
