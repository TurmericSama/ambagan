import { IconButton, Stack } from "@mui/material";
import { FC, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Member } from "./types";
import StyledInput from "@/components/StyledInput";
import { OnRemoveMemberInnerFunction } from "./pageFunctions/removeMember";
import { OnUpdateMemberInnerFunction } from "./pageFunctions/updateMember";

interface MemberRowProps {
  member: Member;
  onRemove: OnRemoveMemberInnerFunction;
  onMemberUpdate: OnUpdateMemberInnerFunction;
}

interface AdornmentRendererProps {
  isDirty: boolean;
  isFocused: boolean;
  isHovered: boolean;
  handleRemoveMember: () => void;
  handleSaveMember: () => void;
}

const AdornmentRenderer: FC<AdornmentRendererProps> = ({
  isDirty,
  isFocused,
  isHovered,
  handleRemoveMember,
  handleSaveMember,
}) => {
  const nonPropagatingRemoveAction =
    (callback: () => void) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      callback();
    };

  const _handleRemoveMember = nonPropagatingRemoveAction(handleRemoveMember);
  const _handleSaveMember = nonPropagatingRemoveAction(handleSaveMember);

  const hasNoAction = !isFocused && !isHovered && !isDirty;
  if (hasNoAction) {
    return <></>;
  }

  if (isHovered && !isFocused) {
    return (
      <IconButton onClick={_handleRemoveMember}>
        <CloseIcon fontSize="large" sx={{ color: "red" }} />
      </IconButton>
    );
  }

  return (
    <Stack direction="row">
      <IconButton onClick={_handleRemoveMember}>
        <CloseIcon fontSize="large" sx={{ color: "red" }} />
      </IconButton>
      <IconButton onClick={_handleSaveMember}>
        <CheckIcon fontSize="large" sx={{ color: "green" }} />
      </IconButton>
    </Stack>
  );
};

const MemberRow: FC<MemberRowProps> = ({
  member,
  onRemove,
  onMemberUpdate,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [tempMember, setTempMember] = useState<Member>(member);

  const isDirty = member.memberName !== tempMember.memberName;

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onMemberUpdate({
      memberId: member.memberId,
      newMemberObject: {
        memberId: member.memberId,
        memberName: e.target.value,
      },
    });
  };

  const handleSave = () => {
    onMemberUpdate({
      memberId: member.memberId,
      newMemberObject: tempMember,
    });
  };

  const handleRemove = () => {
    onRemove({ memberId: member.memberId });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempMember({ ...member, memberName: e.target.value });
  };

  const handleEditEnter = () => {};

  return (
    <Stack
      gap={2}
      direction="row"
      mb={2}
      alignItems="center"
      onClick={() => {
        setIsFocused(true);
      }}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <StyledInput
        // ref={ref}
        onKeyDown={(e) => {
          if (e.key === "Enter" && tempMember.memberName.trim() !== "") {
            // handleAddMember();
          }
        }}
        onFocus={() => setIsFocused(true)}
        onBlurCapture={() => setIsFocused(false)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="dropshadow"
        value={tempMember.memberName}
        onChange={handleChange}
        onBlur={handleBlur}
        InputProps={{
          endAdornment: (
            <AdornmentRenderer
              isHovered={isHovered}
              isDirty={isDirty}
              isFocused={isFocused}
              handleRemoveMember={handleRemove}
              handleSaveMember={handleSave}
            />
          ),
        }}
      />
    </Stack>
  );
};

export default MemberRow;
