import { Member, SpendingDataTemplate } from "../types";

export interface CreateSpendingOutterFunctionProps {
  updateSpendings: React.Dispatch<React.SetStateAction<SpendingDataTemplate[]>>;
  spendings: SpendingDataTemplate[];
  takeSpendingId: () => string;
  members: Member[];
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
  ({ updateSpendings, spendings, takeSpendingId, members }) =>
  ({ memberId }) => {
    const blankSpending: SpendingDataTemplate = {
      memberId,
      spendingId: takeSpendingId(),
      amount: 0,
      expenseName: "New Blank Spending",
      sharedBy: members,
    };
    updateSpendings([...spendings, blankSpending]);
  };
