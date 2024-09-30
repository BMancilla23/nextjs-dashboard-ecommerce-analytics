import { TooltipContent } from "@radix-ui/react-tooltip";
import { motion } from "framer-motion";
import { Component, House, Package, Shirt, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tooltip, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

const sidebarItems = [
  { href: "/", label: "Overview", icon: House },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/orders", label: "Orders", icon: Package },
  { href: "/products", label: "Products", icon: Shirt },
  { href: "/team", label: "Team", icon: Component },
];

export const SidebarItem = ({ isOpen }: { isOpen: boolean }) => {
  const pathname = usePathname();

  const linkVariants = {
    active: {
      backgroundColor: "#7c3aed",
      color: "#ffff",
      scale: 1.05,
    },
    inactive: {
      backgroundColor: "transparent",
      color: "inherit",
      scale: 1,
    },
  };

  return (
    <TooltipProvider>
      <ul className="flex flex-col justify-center gap-10">
        {sidebarItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            (pathname.includes(href) && href.length > 1) || pathname === href;

          return (
            <li key={href}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={href}>
                    <motion.div
                      variants={linkVariants}
                      className="flex gap-4 items-center py-1 rounded-md px-4"
                      animate={isActive ? "active" : "inactive"}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon size={23} className="mb-1" />
                      <span className={`max-md:hidden ${isOpen && "hidden"}`}>
                        {label}
                      </span>
                    </motion.div>
                  </Link>
                </TooltipTrigger>
                {isOpen && (
                  <TooltipContent
                    align="center"
                    side="right"
                    className="dark:bg-primary dark:text-white bg-white ml-2 p-2 rounded-md shadow-lg text-sm"
                    asChild
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p>{label}</p>
                    </motion.div>
                  </TooltipContent>
                )}
              </Tooltip>
            </li>
          );
        })}
      </ul>
    </TooltipProvider>
  );
};
