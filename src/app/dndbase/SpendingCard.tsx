"use client";

import {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  useState,
} from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box, Card, Stack, Typography } from "@mui/material";
import { SpendingDataTemplate } from "./types";
import { useTheme } from "@mui/material/styles";
import { OnUpdateSpendingInnerFunction } from "./pageFunctions/updateSpending";
import NoscrubNumberInput from "./components/NoscrubNumberInput";
import TextFieldAsEditableText from "./components/TextFieldAsEditableText";
import AvatarStack from "@/components/AvatarStack/AvatarStack";

interface Props {
  spending: SpendingDataTemplate;
  updateSpending: OnUpdateSpendingInnerFunction;
}

type EditTarget = keyof SpendingDataTemplate;

const SpendingCard: React.FC<Props> = ({ spending, updateSpending }) => {
  const theme = useTheme();
  const [editMode, setEditMode] = useState(false);
  const [editTarget, setEditTarget] = useState<EditTarget | null>(null);
  const [expenseName, setExpenseName] = useState(spending.expenseName);
  const [amount, setAmount] = useState(spending.amount ?? 0);

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
      type: "SpendingDataTemplate",
      spending,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = (editTarget?: EditTarget) => {
    if (editTarget) {
      setEditTarget(editTarget);
    }
    setEditMode((prev) => !prev);
  };

  const handleOnKeyDown: KeyboardEventHandler = (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      toggleEditMode();
      const updatedSpendingObject = {
        ...spending,
        expenseName,
        amount,
      };
      updateSpending({ updatedSpendingObject });
    }
  };

  // if (String(amount).length > 5) {
  //   alert("Amount is no realistic");
  //   setAmount(0);
  // }

  const handleOnBlur: FocusEventHandler<HTMLInputElement> = () => {
    toggleEditMode();
    const updatedSpendingObject = {
      ...spending,
      expenseName,
      amount,
    };
    updateSpending({ updatedSpendingObject });
  };

  const handleChangeInternalExpenseName = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setExpenseName(e.target.value);
  };

  const handleChangeInternalAmount: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setAmount(e.target.value as unknown as number);
  };

  const handleExpenseNameChange = () => {
    toggleEditMode("expenseName");
  };

  const handleAmountChange = () => {
    toggleEditMode("amount");
  };

  if (isDragging) {
    return (
      <Card
        ref={setNodeRef}
        sx={{
          ...style,
          minHeight: "140px",
          margin: "2px",
          border: "solid 2px #5F6FFF",
          backgroundColor: "#D9DDFF",
          opacity: 0.5,
        }}
      />
    );
  }

  if (editMode) {
    return (
      <Card
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={{
          ...style,
          minHeight: "140px",
          margin: "2px",
          border: "solid 2px #5F6FFF",
          backgroundColor: "#D9DDFF",
          padding: theme.spacing(1),
        }}
      >
        <TextFieldAsEditableText
          autoFocus={editTarget === "expenseName"}
          value={expenseName}
          placeholder="Your Item name here"
          onBlur={handleOnBlur}
          onKeyDown={handleOnKeyDown}
          onChange={handleChangeInternalExpenseName}
        />
        <NoscrubNumberInput
          amount={amount}
          autoFocus={editTarget === "amount"}
          handleOnBlur={handleOnBlur}
          handleChangeInternalAmount={handleChangeInternalAmount}
        />
      </Card>
    );
  }

  return (
    <Card
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        ...style,
        minHeight: "140px",
        margin: "2px",
        border: "solid 2px #5F6FFF",
        backgroundColor: "#D9DDFF",
        padding: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
      }}
      elevation={3}
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography
          fontWeight="bold"
          variant="h6"
          textTransform="capitalize"
          color="black"
          onClick={handleExpenseNameChange}
        >
          {expenseName}
        </Typography>
      </Stack>

      <Typography
        fontWeight="bold"
        variant="body1"
        textTransform="capitalize"
        color="black"
        onClick={handleAmountChange}
      >
        {`Php ${amount}`}
      </Typography>
      <Box sx={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
        <AvatarStack />
      </Box>
    </Card>
  );
};

export default SpendingCard;
