"use client";

import {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  useState,
} from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Box,
  Button,
  Card,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Member, SpendingDataTemplate } from "./types";
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

interface NewSharedByArrayProps {
  newSharedByArray?: Member[];
}

const SpendingCard: React.FC<Props> = ({ spending, updateSpending }) => {
  const theme = useTheme();
  const { sharedBy } = spending;
  const [editMode, setEditMode] = useState(false);
  const [viewSharers, setViewSharers] = useState(false);
  const [editTarget, setEditTarget] = useState<EditTarget | null>(null);
  const [expenseName, setExpenseName] = useState(spending.expenseName);
  const [amount, setAmount] = useState(spending.amount ?? 0);

  const handleUpdateSharers = ({ newSharedByArray }: NewSharedByArrayProps) => {
    const updatedSpendingObject = {
      ...spending,
      sharedBy: newSharedByArray,
    };
    updateSpending({ updatedSpendingObject });
  };

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
    disabled: editMode || viewSharers,
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

  const handleToggleViewSharers = () => {
    setViewSharers((prev) => !prev);
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
      }}
      elevation={3}
    >
      <Box
        sx={{ display: "flex", flex: 1, height: "100%" }}
        flexDirection="column"
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
        <Box sx={{ flex: 1 }} />
        <Stack direction="row">
          <AvatarStack
            sharers={sharedBy}
            viewSharers={handleToggleViewSharers}
            updateSharers={handleUpdateSharers}
          />
          <Button variant="contained" size="small">
            Select Spliters
          </Button>
        </Stack>
      </Box>
    </Card>
  );
};

export default SpendingCard;
