"use client";

import { useMenuStore } from "@/store/toggleMenuStore";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  const { isOpen } = useMenuStore();
  return (
    <Link href={"/"} className="flex items-center gap-2">
      <Image src="/logo-icon.svg" alt="logo icon" width={30} height={30} />
      <AnimatePresence initial={false}>
        {!isOpen && (
          <motion.h1
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-xl font-semibold max-md:hidden whitespace-nowrap"
          >
            Nexa Dashboard
          </motion.h1>
        )}
      </AnimatePresence>
    </Link>
  );
};
