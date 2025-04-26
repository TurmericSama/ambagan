export interface Member {
  memberId: string;
  memberName: string;
}

export interface SharedByTemplate {
  name: string;
  id: number;
}

export interface SpendingDataTemplate {
  expenseName?: string;
  amount?: number;
  sharedBy?: Member[];
  spendingId: string;
  memberId: string;
}

export interface AddNewMemberSecondaryProps {
  memberName: string;
}

type OnAddSignature = ({ memberName }: AddNewMemberSecondaryProps) => void;

export interface MemberRowProps {
  onAdd: OnAddSignature;
}
