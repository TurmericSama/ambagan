import { useState, useEffect } from "react";
import { ManageViewState, Member, SharedByTemplate } from "../../dndkit/types";
import { OnDragEndResponder } from "react-beautiful-dnd";
import {
  UpdateMemberNameInitialProps,
  UpdateMemberNameSecondaryProps,
  UpdateMemberPrimaryProps,
  UpdateMemberSpendingsSecondaryProps,
  AddNewMemberSpendingPrimaryProps,
  AddNewMemberSpendingSecondaryProps,
  OnRemoveMemberPrimaryProps,
  AddNewMemberPrimaryProps,
  AddNewMemberSecondaryProps,
  OnDragEndPrimaryProps,
} from "./types";

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

export const updateMemberSpending =
  ({ setManageViewState, manageViewState }: UpdateMemberPrimaryProps) =>
  ({ spendingId, spendingPayload }: UpdateMemberSpendingsSecondaryProps) => {
    const updatedSpendings = {
      ...manageViewState.spendings,
      [spendingId]: {
        ...spendingPayload,
      },
    };
    setManageViewState({
      ...manageViewState,
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
          spendingIds: [
            ...manageViewState.spendingColumn[memberId]?.spendingIds,
            newSpendingId,
          ],
        },
      },
    };
    setManageViewState(setManagePayload);
  };

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

export const useUniqueIdBank = (): {
  takenNumbers: number[];
  availableNumbers: number[];
  takeUniqueId: () => string;
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

  const takeUniqueId = (): string => {
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
    takeUniqueId,
    releaseNumber,
  };
};

export const addMember =
  ({
    manageViewState,
    setManageViewState,
    takeNumber,
  }: AddNewMemberPrimaryProps) =>
  ({ memberName }: AddNewMemberSecondaryProps) => {
    const memberId = takeNumber();
    const payload = {
      ...manageViewState,
      members: [...manageViewState.members, { memberId, memberName }],
      spendingColumn: {
        ...manageViewState.spendingColumn,
        [memberId]: {
          memberId,
          memberName,
          spendingIds: [],
        },
      },
    };
    setManageViewState(payload);
  };

export const onDragEnd =
  ({
    setManageViewState,
    manageViewState,
  }: OnDragEndPrimaryProps): OnDragEndResponder =>
  ({ destination, source, draggableId }) => {
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    const sourceSpendingColumn =
      manageViewState.spendingColumn[source.droppableId];
    const destinationSpendingColumn =
      manageViewState.spendingColumn[destination.droppableId];

    //section for when the source and destination are the same
    if (sourceSpendingColumn === destinationSpendingColumn) {
      const spendingKeysCopy = Array.from(sourceSpendingColumn.spendingIds);
      spendingKeysCopy.splice(source.index, 1);
      spendingKeysCopy.splice(destination.index, 0, draggableId);
      const newSpendingColumn = {
        ...sourceSpendingColumn,
        spendingKeys: spendingKeysCopy,
      };
      setManageViewState({
        ...manageViewState,
        spendingColumn: {
          ...manageViewState.spendingColumn,
          [newSpendingColumn.memberId]: newSpendingColumn,
        },
      });
      return;
    }

    //section for when the source and destination are different

    const sourceSpendingKeysCopy = Array.from(sourceSpendingColumn.spendingIds);
    sourceSpendingKeysCopy.splice(source.index, 1);
    //remove the spendingId from the source spending column
    const destinationSpendingKeysCopy = Array.from(
      destinationSpendingColumn.spendingIds
    );
    //creaste a copy of the destination spending keys
    destinationSpendingKeysCopy.splice(destination.index, 0, draggableId);
    //insert the spendingId to the destination spending keys
    const newSourceSpendingColumn = {
      ...sourceSpendingColumn,
      spendingKeys: sourceSpendingKeysCopy,
    };

    const newDestinationSpendingColumn = {
      ...destinationSpendingColumn,
      spendingKeys: destinationSpendingKeysCopy,
    };

    setManageViewState({
      ...manageViewState,
      spendingColumn: {
        ...manageViewState.spendingColumn,
        [source.droppableId]: newSourceSpendingColumn,
        [destination.droppableId]: newDestinationSpendingColumn,
      },
    });
  };
