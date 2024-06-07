import { FC } from "react";

import TransparentCard from "@/components/TransparentCard";
import { Box, Typography } from "@mui/material";
import AvatarStack from "@/components/AvatarStack/AvatarStack";
import { useDraggable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { SpendingCardProps, SpendingDataTemplate } from "@/app/manage/types";
import { CSS } from "@dnd-kit/utilities";

const SpendingCard: FC<SpendingCardProps> = ({ id, spending }) => {
  const {
    transform,
    setNodeRef,
    attributes,
    listeners,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      type: "spending",
      spending,
    },
  });

  const { amount, sharedBy, expenseName: spendingName } = spending;

  const mandatoryDragStyle = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return <TransparentCard sx={{ ...mandatoryDragStyle }} ref={setNodeRef} />;
  }

  return (
    <TransparentCard
      sx={{ ...mandatoryDragStyle }}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <Typography
        className="textBackground"
        variant="h6"
        sx={{ color: "white" }}
      >
        {spendingName ?? "New Blank Spending"}
      </Typography>
      <Typography
        variant="body2"
        className="price"
        sx={{ marginTop: 1, color: "white" }}
      >
        Php <span>{amount ?? "0.00"}</span>
      </Typography>
      <Typography className="description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
        scelerisque, nunc nec lacinia lacinia, metus nisi lacinia libero, ac
        tincidunt mi nunc nec enim.
      </Typography>
      <Box sx={{ marginTop: 2 }}>
        <AvatarStack />
      </Box>
    </TransparentCard>
  );
};

export default SpendingCard;
