import { FC, useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import {
  Card,
  Stack,
  TextField,
  Theme,
  Typography,
  styled,
} from "@mui/material";
import { SpendingCardProps } from "./types";
import AvatarStack from "@/components/AvatarStack/AvatarStack";

const TextInputAsTextRenderer = styled("input")<{ over2Lines?: boolean }>(
  ({ theme, over2Lines }) => ({
    background: "none",
    border: "none",
    ":active, :focus": {
      outline: "none",
      border: "none",
    },
    fontFamily: theme.typography.fontFamily,
    minWidth: 100,
    maxWidth: 300,
    width: "auto",
    resize: "none",
  })
);

const SpendingTitleInput = styled(TextInputAsTextRenderer)(
  ({ theme, over2Lines }) => ({
    fontWeight: "bold",
    fontSize: theme.typography.h5.fontSize,

    height: over2Lines ? "2.2em" : "1em",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    cursor: "pointer",
  })
);

const SpendingAmountInput = styled(TextField)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: theme.typography.h1.fontSize,
  "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button": {
    "-webkit-appearance": "none",
    margin: 0,
  },
  "-moz-appearance": "textfield",
  ":active, :focus": {
    outline: "none",
    border: "none",
  },
  border: "none",
  "& .Mui-focused": {
    borderColor: "transparent",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
  },
}));

const SpendingCard: FC<SpendingCardProps> = ({
  spending,
  index,
  key,
  updateMemberSpending,
}) => {
  const { memberId, spendingId, amount, expenseName } = spending;

  const [expenseNameValue, setExpenseNameValue] = useState(expenseName);
  const [amountValue, setAmountValue] = useState(amount);

  const handleUpdate = () => {
    const spendingPayload = {
      ...spending,
      amount: amountValue,
      expenseName: expenseNameValue,
    };
    updateMemberSpending({ spendingId, spendingPayload });
  };

  return (
    <Draggable draggableId={spending.spendingId} index={index} key={key}>
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
            display: "flex",
          }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Stack direction="column" flex={1}>
            <SpendingTitleInput
              value={expenseNameValue}
              placeholder="Blanks"
              onChange={(e) => setExpenseNameValue(e.target.value)}
              onBlur={handleUpdate}
              spellCheck={false}
              over2Lines={Boolean(expenseName && expenseName.length > 20)}
            />
            <Stack direction="row" columnGap={1} sx={{ alignItems: "center" }}>
              <Typography variant="h6" fontWeight="bold">
                Php
              </Typography>
              <SpendingAmountInput
                value={amountValue}
                onChange={(e) => {
                  setAmountValue(e.target.value as unknown as number);
                }}
                placeholder="0.00"
              />
            </Stack>
            <AvatarStack />
          </Stack>
        </Card>
      )}
    </Draggable>
  );
};

export default SpendingCard;
