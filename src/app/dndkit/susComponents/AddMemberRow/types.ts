import { AddNewMemberSecondaryProps } from "../../../manage/pageFunctions/types";

type OnAddSignature = ({ memberName }: AddNewMemberSecondaryProps) => void;

export interface MemberRowProps {
  onAdd: OnAddSignature;
}
