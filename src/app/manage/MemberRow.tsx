import ContainerRow from "@/components/ContainerRow";
import { Typography, IconButton, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { FC, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";

interface MemberRowProps {
  memberName: string;
  onRemove: (memberIndex: number) => void;
  onBlur: (memberIndex: number, newValue: string) => void;
  memberIndex: number;
}

const MemberRow: FC<MemberRowProps> = ({
  memberName,
  onRemove,
  onBlur,
  memberIndex,
}) => {
  const [tempMemberStore, setTempMemberStore] = useState<string>(memberName);
  return (
    <ContainerRow
      sx={{
        gap: 2,
        flex: 1,
        display: "flex",
        alignItems: "center",
        paddingBottom: 2,
      }}
    >
      <TextField
        sx={{
          border: "solid 1px #ACB4FF",
          borderRadius: "10px",
          backgroundColor: "white",

          "& .MuiInputBase-input": {
            fontWeight: "bolder",
            px: 4,
            borderRadius: "10px",
          },
        }}
        value={tempMemberStore}
        onChange={(e) => setTempMemberStore(e.currentTarget.value)}
        onBlur={() => onBlur(memberIndex, tempMemberStore)}
      />
      <Box>
        <IconButton
          sx={{
            backgroundColor: "#5F6FFF",
            borderRadius: "5px",
            color: "red",
          }}
          onClick={() => onRemove(memberIndex)}
        >
          <ClearIcon />
        </IconButton>
      </Box>
    </ContainerRow>
  );
};

export default MemberRow;
