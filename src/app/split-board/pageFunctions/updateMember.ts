import { Member } from "../types";

export interface OnUpdateMemberFunctionProps {
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
}

export interface OnUpdateMemberInnerFunctionProps {
  memberId: string;
  newMemberObject: Member;
}

export type OnUpdateMemberInnerFunction =
  ({}: OnUpdateMemberInnerFunctionProps) => void;

export type OnUpdateMemberFunction = ({
  members,
  setMembers,
}: OnUpdateMemberFunctionProps) => OnUpdateMemberInnerFunction;

export const onUpdateMember: OnUpdateMemberFunction =
  ({ members, setMembers }) =>
  ({ memberId, newMemberObject }) => {
    const newMembers = members.map((member) => {
      if (member.memberId !== memberId) return member;
      return newMemberObject;
    });

    setMembers(newMembers);
  };
