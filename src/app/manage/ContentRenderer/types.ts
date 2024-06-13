import {
  AddNewMemberSpendingSecondaryProps,
  UpdateMemberSpendingsSecondaryProps,
} from "../pageFunctions/types";
import { Member, SpendingColumn, Spendings } from "../../dndkit/types";

export interface ContentRendererProps {
  members: Member[];
  spendingColumns: SpendingColumn;
  spendings: Spendings;
  addBlankMemberSpending: ({
    memberId,
  }: AddNewMemberSpendingSecondaryProps) => void;
  updateMemberSpending: ({
    spendingId,
    spendingPayload,
  }: UpdateMemberSpendingsSecondaryProps) => void;
}
