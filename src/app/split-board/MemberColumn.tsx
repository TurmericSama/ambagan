import MemberRow from "./MemberRow";
import { FC } from "react";
import { Stack, Typography, styled } from "@mui/material";
import HorizontalDivider from "@/components/HorizontalDivider";
import AddMemberRow from "./AddMemberRow";

import { Member } from "./types";
import { OnRemoveMemberInnerFunction } from "@/app/split-board/pageFunctions/removeMember";
import { OnUpdateMemberInnerFunction } from "@/app/split-board/pageFunctions/updateMember";
import { OnCreateMemberInnerFunction } from "./pageFunctions/createMember";

const MemberColumn = styled(Stack)(({ theme }) => ({
  width: "350px",
  height: "500px",
  gap: theme.spacing(2),
  backgroundColor: "#FFF5C3",
  padding: theme.spacing(2),
  paddingTop: theme.spacing(4),
  borderRadius: theme.spacing(2),
  margin: "auto",
}));

interface OnMemberUpdateProps {
  oldMemberObject: Member;
  updatedMemberObject: Member;
}

export type OnMemberUpdate = ({
  oldMemberObject,
  updatedMemberObject,
}: OnMemberUpdateProps) => void;

interface RenderMemberColumnProps {
  members: any[];
  onAdd: OnCreateMemberInnerFunction;
  onMemberUpdate: OnUpdateMemberInnerFunction;
  onRemove: OnRemoveMemberInnerFunction;
}

const RenderMemberColumn: FC<RenderMemberColumnProps> = ({
  members,
  onAdd,
  onMemberUpdate,
  onRemove,
}) => {
  return (
    <MemberColumn className="dropshadow">
      <Typography variant="h5" fontWeight="bold" color="primary">
        Members
      </Typography>
      <Stack sx={{ flex: 1, overflowY: "auto" }}>
        {members?.map((member) => (
          <MemberRow
            key={member.memberId}
            member={member}
            onRemove={onRemove}
            onMemberUpdate={onMemberUpdate}
          />
        ))}
      </Stack>
      <HorizontalDivider />
      <AddMemberRow onAdd={onAdd} />
    </MemberColumn>
  );
};

export default RenderMemberColumn;
