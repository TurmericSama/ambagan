import MemberRow from "@/app/manage/MemberRow/MemberRow";
import { FC } from "react";
import { Stack, Typography, styled } from "@mui/material";
import HorizontalDivider from "@/components/HorizontalDivider";
import AddMemberRow from "@/app/dndkit/susComponents/AddMemberRow/AddMemberRow";
import {
  CreateSecondaryFunction,
  OnRemoveMemberInnerFunction,
  OnUpdateMemberInnerFunction,
} from "./KanbanBoard";
import { Member } from "@/app/dndkit/types";

const MemberColumn = styled(Stack)(({ theme }) => ({
  width: "350px",
  height: "500px",
  gap: theme.spacing(2),
  backgroundColor: "#FFF5C3",
  padding: theme.spacing(2),
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
  onAdd: CreateSecondaryFunction;
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
    <MemberColumn>
      <Typography variant="h5" fontWeight="bold">
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
