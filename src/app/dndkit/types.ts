import { PaperProps } from "@mui/material";
import { UpdateMemberSpendingsSecondaryProps } from "../manage/pageFunctions/types";

export interface SharedByTemplate {
  name: string;
  id: number;
}

export interface SpendingDataTemplate {
  expenseName?: string;
  amount?: number;
  sharedBy?: SharedByTemplate[];
  spendingId: string;
  memberId: string;
}

export interface Spendings {
  [spendingKey: string]: SpendingDataTemplate;
}

export interface SpendingColumn {
  [memberId: string]: {
    memberId: string;
    memberName: string;
    spendingIds: string[];
  };
}

export interface DroppableProps extends PaperProps {
  id: string;
  spendings: Record<string, SpendingDataTemplate>;
  spendingIds: string[];
  columnName: string;
}

export interface SpendingCardProps {
  id: string;
  spending: SpendingDataTemplate;
  columnName: string;
}

export interface ManageViewState {
  members: Member[]; // member names represent the column order and current columns available
  spendings: Spendings; // spendings are all of the spendings of all the members, keyed by a spendingId
  spendingColumn: SpendingColumn; // spending column is the list of spendings of each member, keyed by memberId
  currentDraggingSpending: SpendingCardProps | null;
  currentDraggingColumn: DroppableProps | null;
}

export interface Member {
  memberId: string;
  memberName: string;
}

export type UpdateMemberSpendingTypeSignature = ({
  spendingId,
  spendingPayload,
}: UpdateMemberSpendingsSecondaryProps) => void;
