import { Typography, IconButton, TextField, Stack, Card } from "@mui/material";
import { FC, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { UpdateMemberNameSecondaryProps } from "./pagefunctions";
import { Member } from "./types";

interface MemberRowProps {
  member: Member;
  onRemove: (memberId: string) => void;
  onBlur: ({
    oldMemberObject,
    newMemberObject,
  }: UpdateMemberNameSecondaryProps) => void;
}

const MemberRow: FC<MemberRowProps> = ({ member, onRemove, onBlur }) => {
  const [isEditing, setIssEditing] = useState<boolean>(false);
  const [tempMember, setTempMember] = useState<Member>(member);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur({
      oldMemberObject: member,
      newMemberObject: {
        memberId: member.memberId,
        memberName: e.target.value,
      },
    });
    setIssEditing(false);
  };

  const handleRemove = () => {
    onRemove(member.memberId);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempMember({ ...member, memberId: e.target.value });
  };

  return (
    <Stack
      gap={2}
      direction="row"
      mb={2}
      alignItems="center"
      onClick={() => {
        setIssEditing(true);
      }}
    >
      {isEditing ? (
        <Stack direction="row" gap={2} alignItems="center">
          <TextField
            value={tempMember.memberName}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
          />
          <IconButton onClick={handleRemove}>
            <ClearIcon />
          </IconButton>
        </Stack>
      ) : (
        <Card
          sx={{
            padding: 2,
            paddingX: 4,
            flex: 1,
            margin: "2px",
          }}
          className="dropshadow"
        >
          <Typography fontWeight="bold" variant="h5">
            {member.memberName}
          </Typography>
        </Card>
      )}
    </Stack>
  );
};

export default MemberRow;
