"use client";
import { Stack, Divider } from "@mui/material";
import React, { useState } from "react";
import AddMemberRow from "./AddMemberRow";
import StyledHeader from "@/components/StyledHeader";
import { DragDropContext } from "react-beautiful-dnd";
import ColumnCardContainer from "@/components/ColumnCardContainer";
import ContainerColumn from "@/components/ContainerColumn";
import ContentRenderer from "./ContentRenderer";
import MarginWrapper from "@/components/MarginWrapper";
import MemberRenderer from "./MemberRenderer";
import {
  addNewMember,
  removeMember,
  updateMemberName,
  addBlankMemberSpending,
} from "./pagefunctions";

interface ManageProps {
  // Add any props you need for the Manage component
}

const initialDataTemplate = {
  spendings: [],
};

interface SharedByTemplate {
  name: string;
  id: number;
}

export interface SpendingDataTemplate {
  expenseName?: string;
  amount?: number;
  sharedBy?: SharedByTemplate[];
  id: string;
}

export interface NewColumnDataTemplate {
  [key: string]: {
    spendings: SpendingDataTemplate[];
  };
}

const blankSpendingObject: SpendingDataTemplate = {
  expenseName: "",
  amount: 0,
  sharedBy: [],
  id: `tempSpendingId=${Math.random()}`,
};

const Manage: React.FC<ManageProps> = () => {
  // Add your component logic here

  const [members, setMembers] = useState<NewColumnDataTemplate>({});
  const memberNames = Object.keys(members);

  const handleDragEnd = (result: any) => {
    // TODO: Implement logic for handling drag end
  };

  return (
    <Stack sx={{ height: "100%" }} direction="row" gap={4}>
      <ColumnCardContainer sx={{ paddingTop: 4, padding: 3 }}>
        <StyledHeader variant="h4" mb={4}>
          Members
        </StyledHeader>
        <MemberRenderer
          memberNames={memberNames}
          removeMember={removeMember({ setMembers, members })}
          updateMemberName={updateMemberName({ setMembers, members })}
        />
        <Divider orientation="horizontal" flexItem sx={{ marginY: 4 }} />
        <StyledHeader variant="h4" sx={{ mb: 2 }}>
          Add Member
        </StyledHeader>
        <ContainerColumn>
          <AddMemberRow onAdd={addNewMember({ members, setMembers })} />
        </ContainerColumn>
      </ColumnCardContainer>
      <Divider orientation="vertical" flexItem />
      <DragDropContext onDragEnd={handleDragEnd}>
        <ContentRenderer
          members={members}
          memberNames={memberNames}
          addBlankMemberSpending={addBlankMemberSpending(setMembers, members)}
        />
      </DragDropContext>
    </Stack>
  );
};

export default Manage;
