import { SpendingDataTemplate } from "../../types";

export interface SpendingUpdateOutterFunctionProps {
  spendings: SpendingDataTemplate[];
  updateSpendings: React.Dispatch<React.SetStateAction<SpendingDataTemplate[]>>;
}

export interface SpendingUpdateInnerFunctionProps {
  updatedSpendingObject: SpendingDataTemplate;
}

export type OnUpdateSpendingInnerFunction = ({
  updatedSpendingObject,
}: SpendingUpdateInnerFunctionProps) => void;

export type onUpdateSpendingOutterFunction = ({
  spendings,
  updateSpendings,
}: SpendingUpdateOutterFunctionProps) => OnUpdateSpendingInnerFunction;

export const onUpdateSpendings: onUpdateSpendingOutterFunction =
  ({ spendings, updateSpendings }) =>
  ({ updatedSpendingObject }) => {
    const updatedSpendings = spendings.map((spending) => {
      if (spending.spendingId !== updatedSpendingObject.spendingId)
        return spending;
      return updatedSpendingObject;
    });

    updateSpendings(updatedSpendings);
  };
