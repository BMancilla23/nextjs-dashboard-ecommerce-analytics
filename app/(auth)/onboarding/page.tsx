import { OnboardingForm } from "@/components/authenticate/OnboardingForm";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {
  const session = await auth();

  if (!session) redirect("/login");

  return (
    <div>
      <OnboardingForm session={session} />
    </div>
  );
}
