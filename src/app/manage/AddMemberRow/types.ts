import { AddNewMemberSecondaryProps } from "../pageFunctions/types";

type OnAddSignature = ({ memberName }: AddNewMemberSecondaryProps) => void;

export interface MemberRowProps {
  onAdd: OnAddSignature;
}
