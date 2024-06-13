"use client";
import { Stack, Divider, Drawer, Toolbar, Box } from "@mui/material";
import React, { useRef, useState } from "react";
import AddMemberRow from "../dndkit/susComponents/AddMemberRow/AddMemberRow";
import StyledHeader from "@/components/StyledHeader";
import { DragDropContext } from "@hello-pangea/dnd";
import ColumnCardContainer from "@/components/ColumnCardContainer";
import ContainerColumn from "@/components/ContainerColumn";
import ContentRenderer from "./ContentRenderer/ContentRenderer";
import MemberRenderer from "./MemberRenderer/MemberRenderer";
import {
  addMember,
  removeMember,
  updateMemberName,
  addBlankMemberSpending,
  useUniqueIdBank,
  useUniqueSpendingIdBank,
  onDragEnd,
  updateMemberSpending,
} from "./pageFunctions/pageFunctions";
import { ManageViewState } from "../dndkit/types";

const initialState: ManageViewState = {
  members: [],
  spendings: {},
  spendingColumn: {},
};

const Manage: React.FC = () => {
  const [manageViewState, setManageViewState] =
    useState<ManageViewState>(initialState);

  const { takeUniqueId: takeNumber } = useUniqueIdBank();
  const { takeSpendingId } = useUniqueSpendingIdBank();

  console.log({ manageViewState });

  return (
    <Box
      sx={{
        height: "calc(100% - 50px)",
        display: "grid",
        gridTemplateColumns: "1fr 3fr",
      }}
    >
      <ColumnCardContainer
        sx={{
          paddingTop: 4,
          padding: 3,
          flex: 1,
          zIndex: 99999,
          left: (theme) => theme.spacing(4),
          height: "100%",
        }}
      >
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
      <Stack direction="row" gap={4} flex={1} sx={{ overflow: "auto" }}>
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
    </Box>
  );
};

export default Manage;
