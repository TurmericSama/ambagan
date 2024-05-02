import React, { FC } from "react";
import ContainerColumn from "../../components/ContainerColumn";
import MemberRow from "./MemberRow";
import { Typography } from "@mui/material";
import { Member } from "./types";
import { UpdateMemberNameSecondaryProps } from "./pagefunctions";

interface MemberRendererProps {
  members: Member[];
  removeMember: (memberId: string) => void;
  updateMemberName: ({
    oldMemberObject,
    newMemberObject,
  }: UpdateMemberNameSecondaryProps) => void;
}

const MemberRenderer: FC<MemberRendererProps> = ({
  members,
  removeMember,
  updateMemberName,
}) => {
  return (
    <ContainerColumn
      sx={{
        maxHeight: "70%",
        minHeight: "50%",
        height: "70%",
        overflow: "auto",
      }}
    >
      {members.map((member, index) => (
        <MemberRow
          key={index}
          onRemove={removeMember}
          onBlur={updateMemberName}
          member={member}
        />
      ))}
      {!members.length && <Typography>No members added yet</Typography>}
    </ContainerColumn>
  );
};

export default MemberRenderer;
