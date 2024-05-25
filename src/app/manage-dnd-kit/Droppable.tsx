import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Box } from "@mui/material";

interface DroppableProps {
  children?: React.ReactNode;
}

const Droppable: React.FC<DroppableProps> = ({ children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <Box ref={setNodeRef} style={style}>
      {children}
    </Box>
  );
};

export default Droppable;
