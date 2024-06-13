"use client";
import { DndContext, DragStartEvent, DragOverlay } from "@dnd-kit/core";
import SpendingCard from "./internalComponents/SpendingCard";
import DroppableRenderer from "./internalComponents/DroppableRenderer";
import { ManageViewState } from "./types";
import { useState } from "react";
import { createPortal } from "react-dom";
import DroppableContainer from "./internalComponents/DroppableContainer";
import { Box, Stack, TextField, styled } from "@mui/material";
import {
  addMember,
  useUniqueIdBank,
  useUniqueSpendingIdBank,
} from "../manage/pageFunctions/pageFunctions";
import KanbanBoard from "./susComponents/KanbanBoard";
import ColumnContainer from "./susComponents/ColumnContainer";
import AddMemberRow from "./susComponents/AddMemberRow/AddMemberRow";

const initialState: ManageViewState = {
  members: [],
  spendings: {},
  spendingColumn: {},
  currentDraggingSpending: null,
  currentDraggingColumn: null,
};

const Board = () => {
  return <KanbanBoard />;
};

export default Board;
