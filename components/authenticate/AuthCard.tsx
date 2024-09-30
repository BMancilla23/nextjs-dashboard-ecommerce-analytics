import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Logo } from "../navigation";
import { BackButton } from "./BackButton";

type AuthCardProps = {
  children: ReactNode;
  title: string;
  backButtonHref: string;
  backButtonLabel: string;
};

export const AuthCard = ({
  children,
  title,
  backButtonHref,
  backButtonLabel,
}: AuthCardProps) => {
  return (
    <Card className="max-w-[400px] mt-48 mx-auto">
      <CardHeader className="items-center gap-5">
        <Logo />
        <CardTitle className="text-md">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
};
