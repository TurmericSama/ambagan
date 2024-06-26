import { SpendingDataTemplate } from "../types";

export interface CreateSpendingOutterFunctionProps {
  updateSpendings: React.Dispatch<React.SetStateAction<SpendingDataTemplate[]>>;
  spendings: SpendingDataTemplate[];
  takeSpendingId: () => string;
}

export interface CreateSpendingInnerFunctionProps {
  memberId: string;
}

export type OnCreateSpendingInnerFunction = ({
  memberId,
}: CreateSpendingInnerFunctionProps) => void;

export type OnCreateSpendingOutterFunction = ({
  updateSpendings,
  spendings,
}: CreateSpendingOutterFunctionProps) => OnCreateSpendingInnerFunction;

export const createSpending: OnCreateSpendingOutterFunction =
  ({ updateSpendings, spendings, takeSpendingId }) =>
  ({ memberId }) => {
    const blankSpending: SpendingDataTemplate = {
      memberId,
      spendingId: takeSpendingId(),
      amount: 0,
      expenseName: "New Blank Spending",
      sharedBy: [],
    };
    updateSpendings([...spendings, blankSpending]);
  };
