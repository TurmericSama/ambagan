import { FC, useState } from "react";
import { Id, Task } from "./types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button, Card, TextField } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { SpendingDataTemplate } from "../types";
import { OnUpdateSpendingInnerFunction } from "./pageFunctions/updateSpending";

interface SpendingCardProps {
  spending: SpendingDataTemplate;
  deleteTask: (id: Id) => void;
  updateSpending: OnUpdateSpendingInnerFunction;
}

const SpendingCard: FC<SpendingCardProps> = ({
  spending,
  deleteTask,
  updateSpending,
}) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(true);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: spending.spendingId,
    data: {
      type: "Spending",
      spending,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  if (isDragging) {
    return (
      <Card
        sx={{
          minHeight: "180px",
          margin: "2px",
          border: "solid 2px #5F6FFF",
          backgroundColor: "#D9DDFF",
          padding: 2,
          ...style,
        }}
        ref={setNodeRef}
      >
        hello there
      </Card>
    );
  }

  if (editMode) {
    return (
      <Card
        ref={setNodeRef}
        sx={{
          minHeight: "180px",
          margin: "2px",
          border: "solid 2px #5F6FFF",
          backgroundColor: "#D9DDFF",
          padding: 2,
          ...style,
        }}
        {...attributes}
        {...listeners}
      >
        <textarea
          className="description"
          value={spending.expenseName}
          autoFocus
          spellCheck={false}
          placeholder="Task content here"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              toggleEditMode();
            }
          }}
          onChange={(e) =>
            updateSpending({
              updatedSpendingObject: {
                ...spending,
                expenseName: e.target.value,
              },
            })
          }
        />
      </Card>
    );
  }

  return (
    <Card
      elevation={2}
      ref={setNodeRef}
      sx={{
        minHeight: "180px",
        margin: "2px",
        border: "solid 2px #5F6FFF",
        backgroundColor: "#D9DDFF",
        padding: 2,
        ...style,
      }}
      {...attributes}
      {...listeners}
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      <TextField
        value={spending.expenseName}
        onFocus={toggleEditMode}
        onBlur={toggleEditMode}
      />
      {mouseIsOver && (
        <Button
          onClick={() => {
            deleteTask(spending.spendingId);
          }}
          variant="contained"
          sx={{ aspectRatio: "1 / 1" }}
          color="error"
        >
          <Delete />
        </Button>
      )}
    </Card>
  );
};

export default SpendingCard;
