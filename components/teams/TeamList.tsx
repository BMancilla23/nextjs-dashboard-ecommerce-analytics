import React from "react";
import { TeamCard } from "./TeamCard";
import { Team } from "@/app/(admin)/team/page";

interface TeamListProps {
  data: Team[];
  role: boolean;
}

export const TeamList = ({ data, role }: TeamListProps) => {
  const approvedMembers = data.filter((member) => member.isApproved);

  const pendingMembers = data.filter((member) => !member.isApproved);

  return (
    <div className="space-y-10">
      <div>
        <h2 className="mb-4">Approved Members</h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {approvedMembers.map((member, index) => (
            <TeamCard
              member={member}
              key={index}
              isPending={false}
              role={role}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4">Pending Members</h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {pendingMembers.map((member, index) => (
            <TeamCard member={member} key={index} isPending={true} role={role} />
          ))}
        </div>
      </div>
    </div>
  );
};
