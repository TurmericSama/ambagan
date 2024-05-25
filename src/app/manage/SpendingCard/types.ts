import {
  SpendingDataTemplate,
  UpdateMemberSpendingTypeSignature,
} from "../types";

export interface SpendingCardProps {
  spending: SpendingDataTemplate;
  index: number;
  key: string;
  updateMemberSpending: UpdateMemberSpendingTypeSignature;
}
