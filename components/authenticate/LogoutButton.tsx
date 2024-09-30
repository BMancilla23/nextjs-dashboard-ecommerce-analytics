import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { useMenuStore } from "@/store/toggleMenuStore";
import { signOut } from "next-auth/react";

export const LogoutButton = () => {
  const { isOpen } = useMenuStore();

  return (
    <div>
      <Button asChild onClick={() => signOut()}>
        <Link href={"/"} className="flex gap-2">
          <LogOut />
          <span
            className={`${!isOpen && "max-md:hidden"} ${isOpen && "hidden"}`}
          >
            Logout
          </span>
        </Link>
      </Button>
    </div>
  );
};
