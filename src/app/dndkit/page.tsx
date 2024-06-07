"use client";
import { DndContext, DragStartEvent, DragOverlay } from "@dnd-kit/core";
import SpendingCard from "./internalComponents/SpendingCard";
import DroppableRenderer from "./internalComponents/DroppableRenderer";
import { ManageViewState } from "../manage/types";
import { useState } from "react";
import { createPortal } from "react-dom";
import DroppableContainer from "./internalComponents/DroppableContainer";
import { Stack, TextField } from "@mui/material";
import {
  addMember,
  useNumberBank,
  useUniqueSpendingIdBank,
} from "../manage/pageFunctions/pageFunctions";
import KanbanBoard from "./susComponents/KanbanBoard";

const initialState: ManageViewState = {
  members: [],
  spendings: {},
  spendingColumn: {},
  currentDraggingSpending: null,
  currentDraggingColumn: null,
};

const Board = () => {
  const { takeNumber } = useNumberBank();

  const [manageViewState, setManageViewState] =
    useState<ManageViewState>(initialState);
  const { currentDraggingColumn, currentDraggingSpending } = manageViewState;
  const [tempNameField, setNameValue] = useState("");

  // console.log({ restManageState });

  const handleDragStart = (event: DragStartEvent) => {
    console.log({ event });
    if (event.active.data.current?.type === "member") {
      setManageViewState((prev) => ({
        ...prev,
        currentDraggingColumn: event.active.data.current?.member,
      }));
      return;
    }
  };

  return <KanbanBoard />;
};

export default Board;

{
  /* <>
      <Stack sx={{ height: "100%", backgroundColor: "white !important" }}>
        <TextField
          value={tempNameField}
          onChange={(e) => {
            setNameValue(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addMember({ manageViewState, setManageViewState, takeNumber })({
                memberName: tempNameField,
              });
              setNameValue("");
            }
          }}
        />
      </Stack>
      <DndContext autoScroll onDragEnd={() => {}} onDragStart={handleDragStart}>
        <DroppableRenderer manageState={manageViewState} />
        {createPortal(
          <DragOverlay>
            {currentDraggingColumn && (
              <DroppableContainer
                columnName={currentDraggingColumn.columnName}
                id={currentDraggingColumn.id}
                spendingIds={currentDraggingColumn.spendingIds}
                spendings={manageViewState.spendings}
              />
            )}
            {currentDraggingSpending && (
              <SpendingCard
                spending={currentDraggingSpending.spending}
                id={currentDraggingSpending.id}
                columnName={currentDraggingSpending.columnName}
                // deleteTask={() => {}}
                // updateTask={() => {}}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </> */
}
