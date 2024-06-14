import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Column, Id, Task } from "./types";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";

import SpendingCard from "./TaskCard";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { Delete, Add } from "@mui/icons-material";
import { Member, SpendingDataTemplate } from "@/app/dndkit/types";
import { OnRemoveMemberInnerFunction } from "./pageFunctions/removeMember";
import { OnUpdateMemberInnerFunction } from "./pageFunctions/updateMember";
import { OnCreateSpendingInnerFunction } from "./pageFunctions/createSpending";
import { OnUpdateSpendingInnerFunction } from "./pageFunctions/updateSpending";

interface Props {
  member: Member;
  deleteColumn: OnRemoveMemberInnerFunction;
  updateColumn: OnUpdateMemberInnerFunction;
  createSpending: OnCreateSpendingInnerFunction;
  updateSpending: OnUpdateSpendingInnerFunction;
  deleteTask: (id: Id) => void;
  spendings: SpendingDataTemplate[];
}

function ColumnContainer({
  member,
  deleteColumn,
  updateColumn,
  createSpending,
  spendings,
  deleteTask,
  updateSpending,
}: Props) {
  const [editMode, setEditMode] = useState(false);

  const spendingIds = useMemo(() => {
    return spendings.map((spending) => spending.spendingId);
  }, [spendings]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: member.memberId,
    data: {
      type: "Member",
      member,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleCreateSpending = () =>
    createSpending({ memberId: member.memberId });

  if (isDragging) {
    return (
      <Stack
        direction="column"
        ref={setNodeRef}
        style={{
          width: "350px",
          height: "500px",
          maxHeight: "500px",
          opacity: 0.4,
          flex: 1,
          ...style,
        }}
      ></Stack>
    );
  }

  return (
    <Stack
      direction="column"
      ref={setNodeRef}
      sx={{
        width: "350px",
        height: "500px",
        maxHeight: "500px",
        gap: (theme) => theme.spacing(2),
        backgroundColor: "#FFF5C3",
        padding: (theme) => theme.spacing(2),
        borderRadius: (theme) => theme.shape.borderRadius,
        ...style,
      }}
    >
      {/* Column title */}
      <Box
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
      >
        <Stack sx={{ gap: 2 }}>
          {!editMode && (
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ pb: 2, textTransform: "capitalize" }}
            >
              {member.memberName}
            </Typography>
          )}

          {editMode && (
            <TextField
              sx={{ color: "white" }}
              value={member.memberName}
              onChange={(e) =>
                updateColumn({
                  memberId: member.memberId,
                  newMemberObject: {
                    memberName: e.target.value,
                    memberId: member.memberId,
                  },
                })
              }
              autoFocus
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          )}
        </Stack>
        <Button
          onClick={() => {
            deleteColumn({ memberId: member.memberId });
          }}
          variant="contained"
        >
          <Delete />
        </Button>
      </Box>

      {/* Column task container */}
      <Stack
        direction="column"
        sx={{ overflowX: "hidden", overflowY: "auto", gap: 4, flex: 1 }}
      >
        <SortableContext items={spendingIds}>
          {spendings.map((spending) => (
            <SpendingCard
              key={spending.spendingId}
              spending={spending}
              deleteTask={deleteTask}
              updateSpending={updateSpending}
            />
          ))}
        </SortableContext>
      </Stack>
      {/* Column footer */}
      <Button
        onClick={handleCreateSpending}
        sx={{ textAlign: "center" }}
        startIcon={<Add />}
        variant="contained"
      >
        New Spending
      </Button>
    </Stack>
  );
}

export default ColumnContainer;
