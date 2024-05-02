"use client";
import { Stack, Divider } from "@mui/material";
import React, { useState } from "react";
import AddMemberRow from "./AddMemberRow";
import StyledHeader from "@/components/StyledHeader";
import { DragDropContext } from "react-beautiful-dnd";
import ColumnCardContainer from "@/components/ColumnCardContainer";
import ContainerColumn from "@/components/ContainerColumn";
import ContentRenderer from "./ContentRenderer";
import MemberRenderer from "./MemberRenderer";
import {
  addMember,
  removeMember,
  updateMemberName,
  addBlankMemberSpending,
  useNumberBank,
  useUniqueSpendingIdBank,
} from "./pagefunctions";
import { ManageViewState } from "./types";

const initialState: ManageViewState = {
  members: [],
  spendings: {},
  spendingColumn: {},
};

const Manage: React.FC = () => {
  const [manageViewState, setManageViewState] =
    useState<ManageViewState>(initialState);

  const { takeNumber } = useNumberBank();
  const { takeSpendingId } = useUniqueSpendingIdBank();

  const onDragEnd = (result: any) => {};

  return (
    <Stack sx={{ height: "100%" }} direction="row" gap={4}>
      <ColumnCardContainer sx={{ paddingTop: 4, padding: 3 }}>
        <StyledHeader variant="h4" mb={4}>
          Members
        </StyledHeader>
        <MemberRenderer
          members={manageViewState.members}
          removeMember={removeMember({ setManageViewState, manageViewState })}
          updateMemberName={updateMemberName({
            setManageViewState,
            manageViewState,
          })}
        />
        <Divider orientation="horizontal" flexItem sx={{ marginY: 4 }} />
        <StyledHeader variant="h4" sx={{ mb: 2 }}>
          Add Member
        </StyledHeader>
        <ContainerColumn>
          <AddMemberRow
            onAdd={addMember({
              manageViewState,
              setManageViewState,
              takeNumber,
            })}
          />
        </ContainerColumn>
      </ColumnCardContainer>
      <Divider orientation="vertical" flexItem />
      <DragDropContext
        onDragEnd={onDragEnd}
        onDragUpdate={() => {}}
        onDragStart={() => {}}
      >
        <ContentRenderer
          members={manageViewState.members}
          spendingColumns={manageViewState.spendingColumn}
          spendings={manageViewState.spendings}
          addBlankMemberSpending={addBlankMemberSpending({
            manageViewState,
            setManageViewState,
            takeSpendingId,
          })}
        />
      </DragDropContext>
    </Stack>
  );
};

export default Manage;
