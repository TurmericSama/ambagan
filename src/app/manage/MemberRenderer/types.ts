import { UpdateMemberNameSecondaryProps } from "../pageFunctions/types";
import { Member } from "../../dndkit/types";

type UpdateMemberTypeSignature = ({}: UpdateMemberNameSecondaryProps) => void;

type RemoveMemberTypeSignature = (memberId: string) => void;

export interface MemberRendererProps {
  members: Member[];
  removeMember: RemoveMemberTypeSignature;
  updateMemberName: UpdateMemberTypeSignature;
}
