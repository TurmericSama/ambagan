import { UpdateMemberSpendingsSecondaryProps } from "./pageFunctions/types";

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
    spendingKeys: string[];
  };
}

export interface ManageViewState {
  members: Member[]; // member names represent the column order and current columns available
  spendings: Spendings; // spendings are all of the spendings of all the members, keyed by a spendingId
  spendingColumn: SpendingColumn; // spending column is the list of spendings of each member, keyed by memberId
}

export interface Member {
  memberId: string;
  memberName: string;
}

export type UpdateMemberSpendingTypeSignature = ({
  spendingId,
  spendingPayload,
}: UpdateMemberSpendingsSecondaryProps) => void;
