"use client";
import React from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Box } from "@mui/material";

import Draggable from "./Draggable";
import Droppable from "./Droppable";

const DragAndDropManageView: React.FC = () => {
  const [isDropped, setIsDropped] = React.useState(false);
  const draggableMarkup = <Draggable>Drag me</Draggable>;

  const handleDragEnd = (e: DragEndEvent) => {
    if (e.over && e.over.id === "droppable") {
      setIsDropped(true);
    }
  };
  return (
    <Box sx={{ height: "100%", backgroundColor: "pink" }}>
      <DndContext onDragEnd={handleDragEnd}>
        <Draggable />
        <Droppable />
      </DndContext>
    </Box>
  );
};

export default DragAndDropManageView;
