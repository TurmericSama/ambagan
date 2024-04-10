import ContainerRow from "@/components/ContainerRow";
import { IconButton, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";
import CheckIcon from "@mui/icons-material/Check";

interface MemberRowProps {
  tempMember: string;
  onAddMember: (newMember: string) => void;
  onChange: (value: string) => void;
}

const AddMemberRow: FC<MemberRowProps> = ({
  tempMember,
  onAddMember,
  onChange,
}) => {
  return (
    <ContainerRow
      sx={{
        gap: 2,
        flex: 1,
        display: "flex",
        alignItems: "center",
        alignSelf: "end",
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
        value={tempMember}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
      <Box>
        <IconButton
          sx={{
            backgroundColor: "#5F6FFF",
            borderRadius: "5px",
            color: "lightgreen",
          }}
          onClick={() => onAddMember(tempMember)}
        >
          <CheckIcon />
        </IconButton>
      </Box>
    </ContainerRow>
  );
};

export default AddMemberRow;
