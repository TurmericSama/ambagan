import { NewColumnDataTemplate, SpendingDataTemplate } from "./page";

interface AddNewMemberPrimaryProps {
  setMembers: (members: NewColumnDataTemplate) => void;
  members: NewColumnDataTemplate;
}

export const addNewMember =
  ({ members, setMembers }: AddNewMemberPrimaryProps) =>
  (memberName: string): void => {
    setMembers({
      ...members,
      [memberName]: {
        spendings: [],
      },
    });
  };

interface RemoveMemberProps {
  setMembers: (members: NewColumnDataTemplate) => void;
  members: NewColumnDataTemplate;
}

export const removeMember = ({
  setMembers,
  members,
}: RemoveMemberProps): ((memberName: string) => void) => {
  return (memberName: string): void => {
    const { [memberName]: _, ...rest } = members;
    setMembers(rest);
  };
};

interface UpdateMemberNameInitialProps {
  setMembers: (members: NewColumnDataTemplate) => void;
  members: NewColumnDataTemplate;
}

interface UpdateMemberNameSecondaryProps {
  oldMemberName: string;
  newMemberName: string;
}

export const updateMemberName =
  ({ setMembers, members }: UpdateMemberNameInitialProps) =>
  ({ oldMemberName, newMemberName }: UpdateMemberNameSecondaryProps): void => {
    const {
      [oldMemberName]: { ...currentMemberProps },
      ...rest
    } = members;
    setMembers({
      ...rest,
      [newMemberName]: currentMemberProps,
    });
  };

const blankSpendingObject: SpendingDataTemplate = {
  expenseName: "",
  amount: 0,
  sharedBy: [],
  id: `tempSpendingId=${Math.random()}`,
};

interface UpdateMemberSpendingPrimaryProps {
  setMembers: (members: NewColumnDataTemplate) => void;
  members: NewColumnDataTemplate;
}

interface UpdateMemberSpendingSecondaryProps {
  memberName: string;
  id: string;
  newSpendingData: SpendingDataTemplate;
}

export const updateMemberSpending =
  ({ setMembers, members }: UpdateMemberSpendingPrimaryProps) =>
  ({ memberName, id, newSpendingData }: UpdateMemberSpendingSecondaryProps) => {
    const {
      [memberName]: { ...memberToUpdate },
      ...restMembers
    } = members;
    const spendingIndex = memberToUpdate.spendings.findIndex(
      (spending) => spending.id === id
    );
    memberToUpdate.spendings[spendingIndex] = newSpendingData;
    setMembers({
      ...restMembers,
      [memberName]: memberToUpdate,
    });
  };

export const addBlankMemberSpending =
  (
    setMembers: (members: NewColumnDataTemplate) => void,
    members: NewColumnDataTemplate
  ) =>
  (memberName: string): void => {
    setMembers({
      ...members,
      [memberName]: {
        spendings: [...members[memberName].spendings, blankSpendingObject],
      },
    });
  };
