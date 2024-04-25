import { FC } from "react";
import { Draggable } from "react-beautiful-dnd";
import { SpendingDataTemplate } from "./page";
import { Card, Typography } from "@mui/material";

interface SpendingCardProps {
  spending: SpendingDataTemplate;
  index: number;
}

const SpendingCard: FC<SpendingCardProps> = ({ spending, index }) => {
  console.log({ spendingCard: spending });

  return (
    <Draggable draggableId={spending.id} index={index}>
      {(provided, snapshot) => (
        <Card
          elevation={2}
          sx={{
            height: 200,
            margin: "2px",
            border: "solid 2px #5F6FFF",
            backgroundColor: "#D9DDFF",
            marginBottom: 2,
            padding: 2,
          }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Typography variant="h4" fontWeight="bold">
            {spending?.expenseName?.length
              ? spending?.expenseName
              : "Spending Title"}
          </Typography>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ fontFamily: "Arial, sans-serif" }}
          >
            {spending?.amount ? `$${spending?.amount}` : "Php 0.00"}
          </Typography>
        </Card>
      )}
    </Draggable>
  );
};

export default SpendingCard;
