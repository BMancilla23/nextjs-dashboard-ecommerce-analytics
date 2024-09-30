import { TeamList } from "@/components/teams/TeamList";
import { getRoleStatus } from "@/server/actions/get-role-status";
import { auth } from "@/server/auth";
import db from "@/server/db";
import { TeamSchema } from "@/types/team-schema";
import { redirect } from "next/navigation";
import { z } from "zod";

export type Team = z.infer<typeof TeamSchema>;

export default async function TeamPage() {
  // const data: Team[] = [...teamData];

  const team = await db.user.findMany({});

  const session = await auth();
  if (!session) redirect("/");

  const role = await getRoleStatus();

  return (
    <div className="grid grid-cols-1">
      <TeamList data={team} role={role!} />
    </div>
  );
}
