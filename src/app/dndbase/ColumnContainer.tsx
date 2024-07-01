"use client";

import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo } from "react";
import PlusIcon from "@mui/icons-material/Add";
import SpendingCard from "./SpendingCard";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { Member, SpendingDataTemplate } from "./types";
import { OnCreateSpendingInnerFunction } from "./pageFunctions/createSpending";
import { OnUpdateSpendingInnerFunction } from "./pageFunctions/updateSpending";
import StyledMemberColumn from "./components/StyledMemberColumn";

interface Props {
  member: Member;
  createSpending: OnCreateSpendingInnerFunction;
  updateSpending: OnUpdateSpendingInnerFunction;
  spendings: SpendingDataTemplate[];
}

const ColumnContainer: React.FC<Props> = ({
  member,
  createSpending,
  updateSpending,
  spendings,
}) => {
  const theme = useTheme();

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
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleCreateSpending = () => {
    createSpending({ memberId: member.memberId });
  };

  if (isDragging) {
    return (
      <StyledMemberColumn
        ref={setNodeRef}
        sx={{
          ...style,
          borderRadius: theme.shape.borderRadius,
        }}
      />
    );
  }

  return (
    <StyledMemberColumn
      ref={setNodeRef}
      sx={{
        ...style,
        borderRadius: theme.shape.borderRadius,
      }}
      className="dropshadow"
    >
      <Typography
        {...attributes}
        {...listeners}
        variant="h5"
        fontWeight="bold"
        color="primary"
        textTransform="capitalize"
        sx={{ paddingBottom: theme.spacing(2) }}
      >
        {member.memberName}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          gap: 4,
          overflowX: "hidden",
          overflowY: "scroll",
          marginBottom: 2,
          paddingTop: 2,
        }}
      >
        <SortableContext items={spendingIds}>
          {spendings.map((spending) => (
            <SpendingCard
              key={spending.spendingId}
              spending={spending}
              updateSpending={updateSpending}
            />
          ))}
        </SortableContext>
      </Box>
      {/* Column footer */}
      <Button onClick={handleCreateSpending} variant="contained">
        <PlusIcon />
        Add New Spending
      </Button>
    </StyledMemberColumn>
  );
};

export default ColumnContainer;
