import { FC } from "react";
import {
  Avatar,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  styled,
} from "@mui/material";
import { Member } from "@/app/split-board/types";
import useGenericDialogControls from "@/hooks/useGenericDialogControls";
import { useTheme } from "@mui/material/styles";

const StackingContainer = styled(Stack)(({ theme }) => ({
  "& > :not(:first-of-type)": {
    marginLeft: -theme.spacing(2),
  },
  "& > :hover": {
    zIndex: 1,
  },
  alignItems: "flex-end",
  ":hover": {
    backgroundColor: theme.palette.grey[500],
  },
  transition: "background-color 0.3s ease",
  padding: theme.spacing(0.8),
  borderRadius: theme.shape.borderRadius,
}));

const StyledAvatar = styled(Avatar)(({}) => ({
  height: "18px",
  width: "18px",
  fontSize: "0.7rem",
  border: "1px solid red",
  textTransform: "uppercase",
}));

interface UpdateSharersProps {
  member: Member;
}

interface AvatarStackProps {
  viewSharers: () => void;
  sharers?: Member[];
  updateSharers: ({
    newSharedByArray,
  }: {
    newSharedByArray?: Member[];
  }) => void;
}

const checkIfSharer = (member: Member, sharers?: Member[]) => {
  return sharers?.some((sharer) => sharer.memberId === member.memberId);
};

const AvatarStack: FC<AvatarStackProps> = ({
  viewSharers,
  sharers,
  updateSharers,
}) => {
  const theme = useTheme();
  const { toggleDialog, isOpen } = useGenericDialogControls();

  const handleAddOrRemoveSharer = ({ member }: UpdateSharersProps) => {
    const newSharedByArray = sharers?.filter(
      (sharer) => sharer.memberId !== member.memberId
    );
    updateSharers({ newSharedByArray });
  };

  // const handleSharerClick = updateSharers;
  return (
    <>
      <StackingContainer spacing={-0.4} direction="row" onClick={toggleDialog}>
        {sharers?.map((member) => (
          <Tooltip title={member.memberName}>
            <StyledAvatar key={member.memberId}>
              {member.memberName[0]}
            </StyledAvatar>
          </Tooltip>
        ))}
      </StackingContainer>
      <Dialog open={isOpen} onClose={toggleDialog} fullWidth>
        <DialogTitle>Shared By</DialogTitle>
        <DialogContent>
          <List dense>
            {sharers?.map((member) => (
              <ListItem
                sx={{ border: `1px solid ${theme.palette.divider}` }}
                key={`member-${member.memberName}-${member.memberId}`}
                disablePadding
              >
                <ListItemButton
                  dense
                  onClick={() => handleAddOrRemoveSharer({ member })}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checkIfSharer(member, sharers)}
                    />
                  </ListItemIcon>
                  <ListItemText sx={{ textTransform: "capitalize" }}>
                    {member.memberName}
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AvatarStack;
