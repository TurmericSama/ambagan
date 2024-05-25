import {
  ManageViewState,
  Member,
  SharedByTemplate,
  SpendingDataTemplate,
} from "../types";

export interface UpdateMemberNameInitialProps {
  setManageViewState: (manageViewState: ManageViewState) => void;
  manageViewState: ManageViewState;
}

export interface UpdateMemberNameSecondaryProps {
  oldMemberObject: Member;
  newMemberObject: Member;
}

export interface UpdateMemberPrimaryProps {
  setManageViewState: (manageViewState: ManageViewState) => void;
  manageViewState: ManageViewState;
}

export interface UpdateMemberSpendingsSecondaryProps {
  spendingId: string;
  spendingPayload: SpendingDataTemplate;
}

export interface AddNewMemberSpendingPrimaryProps {
  setManageViewState: (manageViewState: ManageViewState) => void;
  manageViewState: ManageViewState;
  takeSpendingId: () => string;
}

export interface AddNewMemberSpendingSecondaryProps {
  memberId: string;
  memberName: string;
}

export interface OnRemoveMemberPrimaryProps {
  manageViewState: ManageViewState;
  setManageViewState: (manageViewState: ManageViewState) => void;
}

export interface AddNewMemberPrimaryProps {
  manageViewState: ManageViewState;
  setManageViewState: (manageViewState: ManageViewState) => void;
  takeNumber: () => string;
}

export interface AddNewMemberSecondaryProps {
  memberName: string;
}

export interface OnDragEndPrimaryProps {
  manageViewState: ManageViewState;
  setManageViewState: (manageViewState: ManageViewState) => void;
}
