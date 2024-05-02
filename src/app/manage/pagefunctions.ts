import { useState, useEffect } from "react";
import { ManageViewState, Member, SharedByTemplate } from "./types";

interface UpdateMemberNameInitialProps {
  setManageViewState: (manageViewState: ManageViewState) => void;
  manageViewState: ManageViewState;
}

export interface UpdateMemberNameSecondaryProps {
  oldMemberObject: Member;
  newMemberObject: Member;
}

export const updateMemberName =
  ({
    setManageViewState: setMembers,
    manageViewState,
  }: UpdateMemberNameInitialProps) =>
  ({
    oldMemberObject,
    newMemberObject,
  }: UpdateMemberNameSecondaryProps): void => {
    setMembers({
      ...manageViewState,
      members: manageViewState.members.map((member) =>
        member.memberId === oldMemberObject.memberId
          ? { ...member, memberName: newMemberObject.memberName }
          : member
      ),
    });
  };

interface UpdateMemberPrimaryProps {
  setManageViewState: (manageViewState: ManageViewState) => void;
  currentViewState: ManageViewState;
}

interface SpendingPayload {
  expenseName?: string;
  amount?: number;
  sharedBy?: SharedByTemplate[];
}

export interface UpdateMemberSecondaryProps {
  spendingId: string;
  spendingPayload: SpendingPayload;
}

export const updateMemberSpending =
  ({ setManageViewState, currentViewState }: UpdateMemberPrimaryProps) =>
  ({ spendingId, spendingPayload }: UpdateMemberSecondaryProps) => {
    const updatedSpendings = {
      ...currentViewState.spendings,
      [spendingId]: {
        ...currentViewState.spendings[spendingId],
        ...spendingPayload,
      },
    };
    setManageViewState({
      ...currentViewState,
      spendings: updatedSpendings,
    });
  };

export const useUniqueSpendingIdBank = (): {
  takenSpendingIds: number[];
  availableSpendingIds: number[];
  takeSpendingId: () => string;
  releaseSpendingId: (number: number) => void;
} => {
  const [takenNumbers, setTakenNumbers] = useState<number[]>([]);
  const [availableNumbers, setAvailableNumbers] = useState<number[]>([]);

  useEffect(() => {
    const bank: number[] = [];
    for (let i = 1000; i < 2000; i++) {
      bank.push(i);
    }
    setAvailableNumbers(bank);
  }, []);

  const takeNumber = (): string => {
    if (availableNumbers.length > 0) {
      const [number, ...rest] = availableNumbers;
      setTakenNumbers([...takenNumbers, number]);
      setAvailableNumbers(rest);
      return String(number);
    }

    return "No numbers available";
  };

  const releaseNumber = (number: number): void => {
    const updatedTakenNumbers = takenNumbers.filter((n) => n !== number);
    setTakenNumbers(updatedTakenNumbers);
    setAvailableNumbers([number, ...availableNumbers]);
  };

  return {
    takenSpendingIds: takenNumbers,
    availableSpendingIds: availableNumbers,
    takeSpendingId: takeNumber,
    releaseSpendingId: releaseNumber,
  };
};

export interface AddNewMemberSpendingPrimaryProps {
  setManageViewState: (manageViewState: ManageViewState) => void;
  manageViewState: ManageViewState;
  takeSpendingId: () => string;
}

export interface AddNewMemberSpendingSecondaryProps {
  memberId: string;
  memberName: string;
}

export const addBlankMemberSpending =
  ({
    manageViewState,
    takeSpendingId,
    setManageViewState,
  }: AddNewMemberSpendingPrimaryProps) =>
  ({ memberId, memberName }: AddNewMemberSpendingSecondaryProps) => {
    const newSpendingId = takeSpendingId();
    const setManagePayload: ManageViewState = {
      ...manageViewState,
      spendings: {
        ...manageViewState.spendings,
        [newSpendingId]: {
          expenseName: "",
          amount: 0.0,
          sharedBy: [],
          spendingId: newSpendingId,
          memberId,
        },
      },
      spendingColumn: {
        ...manageViewState.spendingColumn,
        [memberId]: {
          memberId,
          memberName,
          spendingKeys: [
            ...manageViewState.spendingColumn[memberId]?.spendingKeys,
            newSpendingId,
          ],
        },
      },
    };
    setManageViewState(setManagePayload);
  };

interface OnRemoveMemberPrimaryProps {
  manageViewState: ManageViewState;
  setManageViewState: (manageViewState: ManageViewState) => void;
}

export const removeMember =
  ({ manageViewState, setManageViewState }: OnRemoveMemberPrimaryProps) =>
  (memberToRemoveId: string) => {
    setManageViewState({
      ...manageViewState,
      members: manageViewState.members.filter(
        (member) => member.memberId !== memberToRemoveId
      ),
    });
  };

export const useNumberBank = (): {
  takenNumbers: number[];
  availableNumbers: number[];
  takeNumber: () => string;
  releaseNumber: (number: number) => void;
} => {
  const [takenNumbers, setTakenNumbers] = useState<number[]>([]);
  const [availableNumbers, setAvailableNumbers] = useState<number[]>([]);

  useEffect(() => {
    const bank: number[] = [];
    for (let i = 1000; i < 1100; i++) {
      bank.push(i);
    }
    setAvailableNumbers(bank);
  }, []);

  const takeNumber = (): string => {
    if (availableNumbers.length > 0) {
      const [number, ...rest] = availableNumbers;
      setTakenNumbers([...takenNumbers, number]);
      setAvailableNumbers(rest);
      return String(number);
    }

    return "No numbers available";
  };

  const releaseNumber = (number: number): void => {
    const updatedTakenNumbers = takenNumbers.filter((n) => n !== number);
    setTakenNumbers(updatedTakenNumbers);
    setAvailableNumbers([number, ...availableNumbers]);
  };

  return {
    takenNumbers,
    availableNumbers,
    takeNumber,
    releaseNumber,
  };
};

export interface AddNewMemberPrimaryProps {
  manageViewState: ManageViewState;
  setManageViewState: (manageViewState: ManageViewState) => void;
  takeNumber: () => string;
}

export interface AddNewMemberSecondaryProps {
  memberName: string;
}

export const addMember =
  ({
    manageViewState,
    setManageViewState,
    takeNumber,
  }: AddNewMemberPrimaryProps) =>
  ({ memberName }: AddNewMemberSecondaryProps) => {
    const memberId = takeNumber();
    setManageViewState({
      ...manageViewState,
      members: [...manageViewState.members, { memberId, memberName }],
      spendingColumn: {
        ...manageViewState.spendingColumn,
        [memberId]: {
          memberId,
          memberName,
          spendingKeys: [],
        },
      },
    });
  };
