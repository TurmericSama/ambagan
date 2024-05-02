import { IconButton, TextField, Stack, styled } from "@mui/material";
import { FC, useState, FocusEvent, useRef } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { AddNewMemberSecondaryProps } from "./pagefunctions";

interface MemberRowProps {
  onAdd: ({ memberName }: AddNewMemberSecondaryProps) => void;
}

const AddMemberRow: FC<MemberRowProps> = ({ onAdd }) => {
  const [tempMember, setTempMember] = useState<string>("");
  const [blur, setBlur] = useState<boolean>(false);
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setBlur(true);
  };

  const ref = useRef<HTMLInputElement>(null);

  const resetTempMember = () => {
    setTempMember("");
  };

  const handleAddMember = () => {
    onAdd({ memberName: tempMember });
    resetTempMember();
  };
  return (
    <Stack gap={2} direction="row" alignItems="center">
      <StyledInput
        ref={ref}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAddMember();
          }
        }}
        className="dropshadow"
        value={tempMember}
        onChange={(e) => setTempMember(e.target.value)}
        onFocus={() => setBlur(false)}
        onBlur={handleBlur}
        InputProps={{
          endAdornment: (
            <IconButton
              sx={{ display: tempMember === "" || !blur ? "none" : "block" }}
              onClick={handleAddMember}
            >
              <CheckIcon fontSize="large" sx={{ color: "green" }} />
            </IconButton>
          ),
        }}
      />
    </Stack>
  );
};

export default AddMemberRow;

const StyledInput = styled(TextField)(({ theme }) => ({
  border: "solid 1px #ACB4FF",
  borderRadius: "10px",
  backgroundColor: "white",

  "& .MuiInputBase-input": {
    fontWeight: "bolder",
    fontSize: "1.5rem",
    px: 4,
    borderRadius: "10px",
    paddingLeft: theme.spacing(4),
  },
  flex: 1,
}));
