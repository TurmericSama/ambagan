"use client";
import { Stack, Divider, Drawer, Toolbar } from "@mui/material";
import React, { useState } from "react";
import AddMemberRow from "./AddMemberRow/AddMemberRow";
import StyledHeader from "@/components/StyledHeader";
import { DragDropContext } from "react-beautiful-dnd";
import ColumnCardContainer from "@/components/ColumnCardContainer";
import ContainerColumn from "@/components/ContainerColumn";
import ContentRenderer from "./ContentRenderer/ContentRenderer";
import MemberRenderer from "./MemberRenderer/MemberRenderer";
import {
  addMember,
  removeMember,
  updateMemberName,
  addBlankMemberSpending,
  useNumberBank,
  useUniqueSpendingIdBank,
  onDragEnd,
  updateMemberSpending,
} from "./pageFunctions/pageFunctions";
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

  console.log({ manageViewState });

  return (
    <>
      <Drawer
        open
        variant="permanent"
        sx={{
          "& .MuiDrawer-paper": {
            zIndex: 2,
          },
        }}
      >
        <Toolbar sx={{ zIndex: 2 }} variant="dense" />
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
      </Drawer>
      <Stack sx={{ height: "calc(100% - 100px)" }} direction="row" gap={4}>
        <DragDropContext
          onDragEnd={onDragEnd({ manageViewState, setManageViewState })}
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
            updateMemberSpending={updateMemberSpending({
              manageViewState,
              setManageViewState,
            })}
          />
        </DragDropContext>
      </Stack>
    </>
  );
};

export default Manage;
