import { Typography, IconButton, TextField, Stack, Card } from "@mui/material";
import { Box } from "@mui/system";
import { FC, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";

interface UpdateMemberNameProps {
  oldMemberName: string;
  newMemberName: string;
}

interface MemberRowProps {
  memberName: string;
  onRemove: (memberName: string) => void;
  onBlur: ({ oldMemberName, newMemberName }: UpdateMemberNameProps) => void;
}

const MemberRow: FC<MemberRowProps> = ({ memberName, onRemove, onBlur }) => {
  const [isEditing, setIssEditing] = useState<boolean>(false);
  const [tempMember, setTempMember] = useState<string>(memberName);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur({ oldMemberName: memberName, newMemberName: e.target.value });
    setIssEditing(false);
  };

  const handleRemove = () => {
    onRemove(memberName);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempMember(e.target.value);
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
            value={tempMember}
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
            {memberName}
          </Typography>
        </Card>
      )}
    </Stack>
  );
};

export default MemberRow;
