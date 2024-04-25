import React, { FC } from "react";
import ContainerColumn from "../../components/ContainerColumn";
import MemberRow from "./MemberRow";
import { Typography } from "@mui/material";

interface UpdateMemberNameProps {
  oldMemberName: string;
  newMemberName: string;
}

interface MemberRendererProps {
  memberNames: string[];
  removeMember: (memberName: string) => void;
  updateMemberName: ({
    oldMemberName,
    newMemberName,
  }: UpdateMemberNameProps) => void;
}

const MemberRenderer: FC<MemberRendererProps> = ({
  memberNames,
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
      {memberNames.map((memberName, index) => (
        <MemberRow
          key={index}
          memberName={memberName}
          onRemove={removeMember}
          onBlur={updateMemberName}
        />
      ))}
      {!memberNames.length && <Typography>No members added yet</Typography>}
    </ContainerColumn>
  );
};

export default MemberRenderer;
