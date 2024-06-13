import { Member } from "../../types";

export interface OnRemoveMemberFunctionProps {
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
}

export interface OnRemoveMemberInnerProps {
  memberId: string;
}

export type OnRemoveMemberFunction = ({
  members,
}: OnRemoveMemberFunctionProps) => OnRemoveMemberInnerFunction;

export type OnRemoveMemberInnerFunction = ({
  memberId,
}: OnRemoveMemberInnerProps) => void;

export const onRemoveMember: OnRemoveMemberFunction =
  ({ members, setMembers }) =>
  ({ memberId }: OnRemoveMemberInnerProps) => {
    const newMembers = members.filter((member) => member.memberId !== memberId);
    setMembers(newMembers);
  };
