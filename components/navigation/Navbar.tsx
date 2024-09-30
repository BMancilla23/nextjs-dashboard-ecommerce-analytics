import { Session } from "next-auth";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Logo } from "./Logo";
import { MenuToggle } from "./MenuToggle";
import { ModeToggle } from "./ModeToggle";

type NavbarProps = {
  session: Session;
};

export const Navbar = ({ session }: NavbarProps) => {
  const user = session.user;

  // console.log("User image URL:", user?.image);

  return (
    <nav className="py-4 border-b sticky top-0 bg-white dark:bg-[#1C1B22] z-20">
      <div className="md:w-[95%] w-[92%] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Logo />
          <MenuToggle />
        </div>

        <div className="flex gap-8 items-center">
          <ModeToggle />
          <span className="max-md:hidden">Welcome Back {user?.name} 🖐</span>
          <Avatar>
            <AvatarImage src={user?.image ?? undefined} />
          </Avatar>
        </div>
      </div>
    </nav>
  );
};
