import { Member } from "@/app/dndkit/types";

export interface CreateMemberFunctionProps {
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  takeUniqueId: () => string;
  members: Member[];
}

export interface CreateMemberInnerProps {
  memberName: string;
}

export type CreateMemberFunction = ({
  setMembers,
}: CreateMemberFunctionProps) => ({
  memberName,
}: CreateMemberInnerProps) => void;

export type CreateSecondaryFunction = ({
  memberName,
}: CreateMemberInnerProps) => void;

export const createMember: CreateMemberFunction =
  ({ setMembers, takeUniqueId, members }) =>
  ({ memberName }: CreateMemberInnerProps) => {
    const columnToAdd: Member = {
      memberId: takeUniqueId(),
      memberName,
    };

    setMembers([...members, columnToAdd]);
  };
