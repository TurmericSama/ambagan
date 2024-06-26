import { Member } from "..//types";

export interface CreateMemberFunctionProps {
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  takeUniqueId: () => string;
  members: Member[];
}

export interface CreateMemberInnerProps {
  memberName: string;
}

export type OnCreateMemberOutterFunction = ({
  setMembers,
}: CreateMemberFunctionProps) => ({
  memberName,
}: CreateMemberInnerProps) => void;

export type OnCreateMemberInnerFunction = ({
  memberName,
}: CreateMemberInnerProps) => void;

export const createMember: OnCreateMemberOutterFunction =
  ({ setMembers, takeUniqueId, members }) =>
  ({ memberName }: CreateMemberInnerProps) => {
    const columnToAdd: Member = {
      memberId: takeUniqueId(),
      memberName,
    };

    setMembers([...members, columnToAdd]);
  };
